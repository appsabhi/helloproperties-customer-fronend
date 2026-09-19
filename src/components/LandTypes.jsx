import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandTypes.css";

const landTypes = [
  {
    id: "plot-land",
    number: "01",
    title: "Plot/Land",
    subtitle: "Prime Parcels & Acreage",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
    gridClass: "mosaic-hero",
    delay: "80ms",
  },
  {
    id: "house-villa",
    number: "02",
    title: "House/Villa",
    subtitle: "Luxury Private Residences",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    gridClass: "mosaic-medium-a",
    delay: "140ms",
  },
  {
    id: "apartment-flat",
    number: "03",
    title: "Apartment/Flat",
    subtitle: "Contemporary Urban Living",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
    gridClass: "mosaic-compact-a",
    delay: "200ms",
  },
  {
    id: "residential-plot",
    number: "04",
    title: "Residential Plot",
    subtitle: "Plotted Communities & Sites",
    image: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=85",
    gridClass: "mosaic-compact-b",
    delay: "260ms",
  },
  {
    id: "commercial-plot",
    number: "05",
    title: "Commercial Plot",
    subtitle: "High-Yield Business & Resort Land",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    gridClass: "mosaic-medium-b",
    delay: "320ms",
  },
  {
    id: "agricultural-land",
    number: "06",
    title: "Agricultural Land",
    subtitle: "Fertile Plantations & Farmland",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=85",
    gridClass: "mosaic-medium-c",
    delay: "380ms",
  },
  {
    id: "industrial-plot",
    number: "07",
    title: "Industrial Plot",
    subtitle: "Logistics & Manufacturing Zones",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=85",
    gridClass: "mosaic-medium-d",
    delay: "440ms",
  },
];

/* Direct-DOM 3D Tilt Card (Smooth 60+ FPS, Zero React State Lag, No Vertical Lifting) */
const LandCard = ({ item, onClick }) => {
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
      onClick={onClick}
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
  const navigate = useNavigate();
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
      id="property-types"
      ref={sectionRef}
    >
      <div className="land-types-container">
        {/* Animated Section Header */}
        <div className="land-types-header">
          <div className="header-3d-inner">
            <span className="land-eyebrow">
              <span className="eyebrow-accent">✦</span>
              <span>PROPERTY TYPOLOGIES</span>
              <span className="eyebrow-accent">✦</span>
            </span>
            <h2 className="land-title">
              <span className="title-word">Property</span>{" "}
              <span className="title-word">Types</span>
            </h2>
          </div>
        </div>

        {/* 3D Interlocking Bento Mosaic with Direct 3D Tilt on Hover */}
        <div className="land-mosaic-grid">
          {landTypes.map((item) => (
            <LandCard
              key={item.id}
              item={item}
              onClick={() => navigate(`/properties?type=${encodeURIComponent(item.title)}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandTypes;




