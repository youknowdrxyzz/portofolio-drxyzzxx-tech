export default function WorkArt(props) {
  const kind = props.kind;
  if (kind === "video") {
    return (
      <div className="art-svg">
        <svg
          viewBox="0 0 200 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <rect x="20" y="30" width="160" height="60" rx="4" />
          <polygon
            points="92,50 92,70 112,60"
            fill="currentColor"
            stroke="none"
          />
          <line
            x1="20"
            y1="100"
            x2="180"
            y2="100"
            strokeDasharray="2 4"
          />
          <rect
            x="30"
            y="105"
            width="20"
            height="6"
            fill="currentColor"
            stroke="none"
            opacity="0.6"
          />
          <rect
            x="55"
            y="105"
            width="40"
            height="6"
            fill="currentColor"
            stroke="none"
            opacity="0.4"
          />
          <rect
            x="100"
            y="105"
            width="15"
            height="6"
            fill="currentColor"
            stroke="none"
            opacity="0.6"
          />
          <rect
            x="120"
            y="105"
            width="50"
            height="6"
            fill="currentColor"
            stroke="none"
            opacity="0.4"
          />
        </svg>
      </div>
    );
  }
  if (kind === "uiux") {
    return (
      <div className="art-svg">
        <svg
          viewBox="0 0 200 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <rect x="20" y="15" width="60" height="90" rx="6" />
          <rect x="90" y="15" width="90" height="90" rx="6" />
          <circle cx="50" cy="35" r="8" />
          <line x1="30" y1="55" x2="70" y2="55" />
          <line x1="30" y1="65" x2="60" y2="65" />
          <rect
            x="30"
            y="78"
            width="40"
            height="14"
            rx="3"
            fill="currentColor"
            stroke="none"
          />
          <line x1="100" y1="25" x2="170" y2="25" strokeWidth="2" />
          <line x1="100" y1="35" x2="150" y2="35" />
          <rect x="100" y="50" width="30" height="30" rx="3" />
          <rect x="135" y="50" width="30" height="30" rx="3" />
          <line x1="100" y1="90" x2="170" y2="90" />
        </svg>
      </div>
    );
  }
  if (kind === "defi") {
    return (
      <div className="art-svg">
        <svg
          viewBox="0 0 200 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="65" cy="60" r="28" />
          <circle cx="135" cy="60" r="28" />
          <path d="M 65 42 L 77 60 L 65 78 L 53 60 Z" />
          <line x1="53" y1="60" x2="77" y2="60" opacity="0.6" />
          <line x1="125" y1="52" x2="145" y2="52" />
          <line x1="125" y1="60" x2="145" y2="60" />
          <line x1="125" y1="68" x2="145" y2="68" />
          <path d="M 88 22 Q 100 12, 112 22" />
          <polyline points="108,16 112,22 106,24" fill="none" />
          <path d="M 112 98 Q 100 108, 88 98" />
          <polyline points="92,104 88,98 94,96" fill="none" />
        </svg>
      </div>
    );
  }
  if (kind === "dao") {
    return (
      <div className="art-svg">
        <svg
          viewBox="0 0 200 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="100" cy="60" r="18" />
          <polyline points="93,60 98,66 108,54" strokeWidth="1.5" />
          <circle cx="40" cy="28" r="8" />
          <circle cx="160" cy="28" r="8" />
          <circle cx="40" cy="92" r="8" />
          <circle cx="160" cy="92" r="8" />
          <circle cx="100" cy="14" r="6" />
          <line x1="46" y1="33" x2="86" y2="52" />
          <line x1="154" y1="33" x2="114" y2="52" />
          <line x1="46" y1="87" x2="86" y2="68" />
          <line x1="154" y1="87" x2="114" y2="68" />
          <line x1="100" y1="20" x2="100" y2="42" />
          <circle cx="40" cy="28" r="2.5" fill="currentColor" stroke="none" />
          <circle cx="160" cy="92" r="2.5" fill="currentColor" stroke="none" />
        </svg>
      </div>
    );
  }
  if (kind === "rwa") {
    return (
      <div className="art-svg">
        <svg
          viewBox="0 0 200 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <rect x="48" y="74" width="104" height="14" rx="2" />
          <rect x="58" y="56" width="84" height="14" rx="2" opacity="0.75" />
          <rect x="68" y="38" width="64" height="14" rx="2" opacity="0.5" />
          <polygon points="100,14 112,22 100,30 88,22" />
          <line x1="100" y1="30" x2="100" y2="38" opacity="0.6" />
          <circle cx="100" cy="81" r="3" fill="currentColor" stroke="none" />
          <circle cx="100" cy="63" r="2.5" fill="currentColor" stroke="none" opacity="0.7" />
          <line x1="36" y1="100" x2="164" y2="100" strokeDasharray="2 4" opacity="0.6" />
        </svg>
      </div>
    );
  }
  if (kind === "motion") {
    return (
      <div className="art-svg">
        <svg
          viewBox="0 0 200 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="100" cy="60" r="40" />
          <circle cx="100" cy="60" r="28" opacity="0.6" />
          <circle cx="100" cy="60" r="16" opacity="0.4" />
          <path d="M 60 60 Q 100 20, 140 60 Q 100 100, 60 60" />
          <circle
            cx="100"
            cy="60"
            r="3"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      </div>
    );
  }
  return null;
}
