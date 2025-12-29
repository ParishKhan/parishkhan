import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTerminalStore } from '@/store/use-terminal-store';
import { RESUME_DATA } from '@/data/resume-data';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
export function ProgrammerTerminal() {
  const isTerminalMode = useTerminalStore((s) => s.isTerminalMode);
  const output = useTerminalStore((s) => s.output);
  const history = useTerminalStore((s) => s.history);
  const historyIndex = useTerminalStore((s) => s.historyIndex);
  const addOutput = useTerminalStore((s) => s.addOutput);
  const clearOutput = useTerminalStore((s) => s.clearOutput);
  const toggleTerminal = useTerminalStore((s) => s.toggleTerminal);
  const addToHistory = useTerminalStore((s) => s.addToHistory);
  const setHistoryIndex = useTerminalStore((s) => s.setHistoryIndex);
  const { toggleTheme } = useTheme();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isTerminalMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTerminalMode]);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output]);
  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    const lowerCmd = trimmed.toLowerCase();
    addToHistory(cmd);
    addOutput({ content: `parish@folio:~$ ${cmd}`, type: 'command' });
    const parts = lowerCmd.split(' ');
    const baseCmd = parts[0];
    switch (baseCmd) {
      case 'help':
      case '?':
        addOutput([
          { content: 'Available commands:', type: 'system' },
          { content: '  about        - Show developer bio', type: 'response' },
          { content: '  skills       - List technical toolkit (ls skills)', type: 'response' },
          { content: '  experience   - Show professional history (cat exp.log)', type: 'response' },
          { content: '  projects     - List active projects (ls projects)', type: 'response' },
          { content: '  contact      - Show contact information', type: 'response' },
          { content: '  theme        - Toggle light/dark mode', type: 'response' },
          { content: '  clear        - Clear terminal screen', type: 'response' },
          { content: '  exit         - Return to normal view', type: 'response' },
          { content: '  echo [text]  - Print text to terminal', type: 'response' },
        ]);
        break;
      case 'about':
        addOutput({ content: RESUME_DATA.summary, type: 'response' });
        break;
      case 'ls':
        if (parts[1] === 'skills') {
          Object.entries(RESUME_DATA.skills).forEach(([cat, items]) => {
            addOutput({ content: `[${cat.toUpperCase()}]: ${items.join(', ')}`, type: 'response' });
          });
        } else if (parts[1] === 'projects') {
          RESUME_DATA.projects.forEach(p => {
            addOutput({ content: `> ${p.title}: ${p.description} (${p.link.label})`, type: 'response' });
          });
        } else {
          addOutput({ content: 'Usage: ls [skills|projects]', type: 'error' });
        }
        break;
      case 'skills':
        // Alias for ls skills without re-adding command line
        Object.entries(RESUME_DATA.skills).forEach(([cat, items]) => {
          addOutput({ content: `[${cat.toUpperCase()}]: ${items.join(', ')}`, type: 'response' });
        });
        break;
      case 'projects':
        // Alias for ls projects
        RESUME_DATA.projects.forEach(p => {
          addOutput({ content: `> ${p.title}: ${p.description} (${p.link.label})`, type: 'response' });
        });
        break;
      case 'cat':
        if (parts[1] === 'exp.log') {
          RESUME_DATA.work.forEach(w => {
            addOutput({ content: `[${w.start}-${w.end}] ${w.company} - ${w.title}`, type: 'response' });
            addOutput({ content: `  ${w.description}`, type: 'response' });
          });
        } else {
          addOutput({ content: 'File not found. Try: cat exp.log', type: 'error' });
        }
        break;
      case 'experience':
        // Alias for cat exp.log
        RESUME_DATA.work.forEach(w => {
          addOutput({ content: `[${w.start}-${w.end}] ${w.company} - ${w.title}`, type: 'response' });
          addOutput({ content: `  ${w.description}`, type: 'response' });
        });
        break;
      case 'contact':
        addOutput([
          { content: `Email: ${RESUME_DATA.contact.email}`, type: 'response' },
          { content: `Phone: ${RESUME_DATA.contact.phone}`, type: 'response' },
          ...RESUME_DATA.contact.social.map(s => ({ content: `${s.name}: ${s.url}`, type: 'response' as const }))
        ]);
        break;
      case 'theme':
        toggleTheme();
        addOutput({ content: 'System theme toggled.', type: 'system' });
        break;
      case 'clear':
        clearOutput();
        break;
      case 'exit':
      case 'quit':
        toggleTerminal();
        break;
      case 'echo':
        addOutput({ content: parts.slice(1).join(' ') || '...', type: 'response' });
        break;
      default:
        addOutput({ content: `Command not found: ${baseCmd}. Type 'help' for assistance.`, type: 'error' });
    }
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIndex = historyIndex + 1;
      if (nextIndex < history.length) {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Escape') {
      toggleTerminal();
    }
  };
  if (!isTerminalMode) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-[#09090b] text-emerald-500 font-mono p-4 md:p-8 flex flex-col overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none scanline opacity-20" />
      <div className="absolute inset-0 pointer-events-none terminal-glitch-bg opacity-5" />
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 mb-4 scrollbar-terminal custom-scrollbar">
        <pre className="text-[10px] md:text-xs leading-none mb-6 text-emerald-600 opacity-80">
{`
  ____   _    ____  ___ ____  _   _
 |  _ \\ / \\  |  _ \\|_ _/ ___|| | | |
 | |_) / _ \\ | |_) || |\\___ \\| |_| |
 |  __/ ___ \\|  _ < | | ___) |  _  |
 |_| /_/   \\_\\_| \\_\\___|____/|_| |_|
  PORTFOLIO_TERMINAL v1.1.0
`}
        </pre>
        {output.map((line, i) => (
          <div key={i} className={cn(
            "break-words leading-relaxed whitespace-pre-wrap",
            line.type === 'command' && "text-sky-400",
            line.type === 'error' && "text-red-400",
            line.type === 'system' && "text-emerald-600 font-bold",
            line.type === 'response' && "text-emerald-400"
          )}>
            {line.content}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 group">
        <span className="text-sky-500 shrink-0">parish@folio:~$</span>
        <input
          ref={inputRef}
          autoFocus
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-emerald-400 caret-emerald-500 selection:bg-emerald-500/30"
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </motion.div>
  );
}