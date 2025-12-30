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
                "px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 border border-[var(--terminal-border)]",
                "bg-[var(--terminal-prompt)] text-black shadow-lg hover:scale-105 active:scale-95"
              )}
            >
              {cmd}
            </button>
          ))}
          <div className="flex items-center ml-auto px-2 text-[10px] opacity-40 uppercase tracking-tighter">
            [TAB] AUTOCOMPLETE
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}