import React from 'react';
import { RESUME_DATA } from '@/data/resume-data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
export function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {RESUME_DATA.projects.map((project) => (
        <Card key={project.title} className="flex flex-col h-full bg-card/50 border-border hover:border-emerald-500/30 transition-all duration-300 group">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-lg font-bold group-hover:text-emerald-500 transition-colors">
                {project.title}
              </CardTitle>
              <a 
                href={project.link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <CardDescription className="text-xs font-mono text-emerald-500/80">
              {project.link.label}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-1.5 pt-0">
            {project.techStack.map((tech) => (
              <Badge 
                key={tech} 
                variant="outline" 
                className="text-[10px] font-mono py-0 px-2 bg-secondary/30"
              >
                {tech}
              </Badge>
            ))}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}