interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = '', size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logo-grad-blue" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="0.5" stopColor="#2563eb" />
          <stop offset="1" stopColor="#1e40af" />
        </linearGradient>
        <linearGradient id="logo-grad-light" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60a5fa" />
          <stop offset="1" stopColor="#93c5fd" />
        </linearGradient>
        <filter id="logo-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="2" y="2" width="60" height="60" rx="14" fill="#0f1525" stroke="url(#logo-grad-blue)" strokeWidth="1.5" />

      <g filter="url(#logo-glow)">
        <path
          d="M32 12 L46 24 L42 24 L42 48 L22 48 L22 24 L18 24 Z"
          fill="url(#logo-grad-blue)"
          opacity="0.9"
        />
        <rect x="26" y="28" width="5" height="5" rx="1" fill="#60a5fa" opacity="0.8" />
        <rect x="33" y="28" width="5" height="5" rx="1" fill="#60a5fa" opacity="0.6" />
        <rect x="29" y="37" width="6" height="11" rx="1" fill="#1e40af" opacity="0.7" />
        <path
          d="M16 50 L24 42 L32 46 L48 34"
          stroke="url(#logo-grad-light)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="48" cy="34" r="2.5" fill="#60a5fa" />
      </g>

      <circle cx="52" cy="52" r="1.5" fill="#3b82f6" opacity="0.4" />
      <circle cx="56" cy="48" r="1" fill="#60a5fa" opacity="0.3" />
    </svg>
  );
}
