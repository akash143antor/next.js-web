'use client';

/**
 * SVG-based premium border frames for the card.
 * Replaces Flutter's CustomPainter-based frames.
 * SVG works in all browsers including in-app WebViews.
 */
export default function PremiumFrame({ styleIndex, color }) {
  switch (styleIndex) {
    case 1: return <ClassicDiamondFrame color={color} />;
    case 2: return <RoyalCornersFrame color={color} />;
    case 3: return <IslamicArchFrame color={color} />;
    case 4: return <TopBottomDecoFrame color={color} />;
    case 5: return <VintageDoubleFrame color={color} />;
    default: return null;
  }
}

function ClassicDiamondFrame({ color }) {
  const m = 35, iM = 55;
  return (
    <svg className="frame-svg" viewBox="0 0 1080 1920" preserveAspectRatio="none">
      <rect x={m} y={m} width={1080 - m*2} height={1920 - m*2}
        fill="none" stroke={color} strokeWidth="10" strokeOpacity="0.9" />
      <rect x={iM} y={iM} width={1080 - iM*2} height={1920 - iM*2}
        fill="none" stroke={color} strokeWidth="4" strokeOpacity="0.4" />
      {/* Diamonds at corners and midpoints */}
      {[[m,m],[1080-m,m],[m,1920-m],[1080-m,1920-m],[540,m],[540,1920-m],[m,960],[1080-m,960]].map(([cx,cy],i) => (
        <rect key={i} x={cx-21} y={cy-21} width="42" height="42"
          fill={color} stroke="rgba(255,255,255,0.5)" strokeWidth="4"
          transform={`rotate(45 ${cx} ${cy})`} />
      ))}
    </svg>
  );
}

function RoyalCornersFrame({ color }) {
  const inset = 40, cl = 250;
  return (
    <svg className="frame-svg" viewBox="0 0 1080 1920" preserveAspectRatio="none">
      <rect x={inset} y={inset} width={1080-inset*2} height={1920-inset*2}
        fill="none" stroke={color} strokeWidth="6" strokeOpacity="0.6" />
      {/* Top-left */}
      <polyline points={`0,${cl} 0,0 ${cl},0`} fill="none" stroke={color} strokeWidth="25" />
      {/* Top-right */}
      <polyline points={`${1080-cl},0 1080,0 1080,${cl}`} fill="none" stroke={color} strokeWidth="25" />
      {/* Bottom-left */}
      <polyline points={`0,${1920-cl} 0,1920 ${cl},1920`} fill="none" stroke={color} strokeWidth="25" />
      {/* Bottom-right */}
      <polyline points={`${1080-cl},1920 1080,1920 1080,${1920-cl}`} fill="none" stroke={color} strokeWidth="25" />
      {/* Corner dots */}
      {[[inset,inset],[1080-inset,inset],[inset,1920-inset],[1080-inset,1920-inset]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="15" fill={color} />
      ))}
    </svg>
  );
}

function IslamicArchFrame({ color }) {
  return (
    <svg className="frame-svg" viewBox="0 0 1080 1920" preserveAspectRatio="none">
      <path d={`M 35 1885 L 35 480 Q 35 192 540 40 Q 1045 192 1045 480 L 1045 1885 L 35 1885`}
        fill="none" stroke={color} strokeWidth="18" />
      <path d={`M 80 1875 L 80 480 Q 80 210 540 70 Q 1000 210 1000 480 L 1000 1875 L 80 1875`}
        fill="none" stroke={color} strokeWidth="6" strokeOpacity="0.7" />
      {/* Diamond at top */}
      <polygon points="540,8 560,36 540,63 520,36" fill={color} />
    </svg>
  );
}

function TopBottomDecoFrame({ color }) {
  return (
    <svg className="frame-svg" viewBox="0 0 1080 1920" preserveAspectRatio="none">
      {/* Top decoration */}
      <circle cx="40" cy="60" r="20" fill={color} />
      <rect x="60" y="56" width="430" height="8" fill={color} fillOpacity="0.8" />
      <circle cx="500" cy="60" r="18" fill="none" stroke={color} strokeWidth="6" />
      <rect x="520" y="40" width="40" height="40" fill={color} transform="rotate(45 540 60)" />
      <circle cx="580" cy="60" r="18" fill="none" stroke={color} strokeWidth="6" />
      <rect x="600" y="56" width="430" height="8" fill={color} fillOpacity="0.8" />
      <circle cx="1040" cy="60" r="20" fill={color} />
      {/* Bottom decoration (mirrored) */}
      <circle cx="40" cy="1860" r="20" fill={color} />
      <rect x="60" y="1856" width="430" height="8" fill={color} fillOpacity="0.8" />
      <circle cx="500" cy="1860" r="18" fill="none" stroke={color} strokeWidth="6" />
      <rect x="520" y="1840" width="40" height="40" fill={color} transform="rotate(45 540 1860)" />
      <circle cx="580" cy="1860" r="18" fill="none" stroke={color} strokeWidth="6" />
      <rect x="600" y="1856" width="430" height="8" fill={color} fillOpacity="0.8" />
      <circle cx="1040" cy="1860" r="20" fill={color} />
    </svg>
  );
}

function VintageDoubleFrame({ color }) {
  return (
    <svg className="frame-svg" viewBox="0 0 1080 1920" preserveAspectRatio="none">
      <rect x="40" y="40" width="1000" height="1840" rx="40"
        fill="none" stroke={color} strokeWidth="25" strokeOpacity="0.9" />
      <rect x="70" y="70" width="940" height="1780" rx="20"
        fill="none" stroke={color} strokeWidth="6" strokeOpacity="0.6" />
      <rect x="85" y="85" width="910" height="1750" rx="10"
        fill="none" stroke={color} strokeWidth="2" strokeOpacity="0.3" />
    </svg>
  );
}
