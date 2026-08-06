interface ChocolateCakeProps {
  className?: string;
}

const gold = "#e8b765";
const goldLight = "#f7dcab";
const goldDeep = "#c9873a";

function Drip({ cx, cy, depth, fill }: { cx: number; cy: number; depth: number; fill: string }) {
  return (
    <path
      d={`M ${cx} ${cy} C ${cx - 6} ${cy + depth * 0.35}, ${cx - 5} ${cy + depth * 0.7}, ${cx} ${cy + depth} C ${cx + 5} ${cy + depth * 0.7}, ${cx + 6} ${cy + depth * 0.35}, ${cx} ${cy} Z`}
      fill={fill}
    />
  );
}

function Berry({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <path
        d={`M ${cx} ${cy - r * 1.5} c 2 -4 6 -5 8 -2 c 1 1 0 3 -2 2`}
        fill="none"
        stroke="#5d7a45"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={r} fill="#9e1f1a" />
      <circle cx={cx} cy={cy} r={r} fill="url(#berryShine)" opacity="0.55" />
      <circle cx={cx - r * 0.3} cy={cy - r * 0.35} r={r * 0.28} fill="#ffd9d2" opacity="0.85" />
    </g>
  );
}

function GoldFlake({ x, y, s, r }: { x: number; y: number; s: number; r: number }) {
  const p = [
    `${x},${y - s}`,
    `${x + s * 0.7},${y - s * 0.3}`,
    `${x + s * 0.45},${y + s * 0.7}`,
    `${x - s * 0.45},${y + s * 0.7}`,
    `${x - s * 0.7},${y - s * 0.3}`,
  ].join(" ");
  return (
    <polygon
      points={p}
      fill={goldLight}
      opacity="0.9"
      transform={`rotate(${r} ${x} ${y})`}
    />
  );
}

function Ferrero({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <path
        d={`M ${cx} ${cy - r * 1.25} c -2 -4 -7 -5 -9 -2 c -1 1 0 3 2 3`}
        fill="none"
        stroke="#6b4023"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={r} fill="url(#ferreroBody)" />
      <circle cx={cx} cy={cy} r={r} fill="url(#ferreroBand)" opacity="0.9" />
      <circle cx={cx - r * 0.3} cy={cy - r * 0.3} r={r * 0.3} fill="#ffe9c4" opacity="0.7" />
    </g>
  );
}

function Curl({ x, y, scale }: { x: number; y: number; scale: number }) {
  return (
    <path
      d={`M ${x} ${y} c ${6 * scale} ${-8 * scale} ${16 * scale} ${-6 * scale} ${16 * scale} ${2 * scale} c 0 ${5 * scale} ${-7 * scale} ${6 * scale} ${-12 * scale} ${3 * scale} c ${3 * scale} ${1.5 * scale} ${7 * scale} ${1 * scale} ${9 * scale} ${-2 * scale}`}
      fill="none"
      stroke="#2a160c"
      strokeWidth={2.6 * scale}
      strokeLinecap="round"
    />
  );
}

function Crystal({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <path
      d={`M ${x} ${y - s} L ${x + s} ${y} L ${x} ${y + s} L ${x - s} ${y} Z`}
      fill="#fff7ea"
      opacity="0.9"
    />
  );
}

export function ChocolateCake({ className }: ChocolateCakeProps) {
  return (
    <svg
      viewBox="0 0 420 480"
      className={className}
      role="img"
      aria-label="A floating chocolate celebration cake with gold flakes, berries and chocolates"
    >
      <defs>
        <linearGradient id="tierBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2a160c" />
          <stop offset="0.5" stopColor="#4a2c1a" />
          <stop offset="1" stopColor="#1f0f07" />
        </linearGradient>
        <linearGradient id="tierShine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ganacheTop" cx="0.5" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#5a341d" />
          <stop offset="0.55" stopColor="#3a2113" />
          <stop offset="1" stopColor="#221009" />
        </radialGradient>
        <radialGradient id="berryShine" cx="0.4" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#ff8a7a" />
          <stop offset="1" stopColor="#9e1f1a" />
        </radialGradient>
        <radialGradient id="ferreroBody" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#7a4a26" />
          <stop offset="1" stopColor="#3a2113" />
        </radialGradient>
        <linearGradient id="ferreroBand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={goldDeep} stopOpacity="0" />
          <stop offset="0.42" stopColor={gold} stopOpacity="0.85" />
          <stop offset="0.6" stopColor={gold} stopOpacity="0.85" />
          <stop offset="1" stopColor={goldDeep} stopOpacity="0" />
        </linearGradient>
        <radialGradient id="cakeGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={gold} stopOpacity="0.5" />
          <stop offset="0.6" stopColor={goldDeep} stopOpacity="0.25" />
          <stop offset="1" stopColor={goldDeep} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft glow halo behind the cake */}
      <ellipse cx="210" cy="250" rx="215" ry="230" fill="url(#cakeGlow)" />

      {/* ================= Bottom tier ================= */}
      {/* Body */}
      <rect x="62" y="228" width="296" height="140" rx="18" fill="url(#tierBody)" />
      <rect x="86" y="228" width="70" height="140" rx="12" fill="url(#tierShine)" />
      {/* Ganache drips */}
      <Drip cx={98} cy={228} depth={40} fill="#3a2113" />
      <Drip cx={142} cy={228} depth={62} fill="#2e180d" />
      <Drip cx={186} cy={228} depth={34} fill="#3a2113" />
      <Drip cx={222} cy={228} depth={70} fill="#2e180d" />
      <Drip cx={266} cy={228} depth={38} fill="#3a2113" />
      <Drip cx={318} cy={228} depth={52} fill="#2e180d" />
      {/* Ganache top */}
      <ellipse cx="210" cy="228" rx="150" ry="24" fill="url(#ganacheTop)" />
      <ellipse cx="210" cy="228" rx="150" ry="24" fill="none" stroke="#6b4023" strokeWidth="1" opacity="0.6" />
      <ellipse cx="150" cy="220" rx="46" ry="9" fill="#ffffff" opacity="0.12" />

      {/* ================= Top tier ================= */}
      <rect x="120" y="120" width="180" height="112" rx="14" fill="url(#tierBody)" />
      <rect x="140" y="120" width="46" height="112" rx="10" fill="url(#tierShine)" />
      <Drip cx={152} cy={120} depth={34} fill="#3a2113" />
      <Drip cx={196} cy={120} depth={52} fill="#2e180d" />
      <Drip cx={240} cy={120} depth={30} fill="#3a2113" />
      <Drip cx={276} cy={120} depth={44} fill="#2e180d" />
      <ellipse cx="210" cy="120" rx="92" ry="17" fill="url(#ganacheTop)" />
      <ellipse cx="210" cy="120" rx="92" ry="17" fill="none" stroke="#6b4023" strokeWidth="1" opacity="0.6" />
      <ellipse cx="160" cy="115" rx="30" ry="6.5" fill="#ffffff" opacity="0.12" />

      {/* ================= Garnish ================= */}
      {/* Berries cluster */}
      <Berry cx={196} cy={96} r={10} />
      <Berry cx={222} cy={92} r={9} />
      <Berry cx={210} cy={106} r={9} />
      {/* Curls */}
      <Curl x={242} y={100} scale={1.1} />
      <Curl x={172} y={106} scale={0.8} />
      {/* Gold flakes on top tier */}
      <GoldFlake x={238} y={98} s={5} r={20} />
      <GoldFlake x={184} y={100} s={4} r={-14} />
      <GoldFlake x={208} y={86} s={3.5} r={40} />
      <GoldFlake x={258} y={106} s={3} r={-30} />
      {/* Gold flakes on bottom tier */}
      <GoldFlake x={120} y={212} s={4.5} r={15} />
      <GoldFlake x={300} y={208} s={5} r={-22} />
      <GoldFlake x={170} y={206} s={3} r={55} />
      <GoldFlake x={248} y={216} s={4} r={-40} />
      <GoldFlake x={330} y={218} s={3.5} r={8} />
      {/* Sugar crystals */}
      <Crystal x={130} y={118} s={3} />
      <Crystal x={282} y={112} s={2.6} />
      <Crystal x={160} y={232} s={2.8} />
      <Crystal x={300} y={224} s={3.2} />
      <Crystal x={206} y={92} s={2.4} />

      {/* ================= Ferrero chocolates ================= */}
      <Ferrero cx={118} cy={372} r={17} />
      <Ferrero cx={212} cy={380} r={19} />
      <Ferrero cx={300} cy={370} r={16} />
      <Ferrero cx={170} cy={384} r={13} />
      <Ferrero cx={258} cy={382} r={14} />
    </svg>
  );
}
