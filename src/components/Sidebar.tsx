import { useEffect, useRef, useState } from 'react';

export interface TocItem {
  id: string;
  label: string;
}

interface SidebarProps {
  items: TocItem[];
  title?: string;
}

export default function Sidebar({ items, title }: SidebarProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );
    observerRef.current = observer;

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <div className="sticky top-24 space-y-1">
        {title && (
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </p>
        )}
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              const el = document.getElementById(item.id);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-all duration-300 ${
              activeId === item.id
                ? 'border-accent-400 font-medium bg-white/5 rounded-r-lg'
                : 'border-transparent text-slate-500 hover:text-slate-200'
            }`}
            style={activeId === item.id ? { color: 'var(--text-primary)' } : undefined}
          >
            <span
              className={`h-1 w-1 rounded-full transition-all duration-300 ${
                activeId === item.id ? 'bg-accent-400 scale-150' : 'bg-slate-600 scale-100'
              }`}
            />
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
}
