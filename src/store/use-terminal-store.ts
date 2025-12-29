import { create } from 'zustand';
export type TerminalLineType = 'command' | 'response' | 'error' | 'system' | 'rich';
export interface TerminalLine {
  content: any;
  type: TerminalLineType;
  metadata?: {
    richType?: 'tree' | 'table' | 'neofetch' | 'changelog';
    animate?: boolean;
  };
}
interface TerminalState {
  isTerminalMode: boolean;
  output: TerminalLine[];
  history: string[];
  historyIndex: number;
  validCommands: string[];
}
interface TerminalActions {
  toggleTerminal: () => void;
  setTerminalMode: (mode: boolean) => void;
  addOutput: (lines: TerminalLine | TerminalLine[]) => void;
  clearOutput: () => void;
  addToHistory: (command: string) => void;
  setHistoryIndex: (index: number) => void;
}
export const useTerminalStore = create<TerminalState & TerminalActions>((set) => ({
  isTerminalMode: false,
  validCommands: [
    'about', 'skills', 'experience', 'projects', 'contact', 
    'theme', 'clear', 'exit', 'whoami', 'neofetch', 
    'help', 'ls', 'cat', 'cd', 'echo', 'history'
  ],
  output: [
    { content: "PARISH_OS [v2.1.0-STABLE]", type: 'system' },
    { content: "SYSTEM_CHECK: 100% OK", type: 'system' },
    { content: "INITIALIZING ENVIRONMENT...", type: 'system' },
    { content: "Type 'help' to begin session.", type: 'system' },
    { content: "------------------------------------------------", type: 'system' },
  ],
  history: [],
  historyIndex: -1,
  toggleTerminal: () => set((state) => ({ isTerminalMode: !state.isTerminalMode })),
  setTerminalMode: (mode) => set({ isTerminalMode: mode }),
  addOutput: (lines) => set((state) => ({
    output: [...state.output, ...(Array.isArray(lines) ? lines : [lines])]
  })),
  clearOutput: () => set({ output: [] }),
  addToHistory: (command) => set((state) => ({
    history: [command, ...state.history].slice(0, 50),
    historyIndex: -1
  })),
  setHistoryIndex: (index) => set({ historyIndex: index }),
}));