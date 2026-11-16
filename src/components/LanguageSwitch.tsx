import { For } from "solid-js";
import { useI18n } from "../i18n/context";
import { locales, localeNames } from "../i18n/translations";

export default function LanguageSwitch() {
  const { locale, switchTo, t } = useI18n();

  return (
    <div
      class="inline-flex items-center gap-0.5 rounded-full border border-ink-200/70 bg-white/70 p-1 shadow-elev-1 dark:border-white/10 dark:bg-white/5"
      role="group"
      aria-label={t("toggle_lang")}
    >
      <For each={locales}>
        {(l) => (
          <button
            type="button"
            onClick={() => switchTo(l)}
            aria-pressed={locale() === l}
            class={`min-h-9 whitespace-nowrap rounded-full px-2.5 text-xs font-medium transition-colors duration-150 sm:px-3 sm:text-sm ${
              locale() === l
                ? "bg-brand-600 text-white shadow-elev-1"
                : "text-ink-500 hover:text-ink-800 dark:text-ink-300 dark:hover:text-white"
            }`}
          >
            {localeNames[l]}
          </button>
        )}
      </For>
    </div>
  );
}
