import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article';
}

export default function Reveal({ children, className = '', delay = 0, as = 'div' }: RevealProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const Tag = as as 'div';

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${revealed ? 'revealed' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
