import React from "react";
import heroImg from "../assets/hero-villa.jpg";
import "./Hero.css";

const Hero = () => {
  const stats = [
    { value: "$2.8B+", label: "Portfolio Volume" },
    { value: "540+", label: "Curated Estates" },
    { value: "99.4%", label: "Client Satisfaction" },
    { value: "18+", label: "Global Destinations" },
  ];

  return (
    <section className="hero-section" id="home">
      {/* =======================================================
          ARCHITECTURAL PAPER: ORGANIC TOPOGRAPHY & SUN PATH ARC
          - Base: Warm Ivory (#F5F3EE)
          - Northwest: Smooth, Serene Flowing Topographic Landforms
          - Southeast: Elegant Sun Path Trajectory Arc & Solar Ray Ticks
          - Zero grids, zero longitude/latitude coordinates
         ======================================================= */}
      <div className="arch-paper-background" aria-hidden="true">
        {/* 1. Archival Paper Grain Layer */}
        <div className="arch-grain-layer"></div>

        {/* 2. Soft Natural Tonal Grounding Depth Behind Hero */}
        <div className="arch-tonal-depth"></div>

        {/* 3. Organic Flowing Topographic Curves (Northwest Margin) */}
        <svg
          className="arch-organic-svg topography-nw"
          viewBox="0 0 850 620"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -50,110 C 140,50 280,210 460,140 C 640,70 730,230 870,170"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <path
            d="M -50,180 C 160,100 310,290 500,200 C 680,120 770,300 890,240"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <path
            d="M -50,250 C 180,160 340,360 540,270 C 720,180 810,370 920,310"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="6 5"
          />
          <path
            d="M -50,330 C 200,220 370,440 580,340 C 760,240 850,450 950,390"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <path
            d="M -50,410 C 220,290 410,510 630,420 C 810,320 900,520 980,470"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <path
            d="M -50,490 C 250,360 450,590 680,500 C 860,400 940,600 1020,550"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </svg>

        {/* 4. Sun Path Trajectory Arc & Solar Ray Ticks (Southeast Margin) */}
        <svg
          className="arch-organic-svg solar-arc-se"
          viewBox="0 0 720 720"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Primary Sun Path Arc */}
          <circle
            cx="600"
            cy="600"
            r="500"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          {/* Secondary Solar Trajectory Arc */}
          <circle
            cx="600"
            cy="600"
            r="410"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="8 6"
          />
          {/* Inner Horizon Arc */}
          <circle
            cx="600"
            cy="600"
            r="310"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          {/* Concentric Center Arc */}
          <circle
            cx="600"
            cy="600"
            r="190"
            stroke="currentColor"
            strokeWidth="0.8"
          />

          {/* Delicate Solar Radial Ticks radiating outward */}
          <line x1="100" y1="600" x2="76" y2="600" stroke="currentColor" strokeWidth="0.8" />
          <line x1="128" y1="454" x2="108" y2="437" stroke="currentColor" strokeWidth="0.8" />
          <line x1="202" y1="326" x2="184" y2="306" stroke="currentColor" strokeWidth="0.8" />
          <line x1="326" y1="222" x2="313" y2="200" stroke="currentColor" strokeWidth="0.8" />
          <line x1="472" y1="150" x2="463" y2="129" stroke="currentColor" strokeWidth="0.8" />
          <line x1="600" y1="100" x2="600" y2="76" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Hero Foreground Container */}
      <div className="hero-container">
        {/* Animated Cinematic Visual Showcase */}
        <div className="hero-visual-frame">
          <img
            src={heroImg}
            alt="Curated Architectural Luxury Estate"
            className="hero-cinematic-img"
          />
          <div className="hero-visual-overlay"></div>
          <div className="hero-glass-sheen"></div>
        </div>

        {/* Performance Metrics Strip */}
      
      </div>
    </section>
  );
};

export default Hero;
