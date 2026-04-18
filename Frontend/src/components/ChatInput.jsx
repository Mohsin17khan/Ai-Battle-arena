import axios from 'axios';
import React, { useState, useRef } from 'react';

const ChatInput = ({ onSend, isLoading }) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;

    // const response = await axios.post('http://localhost:3000/invoke', {
    //    input: trimmed  
    // }); 
    // const data = response.data 
    // console.log(data);

    onSend(trimmed);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
    // Auto-resize textarea
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
    }
  };

  return (
    <div className="flex-shrink-0 px-6 py-4 bg-[#111319]/80 backdrop-blur-md border-t border-[#4a4455]/20">
      <div className="max-w-6xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div className={`flex items-end gap-3 rounded-2xl bg-[#1e1f26] border transition-all duration-200 px-4 py-3 ${
            isLoading
              ? 'border-[#4a4455]/30 opacity-70'
              : 'border-[#4a4455]/30 focus-within:border-[#7c3aed]/50 focus-within:shadow-lg focus-within:shadow-violet-900/20'
          }`}>
            {/* Lightning icon */}
            <div className="flex-shrink-0 mb-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#958da1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              id="chat-input"
              value={value}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder={isLoading ? 'AI Battle in progress...' : 'Ask a question to start a battle... (Enter to send, Shift+Enter for new line)'}
              disabled={isLoading}
              rows={1}
              className="flex-1 bg-transparent text-[#e2e2eb] placeholder-[#4a4455] text-sm font-[Manrope] outline-none resize-none leading-relaxed min-h-[24px] max-h-40 custom-scrollbar disabled:cursor-not-allowed"
            />

            {/* Send button */}
            <button
              type="submit"
              id="send-btn"
              disabled={!value.trim() || isLoading}
              className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 mb-0.5 ${
                value.trim() && !isLoading
                  ? 'bg-gradient-to-br from-[#7c3aed] to-[#0566d9] text-white shadow-lg shadow-violet-900/30 hover:opacity-90 hover:shadow-violet-900/50 hover:scale-105 active:scale-95'
                  : 'bg-[#282a30] text-[#4a4455] cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              )}
            </button>
          </div>

          {/* Helper text */}
          <div className="flex items-center justify-between mt-2 px-1">
            <p className="text-[#4a4455] text-[10px] font-[Manrope]">
              Powered by AI Battle Arena · 2 AIs competing simultaneously
            </p>
            <div className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 text-[9px] text-[#4a4455] bg-[#1e1f26] border border-[#4a4455]/30 rounded font-[Manrope]">Enter</kbd>
              <span className="text-[#4a4455] text-[9px] font-[Manrope]">to send</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
