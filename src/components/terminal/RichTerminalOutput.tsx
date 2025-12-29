import React from 'react';
import { RESUME_DATA } from '@/data/resume-data';
interface RichOutputProps {
  type?: 'tree' | 'table' | 'neofetch' | 'changelog';
  data: any;
}
export function RichTerminalOutput({ type, data }: RichOutputProps) {
  if (type === 'tree') {
    return (
      <div className="py-2">
        {Object.entries(data as Record<string, string[]>).map(([category, items], idx, arr) => (
          <div key={category} className="mb-2">
            <div className="text-sky-400 font-bold">{idx === arr.length - 1 ? '└──' : '├──'} {category}</div>
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
  if (type === 'table') {
    return (
      <div className="py-2 overflow-x-auto custom-scrollbar">
        <div className="min-w-[500px]">
          <div className="grid grid-cols-[1.5fr_2fr_1.5fr] gap-4 border-b border-emerald-900/50 pb-1 text-emerald-600 font-bold uppercase text-[10px]">
            <div>Project</div>
            <div>Description</div>
            <div>Link</div>
          </div>
          {(data as any[]).map((p, i) => (
            <div key={i} className="grid grid-cols-[1.5fr_2fr_1.5fr] gap-4 py-1.5 text-xs hover:bg-emerald-500/5 transition-colors">
              <div className="text-sky-400 font-bold truncate">{p.title}</div>
              <div className="text-emerald-500/70 truncate">{p.description}</div>
              <a href={p.link.href} target="_blank" rel="noreferrer" className="text-emerald-500 underline decoration-emerald-500/30 hover:decoration-emerald-500 truncate">
                {p.link.label}
              </a>
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
              <span className="text-sky-400 font-bold">+ [{w.start}-{w.end}]</span>
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
      <div className="flex gap-8 py-4 items-start">
        <div className="text-emerald-500/60 text-[8px] leading-[8px] font-bold hidden md:block">
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
          <div className="text-sky-400 font-bold">parish@folio</div>
          <div className="text-emerald-800">------------------</div>
          <div className="text-xs"><span className="text-emerald-600 font-bold">OS:</span> Parish_OS v2.1 (React_TS)</div>
          <div className="text-xs"><span className="text-emerald-600 font-bold">Host:</span> {RESUME_DATA.location}</div>
          <div className="text-xs"><span className="text-emerald-600 font-bold">Kernel:</span> 6.1.0-folio-generic</div>
          <div className="text-xs"><span className="text-emerald-600 font-bold">Uptime:</span> {Math.floor(Date.now() / 6000000) % 60}h {Math.floor(Date.now() / 60000) % 60}m</div>
          <div className="text-xs"><span className="text-emerald-600 font-bold">Shell:</span> zsh 5.8.1</div>
          <div className="text-xs"><span className="text-emerald-600 font-bold">Theme:</span> {document.documentElement.classList.contains('dark') ? 'Dark' : 'Light'}</div>
          <div className="flex gap-1.5 mt-2">
            <div className="w-3 h-3 bg-emerald-900 rounded-sm" />
            <div className="w-3 h-3 bg-emerald-700 rounded-sm" />
            <div className="w-3 h-3 bg-emerald-500 rounded-sm" />
            <div className="w-3 h-3 bg-sky-600 rounded-sm" />
            <div className="w-3 h-3 bg-sky-400 rounded-sm" />
          </div>
        </div>
      </div>
    );
  }
  return <div>{JSON.stringify(data)}</div>;
}