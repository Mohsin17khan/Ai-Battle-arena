import React, { useState, useRef, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import { fetchBattleResult } from './services/api';

let nextChatId = 1;
let nextMsgId = 1;

function App() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Derive active chat messages
  const activeChat = chats.find((c) => c.id === activeChatId) || null;
  const messages = activeChat ? activeChat.messages : [];

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
      const newMessage = {
        id: nextMsgId++,
        problem: result.problem,
        solution_1: result.solution_1,
        solution_2: result.solution_2,
        judge: result.judge,
      };

      setChats((prev) =>
        prev.map((chat) => {
          if (chat.id === currentChatId) {
            return {
              ...chat,
              messages: [...chat.messages, newMessage],
            };
          }
          return chat;
        })
      );

      scrollToBottom();
    } catch (err) {
      console.error('Failed to fetch battle result:', err);
    } finally {
      setIsLoading(false);
    }
  }, [activeChatId, isLoading, scrollToBottom]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#111319] font-[Manrope]">
      {/* Sidebar */}
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
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