import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Custom syntax highlighter theme matching design system
const arenaTheme = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: '#0c0e14',
    margin: 0,
    borderRadius: '0.75rem',
    fontSize: '0.78rem',
    lineHeight: '1.6',
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: '#0c0e14',
    fontSize: '0.78rem',
    fontFamily: '"Fira Code", "Cascadia Code", monospace',
  },
};

const MarkdownContent = ({ content }) => {
  // Handle case where content is not a string
  if (!content || typeof content !== 'string') {
    return (
      <div className="text-[#ccc3d8] text-sm font-[Manrope]">
        {typeof content === 'object' ? JSON.stringify(content) : 'No content available'}
      </div>
    );
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';
          
          if (!inline && match) {
            return (
              <div className="my-3 rounded-xl overflow-hidden border border-[#4a4455]/20 shadow-xl shadow-black/40">
                {/* Code block header */}
                <div className="flex items-center justify-between px-4 py-2 bg-[#0c0e14] border-b border-[#4a4455]/20">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#fbbc04]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#34c759]"></span>
                  </div>
                  <span className="text-[10px] text-[#958da1] font-[Manrope] uppercase tracking-widest">{language || 'code'}</span>
                </div>
                <SyntaxHighlighter
                  style={arenaTheme}
                  language={language || 'text'}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    borderRadius: 0,
                    background: '#0c0e14',
                    padding: '1rem',
                    fontSize: '0.78rem',
                    minHeight: 'auto',
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            );
          }

          // Inline code
          return (
            <code
              className="px-1.5 py-0.5 rounded-md bg-[#1e1f26] text-[#ffb95f] text-[0.8em] font-mono border border-[#4a4455]/30"
              {...props}
            >
              {children}
            </code>
          );
        },
        h1: ({ children }) => (
          <h1 className="text-[#e2e2eb] font-bold text-lg mb-3 mt-4 font-outfit first:mt-0 border-b border-[#4a4455]/30 pb-2">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-[#e2e2eb] font-semibold text-base mb-2 mt-4 font-outfit first:mt-0">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-[#d2bbff] font-semibold text-sm mb-2 mt-3 font-outfit first:mt-0">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="text-[#ccc3d8] text-sm leading-relaxed mb-3 font-outfit last:mb-0">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-none space-y-1.5 mb-3 pl-0">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-1.5 mb-3 pl-0 text-[#ccc3d8] text-sm font-outfit">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-[#ccc3d8] text-sm font-outfit flex items-start gap-2">
            <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#7c3aed] opacity-80"></span>
            <span>{children}</span>
          </li>
        ),
        a: ({ children, href }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#adc6ff] hover:text-[#d2bbff] underline underline-offset-2 transition-colors duration-150 font-outfit">
            {children}
          </a>
        ),
        strong: ({ children }) => (
          <strong className="text-[#e2e2eb] font-semibold">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="text-[#ffb95f] italic">{children}</em>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-[#7c3aed] pl-4 my-3 text-[#958da1] italic text-sm font-outfit">{children}</blockquote>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-3 rounded-xl border border-[#4a4455]/20">
            <table className="w-full text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-[#1e1f26] text-[#ccc3d8] font-outfit">{children}</thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-[#4a4455]/20">{children}</tbody>
        ),
        tr: ({ children }) => (
          <tr className="hover:bg-[#1e1f26]/50 transition-colors">{children}</tr>
        ),
        th: ({ children }) => (
          <th className="px-3 py-2 text-left text-xs uppercase tracking-wider text-[#958da1] font-semibold">{children}</th>
        ),
        td: ({ children }) => (
          <td className="px-3 py-2 text-[#ccc3d8] font-outfit">{children}</td>
        ),
        hr: () => (
          <hr className="my-4 border-[#4a4455]/30" />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownContent;
