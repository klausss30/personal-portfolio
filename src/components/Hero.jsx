import { motion as Motion, useReducedMotion } from "framer-motion";
import { localizedHero } from "../content/heroContent.js";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero({ language = "en" }) {
  const reduceMotion = useReducedMotion();
  const content = localizedHero[language] ?? localizedHero.en;

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-36"
    >
      <div className="absolute inset-x-0 top-[-8rem] mx-auto h-[32rem] max-w-5xl rounded-full bg-[var(--hero-glow)] blur-3xl" />
      <div className="absolute left-1/2 top-40 h-72 w-72 -translate-x-1/2 rounded-full border border-[var(--border-subtle)] bg-[var(--hero-orb)] blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <Motion.div
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "visible"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="mx-auto max-w-5xl text-center"
        >
          <Motion.p
            variants={reveal}
            className="text-sm font-semibold tracking-[0.24em] text-[var(--text-soft)] uppercase"
          >
            {content.eyebrow}
          </Motion.p>

          <Motion.h1
            variants={reveal}
            className="mx-auto mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-[var(--text)] sm:text-6xl lg:text-[5.8rem] lg:leading-[0.95]"
          >
            {content.title}
          </Motion.h1>

          <Motion.p
            variants={reveal}
            className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-[var(--text-muted)] sm:text-2xl"
          >
            {content.subtitle}
          </Motion.p>

          <Motion.div
            variants={reveal}
            className="mt-10 flex items-center justify-center"
          >
            <a
              href="#contact"
              className="inline-flex min-w-[10rem] items-center justify-center rounded-full bg-[var(--button)] px-6 py-3.5 text-sm font-medium !text-[var(--button-text)] transition-opacity duration-300 hover:opacity-92 focus:outline-none focus:ring-2 focus:ring-[var(--border)] focus:ring-offset-2 focus:ring-offset-transparent"
            >
              {content.secondaryCta}
            </a>
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  );
}
