import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

import explorePropertiesBg from "../assets/png/exploreProperties_bg.png";
import "./FeaturedProperties.css";

const FeaturedProperties = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  return (
    <section className="explore-hero-section" aria-label="Explore Properties">
      {/* Cityscape illustration background with prominent fade from low opacity */}
      <motion.img 
        src={explorePropertiesBg} 
        alt="" 
        className="explore-hero-bg-img"
        aria-hidden="true"
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 85 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ 
          opacity: { duration: 1.35, ease: "easeOut" },
          y: { duration: 1.15, ease: [0.16, 1, 0.3, 1] }
        }}
      />

      {/* Center content placed gracefully in the open sky space */}
      <div className="explore-hero-container">
        <motion.div 
          className="explore-hero-content"
          initial={reduceMotion ? false : { opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="explore-hero-title">
            <span className="explore-title-line">Your Property</span>
            <span className="explore-title-line">Journey Starts Here.</span>
          </h2>

          <motion.button 
            type="button"
            className="explore-hero-btn"
            onClick={() => navigate('/properties')}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>Explore Properties</span>
            <svg 
              className="explore-hero-btn-arrow" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
