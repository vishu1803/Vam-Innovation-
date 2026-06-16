"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./HeroAnimation.module.css";

// Register GSAP plugins
gsap.registerPlugin(useGSAP);

type CardType = {
  id: number;
  title: string;
  color: string;
  type: "image" | "video";
  src: string;
};

const cardData: CardType[] = [
  { id: 1, title: "Portfolio", color: "bg-blue-900", type: "image", src: "/images/portfolio.png" },
  { id: 2, title: "SaaS", color: "bg-purple-900", type: "image", src: "/images/saas.png" },
  { id: 3, title: "AI Startup", color: "bg-emerald-900", type: "image", src: "/images/startup.png" },
  { id: 4, title: "Ecommerce", color: "bg-orange-900", type: "image", src: "/images/ecommerce.png" },
  { id: 5, title: "Dashboard", color: "bg-rose-900", type: "image", src: "/images/dashboard.png" },
];

export default function HeroAnimation() {
  const container = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const ideImageRef = useRef<HTMLImageElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const quoteRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const masterTimeline = useRef<gsap.core.Timeline | null>(null);

  const [showGlass, setShowGlass] = useState(false);

  useGSAP(
    () => {
      // Create master timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // Keep the carousel loop running if needed, or handle it here.
        },
      });
      masterTimeline.current = tl;

      // Ensure initial states are set
      gsap.set(carouselRef.current, { opacity: 0 });
      gsap.set(quoteRef.current, { 
        xPercent: -50, 
        yPercent: -50,
        opacity: 0, 
        scale: 0.05, 
        filter: "blur(20px)" 
      });
      
      const stackOpacities = [1, 0.9, 0.75, 0.55, 0.35];
      cardsRef.current.forEach((card, i) => {
        gsap.set(card, {
          z: -i * 150,
          scale: 1 - i * 0.05,
          y: 0,
          rotationZ: 0,
          opacity: stackOpacities[i] || 0,
          transformOrigin: "center center",
          willChange: "transform",
        });
      });

      // SCENE 1: Laptop Floating & Code typing
      tl.addLabel("scene1");
      
      // Floating laptop
      gsap.to(laptopRef.current, {
        y: -20,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Code appearing via wipe down mask
      gsap.set(ideImageRef.current, { clipPath: "inset(0% 0% 100% 0%)" });
      tl.to(ideImageRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.5,
        ease: "power2.inOut",
      }, "scene1+=0.5");

      // SCENE 2: Camera Zoom
      tl.addLabel("scene2", "+=1.5");
      tl.to(laptopRef.current, {
        scale: 15, // Zoom deep into the screen
        duration: 2,
        ease: "power3.inOut",
        onStart: () => {
          // Stop floating animation to avoid glitching during zoom
          gsap.killTweensOf(laptopRef.current, "y");
        }
      }, "scene2");

      // SCENE 3: Transform code into websites
      tl.addLabel("scene3", "scene2+=1.5");
      tl.to(laptopRef.current, { opacity: 0, duration: 0.5 }, "scene3");
      tl.to(carouselRef.current, { opacity: 1, duration: 1 }, "scene3");

      // SCENE 4: Carousel Animation Loop
      // We create a separate timeline for the looping carousel
      const carouselTl = gsap.timeline(); // Play 5 cycles once before moving to quote

      // The carousel animation moves the front card out and shifts the rest forward
      const moveCard = () => {
        const loopTl = gsap.timeline({
          defaults: {
            ease: "cubic-bezier(0.25,1,0.5,1)",
            duration: 1.5,
          }
        });

        const cards = cardsRef.current;
        // In reality, to make it loop infinitely and perfectly, we'd need to re-order DOM elements or 
        // animate them dynamically. Since the requirement says "Repeat infinitely" but also 
        // "After several cycles: Pause stack animation. Fade all cards out.", we'll simulate the cycles.
        
        // This is a complex looping effect. We will animate properties based on an array shift.
        // For simplicity in a fixed timeline, we will loop 4 times explicitly.
      };

      // Let's build a functional loop using GSAP
      // Actually, building a true infinite carousel timeline with GSAP is tricky without a function that gets called repeatedly.
      // We'll create a repeating animation that targets the current state of cards.
      let currentCards = [...cardsRef.current];

      for (let cycle = 0; cycle < 5; cycle++) {
        const cycleTl = gsap.timeline({
          defaults: {
            ease: "cubic-bezier(0.25,1,0.5,1)",
            duration: 0.8,
          }
        });

        // The front card exits (moves THROUGH the camera)
        const frontCard = currentCards[0];
        cycleTl.to(frontCard, {
          z: 800,
          scale: 1.6,
          opacity: 0,
          y: 0,
          rotationZ: 0,
          filter: "blur(8px)",
        }, 0);

        // The remaining cards move forward
        for (let i = 1; i < currentCards.length; i++) {
          const card = currentCards[i];
          cycleTl.to(card, {
            z: -(i - 1) * 150,
            scale: 1 - (i - 1) * 0.05,
            opacity: stackOpacities[i - 1] || 0,
          }, 0);
        }

        // Add 0.2s settle phase
        cycleTl.set({}, {}, "+=0.2");

        carouselTl.add(cycleTl);
        
        // Remove the front card from the array so it doesn't loop back
        currentCards.shift();
      }

      tl.add(carouselTl, "scene3+=0.5");

      // SCENE 5: Final Typography
      tl.addLabel("scene5");
      
      // Parent container scale animation (camera-forward feeling)
      tl.to(carouselRef.current, {
        scale: 1.15,
        opacity: 0.1, // Darken background slightly / fade out
        duration: 0.8,
        ease: "power2.inOut",
      }, "scene5");

      // Quote emerges from exact center simultaneously
      tl.to(quoteRef.current, {
        opacity: 1,
        scale: 1.0,
        filter: "blur(0px)",
        duration: 1.6,
        ease: "cubic-bezier(0.25,1,0.5,1)",
      }, "scene5");

      // Premium Typography Moment: continuous slow scale takeover
      tl.to(quoteRef.current, {
        scale: 1.15,
        duration: 4,
        ease: "power1.out",
      }, "scene5+=1.6");

      // Trigger glass reveal 400ms after quote reaches scale 1.0
      tl.call(() => {
        setShowGlass(true);
      }, undefined, "scene5+=2.0");

    },
    { scope: container }
  );

  // Glass fade-in animation
  useGSAP(() => {
    if (showGlass && glassRef.current) {
      gsap.fromTo(
        glassRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power3.out" }
      );
    }
  }, { dependencies: [showGlass], scope: container });

  return (
    <div className={styles.container} ref={container}>
      {/* Scene 1 & 2: Laptop */}
      <div className={styles.sceneWrapper}>
        <div className={styles.laptopContainer} ref={laptopRef}>
          <div className={styles.laptopScreen}>
            {/* IDE Image */}
            <img 
              src="/images/firstscene.gif" 
              alt="IDE Code" 
              ref={ideImageRef}
              className="w-full h-full object-cover rounded-t-[18px]"
            />
          </div>
          <div className={styles.laptopBase}></div>
        </div>
      </div>

      {/* Scene 3 & 4: 3D Stacked Carousel */}
      <div className={styles.sceneWrapper} style={{ zIndex: 10 }}>
        <div className={styles.carouselContainer} ref={carouselRef}>
          {cardData.map((card, i) => (
            <div
              key={card.id}
              className={`${styles.card} ${card.color}`}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
              
              {card.type === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={card.src} alt={card.title} className="w-full h-full object-cover absolute top-0 left-0 z-0" />
              ) : (
                <video 
                  src={card.src} 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  className="w-full h-full object-cover absolute top-0 left-0 z-0" 
                />
              )}

              <div className="flex flex-col items-center justify-center z-20 relative">
                <span className="text-4xl mb-4 font-semibold">{card.title}</span>
                <span className="text-sm font-normal opacity-70">Modern Website</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scene 5: Typography Quote */}
      <div className={styles.sceneWrapper} style={{ zIndex: 20 }}>
        <div className={styles.quoteContainer} ref={quoteRef}>
          {showGlass && (
            <div className={styles.fluidGlassContainer} ref={glassRef}>
              {/* FluidGlass component / Three.js canvas mounts here */}
            </div>
          )}
          <div style={{ position: "relative", zIndex: 60 }}>
            <h1 className={styles.headline}>Turn Your Skills Into Opportunities</h1>
            <p className={styles.subheadline}>Build Your Presence. Expand Your Reach.</p>
            <div className={styles.footer}>AGroup Team</div>
          </div>
        </div>
      </div>
    </div>
  );
}
