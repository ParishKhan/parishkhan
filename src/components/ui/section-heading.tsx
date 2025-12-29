import React from 'react';
import { cn } from "@/lib/utils";
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}
export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("space-y-2 mb-8", className)}>
      <h2 className="text-xl font-mono font-bold flex items-center gap-2">
        <span className="text-emerald-500 opacity-70">//</span>
        <span className="tracking-tight text-foreground">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-sm font-sans pl-6 border-l border-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}