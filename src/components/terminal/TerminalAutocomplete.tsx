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
  const isContactBase = suggestions.length === 1 && suggestions[0] === 'contact';
  const chips = isContactBase 
    ? ['contact --mail', 'contact --call', 'contact --whatsapp']
    : suggestions.length > 0 
      ? suggestions 
      : followUp 
        ? [followUp] 
        : [];
  return (
    <AnimatePresence>
      {chips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="absolute bottom-full left-0 mb-4 flex flex-wrap gap-2 z-40 w-full"
        >
          {chips.map((cmd) => (
            <button
              key={cmd}
              onClick={() => onSelect(cmd)}
              className={cn(
                "px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 border border-slate-600/60",
                "bg-slate-900/60 text-slate-200 shadow-md hover:bg-slate-800/70 hover:shadow-lg hover:scale-105 active:scale-95"
              )}
            >
              {cmd}
            </button>
          ))}
          <div className="flex items-center ml-auto px-2 text-xs opacity-60 uppercase tracking-tighter">
            [TAB] AUTOCOMPLETE
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}