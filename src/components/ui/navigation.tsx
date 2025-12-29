import React from 'react';
import { cn } from "@/lib/utils";
const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
];
export function Navigation() {
  const [activeSection, setActiveSection] = React.useState('about');
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: "-10% 0px -70% 0px" 
      }
    );
    navItems.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center gap-1 md:gap-2 scale-90 md:scale-100 transition-all duration-300 shadow-xl">
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={cn(
            "px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200",
            activeSection === item.href.slice(1)
              ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}