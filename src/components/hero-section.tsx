import React from 'react';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '@/data/resume-data';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
export function HeroSection() {
  return (
    <section className="py-12 md:py-20 flex flex-col items-start gap-6">
      <div className="space-y-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-mono mb-2"
        >
          available_for_hire: <span className="text-emerald-500">true</span>
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          {RESUME_DATA.name}
        </h1>
        <div className="font-mono text-muted-foreground text-lg md:text-xl flex items-center">
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="overflow-hidden whitespace-nowrap border-r-2 border-emerald-500 pr-1"
          >
            {RESUME_DATA.summary.split('.')[0]}.
          </motion.span>
        </div>
        <p className="text-muted-foreground max-w-[600px] text-base md:text-lg leading-relaxed">
          {RESUME_DATA.about}
        </p>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        {RESUME_DATA.contact.social.map((social) => (
          <Button
            key={social.name}
            variant="outline"
            size="icon"
            asChild
            className="rounded-xl hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-colors"
          >
            <a href={social.url} target="_blank" rel="noopener noreferrer">
              <social.icon className="h-4 w-4" />
              <span className="sr-only">{social.name}</span>
            </a>
          </Button>
        ))}
        <Button 
          variant="secondary" 
          className="rounded-xl font-mono text-sm"
          onClick={() => window.location.href = `mailto:${RESUME_DATA.contact.email}`}
        >
          <Mail className="mr-2 h-4 w-4" />
          contact.send()
        </Button>
      </div>
    </section>
  );
}