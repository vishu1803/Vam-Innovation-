"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const works = [
  { title: "Lumina", category: "Brand Identity", image: "/images/portfolio.png" },
  { title: "Nexus", category: "Web Application", image: "/images/ide.png" },
  { title: "Apex", category: "Digital Product", image: "/images/startup.png" }
];

export default function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax on the whole section
    gsap.fromTo(containerRef.current,
      { backgroundColor: "#050505" },
      {
        backgroundColor: "#0a0a0a",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      }
    );
  }, { scope: containerRef });

  const handleEnter = () => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" });
  };

  const handleLeave = () => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" });
  };

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full py-32 bg-[#050505] relative overflow-hidden">
      {/* Magnetic Cursor (Fixed to screen) */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-24 h-24 bg-white text-black rounded-full pointer-events-none z-50 flex items-center justify-center font-semibold tracking-widest text-xs uppercase scale-0 opacity-0 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        View
      </div>

      <div className="max-w-[100%] mx-auto px-6 md:px-12 lg:px-24 mb-16">
        <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-4">Selected Work</h2>
        <p className="text-xl text-gray-400">A showcase of our finest digital experiences.</p>
      </div>

      <div className="flex flex-col w-full">
        {works.map((work, idx) => (
          <div 
            key={idx} 
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className="work-item group relative w-full h-[300px] md:h-[450px] border-y border-white/5 flex items-center px-6 md:px-12 lg:px-24 cursor-none overflow-hidden"
          >
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full pointer-events-none mix-blend-difference">
              <h3 className="text-5xl md:text-8xl font-black uppercase text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)] group-hover:text-white transition-colors duration-500">
                {work.title}
              </h3>
              <p className="text-lg md:text-2xl text-white mt-4 md:mt-0 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                {work.category}
              </p>
            </div>

            {/* Hover Image Reveal */}
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-60 scale-110 group-hover:scale-100 transition-all duration-700 ease-out origin-center">
              <img 
                src={work.image} 
                alt={work.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
