import { For, Show, createMemo, createSignal, createEffect } from "solid-js";
import { useI18n } from "../i18n/context";
import { getArticles, getAllTags } from "../lib/content";
import ArticleCard from "../components/ArticleCard";
import { setSeo } from "../lib/seo";

export default function Home() {
  const { locale, t } = useI18n();
  const [query, setQuery] = createSignal("");
  const [activeTag, setActiveTag] = createSignal<string | null>(null);

  const articles = createMemo(() => getArticles(locale()));
  const tags = createMemo(() => getAllTags(locale()));

  createEffect(() => {
    setSeo({
      title: t("seo_home_title"),
      description: t("seo_home_description"),
      keywords:
        locale() === "vi"
          ? ["kiếm tiền online", "kiếm tiền thụ động", "việc làm khi thất nghiệp", "IT thất nghiệp", "sa thải"]
          : ["make money online", "passive income", "jobs after layoffs", "unemployed IT workers", "tech layoffs"],
      path: `/${locale()}`,
      locale: locale(),
      type: "website",
    });
  });

  const filtered = createMemo(() => {
    const q = query().trim().toLowerCase();
    const tag = activeTag();
    return articles().filter((a) => {
      const matchesQuery =
        !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q);
      const matchesTag = !tag || a.tags.includes(tag);
      return matchesQuery && matchesTag;
    });
  });

  return (
    <div class="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
      <section class="relative overflow-hidden rounded-3xl border border-ink-200/60 bg-gradient-to-br from-brand-50 via-white to-accent-400/10 px-6 py-14 text-center shadow-elev-2 sm:px-10 dark:border-white/10 dark:from-ink-900 dark:via-ink-950 dark:to-brand-900/30">
        <div
          class="pointer-events-none absolute -top-20 right-0 h-64 w-64 rounded-full bg-accent-400/30 blur-3xl"
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-brand-400/30 blur-3xl"
          aria-hidden="true"
        />
        <h1
          class="relative mx-auto max-w-2xl font-display font-bold text-ink-900 dark:text-white"
          style={{ "font-size": "clamp(1.9rem, 1.3rem + 2.4vw, 3.1rem)", "line-height": "1.1" }}
        >
          {t("hero_title")}
        </h1>
        <p class="relative mx-auto mt-4 max-w-xl text-ink-500 dark:text-ink-300" style={{ "font-size": "clamp(1rem, 0.9rem + 0.3vw, 1.125rem)" }}>
          {t("hero_subtitle")}
        </p>
      </section>

      <section class="mt-10">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 class="font-display text-xl font-semibold text-ink-900 dark:text-white">
            {t("all_articles")}{" "}
            <span class="text-sm font-normal text-ink-400">
              ({t("article_count", { n: articles().length })})
            </span>
          </h2>
          <label class="relative block w-full sm:w-72">
            <span class="sr-only">{t("search_placeholder")}</span>
            <input
              type="search"
              value={query()}
              onInput={(e) => setQuery(e.currentTarget.value)}
              placeholder={t("search_placeholder")}
              class="min-h-11 w-full rounded-full border border-ink-200/70 bg-white px-4 text-sm text-ink-800 shadow-elev-1 outline-none transition-colors duration-150 placeholder:text-ink-400 focus:border-brand-400 dark:border-white/10 dark:bg-ink-900 dark:text-white"
            />
          </label>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            class={`min-h-9 rounded-full px-3 text-sm font-medium transition-colors duration-150 ${
              activeTag() === null
                ? "bg-brand-600 text-white"
                : "bg-ink-100 text-ink-600 hover:bg-ink-200 dark:bg-white/10 dark:text-ink-200"
            }`}
          >
            {t("filter_all")}
          </button>
          <For each={tags()}>
            {(tag) => (
              <button
                type="button"
                onClick={() => setActiveTag(activeTag() === tag ? null : tag)}
                class={`min-h-9 rounded-full px-3 text-sm font-medium transition-colors duration-150 ${
                  activeTag() === tag
                    ? "bg-brand-600 text-white"
                    : "bg-ink-100 text-ink-600 hover:bg-ink-200 dark:bg-white/10 dark:text-ink-200"
                }`}
              >
                {tag}
              </button>
            )}
          </For>
        </div>

        <Show
          when={filtered().length > 0}
          fallback={<p class="mt-10 text-center text-ink-400">{t("no_results")}</p>}
        >
          <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <For each={filtered()}>{(article) => <ArticleCard article={article} />}</For>
          </div>
        </Show>
      </section>
    </div>
  );
}
