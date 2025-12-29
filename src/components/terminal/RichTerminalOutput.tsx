import React, { useEffect, useRef } from 'react';
import { RESUME_DATA } from '@/data/resume-data';
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
    canvas.height = 200;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(0, 10, 19, 0.05)";
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
    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, [type]);
  if (type === 'matrix') {
    return <canvas ref={canvasRef} className="my-2 border border-emerald-900/30 rounded opacity-60" />;
  }
  if (type === 'cowsay') {
    const msg = data as string;
    const pad = msg.length + 2;
    return (
      <pre className="text-[#FBBF2F] text-xs leading-tight">
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
      <div className="py-2">
        {Object.entries(data as Record<string, string[]>).map(([category, items], idx, arr) => (
          <div key={category} className="mb-2">
            <div className="text-[#FBBF2F] font-bold">{idx === arr.length - 1 ? '└──' : '├──'} {category}</div>
            {items.map((item, i) => (
              <div key={item} className="pl-6 text-emerald-500/80">
                {i === items.length - 1 ? '└──' : '├──'} {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  if (type === 'ps' || type === 'table') {
    // Fix: Double cast to unknown then any[] to avoid TS2352 from readonly projects tuple
    const projects = RESUME_DATA.projects as unknown as any[];
    return (
      <div className="py-2 overflow-x-auto custom-scrollbar">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-[1fr_0.8fr_3fr_1.5fr] gap-4 border-b border-emerald-900/50 pb-1 text-[#FBBF2F] font-bold uppercase text-[10px]">
            <div>PID/USER</div>
            <div>STATUS</div>
            <div>COMMAND / PROJECT</div>
            <div>RUNTIME</div>
          </div>
          {projects.map((p, i) => (
            <div key={i} className="grid grid-cols-[1fr_0.8fr_3fr_1.5fr] gap-4 py-1.5 text-xs hover:bg-emerald-500/5 transition-colors">
              <div className="text-emerald-600">PK_00{i + 1}</div>
              <div className="text-emerald-400">RUNNING</div>
              <div className="text-[#FBBF2F] font-bold truncate">{p.title} --v{i + 1}.0</div>
              <div className="text-emerald-500/60 truncate">{p.techStack[0]} | production</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (type === 'changelog') {
    return (
      <div className="py-2 space-y-3">
        {(data as any[]).map((w, i) => (
          <div key={i} className="border-l-2 border-emerald-900/30 pl-4">
            <div className="flex items-center gap-2">
              <span className="text-[#FBBF2F] font-bold">+ [{w.start}-{w.end}]</span>
              <span className="text-white">{w.company}</span>
            </div>
            <div className="text-xs text-emerald-600 font-mono mt-0.5">{w.title}</div>
            <div className="text-xs text-emerald-500/60 mt-1 max-w-2xl">{w.description}</div>
          </div>
        ))}
      </div>
    );
  }
  if (type === 'neofetch') {
    return (
      <div className="flex gap-8 py-4 items-start border border-emerald-900/20 bg-emerald-950/5 p-4 rounded-lg">
        <div className="text-[#FBBF2F] text-[10px] leading-[10px] font-bold hidden md:block opacity-80">
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
        <div className="space-y-1">
          <div className="text-[#FBBF2F] font-bold text-lg">parish@portfolio-v2.2</div>
          <div className="text-emerald-900">--------------------------</div>
          <div className="text-xs"><span className="text-emerald-600 font-bold">OS:</span> Parish_OS LTS (React 18.3)</div>
          <div className="text-xs"><span className="text-emerald-600 font-bold">Host:</span> {RESUME_DATA.location} (UTC+6)</div>
          <div className="text-xs"><span className="text-emerald-600 font-bold">Kernel:</span> node_22.15.3-lts</div>
          <div className="text-xs"><span className="text-emerald-600 font-bold">Shell:</span> zsh-auto-vibe</div>
          <div className="text-xs"><span className="text-emerald-600 font-bold">Palette:</span> Amber (#FBBF2F) & Emerald (#10B981)</div>
          <div className="flex gap-1.5 mt-2">
            <div className="w-4 h-2 bg-emerald-900 rounded-sm" />
            <div className="w-4 h-2 bg-emerald-600 rounded-sm" />
            <div className="w-4 h-2 bg-[#FBBF2F] rounded-sm" />
            <div className="w-4 h-2 bg-sky-900 rounded-sm" />
          </div>
        </div>
      </div>
    );
  }
  return <div>{JSON.stringify(data)}</div>;
}