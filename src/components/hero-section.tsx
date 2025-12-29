import React from 'react';
import { RESUME_DATA } from '@/data/resume-data';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
export function HeroSection() {
  return (
    <section id="about" className="py-12 md:py-20 flex flex-col items-start gap-6 animate-fade-in scroll-mt-24">
      <div className="space-y-4 max-w-2xl">
        <div className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-mono mb-2">
          available_for_hire: <span className="text-emerald-500">true</span>
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
            {RESUME_DATA.name}
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
            {RESUME_DATA.formalName}
          </h2>
        </div>
        <div className="font-mono text-emerald-500 text-lg md:text-xl flex flex-wrap items-baseline">
          <span className="inline-flex items-center">
            {RESUME_DATA.summary}
            <span className="inline-block w-[2px] h-[1.2em] bg-emerald-500 ml-1.5 animate-blink self-center" />
          </span>
        </div>
        <p className="text-muted-foreground max-w-[600px] text-base md:text-lg leading-relaxed">
          {RESUME_DATA.about}
        </p>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        {RESUME_DATA.contact.social.map((social) => {
          const isWhatsApp = social.name === "WhatsApp";
          return (
            <Button
              key={social.name}
              variant="outline"
              size="icon"
              asChild
              className={cn(
                "rounded-xl transition-all duration-300",
                isWhatsApp
                  ? "hover:bg-green-500/20 border-green-500/50 hover:border-green-500 text-green-600 dark:text-green-400"
                  : "hover:bg-emerald-500/10 hover:border-emerald-500/50"
              )}
            >
              <a href={social.url} target="_blank" rel="noopener noreferrer">
                <social.icon className="h-4 w-4" />
                <span className="sr-only">{social.name}</span>
              </a>
            </Button>
          );
        })}
        <Button
          variant="outline"
          size="icon"
          asChild
          className="rounded-xl hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-colors"
        >
          <a href={`tel:${RESUME_DATA.contact.phone}`}>
            <Phone className="h-4 w-4" />
            <span className="sr-only">Phone</span>
          </a>
        </Button>
        <Button
          variant="secondary"
          className="rounded-xl font-mono text-sm border border-transparent hover:border-emerald-500/30 transition-all"
          onClick={() => window.location.href = `mailto:${RESUME_DATA.contact.email}`}
        >
          <Mail className="mr-2 h-4 w-4" />
          contact.send()
        </Button>
      </div>
    </section>
  );
}