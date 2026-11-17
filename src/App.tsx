import { Route, Navigate, useParams, type RouteSectionProps } from "@solidjs/router";
import { createEffect } from "solid-js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";
import { I18nProvider, detectBrowserLocale, resolveLocaleFromParam } from "./i18n/context";
import { locales, defaultLocale, type Locale } from "./i18n/translations";
import { ThemeProvider } from "./theme";

function RootRedirect() {
  const stored =
    typeof localStorage !== "undefined" ? (localStorage.getItem("mmo-locale") as Locale | null) : null;
  const target = stored && locales.includes(stored) ? stored : detectBrowserLocale();
  return <Navigate href={`/${target}`} />;
}

function LocaleLayout(props: RouteSectionProps) {
  const params = useParams<{ lang: string }>();
  const isValid = () => locales.includes(params.lang as Locale);

  return (
    <>
      {isValid() ? (
        <ThemeProvider>
          <I18nProvider>
            <LocaleDocument />
            <div class="flex min-h-screen flex-col">
              <a href="#main" class="skip-link">
                Skip to content
              </a>
              <Header />
              <main id="main" class="flex-1">
                {props.children}
              </main>
              <Footer />
            </div>
          </I18nProvider>
        </ThemeProvider>
      ) : (
        <Navigate href={`/${defaultLocale}`} />
      )}
    </>
  );
}

function LocaleDocument() {
  const params = useParams<{ lang: string }>();
  createEffect(() => {
    document.documentElement.lang = resolveLocaleFromParam(params.lang);
  });
  return null;
}

export default function App() {
  return (
    <>
      <Route path="/" component={RootRedirect} />
      <Route path="/:lang" component={LocaleLayout}>
        <Route path="/" component={Home} />
        <Route path="/bai-viet/:slug" component={Article} />
        <Route path="/*" component={NotFound} />
      </Route>
      <Route path="/*" component={RootRedirect} />
    </>
  );
}
