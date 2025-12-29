import React from 'react';
import { RESUME_DATA } from '@/data/resume-data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
export function ExperienceTimeline() {
  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
      {RESUME_DATA.work.map((work, idx) => {
        const isActive = idx === 0;
        return (
          <div key={`${work.company}-${idx}`} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            {/* Dot Indicator */}
            <div className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full border border-background shadow shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all duration-300",
              isActive 
                ? "bg-emerald-500 text-emerald-50 ring-4 ring-emerald-500/20" 
                : "bg-muted text-foreground"
            )}>
              <span className="text-xs font-mono font-bold">{work.logo}</span>
            </div>
            {/* Content Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl border bg-card/50 backdrop-blur-sm hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <div className="font-bold text-lg text-foreground tracking-tight">
                  {work.link && work.link !== '#' ? (
                    <a href={work.link} className="hover:text-emerald-500 transition-colors" target="_blank" rel="noopener noreferrer">
                      {work.company}
                    </a>
                  ) : (
                    <span>{work.company}</span>
                  )}
                </div>
                <time className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-secondary text-emerald-600 dark:text-emerald-400">
                  {work.start} - {work.end}
                </time>
              </div>
              <div className="text-sm font-mono text-muted-foreground/80 mb-3">{work.title}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {work.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {work.badges.map(badge => (
                  <Badge key={badge} variant="secondary" className="text-[10px] font-mono py-0 px-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}