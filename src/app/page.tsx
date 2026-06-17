"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MainWebsite from "@/components/MainWebsite";
import Hyperspeed from "@/components/Hyperspeed";

// Register GSAP plugins
gsap.registerPlugin(useGSAP);

export default function Home() {
  const [activeScene, setActiveScene] = useState<"hero" | "transition" | "portfolio">("hero");

  const containerRef = useRef<HTMLDivElement>(null);
  const hyperspeedRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const portfolioContainerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const startTransition = contextSafe(() => {
    setActiveScene("transition");

    const tl = gsap.timeline();

    // STEP 1: Fade out hero content
    tl.to(heroContentRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.4,
      ease: "power2.inOut"
    }, 0);

    // STEP 2: Increase Hyperspeed intensity
    tl.call(() => {
      // Find the #lights div inside the Hyperspeed component and dispatch mousedown
      const hyperspeedDiv = document.getElementById("lights");
      if (hyperspeedDiv) {
        hyperspeedDiv.dispatchEvent(new Event("mousedown"));
      }
    }, undefined, 0.2);

    // STEP 3: Animate a camera push forward
    tl.to(hyperspeedRef.current, {
      scale: 1.2,
      filter: "blur(4px)",
      duration: 0.6,
      ease: "power3.in"
    }, 0.2);

    // STEP 4: Fade screen toward black
    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut"
    }, 0.8);

    // STEP 5: Switch state
    tl.call(() => {
      // Stop hyperspeed acceleration
      const hyperspeedDiv = document.getElementById("lights");
      if (hyperspeedDiv) {
        hyperspeedDiv.dispatchEvent(new Event("mouseup"));
      }
      setActiveScene("portfolio");
    }, undefined, 1.3);
  });

  // STEP 6: Fade in Portfolio Story Section
  useGSAP(() => {
    if (activeScene === "portfolio") {
      const tl = gsap.timeline();

      tl.fromTo(portfolioContainerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        0.1 // Tiny delay to ensure DOM is ready
      );

      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut"
      }, 0.1);
    }
  }, { dependencies: [activeScene], scope: containerRef });

  return (
    <main ref={containerRef} className="h-screen w-full bg-[#0a0a0a] overflow-hidden">
      {/* Global Black Overlay for Transitions */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black z-50 pointer-events-none opacity-0"
      ></div>

      {/* SECTION 1: Hyperspeed Hero */}
      {(activeScene === "hero" || activeScene === "transition") && (
        <section className="absolute inset-0 w-full h-full" ref={hyperspeedRef}>
          <Hyperspeed />

          <div
            ref={heroContentRef}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center"
          >
            <div className="pointer-events-none flex flex-col items-center text-center px-4 max-w-4xl">
              <h1 className="text-white text-6xl md:text-6xl lg:text-7xl font-black tracking-tighter mix-blend-difference">VAM TECH</h1>
              <p className="text-white/70 mt-6 text-lg md:text-2xl font-light mix-blend-difference max-w-2xl">Your Vision.Our Innovation.</p>
            </div>

            <button
              onClick={startTransition}
              className="mt-12 px-10 py-5 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform duration-300 ease-out shadow-[0_0_20px_rgba(255,255,255,0.3)] z-20 cursor-pointer tracking-widest uppercase text-sm"
            >
              Get Started
            </button>
          </div>
        </section>
      )}

      {/* SECTION 2: Premium Portfolio Redesign */}
      {activeScene === "portfolio" && (
        <section
          ref={portfolioContainerRef}
          className="absolute inset-0 w-full h-[100dvh] bg-[#0a0a0a] overflow-hidden"
        >
          <MainWebsite />
        </section>
      )}
    </main>
  );
}
