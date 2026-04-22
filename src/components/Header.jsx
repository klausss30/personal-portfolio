import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
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

export default function Header({ language }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const content = localizedHeader[language] ?? localizedHeader.en;

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
          className={`mx-auto max-w-6xl rounded-full border px-4 py-3 shadow-[0_20px_80px_rgba(15,23,42,0.1)] backdrop-blur-[24px] transition-all duration-500 sm:px-5 ${
            isScrolled
              ? "border-[#dadade] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(246,246,249,0.72))]"
              : "border-[#ececf0] bg-[linear-gradient(180deg,rgba(255,255,255,0.58),rgba(248,248,250,0.44))]"
          }`}
        >
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.98),rgba(255,255,255,0))]" />
          <div className="pointer-events-none absolute inset-x-20 top-[1px] h-6 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.34),rgba(255,255,255,0))] blur-md" />
          <div className="relative flex items-center justify-between gap-4">
            <a
              href="#top"
              className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[#e1e1e6] bg-white/78 shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl"
              aria-label="Klausss home"
            >
              <img src="/logo.png" alt="Klausss logo" className="h-full w-full object-cover" />
            </a>

            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
              {content.nav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="rounded-full px-4 py-2 text-sm font-medium text-[#404046] transition-colors duration-300 hover:bg-white/55 hover:text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#c8c8cf]"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="hidden h-9 w-9 md:block" aria-hidden="true" />

            <button
              type="button"
              onClick={() => setIsMenuOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e3e3e8] bg-white/80 text-[#111111] md:hidden"
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
        </Motion.div>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <Motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-[5.4rem] z-40 rounded-[2rem] border border-[#e2e2e8] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(247,247,249,0.74))] p-4 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur-[24px] md:hidden"
          >
            <nav className="grid gap-2">
              {content.nav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id, () => setIsMenuOpen(false))}
                  className="rounded-[1.2rem] px-4 py-3 text-left text-base font-medium text-[#404046] transition-colors duration-300 hover:bg-[#f3f3f5] hover:text-[#111111]"
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
