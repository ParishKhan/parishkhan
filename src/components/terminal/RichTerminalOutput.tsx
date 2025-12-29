import React, { useEffect, useRef } from 'react';
import { RESUME_DATA } from '@/data/resume-data';
import { cn } from '@/lib/utils';
interface RichOutputProps {
  type?: 'tree' | 'table' | 'neofetch' | 'changelog' | 'matrix' | 'cowsay' | 'ps';
  data: any;
}
export function RichTerminalOutput({ type, data }: RichOutputProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (type !== 'matrix' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = canvas.parentElement?.clientWidth || 800;
    canvas.height = 180;
    const chars = "01$#&_()";
    const fontSize = 12;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(0, 10, 19, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#10b981";
      ctx.font = fontSize + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [type]);
  const RichContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn(
      "my-4 p-5 bg-emerald-950/10 backdrop-blur-xs border border-emerald-900/20 rounded-lg text-terminal-output overflow-hidden animate-fade-in",
      className
    )}>
      {children}
    </div>
  );
  if (type === 'matrix') {
    return <canvas ref={canvasRef} className="my-4 border border-emerald-900/30 rounded opacity-40 block w-full" />;
  }
  if (type === 'cowsay') {
    const msg = data as string;
    const pad = msg.length + 2;
    return (
      <pre className="text-[#FBBF2F] text-terminal-ascii leading-tight my-4 neon-glow-amber opacity-80">
{`
  ${'-'.repeat(pad)}
< ${msg} >
  ${'-'.repeat(pad)}
         \\   ^__^
          \\  (oo)\\_______
             (__)\\       )\\/\\
                 ||----w |
                 ||     ||
`}
      </pre>
    );
  }
  if (type === 'tree') {
    return (
      <RichContainer>
        {Object.entries(data as Record<string, string[]>).map(([category, items], idx, arr) => (
          <div key={category} className="mb-3 last:mb-0">
            <div className="text-[#FBBF2F] font-bold flex items-center gap-2">
              <span className="opacity-50">{idx === arr.length - 1 ? '└──' : '├──'}</span>
              <span className="uppercase tracking-widest text-[10px] opacity-70">{category}</span>
            </div>
            {items.map((item, i) => (
              <div key={item} className="pl-8 text-emerald-500/80 flex items-center gap-2 py-0.5 hover:text-emerald-300 transition-colors">
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
    const projects = RESUME_DATA.projects as unknown as any[];
    return (
      <RichContainer className="p-0">
        <div className="overflow-x-auto custom-scrollbar">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-[100px_100px_1fr_150px] gap-4 bg-emerald-900/10 px-5 py-2.5 text-[#FBBF2F] font-bold uppercase text-[9px] tracking-tighter border-b border-emerald-900/30">
              <div>PID/ID</div>
              <div>STATUS</div>
              <div>COMMAND/APP</div>
              <div>STACK</div>
            </div>
            {projects.map((p, i) => (
              <div key={i} className="grid grid-cols-[100px_100px_1fr_150px] gap-4 px-5 py-3 text-xs border-b border-emerald-900/10 last:border-0 hover:bg-emerald-400/5 transition-all cursor-default group hover:scale-[1.01] origin-left">
                <div className="text-emerald-900 font-mono">0x0{i + 1}A</div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                  <span className="text-emerald-500/60 text-[10px]">ACTIVE</span>
                </div>
                <div className="text-[#FBBF2F] font-bold group-hover:neon-glow-amber transition-all">{p.title}</div>
                <div className="text-emerald-700 text-[10px] truncate uppercase">{p.techStack[0]}</div>
              </div>
            ))}
          </div>
        </div>
      </RichContainer>
    );
  }
  if (type === 'changelog') {
    return (
      <RichContainer className="space-y-6">
        {(data as any[]).map((w, i) => (
          <div key={i} className="relative pl-6 border-l border-emerald-900/30 group">
            <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-emerald-900 border border-emerald-500/20 group-hover:bg-emerald-500 transition-colors" />
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <span className="text-[#FBBF2F] font-bold text-xs">[{w.start} — {w.end}]</span>
              <span className="text-white font-bold">{w.company}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-900/20 text-emerald-500/60 border border-emerald-900/30 uppercase tracking-tighter">{w.title}</span>
            </div>
            <p className="text-xs text-emerald-500/70 leading-relaxed max-w-2xl">{w.description}</p>
          </div>
        ))}
      </RichContainer>
    );
  }
  if (type === 'neofetch') {
    return (
      <RichContainer className="flex flex-col md:flex-row gap-8 py-8 px-8 items-start">
        <div className="text-[#FBBF2F] text-terminal-ascii leading-[1.1] font-bold opacity-90 neon-glow-amber shrink-0">
{`
      :::::::::
     :+:    :+:
    +:+    +:+
   +#++:++#+
  +#+
 #+#
### ARISH
`}
        </div>
        <div className="space-y-2 flex-1 min-w-0">
          <div className="text-[#FBBF2F] font-bold text-xl neon-glow-amber">parish@portfolio-v2.2</div>
          <div className="h-px w-full bg-gradient-to-r from-emerald-900/50 to-transparent" />
          <div className="grid grid-cols-1 gap-1">
            <div className="text-xs flex gap-3"><span className="text-emerald-600 font-bold w-16">OS:</span> Parish_OS (React 18.3)</div>
            <div className="text-xs flex gap-3"><span className="text-emerald-600 font-bold w-16">HOST:</span> {RESUME_DATA.location}</div>
            <div className="text-xs flex gap-3"><span className="text-emerald-600 font-bold w-16">KERNEL:</span> node_22.15.3-lts</div>
            <div className="text-xs flex gap-3"><span className="text-emerald-600 font-bold w-16">SHELL:</span> zsh-auto-vibe</div>
            <div className="text-xs flex gap-3"><span className="text-emerald-600 font-bold w-16">COLORS:</span> Amber & Emerald</div>
          </div>
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={cn(
                "w-6 h-3 rounded-sm",
                i === 1 && "bg-emerald-950",
                i === 2 && "bg-emerald-800",
                i === 3 && "bg-emerald-500",
                i === 4 && "bg-[#FBBF2F]",
                i === 5 && "bg-sky-900"
              )} />
            ))}
          </div>
        </div>
      </RichContainer>
    );
  }
  return <div className="p-4 border border-red-900/20 rounded bg-red-900/5">{JSON.stringify(data)}</div>;
}