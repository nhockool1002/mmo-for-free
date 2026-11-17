import { createContext, useContext, createSignal, type JSX, type Accessor } from "solid-js";

export type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Accessor<Theme>;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>();

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(next: Theme) {
  document.documentElement.classList.toggle("dark", next === "dark");
  try {
    localStorage.setItem("mmo-theme", next);
  } catch {
    // ignore (private mode / storage blocked)
  }
}

export function ThemeProvider(props: { children: JSX.Element }) {
  const [theme, setTheme] = createSignal<Theme>(readInitialTheme());

  const toggleTheme = () => {
    const next: Theme = theme() === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{props.children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
