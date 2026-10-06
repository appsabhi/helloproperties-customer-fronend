import React from "react";
import { motion } from "framer-motion";
import "./SectionIntro.css";

// import BG_LAYER from "../assets/png/bg_layer.png";
import BUILDINGS_LAYER from "../assets/land-residential.jpg";

const SectionIntro = () => {
  const introText = "We bring together the most beautiful homes, land and investment opportunities across Kerala — carefully curated for those who seek more than just a property, but a way of life.";
  
  const typingContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.5,
      }
    }
  };

  const typingLetter = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } }
  };
  return (
    <section id="brand-intro" className="arch-intro-section">
      <div className="hp-container">
        <div className="arch-intro-grid">
          {/* Left Text Block */}
          <motion.div 
            className="arch-intro-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: "some" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="meta-label">ABOUT KERALA PROPERTIES</span>
            
            <h2 className="arch-intro-headline">
              PROPERTY IS NOT JUST<br />
              A PLACE TO OWN.<br />
             
            </h2>

            <motion.p 
              className="arch-intro-body"
              variants={typingContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: "some" }}
            >
              {Array.from(introText).map((char, index) => (
                <motion.span key={index} variants={typingLetter}>
                  {char}
                </motion.span>
              ))}
            </motion.p>
            {/* 
            <a href="#about" className="arch-intro-link">
              <span>OUR STORY</span>
              <span className="arr">→</span>
            </a> 
            */}
          </motion.div>

          {/* Right Layered Visual Frame */}
          <div className="arch-intro-media">
            <div className="arch-intro-layered-frame">
              {/* Static Background Layer */}
              
              
              {/* Animated Buildings & Map Pins Layer */}
              <motion.img 
                src={BUILDINGS_LAYER} 
                alt="Kerala Buildings" 
                className="arch-buildings-layer"
                initial={{ opacity: 0, scaleY: 0.8, y: 40 }}
                whileInView={{ opacity: 1, scaleY: 1, y: 0 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.6, ease: "easeOut" } }}
                viewport={{ once: false, amount: "some" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "bottom center", cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionIntro;
