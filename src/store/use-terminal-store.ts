import { create } from 'zustand';
export type TerminalLineType = 'command' | 'response' | 'error' | 'system' | 'rich';
export interface TerminalLine {
  content: any;
  type: TerminalLineType;
  metadata?: {
    richType?: 'tree' | 'table' | 'neofetch' | 'changelog' | 'matrix' | 'cowsay' | 'ps';
    animate?: boolean;
  };
}
interface TerminalState {
  isTerminalMode: boolean;
  output: TerminalLine[];
  history: string[];
  historyIndex: number;
  validCommands: string[];
  suggestions: string[];
  suggestedFollowUp: string | null;
  lastActivity: number;
}
interface TerminalActions {
  toggleTerminal: () => void;
  setTerminalMode: (mode: boolean) => void;
  addOutput: (lines: TerminalLine | TerminalLine[]) => void;
  clearOutput: () => void;
  addToHistory: (command: string) => void;
  setHistoryIndex: (index: number) => void;
  setSuggestions: (suggestions: string[]) => void;
  setFollowUp: (followUp: string | null) => void;
  updateActivity: () => void;
}
export const useTerminalStore = create<TerminalState & TerminalActions>((set) => ({
  isTerminalMode: false,
  validCommands: [
    'about', 'skills', 'experience', 'projects', 'contact',
    'theme', 'clear', 'exit', 'whoami', 'neofetch',
    'help', 'ls', 'cat', 'history', 'ps'
  ],
  output: [
    { content: "PARISH_OS [v2.2.0-LTS] LOADED", type: 'system' },
    { content: "Try 'help' for commands or use suggestion chips below.", type: 'system' },
    { content: "------------------------------------------------", type: 'system' },
  ],
  history: [],
  historyIndex: -1,
  suggestions: [],
  suggestedFollowUp: null,
  lastActivity: Date.now(),
  toggleTerminal: () => set((state) => ({
    isTerminalMode: !state.isTerminalMode,
    lastActivity: Date.now()
  })),
  setTerminalMode: (mode) => set({ isTerminalMode: mode, lastActivity: Date.now() }),
  addOutput: (lines) => set((state) => ({
    output: [...state.output, ...(Array.isArray(lines) ? lines : [lines])],
    lastActivity: Date.now()
  })),
  clearOutput: () => set({ output: [] }),
  addToHistory: (command) => set((state) => ({
    history: [command, ...state.history].slice(0, 50),
    historyIndex: -1,
    lastActivity: Date.now()
  })),
  setHistoryIndex: (index) => set({ historyIndex: index }),
  setSuggestions: (suggestions) => set({ suggestions }),
  setFollowUp: (suggestedFollowUp) => set({ suggestedFollowUp }),
  updateActivity: () => set({ lastActivity: Date.now() }),
}));