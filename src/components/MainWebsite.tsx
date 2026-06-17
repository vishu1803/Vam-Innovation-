"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Storytelling from "./sections/Storytelling";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import Process from "./sections/Process";
import SelectedWork from "./sections/SelectedWork";
import About from "./sections/About";
import Contact from "./sections/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function MainWebsite() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    const lenis = new Lenis({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Tell ScrollTrigger to use this lenis instance for its scroller
    ScrollTrigger.defaults({
      scroller: wrapperRef.current,
    });

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="w-full h-full overflow-y-auto overflow-x-hidden bg-[#050505] text-white no-scrollbar"
    >
      <div ref={contentRef} className="w-full min-h-screen">
        <Storytelling />
        <Projects />
        <Services />
        <Process />
        <SelectedWork />
        <About />
        <Contact />
      </div>
    </div>
  );
}
