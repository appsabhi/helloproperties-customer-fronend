import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const HERO_IMAGE = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=90";

const Hero = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (propertyType) params.append("type", propertyType);
    if (budget) params.append("budget", budget);
    navigate(`/properties?${params.toString()}`);
  };

  const scrollToExplore = () => {
    const introSection = document.getElementById("brand-intro");
    if (introSection) {
      introSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="arch-hero">
      {/* Background Image & Gradient Overlay */}
      <div className="arch-hero-bg">
        <img src={HERO_IMAGE} alt="Kerala Luxury Contemporary Villa in Landscape" className="arch-hero-img" />
        <div className="arch-hero-overlay"></div>
      </div>

      <div className="arch-hero-content">
        <div className="hp-container">
          <div className="arch-hero-text-block">
            <span className="arch-hero-tag">PREMIUM PROPERTIES IN KERALA</span>
            
            <h1 className="arch-hero-title">
              <span>FIND</span>
              <span>YOUR PLACE</span>
              <span>IN THE LANDSCAPE.</span>
            </h1>

            <p className="arch-hero-tagline">Curated properties across Kerala.</p>

            <p className="arch-hero-subtext">
              Discover exceptional homes, land and investment opportunities shaped by Kerala’s most remarkable landscapes.
            </p>

            <div className="arch-hero-ctas">
              <button 
                type="button" 
                className="arch-btn-explore-green"
                onClick={() => navigate("/properties")}
              >
                <span>EXPLORE PROPERTIES</span>
                <span className="arr">→</span>
              </button>
              
              <button 
                type="button" 
                className="arch-btn-discover-glass"
                onClick={() => {
                  const el = document.getElementById("destinations");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>DISCOVER KERALA</span>
              </button>
            </div>
          </div>

          {/* Floating Pill Search Bar */}
          <form className="arch-search-pill" onSubmit={handleSearch}>
            <div className="arch-search-field">
              <label className="arch-search-label">LOCATION</label>
              <div className="arch-select-wrapper">
                <svg className="arch-field-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <select 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  className="arch-search-select"
                >
                  <option value="">Select location</option>
                  <option value="Kozhikode">Kozhikode</option>
                  <option value="Wayanad">Wayanad</option>
                  <option value="Kochi">Kochi</option>
                  <option value="Munnar">Munnar</option>
                  <option value="Alleppey">Alleppey</option>
                  <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                </select>
              </div>
            </div>

            <div className="arch-search-divider"></div>

            <div className="arch-search-field">
              <label className="arch-search-label">PROPERTY TYPE</label>
              <select 
                value={propertyType} 
                onChange={(e) => setPropertyType(e.target.value)}
                className="arch-search-select"
              >
                <option value="">Any Type</option>
                <option value="Villas">Villas</option>
                <option value="Plantation Estates">Plantation Estates</option>
                <option value="Waterfront">Waterfront & Backwaters</option>
                <option value="Land">Land & Plots</option>
                <option value="Farmland">Farmland & Eco Acres</option>
              </select>
            </div>

            <div className="arch-search-divider"></div>

            <div className="arch-search-field">
              <label className="arch-search-label">BUDGET</label>
              <select 
                value={budget} 
                onChange={(e) => setBudget(e.target.value)}
                className="arch-search-select"
              >
                <option value="">Any Budget</option>
                <option value="under-1cr">Under ₹1 Cr</option>
                <option value="1cr-5cr">₹1 Cr – ₹5 Cr</option>
                <option value="5cr-20cr">₹5 Cr – ₹20 Cr</option>
                <option value="above-20cr">₹20+ Cr</option>
              </select>
            </div>

            <button type="submit" className="arch-search-submit-pill">
              <span>SEARCH</span>
              <span className="arr">→</span>
            </button>
          </form>

          {/* Scroll Indicator */}
          <button 
            type="button" 
            className="arch-scroll-indicator"
            onClick={scrollToExplore}
            aria-label="Scroll to explore"
          >
            <span className="scroll-text">SCROLL TO EXPLORE</span>
            <span className="scroll-arrow animate-float">↓</span>
          </button>
        </div>
      </div>

      {/* Organic Bottom Curve Mask Transition */}
      <div className="arch-hero-curve-wrapper">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="arch-hero-curve-svg">
          <path d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z" fill="#F3F0E8" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
