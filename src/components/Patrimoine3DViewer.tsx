import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { TypeAgregat, AGREGAT_LABELS, type Possession } from '../types/patrimoine';
import { patrimoineData, getAgregatValues, projectPossession, convertToAriary } from '../lib/patrimoine-engine';
import Icon from './Icon';

const AGREGAT_COLORS: Record<string, string> = {
  [TypeAgregat.TRESORERIE]: '#2dd4bf',
  [TypeAgregat.IMMOBILISATION]: '#22d3ee',
  [TypeAgregat.OBLIGATION]: '#fbbf24',
};

function formatAr(n: number): string {
  if (Math.abs(n) >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toFixed(0);
}

export default function Patrimoine3DViewer() {
  const [selected, setSelected] = useState<Possession | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(useMotionValue(15), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useMotionValue(-20), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(-20 + x * 40);
    rotateX.set(15 - y * 20);
  };

  const startDate = new Date('2024-07-08');
  const endDate = new Date('2028-03-31');
  const currentDate = new Date(startDate.getTime() + timeProgress * (endDate.getTime() - startDate.getTime()));
  const values = getAgregatValues(patrimoineData.possessions, currentDate);
  const total = values.tresorerie + values.immobilisations + values.obligations;
  const maxVal = Math.max(values.tresorerie, values.immobilisations, Math.abs(values.obligations), 1);

  return (
    <div className="relative w-full">
      <div className="mb-6 flex items-center gap-4">
        <span className="text-sm text-slate-400">2024</span>
        <input type="range" min={0} max={100} value={timeProgress * 100} onChange={(e) => setTimeProgress(Number(e.target.value) / 100)} className="flex-1 accent-primary-400" />
        <span className="text-sm text-slate-400">2028</span>
      </div>

      <div ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={() => { rotateX.set(15); rotateY.set(-20); }} className="relative flex min-h-[400px] items-center justify-center" style={{ perspective: 1200 }}>
        <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative">
          <motion.div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-center" style={{ transform: 'translateZ(80px)' }}>
            <div className="text-xs uppercase tracking-wider text-slate-500">Patrimoine Total</div>
            <div className="gradient-text text-3xl font-bold">{formatAr(total)} Ar</div>
            <div className="text-xs text-slate-500">{currentDate.toLocaleDateString('fr-FR')}</div>
          </motion.div>

          <div className="flex items-end gap-12" style={{ transformStyle: 'preserve-3d' }}>
            {([TypeAgregat.TRESORERIE, TypeAgregat.IMMOBILISATION, TypeAgregat.OBLIGATION] as TypeAgregat[]).map((agregat, i) => {
              const val = agregat === TypeAgregat.TRESORERIE ? values.tresorerie : agregat === TypeAgregat.IMMOBILISATION ? values.immobilisations : values.obligations;
              const heightPct = (Math.abs(val) / maxVal) * 200;
              const color = AGREGAT_COLORS[agregat] || '#888';
              const meta = AGREGAT_LABELS[agregat];
              const isHovered = hovered === agregat;

              return (
                <motion.div key={agregat} className="flex flex-col items-center gap-3" style={{ transform: `translateZ(${i * 20}px)` }} onMouseEnter={() => setHovered(agregat)} onMouseLeave={() => setHovered(null)} onClick={() => { const possession = patrimoineData.possessions.find(p => p.agregat === agregat); setSelected(possession || null); }}>
                  <div className="text-sm font-semibold transition-all" style={{ color, opacity: isHovered ? 1 : 0.7 }}>{formatAr(val)} Ar</div>
                  <motion.div className="relative w-24 rounded-t-lg" style={{ height: Math.max(20, heightPct), background: `linear-gradient(180deg, ${color}40 0%, ${color}10 100%)`, border: `1px solid ${color}40`, boxShadow: isHovered ? `0 0 30px ${color}40` : 'none', transformStyle: 'preserve-3d' }} animate={{ height: Math.max(20, heightPct) }} transition={{ type: 'spring', stiffness: 80, damping: 15 }}>
                    <div className="absolute -top-1 left-0 right-0 h-2 rounded-t-lg" style={{ background: color, opacity: 0.6, transform: 'translateZ(12px) rotateX(90deg)' }} />
                    <div className="absolute top-0 -right-2 h-full w-2 rounded-r-lg" style={{ background: `${color}20`, transform: 'rotateY(90deg) translateZ(0)' }} />
                    <div className="absolute inset-0 rounded-t-lg opacity-30" style={{ background: `radial-gradient(circle at top, ${color} 0%, transparent 70%)` }} />
                  </motion.div>
                  <div className="text-center">
                    <div style={{ color }}><Icon name={meta.icon} size={24} /></div>
                    <div className="text-xs text-slate-400">{meta.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="absolute bottom-0 left-1/2 h-2 w-96 -translate-x-1/2 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(45,212,191,0.3), transparent)', transform: 'translateZ(-20px) rotateX(90deg)' }} />
        </motion.div>

        <div className="pointer-events-none absolute top-1/2 left-1/2 h-32 w-96 -translate-x-1/2 rounded-[50%] opacity-20" style={{ background: 'radial-gradient(ellipse, rgba(45,212,191,0.3) 0%, transparent 70%)' }} />
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 card p-5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white">{selected.nom}</h4>
              <p className="text-sm text-slate-400">{AGREGAT_LABELS[selected.agregat].label} · {selected.type}</p>
            </div>
            <button onClick={() => setSelected(null)} className="text-slate-500 transition-colors hover:text-white">✕</button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <div className="text-xs text-slate-500">Valeur actuelle</div>
              <div className="font-semibold text-white">{formatAr(convertToAriary(projectPossession(selected, currentDate), selected.devise, currentDate))} Ar</div>
            </div>
            {selected.tauxAppreciationAnnuel !== undefined && (
              <div>
                <div className="text-xs text-slate-500">Appréciation</div>
                <div className="font-semibold text-white">{selected.tauxAppreciationAnnuel > 0 ? '+' : ''}{(selected.tauxAppreciationAnnuel * 100).toFixed(0)}%/an</div>
              </div>
            )}
            {selected.children && selected.children.length > 0 && (
              <div>
                <div className="text-xs text-slate-500">Flux actifs</div>
                <div className="font-semibold text-white">{selected.children.length}</div>
              </div>
            )}
            <div>
              <div className="text-xs text-slate-500">Devise</div>
              <div className="font-semibold text-white">{selected.devise}</div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="mt-6 card p-5">
        <h4 className="mb-3 text-sm font-semibold text-slate-300">Évolution du patrimoine</h4>
        <MiniChart timeProgress={timeProgress} />
      </div>
    </div>
  );
}

function MiniChart({ timeProgress }: { timeProgress: number }) {
  const pointsRef = useRef<Array<{ t: number; val: number }>>([]);

  useEffect(() => {
    const data: Array<{ t: number; val: number }> = [];
    const startDate = new Date('2024-07-08');
    const endDate = new Date('2028-03-31');
    for (let i = 0; i <= 50; i++) {
      const t = i / 50;
      const date = new Date(startDate.getTime() + t * (endDate.getTime() - startDate.getTime()));
      const vals = getAgregatValues(patrimoineData.possessions, date);
      data.push({ t, val: vals.tresorerie + vals.immobilisations + vals.obligations });
    }
    pointsRef.current = data;
  }, []);

  if (pointsRef.current.length === 0) return null;

  const pts = pointsRef.current;
  const maxVal = Math.max(...pts.map(p => p.val));
  const minVal = Math.min(...pts.map(p => p.val));
  const range = maxVal - minVal || 1;
  const w = 100, h = 60;

  const pathD = pts.map((p, i) => { const x = (i / (pts.length - 1)) * w; const y = h - ((p.val - minVal) / range) * h; return `${i === 0 ? 'M' : 'L'} ${x} ${y}`; }).join(' ');
  const currentX = timeProgress * w;
  const currentY = h - ((pts[Math.round(timeProgress * 50)].val - minVal) / range) * h;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height: 80 }}>
      <defs>
        <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${pathD} L ${w} ${h} L 0 ${h} Z`} fill="url(#chart-grad)" />
      <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth="0.5" />
      <circle cx={currentX} cy={currentY} r="1.5" fill="#fbbf24" />
      <line x1={currentX} y1={0} x2={currentX} y2={h} stroke="#fbbf24" strokeWidth="0.2" strokeDasharray="1,1" opacity="0.5" />
    </svg>
  );
}
