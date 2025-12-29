import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTerminalStore } from '@/store/use-terminal-store';
import { RESUME_DATA } from '@/data/resume-data';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import { RichTerminalOutput } from './RichTerminalOutput';
export function ProgrammerTerminal() {
  const isTerminalMode = useTerminalStore((s) => s.isTerminalMode);
  const output = useTerminalStore((s) => s.output);
  const history = useTerminalStore((s) => s.history);
  const historyIndex = useTerminalStore((s) => s.historyIndex);
  const validCommands = useTerminalStore((s) => s.validCommands);
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
    addToHistory(cmd);
    addOutput({ content: `parish@folio:~$ ${cmd}`, type: 'command' });
    const parts = trimmed.split(' ');
    const baseCmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    switch (baseCmd) {
      case 'help':
        addOutput([
          { content: 'AVAILABLE COMMANDS:', type: 'system' },
          { content: '  whoami, neofetch, skills, projects, experience, contact', type: 'response' },
          { content: '  ls [skills|projects], cat [exp.log|resume.txt], cd [section]', type: 'response' },
          { content: '  echo [text], history, theme, clear, exit', type: 'response' },
        ]);
        break;
      case 'whoami':
        addOutput({ content: `${RESUME_DATA.formalName} — ${RESUME_DATA.summary}`, type: 'response' });
        break;
      case 'neofetch':
        addOutput({ content: {}, type: 'rich', metadata: { richType: 'neofetch' } });
        break;
      case 'skills':
        addOutput({ content: RESUME_DATA.skills, type: 'rich', metadata: { richType: 'tree' } });
        break;
      case 'ls':
        if (args[0]?.toLowerCase() === 'skills') addOutput({ content: RESUME_DATA.skills, type: 'rich', metadata: { richType: 'tree' } });
        else if (args[0]?.toLowerCase() === 'projects') addOutput({ content: RESUME_DATA.projects, type: 'rich', metadata: { richType: 'table' } });
        else addOutput({ content: 'usage: ls [skills|projects]', type: 'error' });
        break;
      case 'projects':
        addOutput({ content: RESUME_DATA.projects, type: 'rich', metadata: { richType: 'table' } });
        break;
      case 'experience':
        addOutput({ content: RESUME_DATA.work, type: 'rich', metadata: { richType: 'changelog' } });
        break;
      case 'cat':
        if (args[0] === 'exp.log') addOutput({ content: RESUME_DATA.work, type: 'rich', metadata: { richType: 'changelog' } });
        else if (args[0] === 'resume.txt') addOutput({ content: RESUME_DATA.summary + "\n\n" + RESUME_DATA.about, type: 'response' });
        else addOutput({ content: 'file not found. try "ls" to see available files.', type: 'error' });
        break;
      case 'cd':
        if (args[0]) {
          const sectionId = args[0].replace('#', '').toLowerCase();
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            addOutput({ content: `Navigating to #${sectionId}...`, type: 'system' });
            setTimeout(() => toggleTerminal(), 500);
          } else {
            addOutput({ content: `directory not found: ${args[0]}`, type: 'error' });
          }
        }
        break;
      case 'echo':
        addOutput({ content: args.join(' '), type: 'response' });
        break;
      case 'history':
        addOutput(history.map((h, i) => ({ content: ` ${history.length - i}  ${h}`, type: 'response' })).reverse());
        break;
      case 'contact':
        addOutput(RESUME_DATA.contact.social.map(s => ({ content: `${s.name.padEnd(10)}: ${s.url}`, type: 'response' })));
        break;
      case 'theme':
        toggleTheme();
        addOutput({ content: 'THEME_UPDATE: SUCCESS', type: 'system' });
        break;
      case 'clear':
        clearOutput();
        break;
      case 'exit':
        toggleTerminal();
        break;
      default:
        addOutput([
          { content: `zsh: command not found: ${parts[0]}`, type: 'error' },
          { content: `Type 'help' to see list of valid commands.`, type: 'system' }
        ]);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = validCommands.filter(c => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) setInput(matches[0]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIdx = historyIndex + 1;
      if (nextIdx < history.length) {
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = historyIndex - 1;
      if (nextIdx >= 0) {
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx]);
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
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={() => inputRef.current?.focus()}
      className="fixed inset-0 z-[1000] bg-[#000A13] text-emerald-400 font-mono flex flex-col p-4 md:p-8 overflow-hidden select-none"
    >
      <div className="absolute inset-0 terminal-scanline pointer-events-none opacity-20" />
      <div className="absolute inset-0 crt-overlay pointer-events-none" />
      <div className="relative z-10 flex flex-col h-full max-w-5xl mx-auto w-full">
        <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar space-y-1 pb-4">
          <pre className="text-[10px] md:text-xs leading-none mb-8 text-emerald-500/80 animate-crt-flicker">
{`
 ██████   █████  ██████  ██ ███████ ██   ██
 ██   ██ ██   ██ ██   ██ ██ ██      ██   ██
 ██████  ███████ ██████  ██ ███████ ███████
 ██      ██   ██ ██   ██ ██      ██ ██   ██
 ██      ██   ██ ██   ██ ██ ███████ ██   ██
 portfolio_os v2.1.0-stable (built_with: react_ts)
`}
          </pre>
          <div aria-live="polite" className="space-y-1">
            {output.map((line, i) => (
              <div key={i} className={cn(
                "break-words whitespace-pre-wrap neon-glow-green",
                line.type === 'command' && "terminal-input-prompt",
                line.type === 'error' && "text-red-500 drop-shadow-none",
                line.type === 'system' && "text-emerald-600 font-bold",
                line.type === 'response' && "text-emerald-400"
              )}>
                {line.type === 'rich' ? (
                  <RichTerminalOutput
                    type={line.metadata?.richType}
                    data={line.content}
                  />
                ) : line.content}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-emerald-900/30 pt-4 mt-auto">
          <span className="terminal-input-prompt shrink-0">parish@folio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-emerald-400 caret-emerald-500"
            spellCheck={false}
            autoComplete="off"
            autoFocus
          />
        </div>
      </div>
    </motion.div>
  );
}