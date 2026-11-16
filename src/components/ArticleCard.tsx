import { A } from "@solidjs/router";
import type { Article } from "../lib/content";
import { accentGradient, accentChipBg, accentText } from "../lib/accent";
import { useI18n } from "../i18n/context";

export default function ArticleCard(props: { article: Article; index?: number }) {
  const { locale, t } = useI18n();

  return (
    <A
      href={`/${locale()}/bai-viet/${props.article.slug}`}
      class="group flex flex-col overflow-hidden rounded-2xl border border-ink-200/60 bg-white shadow-elev-1 transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-elev-3 dark:border-white/10 dark:bg-ink-900"
      style={{ "transition-property": "transform, box-shadow" }}
    >
      <div
        class={`relative flex h-28 items-end bg-gradient-to-br p-4 ${accentGradient[props.article.accent ?? "violet"]}`}
      >
        <div class="absolute inset-0 opacity-20 mix-blend-overlay" aria-hidden="true">
          <svg width="100%" height="100%">
            <defs>
              <pattern id={`dots-${props.article.id}`} width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.4" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#dots-${props.article.id})`} />
          </svg>
        </div>
        <span class="relative rounded-full bg-black/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {t("reading_time", { n: props.article.readingMinutes })}
        </span>
      </div>

      <div class="flex flex-1 flex-col gap-2 p-5">
        <div class="flex flex-wrap gap-1.5">
          {props.article.tags.slice(0, 3).map((tag) => (
            <span
              class={`rounded-full px-2 py-0.5 text-xs font-medium ${accentChipBg[props.article.accent ?? "violet"]} ${accentText[props.article.accent ?? "violet"]}`}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 class="font-display text-lg font-semibold leading-snug text-ink-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
          {props.article.title}
        </h3>
        <p class="line-clamp-2 flex-1 text-sm text-ink-500 dark:text-ink-300">
          {props.article.excerpt}
        </p>
        <span class="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-300">
          {t("read_more")}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            class="transition-transform duration-150 group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </div>
    </A>
  );
}
