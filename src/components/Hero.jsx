import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
          <motion.div 
            className="arch-hero-text-block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* <span className="arch-hero-tag">PREMIUM PROPERTIES IN KERALA</span> */}
            
            <h1 className="arch-hero-title">
              <span>FIND</span>
              <span>YOUR PLACE</span>
              <span>IN THE LANDSCAPE.</span>
            </h1>

            <motion.p 
              className="arch-hero-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Curated properties across Kerala.
            </motion.p>

            <motion.p 
              className="arch-hero-subtext"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Discover exceptional homes, land and investment opportunities shaped by Kerala’s most remarkable landscapes.
            </motion.p>

            <motion.div 
              className="arch-hero-ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
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
            </motion.div>
          </motion.div>

          {/* Floating Pill Search Bar */}
          {/* <form className="arch-search-pill" onSubmit={handleSearch}>
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
                <option value="Plot/Land">Plot/Land</option>
                <option value="House/Villa">House/Villa</option>
                <option value="Apartment/Flat">Apartment/Flat</option>
                <option value="Residential Plot">Residential Plot</option>
                <option value="Commercial Plot">Commercial Plot</option>
                <option value="Agricultural Land">Agricultural Land</option>
                <option value="Industrial Plot">Industrial Plot</option>
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
          </form> */}

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
