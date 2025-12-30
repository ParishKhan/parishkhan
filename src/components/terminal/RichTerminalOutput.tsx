import React, { useLayoutEffect, useRef } from 'react';
import { RESUME_DATA } from '@/data/resume-data';
import { cn } from '@/lib/utils';
interface RichOutputProps {
  type?: 'tree' | 'table' | 'neofetch' | 'changelog' | 'matrix' | 'cowsay' | 'ps';
  data: any;
}
export function RichTerminalOutput({ type, data }: RichOutputProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<number[]>([]);
  const animationIdRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (type !== 'matrix') return;

    let resizeObserver: ResizeObserver | null = null;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth || 800;
      canvas.height = 300;
      const columns = Math.floor(canvas.width / 20);
      dropsRef.current = Array(columns).fill(1);
    };

    updateCanvasSize();

    const parentEl = canvas.parentElement;
    if (parentEl) {
      resizeObserver = new ResizeObserver(updateCanvasSize);
      resizeObserver.observe(parentEl);
    }

    const tick = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--terminal-text').trim();
      ctx.font = '15px monospace';
      
      const drops = dropsRef.current;
      for (let i = 0; i < drops.length; i++) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);
        
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationIdRef.current = requestAnimationFrame(tick);
    };
    animationIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [type]);

  const RichContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn(
      "my-4 p-3 md:p-4 border border-[var(--terminal-border)] rounded-lg font-bold",
      className
    )}>
      {children}
    </div>
  );

  if (type === 'matrix') {
    return (
      <RichContainer className="p-0 overflow-hidden bg-black">
        <canvas ref={canvasRef} className="block w-full h-[300px]" />
      </RichContainer>
    );
  }

  if (type === 'cowsay') {
    const text = String(data);
    const lineLen = text.length + 2;
    const top = ` _${'_'.repeat(lineLen)}_`;
    const bottom = ` -${'-'.repeat(lineLen)}-`;
    const bubble = `${top}\n< ${text} >\n${bottom}`;
    const cow = `
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
    return (
      <RichContainer className="whitespace-pre font-mono text-xs md:text-sm">
        {bubble}{cow}
      </RichContainer>
    );
  }
  if (type === 'tree') {
    return (
      <RichContainer>
        {Object.entries(data as Record<string, string[]>).map(([category, items], idx, arr) => (
          <div key={category} className="mb-3 last:mb-0">
            <div className="text-[var(--terminal-prompt)] flex items-center gap-2">
              <span className="opacity-50">{idx === arr.length - 1 ? '└──' : '├──'}</span>
              <span className="uppercase tracking-widest text-xs">{category}</span>
            </div>
            {items.map((item, i) => (
              <div key={item} className="pl-8 flex items-center gap-2 py-0.5">
                <span className="opacity-30">{i === items.length - 1 ? '└──' : '├──'}</span>
                {item}
              </div>
            ))}
          </div>
        ))}
      </RichContainer>
    );
  }
  if (type === 'ps' || type === 'table') {
    const projects = Array.from(RESUME_DATA.projects);
    return (
      <RichContainer className="p-0 overflow-x-auto custom-scrollbar">
        <div className="min-w-[500px]">
          <div className="grid grid-cols-[80px_100px_1fr_120px] gap-4 bg-[var(--terminal-border)] px-5 py-2 text-[var(--terminal-prompt)] text-xs">
            <div>PID</div>
            <div>STATUS</div>
            <div>APP</div>
            <div>STACK</div>
          </div>
          {projects.map((p, i) => (
            <div key={i} className="grid grid-cols-[80px_100px_1fr_120px] gap-4 px-5 py-3 text-sm border-b border-[var(--terminal-border)] last:border-0">
              <div className="opacity-50">0x{(i + 1).toString(16).toUpperCase()}</div>
              <div className="text-[var(--terminal-prompt)]">ACTIVE</div>
              <div className="text-[var(--terminal-prompt)]">{p.title}</div>
              <div className="truncate opacity-70 text-xs">{p.techStack?.[0] || 'N/A'}</div>
            </div>
          ))}
        </div>
      </RichContainer>
    );
  }
  if (type === 'changelog') {
    return (
      <RichContainer className="space-y-6">
        {Array.from(RESUME_DATA.work).map((w, i) => (
          <div key={i} className="relative pl-6 border-l-2 border-[var(--terminal-border)]">
            <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-[var(--terminal-bg)] border-2 border-[var(--terminal-text)]" />
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <span className="text-[var(--terminal-prompt)]">[{w.start} — {w.end}]</span>
              <span>{w.company}</span>
              <span className="text-[10px] px-2 py-0.5 border border-[var(--terminal-border)] uppercase">{w.title}</span>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">{w.description}</p>
          </div>
        ))}
      </RichContainer>
    );
  }
  if (type === 'neofetch') {
    return (
      <RichContainer className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="text-[var(--terminal-prompt)] leading-none text-xl md:text-2xl select-none">
{`
 ::::::::
:+:    :+:
+:+    +:+
+#++:++#+
+#+
#+#
### DEV
`}
        </div>
        <div className="space-y-1 flex-1">
          <div className="text-[var(--terminal-prompt)] text-xl border-b border-[var(--terminal-border)] pb-1 mb-2">dev@folio-v2</div>
          <div className="text-sm grid grid-cols-[80px_1fr] gap-2 font-bold">
            <span className="opacity-50">OS:</span> DEV_OS
            <span className="opacity-50">LOC:</span> {RESUME_DATA.location}
            <span className="opacity-50">SHELL:</span> zsh-vibe
            <span className="opacity-50">STATUS:</span> {RESUME_DATA.work?.[0]?.title || 'Developer'}
          </div>
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-6 h-3 bg-[var(--terminal-text)] opacity-20" style={{ opacity: i * 0.2 }} />
            ))}
          </div>
        </div>
      </RichContainer>
    );
  }
  return <div className="p-4 border border-[var(--terminal-border)]">{JSON.stringify(data)}</div>;
}