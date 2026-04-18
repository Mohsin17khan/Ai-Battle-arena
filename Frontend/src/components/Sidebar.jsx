import React from 'react';

const Sidebar = ({ chats, activeChatId, onSelectChat, onNewChat }) => {
  return (
    <aside className="w-70 min-w-[280px] max-w-[280px] h-screen flex flex-col bg-[#0d1117] border-r border-[#4a4455]/20">
      {/* Logo / Brand */}
      <div className="px-4 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#0566d9] flex items-center justify-center shadow-lg shadow-violet-900/40">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <span className="text-[#e2e2eb] font-bold text-base tracking-wide font-[Space_Grotesk]">AI Battle Arena</span>
        </div>

        {/* New Chat Button */}
        <button
          onClick={onNewChat}
          id="new-chat-btn"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#0566d9] text-white text-sm font-semibold hover:opacity-90 hover:shadow-lg hover:shadow-violet-900/40 transition-all duration-200 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          New Chat
        </button>
      </div>

      <div className="px-4 py-1">
        <p className="text-[#958da1] text-xs uppercase tracking-widest mb-2 font-[Manrope]">Recent Battles</p>
      </div>

      {/* Chat History List */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 custom-scrollbar">
        {chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-[#4a4455] text-center px-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 mb-2 opacity-50">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>
            </svg>
            <p className="text-xs font-[Manrope]">No battles yet.<br/>Start a new chat!</p>
          </div>
        ) : (
          <div className="space-y-1">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                  activeChatId === chat.id
                    ? 'bg-[#7c3aed]/20 text-[#d2bbff] border border-[#7c3aed]/30'
                    : 'text-[#ccc3d8] hover:bg-[#1e1f26] hover:text-[#e2e2eb]'
                }`}
              >
                <div className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${activeChatId === chat.id ? 'text-[#7c3aed]' : 'text-[#958da1]'}`}>
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate font-[Manrope] leading-tight">{chat.title}</p>
                    <p className="text-[10px] text-[#958da1] mt-0.5 font-[Manrope]">{chat.messages.length} message{chat.messages.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-[#4a4455]/20">
        <p className="text-[#4a4455] text-[10px] text-center font-[Manrope]">AI Battle Arena · Neural Spectacle</p>
      </div>
    </aside>
  );
};

export default Sidebar;
