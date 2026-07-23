import type { ReactNode } from 'react';
import { Info, AlertTriangle, Lightbulb, CheckCircle2 } from 'lucide-react';

type Variant = 'info' | 'warning' | 'tip' | 'success';

interface CalloutProps {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}

const config: Record<Variant, { icon: typeof Info; color: string; bg: string; border: string; label: string }> = {
  info: {
    icon: Info,
    color: 'text-accent-300',
    bg: 'bg-accent-400/5',
    border: 'border-accent-400/20',
    label: 'Information',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-school-400',
    bg: 'bg-school-400/5',
    border: 'border-school-400/20',
    label: 'Attention',
  },
  tip: {
    icon: Lightbulb,
    color: 'text-jtr-cyan',
    bg: 'bg-jtr-cyan/5',
    border: 'border-jtr-cyan/20',
    label: 'Astuce',
  },
  success: {
    icon: CheckCircle2,
    color: 'text-jtr-mint',
    bg: 'bg-jtr-mint/5',
    border: 'border-jtr-mint/20',
    label: 'Résultat',
  },
};

export default function Callout({ variant = 'info', title, children }: CalloutProps) {
  const { icon: Icon, color, bg, border, label } = config[variant];
  return (
    <div className={`my-5 rounded-2xl border ${border} ${bg} p-4 backdrop-blur-sm`}>
      <div className="flex items-start gap-3">
        <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${color}`} />
        <div className="flex-1">
          <p className={`text-sm font-semibold ${color}`}>{title ?? label}</p>
          <div className="mt-1 text-sm text-slate-400 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
