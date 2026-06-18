"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useState } from "react";
import Storytelling from "./sections/Storytelling";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import Process from "./sections/Process";
import SelectedWork from "./sections/SelectedWork";
import About from "./sections/About";
import Contact from "./sections/Contact";

export default function MainWebsite() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({
      scroller: wrapperRef.current,
    });
    console.log("[Production Debug] ScrollTrigger registered and defaults set to wrapperRef");

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

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);

    gsap.ticker.lagSmoothing(0);

    console.log("[Production Debug] Lenis initialized");
    
    // Force a ScrollTrigger refresh after a short delay to ensure everything is painted and heights are correct
    const refreshTimeout = setTimeout(() => {
      console.log("[Production Debug] Refreshing ScrollTrigger to recalculate pinned heights");
      ScrollTrigger.refresh();
    }, 100);

    setIsMounted(true);

    return () => {
      clearTimeout(refreshTimeout);
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="main-scroller w-full h-full overflow-y-auto overflow-x-hidden bg-[#050505] text-white no-scrollbar"
    >
      <div ref={contentRef} className="w-full min-h-screen">
        {isMounted && (
          <>
            <Storytelling />
            <Projects />
            <Services />
            <Process />
            <SelectedWork />
            <About />
            <Contact />
          </>
        )}
      </div>
    </div>
  );
}
