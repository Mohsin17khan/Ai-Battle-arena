import React, { useState, useRef, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import { fetchBattleResult } from './services/api';
import axios from 'axios'

let nextChatId = 1;
let nextMsgId = 1;

const API_BASE_URL = 'http://localhost:3000';

const getQuestions = async () =>{
  try{
    const response = await axios.get(`${API_BASE_URL}/aiQuestions`);
    return response.data.battles;
  } catch (error) {
    console.error('Failed to fetch AI questions:', error);
    throw error;
  }
}


 function App() {
  const [chats, setChats] = useState([]);
  const [questions, setQuestions] = useState([] );
  const [activeChatId, setActiveChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const fetchInitialQuestions = useCallback(async () => {
    try {
      const fetchedQuestions = await getQuestions();
      console.log('Fetched questions:', fetchedQuestions);
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error('Error fetching initial questions:', error);
    }
  }, []);

  React.useEffect(() => {
    fetchInitialQuestions();
  }, [fetchInitialQuestions]);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  const handleNewChat = useCallback(() => {
    setActiveChatId(null);
  }, []);

  const handleSelectChat = useCallback((chatId) => {
    setActiveChatId(chatId);
    scrollToBottom();
  }, [scrollToBottom]);

  const handleSend = useCallback(async (problem) => {
    if (isLoading) return;
    setIsLoading(true);

    // If no active chat, create a new one
    let currentChatId = activeChatId;
    if (!currentChatId) {
      const newChatId = nextChatId++;
      const newChat = {
        id: newChatId,
        title: problem.length > 45 ? problem.slice(0, 45) + '…' : problem,
        messages: [],
      };

      setChats((prev) => [newChat, ...prev]);
      setActiveChatId(newChatId);

      currentChatId = newChatId;
    }

    scrollToBottom();

    try {
      const result = await fetchBattleResult(problem);
      console.log('fetchBattleResult returned:', result);
      
      // Validate and provide defaults for missing data
      const newMessage = {
        id: nextMsgId++,
        problem: result?.problem || problem,
        solution_1: result?.solution_1 || 'No solution provided',
        solution_2: result?.solution_2 || 'No solution provided',
        judge: result?.judge || {
          solution_1_score: 0,
          solution_2_score: 0,
          solution_1_reasoning: 'Waiting for judge evaluation...',
          solution_2_reasoning: 'Waiting for judge evaluation...',
        },
      };
      console.log('Creating new message:', newMessage);

      setChats((prev) => {
        console.log('Updating chats, currentChatId:', currentChatId);
        return prev.map((chat) => {
          if (chat.id === currentChatId) {
            console.log('Found chat, adding message');
            return {
              ...chat,
              messages: [...chat.messages, newMessage],
            };
          }
          return chat;
        });
      });

      scrollToBottom();
    } catch (err) {
      console.error('Failed to fetch battle result:', err);
    } finally {
      setIsLoading(false);
    }
  }, [activeChatId, isLoading, scrollToBottom]);

  // Combine user-created chats and backend questions
  const allChats = [
    ...chats,
    ...questions.map((q) => ({  
      id: q._id,
      title: q.problem.length > 45 ? q.problem.slice(0, 45) + '…' : q.problem,
      messages: [{
        id: q._id,
        problem: q.problem,
        solution_1: q.solution_1,
        solution_2: q.solution_2,
        judge: q.judge,
      }],   
    }))
  ];

  // Derive active chat from allChats
  const activeChat = allChats.find((c) => c.id === activeChatId) || null;
  const messages = activeChat ? activeChat.messages : [];

const handleDeleteChat = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/delete/${id}`);

    // 🔥 remove from chats (local state)
    setChats((prev) => prev.filter((chat) => chat.id !== id));

    // 🔥 remove from backend questions also
    setQuestions((prev) => prev.filter((q) => q._id !== id));

    // 🔥 if active chat deleted → reset
    if (activeChatId === id) {
      setActiveChatId(null);
    }

  } catch (error) {
    console.error("Delete error:", error);
  }
};

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#111319] font-[Manrope]">
      {/* Sidebar */}
      <Sidebar
        chats={allChats}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onDelete={handleDeleteChat}
      />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <Header />

        {/* Chat area */}
        <ChatArea
          messages={messages}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
        />

        {/* Input */}
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;