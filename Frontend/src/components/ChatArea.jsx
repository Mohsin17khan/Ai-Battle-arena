import React from 'react';
import BattleResult from './BattleResult';

const UserMessage = ({ text }) => (
  <div className="flex justify-end mb-1">
    <div className="max-w-[60%] flex items-end gap-2">
      <div className="bg-gradient-to-br from-[#7c3aed] to-[#0566d9] text-white px-4 py-3 rounded-2xl rounded-br-sm shadow-lg shadow-violet-900/30 text-sm font-outfit leading-relaxed">
        {text}
      </div>
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#0566d9] flex-shrink-0 flex items-center justify-center shadow-md text-white font-outfit text-xs font-bold mb-0.5">
        U
      </div>
    </div>
  </div>
);

const ChatMessage = ({ message }) => {
  console.log('ChatMessage rendering with:', message);
  return (
    <div className="mb-8">
      {/* User question */}
      <UserMessage text={message.problem} />

      {/* Battle Result card */}
      <div className="mt-2">
        <BattleResult
          problem={message.problem}
          solution_1={message.solution_1}
          solution_2={message.solution_2}
          judge={message.judge}
        />
      </div>
    </div>
  );
};

const ChatArea = ({ messages, isLoading, messagesEndRef }) => {
  console.log('ChatArea rendering with messages:', messages, 'isLoading:', isLoading);
  
  if (messages.length === 0 && !isLoading) {
    // Empty state
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7c3aed]/20 to-[#0566d9]/20 border border-[#7c3aed]/20 flex items-center justify-center mb-6 shadow-xl shadow-violet-900/20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="url(#grad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#0566d9" />
              </linearGradient>
            </defs>
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </div>
        <h2 className="text-[#e2e2eb] text-2xl font-bold font-outfit mb-2">Start a Battle</h2>
        <p className="text-[#958da1] text-sm font-outfit max-w-sm leading-relaxed mb-8">
          Ask any question and watch two AI solutions compete head-to-head. A judge will evaluate and declare the winner.
        </p>
        <div className="grid grid-cols-3 gap-3 max-w-lg w-full">
          {[
            { label: '⚡ Real-time', desc: 'Instant AI responses' },
            { label: '🏆 Judged', desc: 'Unbiased evaluation' },
            { label: '📊 Scored', desc: 'Detailed analytics' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl bg-[#1e1f26]/50 border border-[#4a4455]/20">
              <span className="text-[#e2e2eb] text-sm font-semibold font-outfit ">{item.label}</span>
              <span className="text-[#958da1] text-xs font-outfit ">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
      <div className="max-w-6xl mx-auto">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Loading state */}
        {isLoading && (
          <div className="mb-8">
            <div className="flex justify-end mb-3">
              <div className="max-w-[60%] bg-gradient-to-br from-[#7c3aed] to-[#0566d9] text-white px-4 py-3 rounded-2xl rounded-br-sm shadow-lg text-sm font-[Manrope] opacity-70">
                Sending to arena...
              </div>
            </div>
            <div className="rounded-2xl border border-[#4a4455]/25 bg-[#111319]/60 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#0566d9] animate-pulse"></div>
                <span className="text-[#ccc3d8] text-sm font-[Manrope]">AIs are battling...</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 rounded-lg bg-[#1e1f26] animate-pulse"></div>
                    <div className="h-4 rounded-lg bg-[#1e1f26] animate-pulse w-4/5"></div>
                    <div className="h-4 rounded-lg bg-[#1e1f26] animate-pulse w-3/5"></div>
                    <div className="h-20 rounded-xl bg-[#0c0e14] animate-pulse mt-3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatArea;
