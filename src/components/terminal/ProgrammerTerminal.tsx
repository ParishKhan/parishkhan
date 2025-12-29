import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTerminalStore, TerminalLine } from '@/store/use-terminal-store';
import { RESUME_DATA } from '@/data/resume-data';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import { RichTerminalOutput } from './RichTerminalOutput';
import { TerminalAutocomplete } from './TerminalAutocomplete';
const playPing = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05);
  } catch (e) { /* Audio blocked */ }
};
export function ProgrammerTerminal() {
  const isTerminalMode = useTerminalStore((s) => s.isTerminalMode);
  const output = useTerminalStore((s) => s.output);
  const history = useTerminalStore((s) => s.history);
  const historyIndex = useTerminalStore((s) => s.historyIndex);
  const validCommands = useTerminalStore((s) => s.validCommands);
  const lastActivity = useTerminalStore((s) => s.lastActivity);
  const addOutput = useTerminalStore((s) => s.addOutput);
  const clearOutput = useTerminalStore((s) => s.clearOutput);
  const toggleTerminal = useTerminalStore((s) => s.toggleTerminal);
  const addToHistory = useTerminalStore((s) => s.addToHistory);
  const setHistoryIndex = useTerminalStore((s) => s.setHistoryIndex);
  const setSuggestions = useTerminalStore((s) => s.setSuggestions);
  const setFollowUp = useTerminalStore((s) => s.setFollowUp);
  const updateActivity = useTerminalStore((s) => s.updateActivity);
  const { toggleTheme } = useTheme();
  const [input, setInput] = useState('');
  const [isIdle, setIsIdle] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() - lastActivity > 30000) setIsIdle(true);
      else setIsIdle(false);
    }, 1000);
    return () => clearInterval(timer);
  }, [lastActivity]);
  useEffect(() => {
    if (isTerminalMode && inputRef.current) inputRef.current.focus();
  }, [isTerminalMode]);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [output]);
  useEffect(() => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    const matches = validCommands.filter(c => c.startsWith(input.toLowerCase()));
    setSuggestions(matches);
  }, [input, validCommands, setSuggestions]);
  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    playPing();
    updateActivity();
    addToHistory(cmd);
    addOutput({ content: `parish@folio:~$ ${cmd}`, type: 'command' } as TerminalLine);
    const parts = trimmed.split(' ');
    const baseCmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    switch (baseCmd) {
      case 'help':
        addOutput([
          { content: 'AVAILABLE DIRECTIVES:', type: 'system' },
          { content: '  whoami, neofetch, skills, projects, experience, contact', type: 'response' },
          { content: '  ls [skills|projects], cat [exp.log|resume.txt], ps', type: 'response' },
          { content: '  matrix, cowsay [text], fortune, weather, theme, clear, exit', type: 'response' },
        ] as TerminalLine[]);
        setFollowUp('neofetch');
        break;
      case 'whoami':
        addOutput({ content: `${RESUME_DATA.formalName} — ${RESUME_DATA.summary}\nFull-stack engineer, vibe-coder, and minimalist enthusiast.`, type: 'response' } as TerminalLine);
        break;
      case 'neofetch':
        addOutput({ content: {}, type: 'rich', metadata: { richType: 'neofetch' } } as TerminalLine);
        break;
      case 'skills':
        addOutput({ content: RESUME_DATA.skills, type: 'rich', metadata: { richType: 'tree' } } as TerminalLine);
        setFollowUp('ls projects');
        break;
      case 'ls':
        if (args[0]?.toLowerCase() === 'skills') addOutput({ content: RESUME_DATA.skills, type: 'rich', metadata: { richType: 'tree' } } as TerminalLine);
        else if (args[0]?.toLowerCase() === 'projects') addOutput({ content: RESUME_DATA.projects, type: 'rich', metadata: { richType: 'table' } } as TerminalLine);
        else addOutput({ content: 'usage: ls [skills|projects]', type: 'error' } as TerminalLine);
        break;
      case 'projects':
      case 'ps':
        addOutput({ content: RESUME_DATA.projects, type: 'rich', metadata: { richType: 'ps' } } as TerminalLine);
        setFollowUp('cat exp.log');
        break;
      case 'experience':
        addOutput({ content: RESUME_DATA.work, type: 'rich', metadata: { richType: 'changelog' } } as TerminalLine);
        break;
      case 'cat':
        if (args[0] === 'exp.log') addOutput({ content: RESUME_DATA.work, type: 'rich', metadata: { richType: 'changelog' } } as TerminalLine);
        else if (args[0] === 'resume.txt') addOutput({ content: RESUME_DATA.summary + "\n\n" + RESUME_DATA.about, type: 'response' } as TerminalLine);
        else addOutput({ content: 'file not found. try "ls" to see available files.', type: 'error' } as TerminalLine);
        break;
      case 'matrix':
        addOutput({ content: {}, type: 'rich', metadata: { richType: 'matrix' } } as TerminalLine);
        break;
      case 'cowsay':
        addOutput({ content: args.length > 0 ? args.join(' ') : 'Mooo!', type: 'rich', metadata: { richType: 'cowsay' } } as TerminalLine);
        break;
      case 'fortune':
        const quotes = ["Code is like humor. When you have to explain it, it’s bad.", "Simplicity is the soul of efficiency.", "Vibe coding is the future.", "Minimalism is not subtraction for the sake of subtraction."];
        addOutput({ content: quotes[Math.floor(Math.random() * quotes.length)], type: 'response' } as TerminalLine);
        break;
      case 'weather':
        addOutput({ content: `LOCATION: ${RESUME_DATA.location}\nSTATUS: VIBE_STORM_LEVEL_5\nTEMP: 22°C (IDEAL_FOR_CODING)`, type: 'response' } as TerminalLine);
        break;
      case 'sudo':
        addOutput({ content: 'nice try. user is not in the sudoers file. this incident will be reported.', type: 'error' } as TerminalLine);
        break;
      case 'contact':
        addOutput(RESUME_DATA.contact.social.map(s => ({ content: `${s.name.padEnd(10)}: ${s.url}`, type: 'response' })) as TerminalLine[]);
        break;
      case 'theme':
        toggleTheme();
        addOutput({ content: 'THEME_UPDATE: SUCCESS', type: 'system' } as TerminalLine);
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
          { content: `Type 'help' to see valid directives.`, type: 'system' }
        ] as TerminalLine[]);
    }
    setSuggestions([]);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
      setFollowUp(null);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = validCommands.filter(c => c.startsWith(input.toLowerCase()));
      if (matches.length > 0) setInput(matches[0]);
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => inputRef.current?.focus()}
      className={cn(
        "fixed inset-0 z-[1000] bg-[#000A13] text-emerald-400 font-mono flex flex-col p-4 md:p-8 overflow-hidden select-none transition-all duration-700",
        isIdle && "animate-crt-flicker brightness-75"
      )}
    >
      <div className="absolute inset-0 terminal-scanline pointer-events-none opacity-20" />
      <div className="absolute inset-0 crt-overlay pointer-events-none" />
      <div className="relative z-10 flex flex-col h-full max-w-5xl mx-auto w-full">
        <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar space-y-1 pb-4">
          <pre className="text-[8px] md:text-xs leading-none mb-8 text-[#FBBF2F] animate-pulse">
{`
 ██████   █████  ██████  ██ ███████ ██   ██     ██   ██ ██   ██  █████  ███    ██ 
 ██   ██ ██   ██ ██   ██ ██ ██      ██   ██     ██  ██  ██   ██ ██   ██ ████   ██ 
 ██████  ███████ ██████  ██ ███████ ███████     █████   ███████ ███████ ██ ██  ██ 
 ██      ██   ██ ██   ██ ██      ██ ██   ██     ██  ██  ██   ██ ██   ██ ██  ██ ██ 
 ██      ██   ██ ██   ██ ██ ███████ ██   ██     ██   ██ ██   ██ ██   ██ ██   ████ 
 PORTFOLIO_OS v2.2-STABLE // BUILD: 2024.Q4
`}
          </pre>
          <div aria-live="polite" className="space-y-1">
            {output.map((line, i) => (
              <div key={i} className={cn(
                "break-words whitespace-pre-wrap neon-glow-green",
                line.type === 'command' && "text-[#FBBF2F] drop-shadow-[0_0_3px_rgba(251,191,47,0.4)]",
                line.type === 'error' && "text-red-500 drop-shadow-none",
                line.type === 'system' && "text-emerald-600 font-bold",
                line.type === 'response' && "text-emerald-400"
              )}>
                {line.type === 'rich' ? (
                  <RichTerminalOutput
                    type={line.metadata?.richType}
                    data={line.content}
                  />
                ) : (
                  <span>{line.type === 'command' ? `parish@folio:~$ ` : ''}{line.content}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="relative mt-auto pt-4 border-t border-emerald-900/30">
          <TerminalAutocomplete onSelect={setInput} />
          <div className="flex items-center gap-2">
            <span className="text-[#FBBF2F] font-bold shrink-0">parish@folio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-emerald-400 caret-[#FBBF2F]"
              spellCheck={false}
              autoComplete="off"
              autoFocus
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}