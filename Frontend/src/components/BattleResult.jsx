import React from 'react';
import MarkdownContent from './MarkdownContent';

const ScoreBadge = ({ score, isWinner }) => {
  const maxScore = 10;
  const pct = (score / maxScore) * 100;
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className={`relative flex-shrink-0 ${isWinner ? 'animate-winner-pulse' : ''}`}>
      <svg width="72" height="72" viewBox="0 0 72 72" className="rotate-[-90deg]">
        {/* Background ring */}
        <circle cx="36" cy="36" r={radius} fill="none" stroke="#1e1f26" strokeWidth="6" />
        {/* Score ring */}
        <circle
          cx="36" cy="36" r={radius}
          fill="none"
          stroke={isWinner ? '#f59e0b' : '#10b981'}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 6px ${isWinner ? '#f59e0b' : '#10b981'}99)`,
            transition: 'stroke-dashoffset 1s ease-in-out',
          }}
        />
        {/* Glow ring (winner only) */}
        {isWinner && (
          <circle
            cx="36" cy="36" r={radius + 4}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="4 8"
            opacity="0.3"
          />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
        <span className={`text-base font-bold font-[Space_Grotesk] leading-none ${isWinner ? 'text-[#f59e0b]' : 'text-emerald-400'}`}>
          {score}
        </span>
        <span className="text-[8px] text-[#958da1] font-[Manrope] leading-none mt-0.5">/10</span>
      </div>
    </div>
  );
};

const JudgePanel = ({ judge }) => {
  const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } = judge;
  const winner = solution_1_score >= solution_2_score ? 1 : 2;

  return (
    <div className="mt-4 rounded-2xl bg-[#0c0e14]/80 backdrop-blur-sm border border-[#4a4455]/30 overflow-hidden">
      {/* Judge header */}
      <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-[#1a1025] to-[#0d1520] border-b border-[#4a4455]/20">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center shadow-md shadow-amber-900/40">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <p className="text-[#ffb95f] text-xs font-bold uppercase tracking-widest font-[Space_Grotesk]">Judge's Verdict</p>
          <p className="text-[#958da1] text-[10px] font-[Manrope]">AI-powered evaluation</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM12 17v-5M12 7v.01"/>
          </svg>
          <span className="text-[#f59e0b] text-[10px] font-semibold font-[Manrope]">Unbiased</span>
        </div>
      </div>

      {/* Scores row */}
      <div className="grid grid-cols-2 gap-0 divide-x divide-[#4a4455]/20">
        {/* Solution 1 score */}
        <div className={`flex items-center gap-4 px-5 py-4 ${winner === 1 ? 'bg-gradient-to-r from-[#f59e0b]/5 to-transparent' : ''}`}>
          <ScoreBadge score={solution_1_score} isWinner={winner === 1} />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[#e2e2eb] text-sm font-semibold font-[Space_Grotesk]">Solution 1</span>
              {winner === 1 && (
                <span className="px-1.5 py-0.5 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/30 text-[#f59e0b] text-[9px] font-bold uppercase tracking-widest font-[Manrope]">
                  Winner
                </span>
              )}
            </div>
            <p className="text-[#ccc3d8] text-xs font-[Manrope] leading-relaxed line-clamp-3">{solution_1_reasoning}</p>
          </div>
        </div>

        {/* Solution 2 score */}
        <div className={`flex items-center gap-4 px-5 py-4 ${winner === 2 ? 'bg-gradient-to-r from-[#f59e0b]/5 to-transparent' : ''}`}>
          <ScoreBadge score={solution_2_score} isWinner={winner === 2} />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[#e2e2eb] text-sm font-semibold font-[Space_Grotesk]">Solution 2</span>
              {winner === 2 && (
                <span className="px-1.5 py-0.5 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/30 text-[#f59e0b] text-[9px] font-bold uppercase tracking-widest font-[Manrope]">
                  Winner
                </span>
              )}
            </div>
            <p className="text-[#ccc3d8] text-xs font-[Manrope] leading-relaxed line-clamp-3">{solution_2_reasoning}</p>
          </div>
        </div>
      </div>

      {/* Winner declaration banner */}
      <div className={`flex items-center justify-center gap-2 py-2.5 ${winner === 1 ? 'bg-gradient-to-r from-[#f59e0b]/10 via-[#d97706]/5 to-transparent' : 'bg-gradient-to-r from-transparent via-[#d97706]/5 to-[#f59e0b]/10'} border-t border-[#4a4455]/20`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f59e0b" className="w-4 h-4">
          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
        </svg>
        <span className="text-[#ffb95f] text-xs font-bold font-[Space_Grotesk] uppercase tracking-wide">
          🏆 Solution {winner} Wins the Battle! Score: {winner === 1 ? solution_1_score : solution_2_score}/10
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f59e0b" className="w-4 h-4">
          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

const BattleResult = ({ problem, solution_1, solution_2, judge }) => {
  const winner = judge.solution_1_score >= judge.solution_2_score ? 1 : 2;

  return (
    <div className="mt-3 rounded-2xl overflow-hidden border border-[#4a4455]/25 bg-[#111319]/60 backdrop-blur-sm shadow-2xl shadow-black/40">
      {/* Battle card header */}
      <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-[#7c3aed]/10 to-[#0566d9]/10 border-b border-[#4a4455]/20">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#0566d9] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <span className="text-[#e2e2eb] text-sm font-bold font-[Space_Grotesk] uppercase tracking-wide">Battle Result</span>
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#7c3aed]/15 text-[#d2bbff] border border-[#7c3aed]/20 font-[Manrope]">AI-1</span>
          <span className="text-[#958da1] text-xs">vs</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0566d9]/15 text-[#adc6ff] border border-[#0566d9]/20 font-[Manrope]">AI-2</span>
        </div>
      </div>

      {/* Two solutions side by side */}
      <div className="grid grid-cols-2 divide-x divide-[#4a4455]/20">
        {/* Solution 1 */}
        <div className={`p-5 ${winner === 1 ? 'bg-gradient-to-b from-[#f59e0b]/5 to-transparent' : ''}`}>
          <div className="flex items-center gap-2 mb-4">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold font-[Space_Grotesk] uppercase tracking-wider border ${
              winner === 1
                ? 'bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30'
                : 'bg-[#7c3aed]/15 text-[#d2bbff] border-[#7c3aed]/20'
            }`}>
              {winner === 1 && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              )}
              Solution 1 {winner === 1 ? '🏆' : ''}
            </div>
            <div className="ml-auto flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${winner === 1 ? 'bg-[#f59e0b]' : 'bg-[#7c3aed]'} opacity-60`}></div>
              <span className={`text-xs font-[Manrope] ${winner === 1 ? 'text-[#f59e0b]' : 'text-[#7c3aed]'}`}>
                {judge.solution_1_score}/10
              </span>
            </div>
          </div>
          {/* Highlighted AI solution content */}
          <div className="max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
            <MarkdownContent content={solution_1} />
          </div>
        </div>

        {/* Solution 2 */}
        <div className={`p-5 ${winner === 2 ? 'bg-gradient-to-b from-[#f59e0b]/5 to-transparent' : ''}`}>
          <div className="flex items-center gap-2 mb-4">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold font-[Space_Grotesk] uppercase tracking-wider border ${
              winner === 2
                ? 'bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30'
                : 'bg-[#0566d9]/15 text-[#adc6ff] border-[#0566d9]/20'
            }`}>
              {winner === 2 && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              )}
              Solution 2 {winner === 2 ? '🏆' : ''}
            </div>
            <div className="ml-auto flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${winner === 2 ? 'bg-[#f59e0b]' : 'bg-[#0566d9]'} opacity-60`}></div>
              <span className={`text-xs font-[Manrope] ${winner === 2 ? 'text-[#f59e0b]' : 'text-[#0566d9]'}`}>
                {judge.solution_2_score}/10
              </span>
            </div>
          </div>
          {/* Highlighted AI solution content */}
          <div className="max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
            <MarkdownContent content={solution_2} />
          </div>
        </div>
      </div>

      {/* Judge Panel */}
      <div className="px-5 pb-5">
        <JudgePanel judge={judge} />
      </div>
    </div>
  );
};

export default BattleResult;
