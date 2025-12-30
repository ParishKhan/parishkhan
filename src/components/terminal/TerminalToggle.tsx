import React from 'react';
import { Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTerminalStore } from '@/store/use-terminal-store';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
export function TerminalToggle() {
  const toggleTerminal = useTerminalStore((s) => s.toggleTerminal);
  const isTerminalMode = useTerminalStore((s) => s.isTerminalMode);
  if (isTerminalMode) return null;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={toggleTerminal}
            variant="ghost"
            size="icon"
            className="fixed top-6 right-20 hover:scale-110 transition-all duration-200 z-[100] bg-background/50 backdrop-blur-sm border border-border/50 rounded-full shadow-sm hover:text-amber-400 hover:border-amber-400/30"
            aria-label="Enter Programmer Mode"
          >
            <Terminal className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="font-mono text-[10px]">
          Programmer Mode (~)
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}