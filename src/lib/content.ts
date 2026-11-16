import { marked } from "marked";
import type { Locale } from "../i18n/translations";
import type { CoverKey } from "../components/CoverIllustration";

export interface ArticleFrontMatter {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  accent?: AccentKey;
  cover?: CoverKey;
}

export type AccentKey = "violet" | "cyan" | "amber" | "rose" | "emerald";

export interface Article extends ArticleFrontMatter {
  locale: Locale;
  html: string;
  readingMinutes: number;
}

const rawFiles = import.meta.glob("/src/content/{vi,en}/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function parseFrontMatter(raw: string): { meta: Partial<ArticleFrontMatter>; body: string } {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const [, jsonBlock, body] = match;
  try {
    return { meta: JSON.parse(jsonBlock), body };
  } catch (err) {
    console.error("Invalid front matter JSON:", err);
    return { meta: {}, body };
  }
}

function wordCountToMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

function buildArticles(): Article[] {
  const list: Article[] = [];
  for (const path in rawFiles) {
    const localeMatch = path.match(/\/content\/(vi|en)\//);
    const locale = (localeMatch?.[1] ?? "en") as Locale;
    const { meta, body } = parseFrontMatter(rawFiles[path]);
    if (!meta.id || !meta.slug || !meta.title) {
      console.warn(`Skipping article with missing front matter: ${path}`);
      continue;
    }
    list.push({
      id: meta.id,
      slug: meta.slug,
      title: meta.title,
      excerpt: meta.excerpt ?? "",
      date: meta.date ?? "2026-01-01",
      tags: meta.tags ?? [],
      accent: meta.accent ?? "violet",
      cover: meta.cover ?? "network",
      locale,
      html: marked.parse(body, { async: false }) as string,
      readingMinutes: wordCountToMinutes(body),
    });
  }
  return list.sort((a, b) => (a.date < b.date ? 1 : -1));
}

const allArticles = buildArticles();

export function getArticles(locale: Locale): Article[] {
  return allArticles.filter((a) => a.locale === locale);
}

export function getArticleBySlug(locale: Locale, slug: string): Article | undefined {
  return allArticles.find((a) => a.locale === locale && a.slug === slug);
}

/** Falls back to the other locale's copy if this one has no translation yet. */
export function getArticleBySlugWithFallback(
  locale: Locale,
  slug: string,
): { article: Article; isFallback: boolean } | undefined {
  const direct = getArticleBySlug(locale, slug);
  if (direct) return { article: direct, isFallback: false };
  const byIdOnOtherLocale = allArticles.find((a) => a.slug === slug);
  if (!byIdOnOtherLocale) return undefined;
  const fallback = allArticles.find(
    (a) => a.id === byIdOnOtherLocale.id && a.locale === locale,
  );
  if (fallback) return { article: fallback, isFallback: false };
  return { article: byIdOnOtherLocale, isFallback: true };
}

export function getTranslationSlug(id: string, targetLocale: Locale): string | undefined {
  return allArticles.find((a) => a.id === id && a.locale === targetLocale)?.slug;
}

export function getAllTags(locale: Locale): string[] {
  const set = new Set<string>();
  getArticles(locale).forEach((a) => a.tags.forEach((tag) => set.add(tag)));
  return Array.from(set).sort();
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return getArticles(article.locale)
    .filter((a) => a.id !== article.id)
    .map((a) => ({ a, score: a.tags.filter((t) => article.tags.includes(t)).length }))
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map(({ a }) => a);
}
