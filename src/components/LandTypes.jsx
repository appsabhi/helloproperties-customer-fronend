import React, { useEffect, useRef, useState } from "react";
import plantationImg from "../assets/land-plantation.jpg";
import waterfrontImg from "../assets/land-waterfront.jpg";
import residentialImg from "../assets/land-residential.jpg";
import hillsideImg from "../assets/land-hillside.jpg";
import commercialImg from "../assets/land-commercial.jpg";
import "./LandTypes.css";

const landTypes = [
  {
    id: "plantation",
    number: "01",
    title: "Plantation & Agricultural",
    subtitle: "Highland Terrains",
    image: plantationImg,
    gridClass: "mosaic-hero",
    delay: "80ms",
  },
  {
    id: "residential",
    number: "02",
    title: "Residential Plots",
    subtitle: "Architectural Enclaves",
    image: residentialImg,
    gridClass: "mosaic-medium-a",
    delay: "180ms",
  },
  {
    id: "waterfront",
    number: "03",
    title: "Waterfront Parcels",
    subtitle: "Riparian & Coastal",
    image: waterfrontImg,
    gridClass: "mosaic-compact-a",
    delay: "280ms",
  },
  {
    id: "hillside",
    number: "04",
    title: "Hillside & Mountain Lands",
    subtitle: "Panoramic Vistas",
    image: hillsideImg,
    gridClass: "mosaic-compact-b",
    delay: "360ms",
  },
  {
    id: "commercial",
    number: "05",
    title: "Commercial & Resort Land",
    subtitle: "Hospitality Acreage",
    image: commercialImg,
    gridClass: "mosaic-medium-b",
    delay: "440ms",
  },
];

/* Direct-DOM 3D Tilt Card (Smooth 60+ FPS, Zero React State Lag, No Vertical Lifting) */
const LandCard = ({ item }) => {
  const frameRef = useRef(null);
  const glareRef = useRef(null);

  const handleMouseMove = (e) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6.5; // subtle max 6.5deg 3D tilt
    const rotateY = ((x - centerX) / centerX) * 6.5;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    frame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 65%)`;
      glareRef.current.style.opacity = "1";
    }
  };

  const handleMouseEnter = () => {
    if (frameRef.current) {
      frameRef.current.style.transition = "transform 0.1s ease-out, box-shadow 0.3s ease";
    }
  };

  const handleMouseLeave = () => {
    if (frameRef.current) {
      frameRef.current.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease";
      frameRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      className={`land-mosaic-card ${item.gridClass}`}
      style={{ "--reveal-delay": item.delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={frameRef} className="land-card-frame">
        <img
          src={item.image}
          alt={item.title}
          className="land-card-img"
          loading="lazy"
        />
        <div ref={glareRef} className="land-card-glare"></div>
        <div className="land-card-scrim"></div>
        <div className="land-card-content">
          <div className="land-card-top">
            <span className="land-card-badge">{item.number}</span>
            <span className="land-card-arrow">↗</span>
          </div>
          <div className="land-card-bottom">
            <span className="land-card-subtitle">{item.subtitle}</span>
            <h3 className="land-card-title">{item.title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandTypes = () => {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`land-types-section ${isInView ? "in-view" : ""}`}
      id="land-types"
      ref={sectionRef}
    >
      <div className="land-types-container">
        {/* Animated Section Header */}
        <div className="land-types-header">
          <div className="header-3d-inner">
            <span className="land-eyebrow">
              <span className="eyebrow-accent">✦</span>
              <span>TERRAIN ARCHIVES</span>
              <span className="eyebrow-accent">✦</span>
            </span>
            <h2 className="land-title">
              <span className="title-word">Types</span>{" "}
              <span className="title-word">of</span>{" "}
              <span className="title-word">Land</span>
            </h2>
          </div>
        </div>

        {/* 3D Interlocking Bento Mosaic with Direct 3D Tilt on Hover */}
        <div className="land-mosaic-grid">
          {landTypes.map((item) => (
            <LandCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandTypes;



