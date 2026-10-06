import React, { useRef, useLayoutEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCustomerProperties } from "../context/CustomerPropertyContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FeaturedProperties.css";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Optimize for mobile (prevents lag when address bar shows/hides)
ScrollTrigger.config({ ignoreMobileResize: true });

// Demo properties removed.

function formatSpecs(p) {
  const parts = [];
  if (p.bedrooms) parts.push(`${p.bedrooms} BHK`);
  if (p.builtUpArea) {
    const areaStr = String(p.builtUpArea).toLowerCase().includes("sq")
      ? p.builtUpArea
      : `${p.builtUpArea} sq ft`;
    parts.push(areaStr);
  } else if (p.landArea) {
    parts.push(p.landArea);
  }
  if (parts.length === 0) {
    if (p.district || p.location) parts.push(p.district || p.location);
    else parts.push("Prime Site");
  }
  return parts.join("  •  ");
}

function formatLocation(p) {
  if (p.location && p.district) return `${p.location}, ${p.district}`;
  if (p.location) return p.location;
  if (p.district) return `${p.district}, Kerala`;
  return "Kerala, India";
}

const FeaturedProperties = () => {
  const navigate = useNavigate();
  const { properties } = useCustomerProperties();

  const containerRef = useRef(null);
  const rowRef = useRef(null);

  let displayCards = [];

  if (properties && properties.length > 0) {
    const featured = properties.filter((p) => p.isFeatured);
    const nonFeatured = properties.filter((p) => !p.isFeatured);
    const combined = [...featured, ...nonFeatured].slice(0, 8);

    displayCards = combined.map((p) => ({
      id: p.id,
      type: (p.propertyType || p.category || "PROPERTY").toUpperCase(),
      title: p.title,
      location: formatLocation(p),
      specs: formatSpecs(p),
      price: p.priceFormatted || "Price on Request",
      listingType: p.listingType === "Rent" ? "For Rent" : "For Sale",
      status: p.status,
      img: p.imageUrl ? p.imageUrl.split(',')[0].trim() : null,
      video: p.videoUrl || p.video,
    }));
  }

  useLayoutEffect(() => {
    // A gsap.context makes cleanup extremely easy and isolates our selectors
    let ctx = gsap.context(() => {
      // Apply pinning & scroll hijacking on all screen sizes now.
      let mm = gsap.matchMedia();

      mm.add("all", () => {
        if (!rowRef.current || displayCards.length === 0) return;
        // Function to calculate exact horizontal distance to travel
        const getScrollAmount = () => {
          let rowWidth = rowRef.current.scrollWidth;
          let viewportWidth = window.innerWidth;
          // Return the exact overflow amount so the last card perfectly stops at the right edge
          return -(rowWidth - viewportWidth + 60); // 60px padding buffer
        };

        const tween = gsap.to(rowRef.current, {
          x: getScrollAmount,
          ease: "none",
          force3D: true, // Hardware acceleration
        });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 80px", // Pin it just beneath the navbar
          end: () => `+=${Math.abs(getScrollAmount())}`, // scroll distance equals horizontal distance
          pin: true,
          animation: tween,
          scrub: 0.5, // Reduced from 1 to 0.5 for tighter, less laggy response
          invalidateOnRefresh: true, // Recalculate values dynamically on window resize!
        });

        return () => {
          tween.kill(); // clean up animation if component unmounts or crosses breakpoint
        };
      });

    }, containerRef); // Scoped to this component

    return () => ctx.revert();
  }, [displayCards.length]);

  if (!properties || properties.length === 0) {
    return null; // Don't render the section if no properties are loaded yet
  }

  return (
    <section ref={containerRef} className="arch-featured-section">
      <div className="hp-container">
        {/* Stationary Header */}
        <div className="arch-featured-header-wrap">
          <div>
            <span className="meta-label">CURATED SELECTION</span>
            <h2 className="arch-featured-title">FEATURED PROPERTIES</h2>
          </div>
          <div className="arch-featured-actions desktop-actions">
            <Link to="/properties" className="arch-view-all-link">
              <span>VIEW ALL PROPERTIES</span>
              <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="slider-viewport-container">
        {/* Sliding Row */}
        <div ref={rowRef} className="arch-property-grid" style={{ paddingLeft: "max(2rem, calc((100vw - 1400px) / 2 + 2rem))" }}>
          {displayCards.map((prop, index) => (
            <article
              key={prop.id}
              className="arch-featured-card"
              onClick={() => navigate(`/property/${prop.id}`)}
            >
              {/* Image Frame with Translucent Glass Floating Badges */}
              <div className="arch-card-media-wrap">
                {prop.img ? (
                  <img src={prop.img} alt={prop.title} className="arch-card-media-img" loading="lazy" />
                ) : prop.video ? (
                  <video src={`${prop.video}#t=0.1`} className="arch-card-media-img" preload="metadata" muted playsInline style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                ) : (
                  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85" alt={prop.title} className="arch-card-media-img" loading="lazy" />
                )}
                <div className="arch-card-top-badges">
                  <span className="arch-pill-badge-type">{prop.type}</span>
                  <span className="arch-pill-badge-status">{prop.listingType}</span>
                  {prop.status && prop.status !== 'Available' && (
                    <span className="arch-pill-badge-status" style={{ backgroundColor: prop.status === 'Sold' ? '#334155' : prop.status === 'Under Negotiation' ? '#d97706' : '#dc2626' }}>
                      {prop.status}
                    </span>
                  )}
                </div>
              </div>

              {/* Structured White/Ivory Card Body */}
              <div className="arch-card-body-block">
                <div className="arch-card-location">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{prop.location}</span>
                </div>

                <h3 className="arch-card-item-title">{prop.title}</h3>
                
                <div className="arch-card-specs-row"></div>

                <div className="arch-card-bottom-bar">
                  <button className="arch-card-cta-btn" type="button" aria-label="Explore property">
                    <span>EXPLORE PROPERTY</span>
                    <span className="cta-arrow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="arch-featured-actions mobile-actions">
        <Link to="/properties" className="arch-view-all-link">
          <span>VIEW ALL PROPERTIES</span>
          <span className="arr">→</span>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProperties;
