/** Update this once the site has a real domain (Vercel project settings → Domains). */
export const SITE_URL = "https://mmo-for-free.vercel.app";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: Record<string, unknown>) {
  let el = document.head.querySelector(`script[data-jsonld="${id}"]`) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-jsonld", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export interface SeoOptions {
  title: string;
  description: string;
  keywords?: string[];
  path: string; // e.g. "/vi" or "/vi/bai-viet/slug"
  locale: "vi" | "en";
  type?: "website" | "article";
  publishedTime?: string;
  jsonLd?: Record<string, unknown>;
}

export function setSeo(opts: SeoOptions) {
  document.title = opts.title;
  upsertMeta("name", "description", opts.description);
  if (opts.keywords?.length) upsertMeta("name", "keywords", opts.keywords.join(", "));

  const url = `${SITE_URL}${opts.path}`;
  upsertLink("canonical", url);

  upsertMeta("property", "og:title", opts.title);
  upsertMeta("property", "og:description", opts.description);
  upsertMeta("property", "og:type", opts.type ?? "website");
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "og:locale", opts.locale === "vi" ? "vi_VN" : "en_US");
  upsertMeta("property", "og:site_name", "MMO For Free");

  upsertMeta("name", "twitter:card", "summary");
  upsertMeta("name", "twitter:title", opts.title);
  upsertMeta("name", "twitter:description", opts.description);

  if (opts.jsonLd) upsertJsonLd(opts.path, opts.jsonLd);
}
