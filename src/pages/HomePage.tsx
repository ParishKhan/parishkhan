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
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-5 dark:opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>
      <main className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="py-12 md:py-24 space-y-24">
          {/* HERO */}
          <HeroSection />
          {/* SKILLS */}
          <section id="skills" className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <SectionHeading title="skills.json" subtitle="Curated technical toolkit and methodologies." />
            <SkillsCloud />
          </section>
          {/* EXPERIENCE */}
          <section id="experience" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <SectionHeading title="professional_history.log" subtitle="Engineering impact and career milestones." />
            <div className="mt-12">
              <ExperienceTimeline />
            </div>
          </section>
          {/* PROJECTS */}
          <section id="projects" className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <SectionHeading title="active_projects.dir" subtitle="Production platforms and side initiatives." />
            <ProjectGrid />
          </section>
          {/* FOOTER */}
          <footer className="pt-24 pb-12 text-center text-muted-foreground border-t border-muted/30">
            <p className="text-xs font-mono uppercase tracking-widest opacity-60">
              Designed & Built by Parish Khan © {new Date().getFullYear()}
            </p>
            <div className="mt-2 text-[10px] font-mono text-emerald-500/50">
              BUILD_SUCCESS: v1.1.0-stable
            </div>
          </footer>
        </div>
      </main>
      <Toaster richColors position="bottom-right" />
    </div>
  );
}