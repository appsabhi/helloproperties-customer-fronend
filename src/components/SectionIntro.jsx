import React from "react";
import { motion } from "framer-motion";
import "./SectionIntro.css";

const INTRO_IMAGE = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85"; // Tropical villa surrounded by lush Kerala greenery

const SectionIntro = () => {
  return (
    <section id="brand-intro" className="arch-intro-section">
      <div className="hp-container">
        <div className="arch-intro-grid">
          {/* Left Text Block */}
          <motion.div 
            className="arch-intro-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="meta-label">ABOUT KERALA PROPERTIES</span>
            
            <h2 className="arch-intro-headline">
              PROPERTY IS NOT JUST<br />
              A PLACE TO OWN.<br />
              IT IS A LANDSCAPE<br />
              TO BELONG TO.
            </h2>

            <p className="arch-intro-body">
              We bring together the most beautiful homes, land and investment opportunities across Kerala — carefully curated for those who seek more than just a property, but a way of life.
            </p>

            <a href="#about" className="arch-intro-link">
              <span>OUR STORY</span>
              <span className="arr">→</span>
            </a>
          </motion.div>

          {/* Right Arch Visual Frame */}
          <motion.div 
            className="arch-intro-media"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="arch-intro-arch-frame">
              <img src={INTRO_IMAGE} alt="Kerala Misty Hills & Tea Gardens" className="arch-intro-arch-img" />
            </div>

            {/* Handwritten overlay decoration */}
            {/* <div className="arch-handwritten-note">
              <span>More than real estate</span>
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SectionIntro;
