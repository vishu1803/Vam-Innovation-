"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

const animatedText = "where technology and innovation come together to help businesses grow. We are a team of passionate tech professionals focused on building modern websites, web applications, and digital solutions that strengthen your online presence, expand your reach, and increase your revenue.";

export default function Storytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 20,
        delay: Math.random() * -20,
      }))
    );
  }, []);

  useGSAP(() => {
    if (!textRef.current || !logoRef.current || !textContainerRef.current) return;
    console.log("[Production Debug] Storytelling Section: Text element detected, initializing SplitType.");

    // Split text into words
    const splitText = new SplitType(textRef.current, { types: "words" });

    // Set initial state
    gsap.set(splitText.words, {
      opacity: 0.15,
      filter: "blur(1px)"
    });

    // Set initial text container state (invisible)
    gsap.set(textContainerRef.current, {
      opacity: 0,
      x: -30
    });

    // Set initial logo container state (perfectly centered)
    gsap.set(logoRef.current, {
      left: "50%",
      top: "50%",
      xPercent: -50,
      yPercent: -50,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: "+=300%", // Increased scroll distance for multiple phases
        scrub: 1,
        refreshPriority: 1,
      }
    });

    // PHASE 1: Logo shifts right, text container fades in
    tl.to(logoRef.current, {
      x: "25vw",
      scale: 0.6,
      opacity: 0.3,
      duration: 1.5,
      ease: "power2.inOut"
    }, 0);

    tl.to(textContainerRef.current, {
      opacity: 1,
      x: 0,
      duration: 1.5,
      ease: "power2.out"
    }, 0);

    // PHASE 2: Reveal words progressively
    tl.to(splitText.words, {
      opacity: 1,
      filter: "blur(0px)",
      duration: 3,
      stagger: 0.15,
      ease: "power2.out",
    }, 1.5); // Starts after Phase 1 finishes

    // Cleanup SplitType on unmount
    return () => {
      splitText.revert();
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="w-full h-screen bg-[#000000] flex items-center justify-start relative overflow-hidden px-6 md:px-[15vw]"
    >
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bg-white rounded-full opacity-30"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              animation: `float ${p.duration}s infinite linear`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-30px) translateX(15px); }
          66% { transform: translateY(20px) translateX(-15px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>

      {/* Text Container */}
      <div ref={textContainerRef} className="z-10 w-full md:w-[45vw] max-w-[850px] text-[20px] md:text-[28px] leading-[1.8] tracking-[0.02em] text-white flex flex-col items-start italic" style={{ fontFamily: 'Consolas, "Lucida Console", monospace' }}>
        <p className="mb-5">
          Hello,<br />
          Welcome to VamTech
        </p>
        <p ref={textRef}>
          {animatedText}
        </p>
      </div>

      {/* Logo Container - Initial Center, shifted Right by GSAP */}
      <div ref={logoRef} className="hidden md:flex absolute z-0 opacity-100 pointer-events-none mix-blend-screen">
        <img
          src="/images/vam-logo.svg"
          alt="VAM Logo"
          className="w-[40vw] max-w-[600px] object-contain drop-shadow-[0_0_40px_rgba(212,175,55,0.3)]"
        />
      </div>
    </section>
  );
}
