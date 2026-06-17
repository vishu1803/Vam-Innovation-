"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    id: 1,
    title: "Ethereal Analytics",
    category: "Web Application",
    image: "/images/dashboard.png",
    align: "left",
  },
  {
    id: 2,
    title: "Nova Commerce",
    category: "E-Commerce",
    image: "/images/ecommerce.png",
    align: "right",
  },
  {
    id: 3,
    title: "Vertex SaaS",
    category: "Product Design",
    image: "/images/saas.png",
    align: "left",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".project-card");
    
    cards.forEach((card: any) => {
      const image = card.querySelector(".project-image");
      const text = card.querySelector(".project-text");

      // Text Reveal
      gsap.fromTo(text, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          }
        }
      );

      // Image Parallax
      gsap.fromTo(image, 
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full py-32 px-6 md:px-12 lg:px-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 overflow-hidden">
          <h2 className="text-sm tracking-[0.3em] uppercase text-gray-400 mb-4 project-text">Featured Work</h2>
          <p className="text-4xl md:text-6xl font-medium tracking-tight project-text">Selected Projects</p>
        </div>

        <div className="flex flex-col gap-32">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className={`project-card flex flex-col gap-8 md:gap-16 ${project.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}
            >
              <div className="w-full md:w-3/5 h-[400px] md:h-[600px] overflow-hidden rounded-2xl relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="project-image absolute inset-0 w-full h-[130%] object-cover object-top -top-[15%]"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              
              <div className="w-full md:w-2/5 project-text flex flex-col">
                <p className="text-sm tracking-widest uppercase text-gray-400 mb-4">{project.category}</p>
                <h3 className="text-3xl md:text-5xl font-medium mb-8 hover:text-gray-300 transition-colors cursor-pointer">{project.title}</h3>
                <div className="h-[1px] w-full bg-white/20 mb-8"></div>
                <button className="self-start text-sm uppercase tracking-widest hover:tracking-[0.2em] transition-all duration-300 flex items-center gap-4">
                  View Project <span className="text-xl">↗</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
