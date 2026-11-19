import type { AccentKey } from "./content";

export const accentGradient: Record<AccentKey, string> = {
  violet: "from-violet-500 to-purple-600",
  cyan: "from-cyan-400 to-sky-600",
  amber: "from-amber-400 to-orange-600",
  rose: "from-rose-400 to-pink-600",
  emerald: "from-emerald-400 to-teal-600",
};

export const accentSolid: Record<AccentKey, string> = {
  violet: "bg-violet-500",
  cyan: "bg-cyan-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  emerald: "bg-emerald-500",
};

export const accentText: Record<AccentKey, string> = {
  violet: "text-violet-600 dark:text-violet-300",
  cyan: "text-cyan-600 dark:text-cyan-300",
  amber: "text-amber-600 dark:text-amber-300",
  rose: "text-rose-600 dark:text-rose-300",
  emerald: "text-emerald-600 dark:text-emerald-300",
};

export const accentChipBg: Record<AccentKey, string> = {
  violet: "bg-violet-100 dark:bg-violet-900/40",
  cyan: "bg-cyan-100 dark:bg-cyan-900/40",
  amber: "bg-amber-100 dark:bg-amber-900/40",
  rose: "bg-rose-100 dark:bg-rose-900/40",
  emerald: "bg-emerald-100 dark:bg-emerald-900/40",
};

/** Article prose: h2/h3 colored by the article's accent, with a matching left marker bar. */
export const accentHeading: Record<AccentKey, string> = {
  violet:
    "[&_h2]:text-violet-700 [&_h2]:dark:text-violet-300 [&_h3]:text-violet-700 [&_h3]:dark:text-violet-300",
  cyan: "[&_h2]:text-cyan-700 [&_h2]:dark:text-cyan-300 [&_h3]:text-cyan-700 [&_h3]:dark:text-cyan-300",
  amber:
    "[&_h2]:text-amber-700 [&_h2]:dark:text-amber-300 [&_h3]:text-amber-700 [&_h3]:dark:text-amber-300",
  rose: "[&_h2]:text-rose-700 [&_h2]:dark:text-rose-300 [&_h3]:text-rose-700 [&_h3]:dark:text-rose-300",
  emerald:
    "[&_h2]:text-emerald-700 [&_h2]:dark:text-emerald-300 [&_h3]:text-emerald-700 [&_h3]:dark:text-emerald-300",
};

/** Article prose: hover highlight on <strong> text, colored by the article's accent. */
export const accentStrongHover: Record<AccentKey, string> = {
  violet:
    "[&_strong:hover]:bg-violet-100 [&_strong:hover]:dark:bg-violet-900/40 [&_strong:hover]:text-violet-700 [&_strong:hover]:dark:text-violet-300",
  cyan: "[&_strong:hover]:bg-cyan-100 [&_strong:hover]:dark:bg-cyan-900/40 [&_strong:hover]:text-cyan-700 [&_strong:hover]:dark:text-cyan-300",
  amber:
    "[&_strong:hover]:bg-amber-100 [&_strong:hover]:dark:bg-amber-900/40 [&_strong:hover]:text-amber-700 [&_strong:hover]:dark:text-amber-300",
  rose: "[&_strong:hover]:bg-rose-100 [&_strong:hover]:dark:bg-rose-900/40 [&_strong:hover]:text-rose-700 [&_strong:hover]:dark:text-rose-300",
  emerald:
    "[&_strong:hover]:bg-emerald-100 [&_strong:hover]:dark:bg-emerald-900/40 [&_strong:hover]:text-emerald-700 [&_strong:hover]:dark:text-emerald-300",
};
