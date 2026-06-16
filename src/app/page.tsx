"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeroAnimation from "@/components/HeroAnimation";
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
            <div className="pointer-events-none flex flex-col items-center">
              <h1 className="text-white text-6xl md:text-8xl font-bold tracking-tighter mix-blend-difference">VAM INNOVATION </h1>
              <p className="text-white/70 mt-4 text-xl tracking-widest uppercase mix-blend-difference">Let's Build With Us</p>
            </div>

            <button
              onClick={startTransition}
              className="mt-12 px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform duration-300 ease-out shadow-[0_0_20px_rgba(255,255,255,0.3)] z-20 cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </section>
      )}

      {/* SECTION 2: Storytelling Animation */}
      {activeScene === "portfolio" && (
        <section
          ref={portfolioContainerRef}
          className="absolute inset-0 w-full h-full bg-[#0a0a0a]"
        >
          <HeroAnimation />
        </section>
      )}
    </main>
  );
}
