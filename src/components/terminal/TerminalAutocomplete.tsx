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
                "px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 border",
                "bg-zinc-800 border-zinc-700 text-zinc-100 shadow-md",
                "hover:bg-zinc-700 hover:border-emerald-500/50 hover:shadow-lg hover:scale-105 active:scale-95",
                "dark:bg-zinc-900 dark:border-zinc-800 dark:text-emerald-400"
              )}
            >
              {cmd}
            </button>
          ))}
          <motion.div 
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 0.6, x: 0 }}
            className="flex items-center ml-auto px-2 text-[10px] uppercase tracking-tighter font-mono"
          >
            [TAB] AUTOCOMPLETE
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}