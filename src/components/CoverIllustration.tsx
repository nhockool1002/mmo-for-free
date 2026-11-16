export type CoverKey =
  | "affiliate"
  | "freelance"
  | "content"
  | "survey"
  | "ecommerce"
  | "crypto"
  | "network";

export default function CoverIllustration(props: { cover: CoverKey; class?: string }) {
  const common = {
    viewBox: "0 0 120 120",
    class: props.class,
    "aria-hidden": "true" as const,
  };
  const strokeProps = {
    fill: "none",
    stroke: "white",
    "stroke-width": "5",
    "stroke-linecap": "round" as const,
    "stroke-linejoin": "round" as const,
  };

  switch (props.cover) {
    case "affiliate":
      return (
        <svg {...common}>
          <g {...strokeProps}>
            <rect x="26" y="44" width="46" height="24" rx="12" transform="rotate(45 49 56)" />
            <rect x="48" y="54" width="46" height="24" rx="12" transform="rotate(45 71 66)" />
          </g>
          <circle cx="88" cy="30" r="13" fill="white" fill-opacity="0.9" />
          <g stroke="white" stroke-width="3" stroke-linecap="round">
            <line x1="88" y1="24" x2="88" y2="36" stroke="var(--color-brand-700)" />
            <line x1="82" y1="30" x2="94" y2="30" stroke="var(--color-brand-700)" />
          </g>
        </svg>
      );
    case "freelance":
      return (
        <svg {...common}>
          <rect x="30" y="32" width="60" height="40" rx="5" {...strokeProps} />
          <path d="M18 80 L34 72 H86 L102 80 Z" fill="white" fill-opacity="0.85" />
          <path d="M44 52 L54 62 L78 40" {...strokeProps} />
        </svg>
      );
    case "content":
      return (
        <svg {...common}>
          <rect x="22" y="28" width="76" height="58" rx="10" {...strokeProps} />
          <path d="M50 44 L74 54 L50 64 Z" fill="white" stroke="none" />
        </svg>
      );
    case "survey":
      return (
        <svg {...common}>
          <rect x="32" y="24" width="56" height="72" rx="7" {...strokeProps} />
          <rect x="46" y="18" width="28" height="13" rx="3.5" fill="white" />
          <line x1="42" y1="52" x2="78" y2="52" {...strokeProps} />
          <line x1="42" y1="64" x2="78" y2="64" {...strokeProps} />
          <path d="M42 78 L50 86 L66 70" {...strokeProps} />
        </svg>
      );
    case "ecommerce":
      return (
        <svg {...common}>
          <g {...strokeProps} stroke-linejoin="round">
            <path d="M60 24 L88 38 L60 52 L32 38 Z" fill="white" fill-opacity="0.3" />
            <path d="M32 38 L60 52 L60 92 L32 78 Z" fill="white" fill-opacity="0.1" />
            <path d="M88 38 L60 52 L60 92 L88 78 Z" fill="white" fill-opacity="0.18" />
          </g>
        </svg>
      );
    case "crypto":
      return (
        <svg {...common}>
          <polygon points="60,24 85,39 85,69 60,84 35,69 35,39" {...strokeProps} />
          <path d="M44 24 Q60 6 76 24" {...strokeProps} />
          <line x1="48" y1="26" x2="54" y2="36" {...strokeProps} stroke-width="3" />
          <line x1="72" y1="26" x2="66" y2="36" {...strokeProps} stroke-width="3" />
          <circle cx="60" cy="54" r="10" fill="white" fill-opacity="0.85" />
        </svg>
      );
    case "network":
    default:
      return (
        <svg {...common}>
          <circle cx="60" cy="82" r="9" fill="white" />
          <path d="M34 70 A 38 38 0 0 1 86 70" {...strokeProps} />
          <path d="M44 66 A 24 24 0 0 1 76 66" {...strokeProps} />
          <path d="M53 62 A 10 10 0 0 1 67 62" {...strokeProps} />
        </svg>
      );
  }
}
