import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}

export default function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <Reveal className="mb-12">
      <div id={id} className="prose-doc">
        <span className="section-eyebrow">{eyebrow}</span>
        <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h2>
        <div className="mt-4">{children}</div>
      </div>
    </Reveal>
  );
}
