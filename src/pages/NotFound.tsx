import { A } from "@solidjs/router";
import { useI18n } from "../i18n/context";

export default function NotFound() {
  const { locale, t } = useI18n();

  return (
    <div class="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
      <span class="font-display text-6xl font-bold text-brand-500">404</span>
      <h1 class="mt-4 font-display text-2xl font-semibold text-ink-900 dark:text-white">
        {t("not_found_title")}
      </h1>
      <p class="mt-2 text-ink-500 dark:text-ink-300">{t("not_found_desc")}</p>
      <A
        href={`/${locale()}`}
        class="mt-6 inline-flex min-h-11 items-center rounded-full bg-brand-600 px-5 text-sm font-semibold text-white shadow-elev-2 transition-transform duration-150 hover:-translate-y-0.5 hover:bg-brand-700"
      >
        {t("back_home")}
      </A>
    </div>
  );
}
