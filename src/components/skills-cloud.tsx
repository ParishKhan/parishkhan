import React from 'react';
import { RESUME_DATA } from '@/data/resume-data';
import { Badge } from '@/components/ui/badge';
export function SkillsCloud() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {Object.entries(RESUME_DATA.skills).map(([category, skills]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground/50 border-b border-muted pb-2">
            {category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className="font-mono text-xs py-1 px-3 hover:bg-emerald-500 hover:text-white transition-all cursor-default"
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