import { create } from 'zustand';
export type TerminalLineType = 'command' | 'response' | 'error' | 'system';
export interface TerminalLine {
  content: string;
  type: TerminalLineType;
}
interface TerminalState {
  isTerminalMode: boolean;
  output: TerminalLine[];
  history: string[];
  historyIndex: number;
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
  output: [
    { content: "PARISH_OS v1.1.0-stable (built on React/TS)", type: 'system' },
    { content: "Welcome, user. Type 'help' to see available commands.", type: 'system' },
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