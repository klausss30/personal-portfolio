import { motion as Motion, useReducedMotion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const reduceMotion = useReducedMotion();

  return (
    <Motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      <p className="text-sm font-medium tracking-[0.22em] text-[#7a7a80] uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[#111111] sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4f4f55]">
          {description}
        </p>
      ) : null}
    </Motion.div>
  );
}
