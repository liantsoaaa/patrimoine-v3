import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, GitBranch, ChevronRight } from 'lucide-react';
import Logo from './Logo';
import NavItem from './NavItem';

const navItems = [
  { id: '/', label: 'Accueil' },
  { id: '/features', label: 'Fonctionnalités' },
  { id: '/guide', label: 'Utilisation' },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0, width: 0, opacity: 0,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const targetId = hoveredId ?? location.pathname;
    const nav = navRef.current;
    if (!nav) return;
    const el = nav.querySelector<HTMLElement>(`[data-nav-id="${targetId}"]`);
    if (!el) return;
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicatorStyle({
      left: elRect.left - navRect.left,
      width: elRect.width,
      opacity: 1,
    });
  }, [location.pathname, hoveredId, mobileOpen]);

  const handleNav = (path: string) => {
    navigate(path);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/10 bg-ink-950/80 backdrop-blur-2xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-doc flex h-16 items-center justify-between">
        <button
          onClick={() => handleNav('/')}
          className="group relative z-10 flex items-center gap-2.5"
        >
          <div className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            <Logo size={36} />
          </div>
          <span className="text-sm font-bold text-white transition-colors duration-300 group-hover:text-accent-300">
            Patrimoine
          </span>
        </button>

        <nav
          ref={navRef}
          className="relative hidden items-center gap-1 md:flex"
          onMouseLeave={() => setHoveredId(null)}
        >
          <div
            className="absolute top-0 h-full rounded-xl transition-all duration-400 ease-out"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
              background: hoveredId === location.pathname || !hoveredId
                ? 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(37,99,235,0.08))'
                : 'rgba(255,255,255,0.05)',
              border: hoveredId === location.pathname || !hoveredId
                ? '1px solid rgba(59,130,246,0.25)'
                : '1px solid rgba(255,255,255,0.08)',
              boxShadow: hoveredId === location.pathname || !hoveredId
                ? '0 0 20px -5px rgba(59,130,246,0.3)'
                : 'none',
            }}
          />

          {navItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              current={location.pathname}
              hoveredId={hoveredId}
              onClick={handleNav}
              onHover={setHoveredId}
            />
          ))}

          <button
            onClick={() => handleNav('/auth')}
            className="relative z-10 ml-2 flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-400 transition-all duration-300 hover:border-blue-400/40 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]"
          >
            <GitBranch className="h-4 w-4 transition-transform duration-300 hover:rotate-12" />
            <span>Repo</span>
          </button>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-slate-400 transition-colors duration-300 hover:bg-white/5 hover:text-white md:hidden"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-ink-950/95 backdrop-blur-2xl md:hidden">
          <nav className="container-doc flex flex-col py-3">
            {navItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                style={{ animationDelay: `${i * 60}ms` }}
                className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-all duration-300 animate-slide-in-left ${
                  location.pathname === item.id
                    ? 'bg-gradient-to-r from-blue-500/10 to-transparent text-white border-l-2 border-blue-500'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
                <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${location.pathname === item.id ? 'translate-x-1 text-blue-400' : 'opacity-50'}`} />
              </button>
            ))}
            <button
              onClick={() => handleNav('/auth')}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-slate-400 transition-all duration-300 animate-slide-in-left hover:bg-white/5 hover:text-white"
              style={{ animationDelay: `${3 * 60}ms` }}
            >
              <span className="flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                Repo
              </span>
              <ChevronRight className="h-4 w-4 opacity-50" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
