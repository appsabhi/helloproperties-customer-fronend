import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Hero.css";
import HERO_IMAGE from "../assets/png/Hero_img.jpg"


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

      <div className="arch-hero-content ">
        <div className="hp-container">
          <motion.div 
            className="arch-hero-text-block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* <span className="arch-hero-tag">PREMIUM PROPERTIES IN KERALA</span> */}
            
            <h1 className="arch-hero-title ">
              <span>FIND</span>
              <span>YOUR PLACE</span>
              <span>IN THE LANDSCAPE</span>
            </h1>

          

        

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
              
            
            </motion.div>
          </motion.div>

          {/* Floating Pill Search Bar */}
         

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

    </section>
  );
};

export default Hero;
