import React from 'react';
import { RESUME_DATA } from '@/data/resume-data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
export function SkillsCloud() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {Object.entries(RESUME_DATA.skills).map(([category, skills]) => (
        <div key={category} className="space-y-4">
          <h3 className={cn(
            "text-xs font-mono uppercase tracking-widest border-b border-muted pb-2",
            category === 'ai' ? "text-emerald-500 font-bold" : "text-muted-foreground/50"
          )}>
            {category === 'ai' ? "AI / VIBE CODING" : category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="font-mono text-xs py-1 px-3 hover:bg-emerald-500 hover:text-white transition-all cursor-default border border-transparent hover:border-emerald-400"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}