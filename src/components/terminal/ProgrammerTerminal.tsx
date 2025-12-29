import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTerminalStore } from '@/store/use-terminal-store';
import { RESUME_DATA } from '@/data/resume-data';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import { RichTerminalOutput } from './RichTerminalOutput';
import { TerminalAutocomplete } from './TerminalAutocomplete';
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
  const [lastCommandError, setLastCommandError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sessionId = useRef(`SESSION_${Math.random().toString(36).substring(7).toUpperCase()}`);
  const playPing = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.05);
    } catch (e) { /* Audio blocked */ }
  };
  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() - lastActivity > 45000) setIsIdle(true);
      else setIsIdle(false);
    }, 1000);
    return () => clearInterval(timer);
  }, [lastActivity]);
  useEffect(() => {
    if (isTerminalMode && inputRef.current) {
      inputRef.current.focus();
    }
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
    setLastCommandError(false);
    addOutput({ content: trimmed, type: 'command' });
    const parts = trimmed.split(/\s+/);
    const baseCmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    switch (baseCmd) {
      case 'help':
        addOutput([
          { content: 'AVAILABLE DIRECTIVES:', type: 'system' },
          { content: '  whoami, neofetch, skills, projects, experience, contact', type: 'response' },
          { content: '  ls, cat [file], echo [text], history, cd [dir]', type: 'response' },
          { content: '  matrix, cowsay [text], fortune, weather, theme, clear, exit', type: 'response' },
        ]);
        break;
      case 'ls':
        if (!args.length) {
          addOutput({ content: 'drwxr-xr-x  projects/\ndrwxr-xr-x  skills/\n-rw-r--r--  exp.log\n-rw-r--r--  resume.txt', type: 'response' });
        } else if (args[0] === 'skills') {
          addOutput({ content: RESUME_DATA.skills, type: 'rich', metadata: { richType: 'tree' } });
        } else if (args[0] === 'projects') {
          addOutput({ content: RESUME_DATA.projects, type: 'rich', metadata: { richType: 'table' } });
        } else {
          addOutput({ content: `ls: ${args[0]}: No such file or directory`, type: 'error' });
          setLastCommandError(true);
        }
        break;
      case 'cd':
        if (!args.length || args[0] === '~' || args[0] === '/') {
          addOutput({ content: 'Moved to root directory: /home/parish', type: 'system' });
        } else if (['projects', 'skills'].includes(args[0].replace('/', ''))) {
          addOutput({ content: `Switched to directory: ${args[0]}`, type: 'system' });
          addOutput({ content: `Hint: try 'ls' to view contents of ${args[0]}`, type: 'system' });
        } else {
          addOutput({ content: `cd: no such directory: ${args[0]}`, type: 'error' });
          setLastCommandError(true);
        }
        break;
      case 'echo':
        addOutput({ content: args.join(' '), type: 'response' });
        break;
      case 'history':
        addOutput(history.slice().reverse().map((h, i) => ({ content: ` ${i + 1}  ${h}`, type: 'response' })));
        break;
      case 'sudo':
        addOutput({ content: 'Attempting to gain root privileges...', type: 'system' });
        setTimeout(() => {
          addOutput({ content: 'user is not in the sudoers file. This incident will be reported.', type: 'error' });
          setLastCommandError(true);
        }, 500);
        break;
      case 'whoami':
        addOutput({ content: `${RESUME_DATA.formalName}\n${RESUME_DATA.summary}`, type: 'response' });
        break;
      case 'neofetch':
        addOutput({ content: {}, type: 'rich', metadata: { richType: 'neofetch' } });
        break;
      case 'skills':
        addOutput({ content: RESUME_DATA.skills, type: 'rich', metadata: { richType: 'tree' } });
        break;
      case 'projects':
      case 'ps':
        addOutput({ content: RESUME_DATA.projects, type: 'rich', metadata: { richType: 'ps' } });
        break;
      case 'experience':
        addOutput({ content: RESUME_DATA.work, type: 'rich', metadata: { richType: 'changelog' } });
        break;
      case 'cat':
        if (!args.length) {
          addOutput({ content: 'usage: cat [filename]', type: 'system' });
        } else if (args[0] === 'exp.log') {
          addOutput({ content: RESUME_DATA.work, type: 'rich', metadata: { richType: 'changelog' } });
        } else if (args[0] === 'resume.txt') {
          addOutput({ content: `${RESUME_DATA.summary}\n\n${RESUME_DATA.about}`, type: 'response' });
        } else {
          addOutput({ content: `cat: ${args[0]}: No such file or directory`, type: 'error' });
          setLastCommandError(true);
        }
        break;
      case 'matrix':
        addOutput({ content: {}, type: 'rich', metadata: { richType: 'matrix' } });
        break;
      case 'cowsay':
        addOutput({ content: args.length > 0 ? args.join(' ') : 'Mooo!', type: 'rich', metadata: { richType: 'cowsay' } });
        break;
      case 'fortune': {
        const quotes = [
          "Code is like humor. When you have to explain it, it’s bad.",
          "Simplicity is the soul of efficiency.",
          "Minimalism is not subtraction for the sake of subtraction.",
          "Talk is cheap. Show me the code."
        ];
        addOutput({ content: quotes[Math.floor(Math.random() * quotes.length)], type: 'response' });
        break;
      }
      case 'weather':
        addOutput({ content: `LOCATION: ${RESUME_DATA.location}\nSTATUS: IDEAL_FOR_CODING\nTEMP: 24°C`, type: 'response' });
        break;
      case 'contact':
        addOutput(RESUME_DATA.contact.social.map(s => ({ content: `${s.name.padEnd(12)}: ${s.url}`, type: 'response' })));
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
        setLastCommandError(true);
        addOutput([
          { content: `zsh: command not found: ${baseCmd}`, type: 'error' },
          { content: "Type 'help' for valid directives.", type: 'system' }
        ]);
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
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={() => inputRef.current?.focus()}
      className={cn(
        "fixed inset-0 z-[1000] bg-[#000A13] text-emerald-400 font-mono flex flex-col overflow-hidden select-none overscroll-none",
        isIdle && "animate-crt-flicker brightness-75",
        lastCommandError && "animate-terminal-glitch"
      )}
    >
      <div className="absolute inset-0 terminal-scanline pointer-events-none opacity-20" />
      <div className="absolute inset-0 crt-overlay pointer-events-none" />
      <div className="relative z-20 flex items-center justify-between px-4 py-2 bg-emerald-950/20 border-b border-emerald-900/30 text-[10px] uppercase tracking-widest text-emerald-600/60 font-bold">
        <div className="flex items-center gap-4">
          <span>PARISH_OS v2.2.0</span>
          <span className="hidden md:inline">NODE_READY</span>
          <span className="text-emerald-500/40">{sessionId.current}</span>
        </div>
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
        </div>
      </div>
      <div className="relative z-10 flex flex-col h-full max-w-5xl mx-auto w-full px-4 md:px-8">
        <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar pt-6 pb-24 space-y-0.5">
          <pre className="text-terminal-ascii leading-none mb-10 text-[#FBBF2F] neon-glow-amber opacity-90 overflow-x-auto pb-2">
{`
 ██████   █████  ██████  ██ ███████ ██   ██     ██   ██ ██   ██  █████  ███    ██
 ██   ██ ██   ██ ██   ██ ██ ██      ██   ██     ██  ██  ██   ██ ██   ██ ████   ██
 ██████  ███████ ██████  ██ ███████ ███████     █████   ███████ ███████ ██ ██  ██
 ██      ██   ██ ██   ██ ██      ██ ██   ██     ██  ██  ██   ██ ██   ██ ██  ██ ██
 ██      ██   ██ ██   ██ ██ ███████ ██   ██     ██   ██ ██   ██ ██   ██ ██   ████
`}
          </pre>
          <div aria-live="polite" className="space-y-0.5">
            {output.map((line, i) => (
              <div key={i} className={cn(
                "terminal-line break-words whitespace-pre-wrap transition-opacity duration-300",
                line.type === 'command' ? "text-[#FBBF2F] neon-glow-amber text-terminal-prompt font-bold" : "text-terminal-output",
                line.type === 'error' && "text-red-500 neon-glow-none border-red-900/20",
                line.type === 'system' && "text-emerald-600/80 italic",
                line.type === 'response' && "text-emerald-400/90"
              )}>
                {line.type === 'rich' ? (
                  <RichTerminalOutput type={line.metadata?.richType} data={line.content} />
                ) : (
                  <span>
                    {line.type === 'command' ? (
                      <span className="mr-2 select-none opacity-70">parish@folio:~$</span>
                    ) : null}
                    {line.content}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-[#000A13]/90 backdrop-blur-md border-t border-emerald-900/30 p-4 md:p-6 z-30">
          <div className="max-w-5xl mx-auto relative">
            <TerminalAutocomplete onSelect={setInput} />
            <div className="flex items-center gap-3">
              <span className="text-[#FBBF2F] font-bold text-terminal-prompt neon-glow-amber shrink-0 select-none">
                parish@folio:~$
              </span>
              <div className="relative flex-1 flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none outline-none text-emerald-400 caret-transparent text-terminal-prompt"
                  spellCheck={false}
                  autoComplete="off"
                />
                <div
                  className="absolute pointer-events-none w-[3px] h-[1.4em] bg-[#FBBF2F] animate-blink neon-glow-amber ml-0.5"
                  style={{ left: `${input.length}ch` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}