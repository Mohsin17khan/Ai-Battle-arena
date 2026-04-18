import React from 'react';

const Header = () => {
  return (
    <header className="flex-shrink-0 h-16 px-6 flex items-center justify-between border-b border-[#4a4455]/20 bg-[#111319]/80 backdrop-blur-md z-10">
      {/* Left: Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#0566d9] flex items-center justify-center shadow-lg shadow-violet-900/40">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </div>
        <div>
          <h1 className="text-[#e2e2eb] font-bold text-lg leading-none font-[Space_Grotesk] tracking-tight">AI Battle Arena</h1>
          <p className="text-[#958da1] text-[11px] font-[Manrope] leading-tight mt-0.5">Watch AIs compete for the best answer</p>
        </div>
      </div>

      {/* Right: Indicators */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1e1f26] border border-[#4a4455]/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[#ccc3d8] text-xs font-[Manrope]">Arena Live</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1e1f26] border border-[#4a4455]/30">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d2bbff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
          <span className="text-[#ccc3d8] text-xs font-[Manrope]">2 AIs Ready</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
