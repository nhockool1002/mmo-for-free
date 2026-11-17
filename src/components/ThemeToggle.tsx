import { Show } from "solid-js";
import { useTheme } from "../theme";
import { useI18n } from "../i18n/context";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={theme() === "dark"}
      aria-label={t("toggle_theme")}
      title={t("toggle_theme")}
      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-200/70 bg-white/70 text-ink-500 shadow-elev-1 transition-colors duration-150 hover:text-ink-800 dark:border-white/10 dark:bg-white/5 dark:text-ink-300 dark:hover:text-white"
    >
      <Show
        when={theme() === "dark"}
        fallback={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="2" />
            <path
              d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4l1.4-1.4M18 6l1.4-1.4"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        }
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linejoin="round"
          />
        </svg>
      </Show>
    </button>
  );
}
