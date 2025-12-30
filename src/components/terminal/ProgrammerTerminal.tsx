import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTerminalStore } from '@/store/use-terminal-store';
import { RESUME_DATA } from '@/data/resume-data';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import { RichTerminalOutput } from './RichTerminalOutput';
import { TerminalAutocomplete } from './TerminalAutocomplete';
import { TerminalLine, TerminalLineType } from '@/store/use-terminal-store';
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
  const setSuggestions = useTerminalStore((s) => s.setSuggestions);
  const setFollowUp = useTerminalStore((s) => s.setFollowUp);
  const updateActivity = useTerminalStore((s) => s.updateActivity);
  const { isDark, toggleTheme } = useTheme();
  const [input, setInput] = useState('');
  const [lastCommandError, setLastCommandError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionId = useRef(`SESSION_${Math.random().toString(36).substring(7).toUpperCase()}`);
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
    updateActivity();
    addToHistory(cmd);
    setLastCommandError(false);
    addOutput({ content: trimmed, type: 'command' as TerminalLineType });
    const parts = trimmed.split(/\s+/);
    const baseCmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    switch (baseCmd) {
      case 'help':
        addOutput([
          { content: 'AVAILABLE DIRECTIVES:', type: 'system' as TerminalLineType },
          { content: '  whoami, neofetch, skills, projects, experience, contact', type: 'response' as TerminalLineType },
          { content: '  ls, cat [file], echo [text], history, matrix, cowsay, theme, clear, exit', type: 'response' as TerminalLineType },
        ]);
        break;
      case 'theme': {
        toggleTheme();
        const newTheme = !isDark ? 'dark' : 'light';
        addOutput({ content: `Theme switched to ${newTheme}`, type: 'system' as TerminalLineType });
        break;
      }
      case 'contact': {
        if (args.includes('--call')) {
          window.open(`tel:${RESUME_DATA.contact.phone}`);
          addOutput({ content: 'Initiating call request...', type: 'system' as TerminalLineType });
        } else if (args.includes('--mail')) {
          window.location.href = `mailto:${RESUME_DATA.contact.email}`;
          addOutput({ content: 'Opening mail client...', type: 'system' as TerminalLineType });
        } else if (args.includes('--whatsapp')) {
          const waUrl = RESUME_DATA.contact.social.find(s => s.name === "WhatsApp")?.url;
          if (waUrl) window.open(waUrl);
          addOutput({ content: 'Redirecting to WhatsApp...', type: 'system' as TerminalLineType });
        } else {
          addOutput([
            { content: 'CONTACT CHANNELS:', type: 'system' as TerminalLineType },
            ...RESUME_DATA.contact.social.map(s => ({ content: `${s.name.padEnd(12)}: ${s.url}`, type: 'response' as TerminalLineType })),
            { content: `Phone: ${RESUME_DATA.contact.phone}`, type: 'response' as TerminalLineType },
            { content: `Email: ${RESUME_DATA.contact.email}`, type: 'response' as TerminalLineType },
            { content: 'Try: contact --call | --mail | --whatsapp', type: 'system' as TerminalLineType }
          ]);
          setFollowUp('contact --mail');
        }
        break;
      }
      case 'whoami':
        addOutput({ content: `${RESUME_DATA.formalName}\n${RESUME_DATA.summary}`, type: 'response' as TerminalLineType });
        break;
      case 'neofetch':
        addOutput({ content: {}, type: 'rich' as TerminalLineType, metadata: { richType: 'neofetch' } });
        break;
      case 'skills':
        addOutput({ content: RESUME_DATA.skills, type: 'rich' as TerminalLineType, metadata: { richType: 'tree' } });
        break;
      case 'projects':
      case 'ps':
        addOutput({ content: RESUME_DATA.projects, type: 'rich' as TerminalLineType, metadata: { richType: 'ps' } });
        break;
      case 'experience':
        addOutput({ content: RESUME_DATA.work, type: 'rich' as TerminalLineType, metadata: { richType: 'changelog' } });
        break;
      case 'ls':
        addOutput({ content: 'drwxr-xr-x projects/\ndrwxr-xr-x skills/\n-rw-r--r-- exp.log\n-rw-r--r-- resume.txt', type: 'response' as TerminalLineType });
        break;
      case 'cat': {
        const file = args[0]?.toLowerCase();
        if (file === 'resume.txt') {
          addOutput({ content: `NAME: ${RESUME_DATA.formalName}\nSUMMARY: ${RESUME_DATA.about}`, type: 'response' as TerminalLineType });
        } else if (file === 'exp.log') {
          const log = RESUME_DATA.work.map(w => `${w.start}-${w.end}: ${w.company} - ${w.title}`).join('\n');
          addOutput({ content: log, type: 'response' as TerminalLineType });
        } else {
          addOutput({ content: `cat: ${file || 'null'}: No such file or directory`, type: 'error' as TerminalLineType });
        }
        break;
      }
      case 'echo':
        addOutput({ content: args.join(' ') || '\n', type: 'response' as TerminalLineType });
        break;
      case 'history': {
        const historyList = [...history].reverse().map((h, i) => `${i + 1}  ${h}`).join('\n');
        addOutput({ content: historyList, type: 'response' as TerminalLineType });
        break;
      }
      case 'matrix':
        addOutput({ content: {}, type: 'rich' as TerminalLineType, metadata: { richType: 'matrix' } });
        break;
      case 'cowsay':
        addOutput({ content: args.join(' ') || 'Moo!', type: 'rich' as TerminalLineType, metadata: { richType: 'cowsay' } });
        break;
      case 'clear':
        clearOutput();
        break;
      case 'exit':
        toggleTerminal();
        break;
      default:
        setLastCommandError(true);
        addOutput({ content: `zsh: command not found: ${baseCmd}`, type: 'error' as TerminalLineType });
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
        "fixed inset-0 z-[1000] bg-[var(--terminal-bg)] text-[var(--terminal-text)] font-mono flex flex-col overflow-hidden font-bold text-sm leading-tight",
        lastCommandError && "animate-terminal-glitch"
      )}
    >
      <div className="absolute inset-0 terminal-scanline pointer-events-none opacity-10" />
      <div className="absolute inset-0 crt-overlay pointer-events-none" />
      <div className="relative z-20 flex items-center justify-between px-4 py-2 border-b border-[var(--terminal-border)] text-[10px] uppercase tracking-widest opacity-60">
        <div className="flex items-center gap-4">
          <span>DEV_OS v2.2.0</span>
          <span>{sessionId.current}</span>
        </div>
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/40" />
        </div>
      </div>
      <div className="relative z-10 flex flex-col h-full max-w-5xl mx-auto w-full px-4 md:px-8">
        <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar pt-6 pb-24 space-y-1">
          {output.map((line, i) => (
            <div key={i} className={cn(
              "terminal-line break-words whitespace-pre-wrap",
              line.type === 'command' ? "text-[var(--terminal-prompt)]" : "text-[var(--terminal-text)]",
              line.type === 'error' && "text-[var(--terminal-error)]",
              line.type === 'system' && "opacity-70"
            )}>
              {line.type === 'rich' ? (
                <RichTerminalOutput type={line.metadata?.richType} data={line.content} />
              ) : (
                <span>
                  {line.type === 'command' && <span className="mr-2 opacity-50 neon-glow-terminal">dev@folio:~$</span>}
                  {line.content}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-[var(--terminal-bg)]/90 backdrop-blur-md border-t border-[var(--terminal-border)] p-4 md:p-6 z-30">
          <div className="max-w-5xl mx-auto relative">
            <TerminalAutocomplete onSelect={setInput} />
            <div className="flex items-center gap-3">
              <span className="text-[var(--terminal-prompt)] neon-glow-terminal shrink-0 select-none">
                dev@folio:~$
              </span>
              <div className="relative flex-1 flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none outline-none text-[var(--terminal-text)] caret-transparent"
                  spellCheck={false}
                  autoComplete="off"
                />
                <div
                  className="absolute pointer-events-none w-[10px] h-[1.2em] bg-[var(--terminal-prompt)] animate-blink ml-0.5"
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