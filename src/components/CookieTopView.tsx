const CookieTopView = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Cookie body — warm golden radial: bright center, rich edge */}
      <radialGradient id="cookieBase" cx="40%" cy="36%" r="66%">
        <stop offset="0%"   stopColor="#F9CE72" />
        <stop offset="30%"  stopColor="#EBA040" />
        <stop offset="65%"  stopColor="#C8722A" />
        <stop offset="100%" stopColor="#9A4E14" />
      </radialGradient>

      {/* Secondary warm surface tint */}
      <radialGradient id="surfaceTint" cx="30%" cy="25%" r="55%">
        <stop offset="0%"   stopColor="rgba(255,245,190,0.40)" />
        <stop offset="100%" stopColor="rgba(255,245,190,0)" />
      </radialGradient>

      {/* Chip body — dark chocolate, 3-D highlight up-left */}
      <radialGradient id="chipGrad" cx="30%" cy="25%" r="65%">
        <stop offset="0%"   stopColor="#5E2D0E" />
        <stop offset="50%"  stopColor="#2F1004" />
        <stop offset="100%" stopColor="#150500" />
      </radialGradient>

      {/* Chip melted-edge halo */}
      <radialGradient id="chipHalo" cx="50%" cy="50%" r="50%">
        <stop offset="55%" stopColor="rgba(0,0,0,0)" />
        <stop offset="100%" stopColor="rgba(80,28,6,0.55)" />
      </radialGradient>

      {/* Drop shadow */}
      <filter id="cookieShadow" x="-18%" y="-18%" width="136%" height="136%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#7A3A10" floodOpacity="0.38" />
      </filter>

      {/* Subtle inner glow for freshly-baked sheen */}
      <filter id="sheen" x="0%" y="0%" width="100%" height="100%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* ── Cookie body ──────────────────────────────── */}
    <path
      d="M100 11
         C116 7, 141 11, 158 26
         C173 39, 182 60, 183 82
         C185 106, 176 133, 160 150
         C143 168, 118 178, 97 177
         C75 177, 51 166, 36 149
         C20 131, 13 106, 14 83
         C15 60, 25 38, 42 25
         C58 11, 82 14, 100 11Z"
      fill="url(#cookieBase)"
      filter="url(#cookieShadow)"
    />

    {/* Edge darkening for depth */}
    <path
      d="M100 11
         C116 7, 141 11, 158 26
         C173 39, 182 60, 183 82
         C185 106, 176 133, 160 150
         C143 168, 118 178, 97 177
         C75 177, 51 166, 36 149
         C20 131, 13 106, 14 83
         C15 60, 25 38, 42 25
         C58 11, 82 14, 100 11Z"
      fill="none"
      stroke="rgba(100,45,8,0.30)"
      strokeWidth="9"
    />

    {/* Warm surface highlight / sheen */}
    <ellipse
      cx="78" cy="68"
      rx="58" ry="38"
      fill="url(#surfaceTint)"
      transform="rotate(-22 78 68)"
    />

    {/* Fine surface cracks / texture */}
    <path d="M70 58 C76 54, 82 60, 88 56"   fill="none" stroke="rgba(140,68,18,0.22)" strokeWidth="2"   strokeLinecap="round" />
    <path d="M115 74 C120 70, 126 78, 134 73" fill="none" stroke="rgba(140,68,18,0.22)" strokeWidth="2"   strokeLinecap="round" />
    <path d="M62 104 C68 100, 66 110, 76 106" fill="none" stroke="rgba(140,68,18,0.22)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M90 136 C96 132, 100 140, 108 136" fill="none" stroke="rgba(140,68,18,0.22)" strokeWidth="1.5" strokeLinecap="round" />

    {/* ── Chocolate chips ──────────────────────────── */}

    {/* Chip helper: each chip = halo + body + specular highlight */}
    {/* Chip 1 — top-centre-left */}
    <ellipse cx="74"  cy="47"  rx="14" ry="11" fill="url(#chipGrad)" transform="rotate(-22 74 47)"  />
    <ellipse cx="74"  cy="47"  rx="14" ry="11" fill="url(#chipHalo)" transform="rotate(-22 74 47)"  />
    <ellipse cx="68"  cy="42"  rx="4.5" ry="3" fill="rgba(255,235,210,0.30)" transform="rotate(-22 68 42)"  />

    {/* Chip 2 — top-right */}
    <ellipse cx="130" cy="48"  rx="12" ry="15" fill="url(#chipGrad)" transform="rotate(14 130 48)"  />
    <ellipse cx="130" cy="48"  rx="12" ry="15" fill="url(#chipHalo)" transform="rotate(14 130 48)"  />
    <ellipse cx="125" cy="43"  rx="3.5" ry="5" fill="rgba(255,235,210,0.30)" transform="rotate(14 125 43)"  />

    {/* Chip 3 — left middle */}
    <ellipse cx="44"  cy="90"  rx="13" ry="11" fill="url(#chipGrad)" transform="rotate(-8 44 90)"   />
    <ellipse cx="44"  cy="90"  rx="13" ry="11" fill="url(#chipHalo)" transform="rotate(-8 44 90)"   />
    <ellipse cx="39"  cy="85"  rx="4"  ry="3.5" fill="rgba(255,235,210,0.30)" transform="rotate(-8 39 85)"   />

    {/* Chip 4 — centre */}
    <ellipse cx="108" cy="88"  rx="15" ry="12" fill="url(#chipGrad)" transform="rotate(28 108 88)"  />
    <ellipse cx="108" cy="88"  rx="15" ry="12" fill="url(#chipHalo)" transform="rotate(28 108 88)"  />
    <ellipse cx="101" cy="82"  rx="5"  ry="3.5" fill="rgba(255,235,210,0.30)" transform="rotate(28 101 82)"  />

    {/* Chip 5 — right middle */}
    <ellipse cx="156" cy="86"  rx="11" ry="14" fill="url(#chipGrad)" transform="rotate(-16 156 86)" />
    <ellipse cx="156" cy="86"  rx="11" ry="14" fill="url(#chipHalo)" transform="rotate(-16 156 86)" />
    <ellipse cx="151" cy="80"  rx="3.5" ry="4.5" fill="rgba(255,235,210,0.30)" transform="rotate(-16 151 80)" />

    {/* Chip 6 — lower-left */}
    <ellipse cx="68"  cy="140" rx="13" ry="10" fill="url(#chipGrad)" transform="rotate(10 68 140)"  />
    <ellipse cx="68"  cy="140" rx="13" ry="10" fill="url(#chipHalo)" transform="rotate(10 68 140)"  />
    <ellipse cx="63"  cy="135" rx="4"  ry="3"   fill="rgba(255,235,210,0.30)" transform="rotate(10 63 135)"  />

    {/* Chip 7 — lower-right */}
    <ellipse cx="134" cy="142" rx="12" ry="15" fill="url(#chipGrad)" transform="rotate(-20 134 142)" />
    <ellipse cx="134" cy="142" rx="12" ry="15" fill="url(#chipHalo)" transform="rotate(-20 134 142)" />
    <ellipse cx="129" cy="137" rx="3.5" ry="5" fill="rgba(255,235,210,0.30)" transform="rotate(-20 129 137)" />

    {/* Chip 8 — small centre-lower */}
    <ellipse cx="90"  cy="120" rx="11" ry="9"  fill="url(#chipGrad)" transform="rotate(6 90 120)"   />
    <ellipse cx="90"  cy="120" rx="11" ry="9"  fill="url(#chipHalo)" transform="rotate(6 90 120)"   />
    <ellipse cx="86"  cy="116" rx="3.5" ry="2.5" fill="rgba(255,235,210,0.30)" transform="rotate(6 86 116)"   />
  </svg>
);

export default CookieTopView;
