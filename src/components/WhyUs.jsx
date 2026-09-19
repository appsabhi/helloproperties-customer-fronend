import React from "react";
import { motion } from "framer-motion";
import "./WhyUs.css";

const SHOWCASE_IMAGE = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85";

const WhyUs = () => {
  return (
    <section id="about" className="arch-whyus-section">
      <div className="hp-container">
        <div className="arch-whyus-grid">
          {/* Left Split Content */}
          <motion.div 
            className="arch-whyus-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="arch-whyus-eyebrow">ABOUT HELLOPROPERTIES</span>

            <h2 className="arch-whyus-title">
              CURATING KERALA’S MOST EXCEPTIONAL LANDSCAPES & HOMES.
            </h2>

            <p className="arch-whyus-description">
              HelloProperties is dedicated to presenting prime Kerala land, tea plantations, coastal parcels, and architectural residences. We connect discerning buyers with 100% verified estates through complete legal transparency, boundary precision, and personalized advisory.
            </p>

            {/* Key Value Pillar Chips */}
            <div className="arch-pillars-row">
              <span className="pillar-chip">✓ 100% Title Verified</span>
              <span className="pillar-chip">✓ Boundary & Terrain Audited</span>
              <span className="pillar-chip">✓ Private Advisory</span>
            </div>
          </motion.div>

          {/* Right Image Showcase Frame */}
          <motion.div 
            className="arch-whyus-media"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="arch-whyus-img-frame">
              <img src={SHOWCASE_IMAGE} alt="HelloProperties Kerala Luxury Architecture" className="arch-whyus-img" loading="lazy" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
