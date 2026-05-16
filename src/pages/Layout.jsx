import { useLayoutEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export default function Layout() {
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState(getInitialTheme);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen bg-[var(--page)] text-[var(--text)] transition-colors duration-500">
      <div className="fixed inset-0 -z-10 bg-[var(--page-bg)] transition-colors duration-500" />
      <div className="fixed inset-0 -z-10 opacity-60 [background-image:linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] [background-size:120px_120px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
      <Header
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main>
        <Outlet context={{ language }} />
      </main>
    </div>
  );
}
