import { For, Show, createMemo } from "solid-js";
import { A, useNavigate, useParams } from "@solidjs/router";
import { useI18n } from "../i18n/context";
import { getArticleBySlugWithFallback, getRelatedArticles } from "../lib/content";
import { accentChipBg, accentGradient, accentText } from "../lib/accent";
import ArticleCard from "../components/ArticleCard";
import CoverIllustration from "../components/CoverIllustration";
import NotFound from "./NotFound";

export default function Article() {
  const params = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { locale, t } = useI18n();

  const result = createMemo(() => getArticleBySlugWithFallback(locale(), params.slug));

  return (
    <Show when={result()} fallback={<NotFound />} keyed>
      {(res) => {
        const article = res.article;
        const related = getRelatedArticles(article);
        return (
          <article class="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
            <button
              type="button"
              onClick={() => navigate(`/${locale()}`)}
              class="mt-6 inline-flex min-h-9 items-center gap-1 rounded-full px-1 text-sm font-medium text-ink-500 transition-colors duration-150 hover:text-brand-600 dark:text-ink-300 dark:hover:text-brand-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {t("back_home")}
            </button>

            <Show when={res.isFallback}>
              <p class="mt-4 rounded-xl bg-amber-100 px-4 py-2 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                {t("article_unavailable_in_lang")}
              </p>
            </Show>

            <div
              class={`relative mt-4 flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br shadow-elev-2 sm:h-56 ${accentGradient[article.accent ?? "violet"]}`}
            >
              <Show
                when={article.thumbnail}
                fallback={
                  <>
                    <div class="absolute inset-0 opacity-15 mix-blend-overlay" aria-hidden="true">
                      <svg width="100%" height="100%">
                        <defs>
                          <pattern id={`hero-dots-${article.id}`} width="16" height="16" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1.5" fill="white" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#hero-dots-${article.id})`} />
                      </svg>
                    </div>
                    <CoverIllustration cover={article.cover ?? "network"} class="h-28 w-28 opacity-95 sm:h-36 sm:w-36" />
                  </>
                }
              >
                <img
                  src={article.thumbnail}
                  alt=""
                  aria-hidden="true"
                  class="absolute inset-0 h-full w-full object-cover object-top"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" aria-hidden="true" />
              </Show>
            </div>

            <header class="mt-4">
              <div class="flex flex-wrap gap-1.5">
                <For each={article.tags}>
                  {(tag) => (
                    <span
                      class={`rounded-full px-2 py-0.5 text-xs font-medium ${accentChipBg[article.accent ?? "violet"]} ${accentText[article.accent ?? "violet"]}`}
                    >
                      {tag}
                    </span>
                  )}
                </For>
              </div>
              <h1
                class="mt-3 font-display font-bold text-ink-900 dark:text-white"
                style={{ "font-size": "clamp(1.75rem, 1.3rem + 1.8vw, 2.6rem)", "line-height": "1.15" }}
              >
                {article.title}
              </h1>
              <p class="mt-3 flex flex-wrap items-center gap-2 text-sm text-ink-500 dark:text-ink-400">
                <span>
                  {t("published_on")} {article.date}
                </span>
                <span aria-hidden="true">·</span>
                <span>{t("reading_time", { n: article.readingMinutes })}</span>
              </p>
            </header>

            <div
              class="prose-article mt-8 max-w-none text-[1.05rem] leading-7 text-ink-700 dark:text-ink-200 [&_h2]:mt-9 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink-900 [&_h2]:dark:text-white [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_p]:my-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_blockquote]:my-5 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-ink-500 [&_strong]:font-semibold [&_strong]:text-ink-900 [&_strong]:dark:text-white [&_table]:my-5 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:border-collapse [&_table]:text-sm [&_th]:border [&_th]:border-ink-200 [&_th]:bg-ink-100 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:dark:border-white/10 [&_th]:dark:bg-white/5 [&_td]:border [&_td]:border-ink-200 [&_td]:px-3 [&_td]:py-2 [&_td]:align-top [&_td]:dark:border-white/10 [&_svg]:my-2 [&_svg]:h-auto [&_svg]:max-w-full [&_figure]:my-6 [&_img]:w-full [&_img]:rounded-xl [&_img]:border [&_img]:border-ink-200 [&_img]:shadow-elev-2 [&_img]:dark:border-white/10 [&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-ink-500 [&_figcaption]:dark:text-ink-400"
              innerHTML={article.html}
            />

            <Show when={related.length > 0}>
              <section class="mt-14">
                <h2 class="font-display text-lg font-semibold text-ink-900 dark:text-white">
                  {t("related_title")}
                </h2>
                <div class="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <For each={related}>{(a) => <ArticleCard article={a} />}</For>
                </div>
              </section>
            </Show>

            <div class="mt-10">
              <A
                href={`/${locale()}`}
                class="inline-flex min-h-11 items-center rounded-full bg-brand-600 px-5 text-sm font-semibold text-white shadow-elev-2 transition-transform duration-150 hover:-translate-y-0.5 hover:bg-brand-700"
              >
                {t("back_home")}
              </A>
            </div>
          </article>
        );
      }}
    </Show>
  );
}
