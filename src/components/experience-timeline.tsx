import React from 'react';
import { RESUME_DATA } from '@/data/resume-data';
import { Badge } from '@/components/ui/badge';
export function ExperienceTimeline() {
  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
      {RESUME_DATA.work.map((work, idx) => (
        <div key={`${work.company}-${idx}`} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          {/* Dot */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-background bg-muted group-[.is-active]:bg-emerald-500 text-muted-foreground group-[.is-active]:text-emerald-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
            <span className="text-xs font-mono">{work.logo}</span>
          </div>
          {/* Content */}
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-card/50 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300">
            <div className="flex items-center justify-between space-x-2 mb-1">
              <div className="font-bold text-foreground">
                {work.link && work.link !== '#' ? (
                  <a href={work.link} className="hover:underline hover:text-emerald-500 transition-colors" target="_blank" rel="noopener noreferrer">
                    {work.company}
                  </a>
                ) : (
                  <span>{work.company}</span>
                )}
              </div>
              <time className="font-mono text-xs text-emerald-500">
                {work.start} - {work.end}
              </time>
            </div>
            <div className="text-sm font-mono text-muted-foreground mb-3">{work.title}</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {work.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {work.badges.map(badge => (
                <Badge key={badge} variant="secondary" className="text-[10px] font-mono py-0 px-2">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}