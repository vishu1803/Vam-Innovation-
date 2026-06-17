"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const services = [
  "Website Development",
  "Web Applications",
  "UI/UX Design",
  "SEO & Performance",
  "Digital Transformation",
  "Creative Direction"
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray(".service-item");
    
    gsap.fromTo(items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full py-32 px-6 md:px-12 lg:px-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
        <div className="md:w-1/3">
          <h2 className="text-sm tracking-[0.3em] uppercase text-gray-400 mb-4">Expertise</h2>
          <p className="text-3xl md:text-5xl font-medium tracking-tight">What We Do</p>
        </div>
        
        <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-12">
          {services.map((service, index) => (
            <div key={index} className="service-item flex flex-col gap-4 border-t border-white/10 pt-8">
              <span className="text-gray-500 text-sm">0{index + 1}</span>
              <h3 className="text-2xl md:text-3xl font-light hover:text-white/70 transition-colors cursor-default">{service}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
