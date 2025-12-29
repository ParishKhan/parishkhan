import React from 'react';
import { useTerminalStore } from '@/store/use-terminal-store';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
interface TerminalAutocompleteProps {
  onSelect: (val: string) => void;
}
export function TerminalAutocomplete({ onSelect }: TerminalAutocompleteProps) {
  const suggestions = useTerminalStore((s) => s.suggestions);
  const followUp = useTerminalStore((s) => s.suggestedFollowUp);
  return (
    <AnimatePresence>
      {(suggestions.length > 0 || followUp) && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="absolute bottom-full left-0 mb-4 flex flex-col gap-2 z-40 w-full max-w-lg"
        >
          {followUp && suggestions.length === 0 && (
            <div className="flex items-center gap-3 px-4 py-2 bg-emerald-950/40 backdrop-blur-md border border-[#FBBF2F]/20 rounded-lg shadow-xl animate-pulse group cursor-pointer"
                 onClick={() => onSelect(followUp)}>
              <span className="text-[10px] text-[#FBBF2F]/50 uppercase font-black tracking-widest">NEXT_SUGGESTION</span>
              <button className="text-xs text-[#FBBF2F] font-bold group-hover:underline flex items-center gap-1">
                {followUp}
                <span className="text-[8px] opacity-40">[TAB]</span>
              </button>
            </div>
          )}
          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 bg-[#000A13]/90 border border-emerald-900/40 rounded-xl shadow-2xl backdrop-blur-xl">
              {suggestions.map((cmd, i) => (
                <button
                  key={cmd}
                  onClick={() => onSelect(cmd)}
                  className={cn(
                    "px-3 py-1.5 text-xs rounded-md transition-all duration-200 border",
                    i === 0
                      ? "bg-[#FBBF2F] text-black font-black border-[#FBBF2F] shadow-[0_0_12px_rgba(251,191,47,0.3)] scale-105"
                      : "text-emerald-500/60 hover:text-emerald-300 hover:bg-emerald-900/40 border-transparent hover:border-emerald-900/60"
                  )}
                >
                  {cmd}
                </button>
              ))}
              <div className="flex items-center ml-auto px-2 text-[9px] text-emerald-900 font-bold uppercase tracking-tighter opacity-60">
                [TAB] Select
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}