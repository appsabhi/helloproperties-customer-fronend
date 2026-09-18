import React, { useState } from "react";
import "./WhyUs.css";

const VIDEO_THUMBNAIL = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85";

const WhyUs = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="about" className="arch-whyus-section">
      <div className="hp-container">
        <span className="arch-whyus-label">WHY CHOOSE US</span>

        <h2 className="arch-whyus-headline">
          TRUSTED BY VISIONARIES.<br />
          CHOSEN FOR LIFESTYLE.
        </h2>

        <div className="arch-whyus-grid">
          {/* Left Stats Grid */}
          <div className="arch-stats-list">
            <div className="arch-stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">PREMIUM PROPERTIES</span>
            </div>

            <div className="arch-stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">HAPPY CLIENTS</span>
            </div>

            <div className="arch-stat-item">
              <span className="stat-number">10+</span>
              <span className="stat-label">YEARS OF EXPERIENCE</span>
            </div>
          </div>

          {/* Right Video Thumbnail Component */}
          <div className="arch-video-card" onClick={() => setIsPlaying(true)}>
            <img src={VIDEO_THUMBNAIL} alt="Watch Our Story" className="arch-video-img" />
            <div className="arch-video-overlay"></div>

            <div className="arch-play-container">
              <div className="arch-play-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="arch-watch-label">WATCH OUR STORY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
