import React, { useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { AnimatePresence } from 'framer-motion';
import { HeroSection } from '@/components/hero-section';
import { ExperienceTimeline } from '@/components/experience-timeline';
import { ProjectGrid } from '@/components/project-grid';
import { SkillsCloud } from '@/components/skills-cloud';
import { SectionHeading } from '@/components/ui/section-heading';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Navigation } from '@/components/ui/navigation';
import { Toaster } from '@/components/ui/sonner';
import { ProgrammerTerminal } from '@/components/terminal/ProgrammerTerminal';
import { TerminalToggle } from '@/components/terminal/TerminalToggle';
import { useTerminalStore } from '@/store/use-terminal-store';
export function HomePage() {
  const isTerminalMode = useTerminalStore((s) => s.isTerminalMode);
  const toggleTerminal = useTerminalStore((s) => s.toggleTerminal);
  useHotkeys('~, `, ctrl+p', (e) => {
    e.preventDefault();
    toggleTerminal();
  });
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/30 font-sans">
      <AnimatePresence>
        {isTerminalMode && <ProgrammerTerminal />}
      </AnimatePresence>
      <div aria-hidden={isTerminalMode} className={isTerminalMode ? "opacity-0 pointer-events-none" : "opacity-100"}>
        <ThemeToggle />
        <TerminalToggle />
        <Navigation />
        {/* Subtle Background Pattern */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03] dark:opacity-[0.07]">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:48px_48px]" />
        </div>
        <main className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="py-12 md:py-24 space-y-24 md:space-y-32">
            {/* HERO */}
            <div className="animate-fade-in [animation-delay:200ms]">
              <HeroSection />
            </div>
            {/* SKILLS */}
            <section id="skills" className="animate-fade-in scroll-mt-24 [animation-delay:400ms]">
              <SectionHeading title="skills.json" subtitle="Curated technical toolkit and methodologies." />
              <SkillsCloud />
            </section>
            {/* EXPERIENCE */}
            <section id="experience" className="animate-fade-in scroll-mt-24 [animation-delay:600ms]">
              <SectionHeading title="professional_history.log" subtitle="Engineering impact and career milestones." />
              <div className="mt-12">
                <ExperienceTimeline />
              </div>
            </section>
            {/* PROJECTS */}
            <section id="projects" className="animate-fade-in scroll-mt-24 [animation-delay:800ms]">
              <SectionHeading title="active_projects.dir" subtitle="Production platforms and side initiatives." />
              <ProjectGrid />
            </section>
            {/* FOOTER */}
            <footer className="pt-24 pb-32 text-center text-muted-foreground border-t border-muted/30">
              <p className="text-xs font-mono uppercase tracking-widest opacity-60">
                Designed & Built by Parish Khan © {new Date().getFullYear()}
              </p>
              <div className="mt-2 text-[10px] font-mono text-emerald-500/50">
                BUILD_SUCCESS: v1.1.0-stable
              </div>
            </footer>
          </div>
        </main>
      </div>
      <Toaster richColors position="bottom-right" />
    </div>
  );
}