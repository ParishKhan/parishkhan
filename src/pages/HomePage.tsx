import React from 'react';
import { HeroSection } from '@/components/hero-section';
import { ExperienceTimeline } from '@/components/experience-timeline';
import { ProjectGrid } from '@/components/project-grid';
import { SkillsCloud } from '@/components/skills-cloud';
import { SectionHeading } from '@/components/ui/section-heading';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Toaster } from '@/components/ui/sonner';
export function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/30">
      <ThemeToggle />
      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10 dark:opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>
      <main className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="py-12 md:py-24 space-y-24">
          {/* HERO */}
          <HeroSection />
          {/* SKILLS */}
          <section id="skills">
            <SectionHeading title="skills.json" subtitle="A breakdown of my technical toolkit." />
            <SkillsCloud />
          </section>
          {/* EXPERIENCE */}
          <section id="experience">
            <SectionHeading title="professional_history.log" subtitle="Where I've applied my skills professionally." />
            <div className="mt-12">
              <ExperienceTimeline />
            </div>
          </section>
          {/* PROJECTS */}
          <section id="projects">
            <SectionHeading title="active_projects.dir" subtitle="A selection of things I've built." />
            <ProjectGrid />
          </section>
          {/* FOOTER */}
          <footer className="pt-24 pb-12 text-center text-muted-foreground border-t border-muted">
            <p className="text-xs font-mono">
              Designed & Built by Parish © {new Date().getFullYear()} • 
              <span className="text-emerald-500 ml-1">v1.0.4-stable</span>
            </p>
          </footer>
        </div>
      </main>
      <Toaster richColors position="bottom-right" />
    </div>
  );
}