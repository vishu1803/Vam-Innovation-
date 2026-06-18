"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const cards = [
  {
    title: "1. Clean Build",
    desc: "Build fast, modern websites with clean code, optimized performance, and scalable architecture."
  },
  {
    title: "2. Stunning Design",
    desc: "Craft visually engaging experiences with smooth animations, modern layouts, and attention to detail."
  },
  {
    title: "3. Business Growth",
    desc: "Transform visitors into customers with conversion-focused design and strategic digital solutions."
  }
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cardElements = gsap.utils.toArray(".feature-card") as HTMLElement[];
    console.log(`[Production Debug] About Section: ${cardElements.length} cards detected.`);
    if (pinRef.current) {
      console.log("[Production Debug] About Section: Pin container detected.");
    }
    
    // Set initial states for cards
    // Card 1 is visible in the center with full shadow
    gsap.set(cardElements[0], { 
      y: 0, 
      zIndex: 10, 
      scale: 1, 
      opacity: 1, 
      boxShadow: "0px 0px 40px rgba(0,255,136,0.15)" 
    });
    
    // Cards 2 and 3 are completely hidden below the viewport
    gsap.set(cardElements[1], { 
      y: "150vh", 
      zIndex: 20, 
      scale: 1, 
      opacity: 1, 
      boxShadow: "0px 0px 40px rgba(0,255,136,0.15)" 
    });
    gsap.set(cardElements[2], { 
      y: "150vh", 
      zIndex: 30, 
      scale: 1, 
      opacity: 1, 
      boxShadow: "0px 0px 40px rgba(0,255,136,0.15)" 
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinRef.current,
        pin: true,
        start: "top top",
        end: "+=300%", // 3 sections of scroll height
        scrub: 1,
      }
    });

    // Pause on Card 1 for a moment
    tl.to({}, { duration: 0.2 });

    // Transition: Card 2 slides upward while Card 1 drops back
    tl.to(cardElements[1], {
      y: 0,
      duration: 1,
      ease: "power2.inOut"
    }, "card2")
    .to(cardElements[0], {
      scale: 0.98,
      y: 20,
      opacity: 0.95,
      boxShadow: "0px 0px 20px rgba(0,255,136,0.08)",
      duration: 1,
      ease: "power2.inOut"
    }, "card2");

    // Pause on Card 2
    tl.to({}, { duration: 0.2 });

    // Transition: Card 3 slides upward while Card 2 drops back and Card 1 drops further
    tl.to(cardElements[2], {
      y: 0,
      duration: 1,
      ease: "power2.inOut"
    }, "card3")
    .to(cardElements[1], {
      scale: 0.98,
      y: 20,
      opacity: 0.95,
      boxShadow: "0px 0px 20px rgba(0,255,136,0.08)",
      duration: 1,
      ease: "power2.inOut"
    }, "card3")
    .to(cardElements[0], {
      scale: 0.96,
      y: 40,
      opacity: 0.9,
      boxShadow: "0px 0px 10px rgba(0,255,136,0.04)",
      duration: 1,
      ease: "power2.inOut"
    }, "card3");

    // Add a final pause so Card 3 stays visible before unpinning
    tl.to({}, { duration: 0.2 });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-[#000000]">
      {/* Pinned Card Stack Section */}
      <div
        ref={pinRef}
        className="w-full h-screen flex items-center justify-center relative overflow-hidden"
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="feature-card absolute w-[90vw] md:w-[70vw] h-[60vh] md:h-[75vh] bg-black border border-[#00ff88] rounded-lg flex flex-col justify-start p-10 md:p-20"
          >
            <h4 className="text-[#00ff88] font-mono text-3xl md:text-5xl font-medium tracking-tight mb-8 md:mb-12">
              {card.title}
            </h4>
            <p className="text-white/80 font-mono text-xl md:text-3xl leading-relaxed md:leading-[1.8] max-w-4xl tracking-[0.02em]">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
