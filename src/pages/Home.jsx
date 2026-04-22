import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  HiArrowLeft,
  HiArrowRight,
  HiOutlineChatBubbleLeftRight,
  HiOutlineRocketLaunch,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { LuAppWindow, LuPalette } from "react-icons/lu";
import { PiCompass, PiGauge } from "react-icons/pi";
import { TbTool } from "react-icons/tb";
import Hero from "../components/Hero.jsx";
import ProjectFeatureSection from "../components/ProjectFeatureSection.jsx";
import ContactSection from "../components/ContactSection.jsx";
import { projects, buildPillars, buildPrinciples } from "../data/siteContent.js";
import SectionHeading from "../components/SectionHeading.jsx";

const buildIcons = {
  sparkles: HiOutlineSparkles,
  window: LuAppWindow,
  palette: LuPalette,
  rocket: HiOutlineRocketLaunch,
};

const approachIcons = {
  sparkles: PiCompass,
  window: HiOutlineChatBubbleLeftRight,
  palette: LuPalette,
  rocket: PiGauge,
  tool: TbTool,
};

function WhatIBuild() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hasOverflow, setHasOverflow] = useState(false);

  const updateScrollState = () => {
    if (!scrollRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setHasOverflow(scrollWidth > clientWidth + 4);
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  const scrollCards = (direction) => {
    if (!scrollRef.current) {
      return;
    }

    scrollRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });

    window.setTimeout(updateScrollState, 180);
  };

  return (
    <section id="build" className="px-6 pb-14 pt-24 text-[#111111] sm:px-8 lg:px-10 lg:pb-20 lg:pt-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Build"
          title="What I Build."
        />

        {hasOverflow ? (
          <div className="mt-10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => scrollCards("left")}
              disabled={!canScrollLeft}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e4e4e9] bg-[#fafafc] text-[#111111] transition-opacity duration-300 disabled:opacity-35"
              aria-label="Scroll build cards left"
            >
              <HiArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollCards("right")}
              disabled={!canScrollRight}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e4e4e9] bg-[#fafafc] text-[#111111] transition-opacity duration-300 disabled:opacity-35"
              aria-label="Scroll build cards right"
            >
              <HiArrowRight className="h-5 w-5" />
            </button>
          </div>
        ) : null}

        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className={`flex gap-5 overflow-x-auto pb-4 scrollbar-hide ${hasOverflow ? "mt-8" : "mt-14"}`}
        >
          {buildPillars.map((pillar) => (
            <article
              key={pillar.titleLines.join("-")}
              className={`min-w-[15rem] flex-1 rounded-[2rem] p-6 sm:min-w-[16rem] sm:p-7 lg:min-w-[16.5rem] ${pillar.tone}`}
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 text-[#111111]">
                {(() => {
                  const Icon = buildIcons[pillar.icon];
                  return Icon ? <Icon className="h-5 w-5" /> : null;
                })()}
              </div>
              <div className="mt-5 space-y-1">
                {pillar.titleLines.map((line) => (
                  <p
                    key={line}
                    className="text-3xl font-semibold tracking-[-0.04em] text-[#111111] sm:text-4xl"
                  >
                    {line}
                  </p>
                ))}
              </div>
              <p className="mt-3 max-w-sm text-base leading-7 text-[#6e6e73] sm:text-lg">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowIBuild() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hasOverflow, setHasOverflow] = useState(false);

  const updateScrollState = () => {
    if (!scrollRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setHasOverflow(scrollWidth > clientWidth + 4);
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  const scrollCards = (direction) => {
    if (!scrollRef.current) {
      return;
    }

    scrollRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });

    window.setTimeout(updateScrollState, 180);
  };

  return (
    <section id="approach" className="bg-white px-6 pb-14 pt-14 text-[#111111] sm:px-8 lg:px-10 lg:pb-20 lg:pt-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Approach"
          title="How I build."
        />

        {hasOverflow ? (
          <div className="mt-10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => scrollCards("left")}
              disabled={!canScrollLeft}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e4e4e9] bg-[#fafafc] text-[#111111] transition-opacity duration-300 disabled:opacity-35"
              aria-label="Scroll approach cards left"
            >
              <HiArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollCards("right")}
              disabled={!canScrollRight}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e4e4e9] bg-[#fafafc] text-[#111111] transition-opacity duration-300 disabled:opacity-35"
              aria-label="Scroll approach cards right"
            >
              <HiArrowRight className="h-5 w-5" />
            </button>
          </div>
        ) : null}

        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className={`flex gap-5 overflow-x-auto pb-4 scrollbar-hide ${hasOverflow ? "mt-8" : "mt-14"}`}
        >
          {buildPrinciples.map((principle) => (
            <article
              key={principle.title}
              className={`min-w-[15rem] flex-1 rounded-[2rem] p-6 sm:min-w-[16rem] sm:p-7 lg:min-w-[16.5rem] ${principle.tone}`}
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 text-[#111111]">
                {(() => {
                  const Icon = approachIcons[principle.icon];
                  return Icon ? <Icon className="h-5 w-5" /> : null;
                })()}
              </div>
              <p className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-[#111111] sm:text-4xl">
                {principle.title}
              </p>
              <p className="mt-3 text-2xl font-medium tracking-[-0.03em] text-[#6e6e73] sm:text-3xl">
                {principle.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { language } = useOutletContext();

  return (
    <div className="bg-white">
      <Hero language={language} />

      <section id="projects" className="bg-white py-5">
        <div className="px-6 pb-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Projects"
              title="Selected work."
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          {projects.map((project) => (
            <ProjectFeatureSection key={project.name} project={project} />
          ))}
        </div>
      </section>

      <WhatIBuild />
      <HowIBuild />
      <ContactSection />
    </div>
  );
}
