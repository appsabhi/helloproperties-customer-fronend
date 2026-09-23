import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Hero.css";
import bgLayer from "../assets/png/bg_layer.png"
import heroLeftImg from "../assets/png/hero-left_img.png"
import hero3 from "../assets/png/buildings_layer.png"
import mobileBgLayer from "../assets/png/mobile_bg_layer.png"
import mobileHero3 from "../assets/png/mobile_buildings_layer.png"
import mobileHeroLeftImg from "../assets/png/mobile_hero-left_img.png"

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

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="arch-hero">
      {/* Background Image & Gradient Overlay */}
      <div className="arch-hero-bg">
        {/* Dynamic Background */}
        <img 
          src={isMobile ? mobileBgLayer : bgLayer} 
          alt="Background layer" 
          className="arch-hero-bg-img" 
        />
        
        {/* Dynamic Left Wave/Sketches */}
        <div className="arch-left-img_container">
          <img 
            src={isMobile ? mobileHeroLeftImg : heroLeftImg} 
            alt="Hero Left Layer" 
            className="arch-hero-left-img" 
          />
        </div>

        {/* Dynamic Animated Buildings Layer */}
        <motion.img
          key={isMobile ? "mobile-buildings" : "desktop-buildings"}
          className={`hero_layerimg ${isMobile ? "mobile-layer" : "desktop-layer"}`}
          src={isMobile ? mobileHero3 : hero3}
          alt="Buildings Overlay"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ pointerEvents: 'none' }}
        />

        <div className="arch-hero-overlay"></div>
      </div>

      <div className="arch-hero-content ">
        <div className="hp-container">
          <motion.div 
            className="arch-hero-text-block"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* <span className="arch-hero-tag">PREMIUM PROPERTIES IN KERALA</span> */}
            
            <h1 className="arch-hero-title ">
              <span>FIND YOUR</span>
              <span> PLACE IN THE</span>
              <span> LANDSCAPE</span>
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
       


        </div>
      </div>

    </section>
  );
};

export default Hero;
