import { motion as Motion, useReducedMotion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ProjectFeatureSection({ project }) {
  const reduceMotion = useReducedMotion();

  return (
    <Motion.article
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
      className="bg-[#f5f5f7] px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <Motion.h2
          variants={item}
          className="text-4xl font-semibold tracking-[-0.05em] text-[#111111] sm:text-5xl lg:text-7xl"
        >
          {project.name}
        </Motion.h2>

        <Motion.p
          variants={item}
          className="mt-4 max-w-3xl text-xl leading-8 text-[#3a3a40] sm:text-2xl"
        >
          {project.subtitle}
        </Motion.p>

        <Motion.div variants={item} className="mt-8">
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-w-[10rem] items-center justify-center rounded-full bg-[#111111] px-6 py-3.5 text-sm font-medium !text-white transition-opacity duration-300 hover:opacity-92 focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:ring-offset-2 focus:ring-offset-[#f5f5f7]"
            style={{ color: "#ffffff" }}
          >
            View
          </a>
        </Motion.div>

        <Motion.div variants={item} className="mt-14 w-full">
          <div className="mx-auto flex aspect-[16/9] w-full max-w-5xl flex-col overflow-hidden rounded-[1.4rem] border border-[#d7d7dd] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <div className="flex items-center gap-2 border-b border-[#ececf1] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#111111]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#9c9ca3]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#d6d6dc]" />
            </div>
            <div className="flex flex-1 items-center justify-center bg-[linear-gradient(180deg,#ffffff_0%,#f7f7f9_100%)] p-4 sm:p-6">
              <img
                src={project.image}
                alt={`${project.name} homepage preview`}
                className="h-full w-full object-contain object-top"
                loading="lazy"
              />
            </div>
          </div>
        </Motion.div>
      </div>
    </Motion.article>
  );
}
