interface NavItemProps {
  item: { id: string; label: string };
  current: string;
  hoveredId: string | null;
  onClick: (page: string) => void;
  onHover: (page: string | null) => void;
}

export default function NavItem({ item, current, hoveredId, onClick, onHover }: NavItemProps) {
  const isActive = current === item.id;
  const isHovered = hoveredId === item.id;
  const label = item.label;

  return (
    <button
      data-nav-id={item.id}
      onClick={() => onClick(item.id)}
      onMouseEnter={() => onHover(item.id)}
      className={`relative z-10 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
        isActive ? 'text-white' : 'text-slate-400'
      }`}
    >
      <span className="relative inline-block">
        <span className="inline-flex">
          {label.split('').map((char, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-300 ease-out"
              style={{
                transitionDelay: isHovered ? `${i * 20}ms` : `${i * 10}ms`,
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                color: isHovered ? '#60a5fa' : undefined,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>

        <span
          className="pointer-events-none absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transition-all duration-500 ease-out"
          style={{
            width: isHovered ? '100%' : '0%',
            opacity: isHovered ? 1 : 0,
          }}
        />

        <span
          className="pointer-events-none absolute -bottom-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_2px_rgba(59,130,246,0.5)] transition-all duration-500 ease-out"
          style={{
            left: isHovered ? '100%' : '0%',
            opacity: isHovered ? 1 : 0,
            transform: 'translateX(-50%)',
          }}
        />
      </span>
    </button>
  );
}
