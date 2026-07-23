/**
 * AnimatedMeshBackground
 * Renders a fixed full-screen animated background with:
 * 1. A conic mesh gradient that slowly rotates and shifts
 * 2. Flowing wave shapes at the bottom
 * 3. Hazy drifting color blobs
 * 4. A subtle dot grid overlay
 */
export default function AnimatedMeshBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      {/* Conic mesh gradient — slow rotating color field */}
      <div
        className="absolute left-1/2 top-1/2 h-[150vmax] w-[150vmax] -translate-x-1/2 -translate-y-1/2 animate-mesh-shift opacity-30"
        style={{
          background:
            'conic-gradient(from 0deg at 50% 50%, #1e40af 0deg, #2563eb 60deg, #3b82f6 120deg, #c4b08a 180deg, #60a5fa 240deg, #a89060 300deg, #1e40af 360deg)',
          filter: 'blur(120px)',
        }}
      />

      {/* Hazy drifting blobs */}
      <div
        className="absolute -left-32 top-0 h-[600px] w-[600px] rounded-full animate-haze-drift"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full animate-haze-drift"
        style={{
          background: 'radial-gradient(circle, rgba(196,176,138,0.15) 0%, transparent 70%)',
          filter: 'blur(90px)',
          animationDelay: '8s',
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[450px] w-[450px] rounded-full animate-haze-drift"
        style={{
          background: 'radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animationDelay: '15s',
        }}
      />

      {/* Big flowing waves at the bottom */}
      <svg
        className="absolute bottom-0 left-0 w-[200%] animate-wave-1"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: '40vh', opacity: 0.15 }}
      >
        <defs>
          <linearGradient id="wave-grad-1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          fill="url(#wave-grad-1)"
          d="M0,160 C320,260 480,80 720,140 C960,200 1120,60 1440,120 L1440,320 L0,320 Z"
        />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-[200%] animate-wave-2"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: '35vh', opacity: 0.12 }}
      >
        <defs>
          <linearGradient id="wave-grad-2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c4b08a" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          fill="url(#wave-grad-2)"
          d="M0,200 C240,120 480,240 720,180 C960,120 1200,220 1440,160 L1440,320 L0,320 Z"
        />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-[200%] animate-wave-3"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: '30vh', opacity: 0.1 }}
      >
        <defs>
          <linearGradient id="wave-grad-3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          fill="url(#wave-grad-3)"
          d="M0,240 C360,180 600,280 840,220 C1080,160 1200,240 1440,200 L1440,320 L0,320 Z"
        />
      </svg>

      {/* Dot grid overlay for texture */}
      <div className="absolute inset-0 dot-pattern opacity-40" />

      {/* Vignette to keep content readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, rgba(8,9,13,0.4) 70%, rgba(8,9,13,0.85) 100%)',
        }}
      />
    </div>
  );
}
