import { A } from "@solidjs/router";
import { useI18n } from "../i18n/context";
import LanguageSwitch from "./LanguageSwitch";

export default function Header() {
  const { locale, t } = useI18n();

  return (
    <header class="glass sticky top-0 z-40 border-b border-ink-200/60 dark:border-white/10">
      <div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <A
          href={`/${locale()}`}
          class="flex min-w-0 shrink items-center gap-2 whitespace-nowrap font-display text-base font-semibold text-ink-900 no-underline sm:text-lg dark:text-white"
        >
          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold text-white shadow-elev-2">
            M
          </span>
          <span class="truncate">{t("siteName")}</span>
        </A>

        <nav class="flex shrink-0 items-center gap-3">
          <a
            href="https://github.com/nhockool1002/mmo-for-free"
            target="_blank"
            rel="noreferrer"
            class="hidden min-h-11 items-center rounded-full px-3 text-sm font-medium text-ink-500 transition-colors duration-150 hover:text-ink-800 sm:inline-flex dark:text-ink-300 dark:hover:text-white"
          >
            {t("nav_github")}
          </a>
          <LanguageSwitch />
        </nav>
      </div>
    </header>
  );
}
