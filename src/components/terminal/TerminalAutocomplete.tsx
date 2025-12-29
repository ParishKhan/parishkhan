import React from 'react';
import { useTerminalStore } from '@/store/use-terminal-store';
import { cn } from '@/lib/utils';
interface TerminalAutocompleteProps {
  onSelect: (val: string) => void;
}
export function TerminalAutocomplete({ onSelect }: TerminalAutocompleteProps) {
  const suggestions = useTerminalStore((s) => s.suggestions);
  const followUp = useTerminalStore((s) => s.suggestedFollowUp);
  if (suggestions.length === 0 && !followUp) return null;
  return (
    <div className="absolute bottom-full left-0 mb-2 flex flex-col gap-1 z-20">
      {followUp && suggestions.length === 0 && (
        <div className="flex items-center gap-2 px-3 py-1 bg-[#FBBF2F]/10 border border-[#FBBF2F]/30 rounded-md animate-pulse">
          <span className="text-[10px] text-[#FBBF2F]/60 uppercase font-bold tracking-tighter">SUGGESTED NEXT:</span>
          <button 
            onClick={() => onSelect(followUp)}
            className="text-xs text-[#FBBF2F] font-bold hover:underline"
          >
            {followUp}
          </button>
        </div>
      )}
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2 bg-[#000A13] border border-emerald-900/50 rounded-md shadow-2xl backdrop-blur-xl">
          {suggestions.map((cmd, i) => (
            <button
              key={cmd}
              onClick={() => onSelect(cmd)}
              className={cn(
                "px-2 py-0.5 text-xs rounded transition-colors",
                i === 0 
                  ? "bg-[#FBBF2F] text-black font-bold" 
                  : "text-emerald-500/60 hover:text-emerald-400 hover:bg-emerald-900/20"
              )}
            >
              {cmd}
            </button>
          ))}
          <span className="text-[9px] text-emerald-900 self-center ml-2">[TAB] to complete</span>
        </div>
      )}
    </div>
  );
}