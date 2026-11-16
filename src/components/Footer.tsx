import { useI18n } from "../i18n/context";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer class="mt-16 border-t border-ink-200/60 py-10 text-sm text-ink-500 dark:border-white/10 dark:text-ink-300">
      <div class="mx-auto flex max-w-5xl flex-col gap-3 px-4 sm:px-6">
        <p class="max-w-prose">{t("footer_disclaimer")}</p>
        <p>
          © {year} MMO For Free ·{" "}
          <a
            href="https://github.com/nhockool1002/mmo-for-free"
            target="_blank"
            rel="noreferrer"
            class="font-medium text-brand-600 underline decoration-brand-300 underline-offset-2 dark:text-brand-300"
          >
            {t("footer_madeby")} GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
