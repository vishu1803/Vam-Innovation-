"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax reveal effect from the bottom
    gsap.fromTo(contentRef.current,
      { yPercent: 50, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        }
      }
    );
  }, { scope: containerRef });

  return (
    <footer 
      ref={containerRef} 
      className="w-full h-[80vh] bg-black text-white relative overflow-hidden flex flex-col justify-end"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <div 
        ref={contentRef}
        className="w-full h-full flex flex-col items-center justify-center px-6 text-center"
      >
        <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8">
          Let's Talk
        </h2>
        <p className="text-xl md:text-3xl text-gray-400 font-light mb-12 max-w-2xl">
          Ready to build something extraordinary together? We'd love to hear from you.
        </p>
        <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
          hello@agroup.com
        </button>
      </div>

      <div className="w-full py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-24 absolute bottom-0 z-10 bg-black">
        <p className="text-sm text-gray-500">© 2026 AGroup. All rights reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0 text-sm text-gray-500 uppercase tracking-widest">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
