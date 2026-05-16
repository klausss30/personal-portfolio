import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import { LuMoon, LuSun } from "react-icons/lu";
import { localizedHeader } from "../content/heroContent.js";

function scrollToSection(id, closeMenu) {
  closeMenu?.();
  const element = document.getElementById(id);

  if (element) {
    const offset = 104;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function Header({ language, theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const content = localizedHeader[language] ?? localizedHeader.en;
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <Motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -28 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`mx-auto max-w-6xl rounded-full border px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur-[24px] transition-all duration-500 sm:px-5 ${
            isScrolled
              ? "border-[var(--header-border-scrolled)] bg-[var(--header-bg-scrolled)]"
              : "border-[var(--header-border)] bg-[var(--header-bg)]"
          }`}
        >
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[var(--header-highlight)]" />
          <div className="pointer-events-none absolute inset-x-20 top-[1px] h-6 rounded-full bg-[var(--header-sheen)] blur-md" />
          <div className="relative flex items-center justify-between gap-4">
            <a
              href="#top"
              className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[var(--border-soft)] bg-[var(--surface-raised-soft)] shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl"
              aria-label="Klausss home"
            >
              <img src="/logo.png" alt="Klausss logo" className="h-full w-full object-cover" />
            </a>

            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
              {content.nav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="rounded-full px-4 py-2 text-sm font-medium text-[var(--text-muted)] transition-colors duration-300 hover:bg-[var(--surface-raised-hover)] hover:text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--border)]"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <button
              type="button"
              onClick={toggleTheme}
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-raised-soft)] text-[var(--text)] transition-colors duration-300 hover:bg-[var(--surface-raised)] focus:outline-none focus:ring-2 focus:ring-[var(--border)] md:inline-flex"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <LuSun className="h-5 w-5" /> : <LuMoon className="h-5 w-5" />}
            </button>

            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-raised-soft)] text-[var(--text)]"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <LuSun className="h-5 w-5" /> : <LuMoon className="h-5 w-5" />}
              </button>

              <button
                type="button"
                onClick={() => setIsMenuOpen((value) => !value)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-raised-soft)] text-[var(--text)]"
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation"
              >
                <span className="relative h-4 w-4">
                  <span
                    className={`absolute left-0 top-1/2 h-px w-4 -translate-y-[5px] bg-current transition-transform duration-300 ${
                      isMenuOpen ? "translate-y-0 rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1/2 h-px w-4 translate-y-[5px] bg-current transition-transform duration-300 ${
                      isMenuOpen ? "translate-y-0 -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </Motion.div>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <Motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-[5.4rem] z-40 rounded-[2rem] border border-[var(--border-soft)] bg-[var(--header-bg-scrolled)] p-4 shadow-[var(--shadow-menu)] backdrop-blur-[24px] md:hidden"
          >
            <nav className="grid gap-2">
              {content.nav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id, () => setIsMenuOpen(false))}
                  className="rounded-[1.2rem] px-4 py-3 text-left text-base font-medium text-[var(--text-muted)] transition-colors duration-300 hover:bg-[var(--surface)] hover:text-[var(--text)]"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </Motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
