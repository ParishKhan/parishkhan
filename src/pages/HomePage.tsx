import React from 'react';
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
import { cn } from '@/lib/utils';
export function HomePage() {
  const isTerminalMode = useTerminalStore((s) => s.isTerminalMode);
  const toggleTerminal = useTerminalStore((s) => s.toggleTerminal);
  useHotkeys(['~', '`', 'ctrl+p'], (e) => {
    e.preventDefault();
    toggleTerminal();
  }, {
    enableOnFormTags: true
  });
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/30 font-sans overflow-x-hidden relative">
      <AnimatePresence mode="wait">
        {isTerminalMode && (
          <ProgrammerTerminal key="terminal-ui" />
        )}
      </AnimatePresence>
      <div
        className={cn(
          "transition-all duration-700 ease-in-out origin-center min-h-screen flex flex-col",
          isTerminalMode
            ? "opacity-0 blur-3xl pointer-events-none scale-95 translate-y-12"
            : "opacity-100 blur-0 scale-100 translate-y-0"
        )}
      >
        <ThemeToggle />
        <TerminalToggle />
        <Navigation />
        {/* Subtle Background Pattern */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03] dark:opacity-[0.08]">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>
        <main className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 flex-1">
          <div className="py-12 md:py-24 space-y-24 md:space-y-32">
            {/* HERO */}
            <div className="animate-fade-in [animation-delay:200ms]">
              <HeroSection />
            </div>
            {/* SKILLS */}
            <section id="skills" className="animate-fade-in scroll-mt-24 [animation-delay:400ms]">
              <SectionHeading
                title="skills.json"
                subtitle="A curated stack focusing on performance, scalability, and modern UX standards."
              />
              <SkillsCloud />
            </section>
            {/* EXPERIENCE */}
            <section id="experience" className="animate-fade-in scroll-mt-24 [animation-delay:600ms]">
              <SectionHeading
                title="professional_history.log"
                subtitle="Engineering impact across enterprise platforms and freelance initiatives."
              />
              <div className="mt-12">
                <ExperienceTimeline />
              </div>
            </section>
            {/* PROJECTS */}
            <section id="projects" className="animate-fade-in scroll-mt-24 [animation-delay:800ms]">
              <SectionHeading
                title="active_projects.dir"
                subtitle="Featured production applications and open-source contributions."
              />
              <ProjectGrid />
            </section>
            {/* FOOTER */}
            <footer className="pt-24 pb-32 text-center text-muted-foreground border-t border-muted/30">
              <p className="text-xs font-mono uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">
                Designed & Built by Parish Khan © {new Date().getFullYear()}
              </p>
              <div className="mt-3 text-[9px] font-mono text-emerald-500/40 tracking-wider">
                SYSTEM_STATUS: <span className="text-emerald-500/60">v2.2.0-stable</span>
              </div>
            </footer>
          </div>
        </main>
      </div>
      <div className="relative z-[1001]">
        <Toaster richColors position="bottom-right" />
      </div>
    </div>
  );
}