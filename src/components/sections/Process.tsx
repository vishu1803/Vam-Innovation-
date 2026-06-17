"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const steps = [
  { title: "Discovery", desc: "Understanding your vision, audience, and goals." },
  { title: "Design", desc: "Crafting wireframes and premium visual concepts." },
  { title: "Development", desc: "Building scalable, high-performance architecture." },
  { title: "Launch", desc: "Testing, optimization, and seamless deployment." }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const processItems = gsap.utils.toArray(".process-item");

    processItems.forEach((item: any, i) => {
      gsap.fromTo(item,
        { opacity: 0.3, x: -50 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: item,
            start: "top 60%",
            end: "top 30%",
            scrub: true,
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full py-32 px-6 md:px-12 lg:px-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/3 lg:sticky lg:top-32 self-start">
          <h2 className="text-sm tracking-[0.3em] uppercase text-gray-400 mb-4">Methodology</h2>
          <p className="text-4xl md:text-6xl font-medium tracking-tight mb-8">Our Process</p>
          <p className="text-gray-400 text-lg leading-relaxed">
            We follow a rigorous, proven methodology to transform complex ideas into elegant digital solutions.
          </p>
        </div>

        <div className="lg:w-2/3 flex flex-col gap-24 py-12">
          {steps.map((step, idx) => (
            <div key={idx} className="process-item flex flex-col md:flex-row gap-8 items-start md:items-center">
              <span className="text-6xl md:text-8xl font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)]">
                0{idx + 1}
              </span>
              <div>
                <h3 className="text-3xl md:text-4xl font-medium mb-4">{step.title}</h3>
                <p className="text-xl text-gray-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
