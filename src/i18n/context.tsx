import { createContext, useContext, type JSX, type Accessor } from "solid-js";
import { useLocation, useNavigate, useParams } from "@solidjs/router";
import { type Locale, type DictKey, translate, locales, defaultLocale } from "./translations";

interface I18nContextValue {
  locale: Accessor<Locale>;
  t: (key: DictKey, vars?: Record<string, string | number>) => string;
  switchTo: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue>();

export function resolveLocaleFromParam(value: string | undefined): Locale {
  return locales.includes(value as Locale) ? (value as Locale) : defaultLocale;
}

export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return defaultLocale;
  return navigator.language?.toLowerCase().startsWith("vi") ? "vi" : "en";
}

export function I18nProvider(props: { children: JSX.Element }) {
  const params = useParams<{ lang?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const locale: Accessor<Locale> = () => resolveLocaleFromParam(params.lang);

  const t = (key: DictKey, vars?: Record<string, string | number>) =>
    translate(locale(), key, vars);

  const switchTo = (next: Locale) => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("mmo-locale", next);
    }
    const rest = location.pathname.replace(/^\/(vi|en)/, "");
    navigate(`/${next}${rest}${location.search}`, { replace: true });
  };

  return (
    <I18nContext.Provider value={{ locale, t, switchTo }}>{props.children}</I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider");
  return ctx;
}
