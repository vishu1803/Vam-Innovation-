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
    if (!textRef.current) return;
    console.log("[Production Debug] Storytelling Section: Text element detected, initializing SplitType.");

    // Split text into words
    const splitText = new SplitType(textRef.current, { types: "words" });

    // Set initial state
    gsap.set(splitText.words, {
      opacity: 0.15,
      filter: "blur(1px)"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: "+=200%", // The amount of scroll distance to scrub through
        scrub: 1,
        refreshPriority: 1,
      }
    });

    // Reveal words progressively
    tl.to(splitText.words, {
      opacity: 1,
      filter: "blur(0px)",
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });

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
      <div className="z-10 w-full md:w-[45vw] max-w-[850px] font-mono text-[20px] md:text-[28px] leading-[1.8] tracking-[0.02em] text-white">
        <p className="mb-8">
          Hello,<br />
          Welcome to VamTech
        </p>
        <p ref={textRef}>
          {animatedText}
        </p>
      </div>
    </section>
  );
}
