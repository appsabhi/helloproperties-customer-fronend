import React from "react";
import "./WhyUs.css";

const SHOWCASE_IMAGE = "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=85";

const WhyUs = () => {
  return (
    <section id="about" className="arch-whyus-section">
      <div className="hp-container">
        <div className="arch-whyus-grid">
          {/* Left Text Content */}
          <div className="arch-whyus-text">
            <span className="arch-whyus-label">WHY CHOOSE US</span>

            <h2 className="arch-whyus-headline">
              TRUSTED BY VISIONARIES.<br />
              CHOSEN FOR LIFESTYLE.
            </h2>

            <p className="arch-whyus-body">
              We curate Kerala's finest properties with transparency, unmatched local expertise, and an unwavering commitment to quality.
            </p>
          </div>

          {/* Right Image Showcase Frame */}
          <div className="arch-video-card">
            <img src={SHOWCASE_IMAGE} alt="HelloProperties Luxury Portfolio" className="arch-video-img" />
            <div className="arch-video-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
