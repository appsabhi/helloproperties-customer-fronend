import React from "react";
import "./TheLandscape.css";

const LIFESTYLE_IMAGE = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=2400&q=90"; // Infinity pool overlooking misty mountain sunset

const TheLandscape = () => {
  return (
    <section className="arch-lifestyle-section">
      <div className="arch-lifestyle-bg">
        <img src={LIFESTYLE_IMAGE} alt="The Kerala Lifestyle - Infinity pool overlooking misty valley" className="arch-lifestyle-img" />
        <div className="arch-lifestyle-overlay"></div>
      </div>

      <div className="arch-lifestyle-content">
        <div className="hp-container">
          <div className="arch-lifestyle-box">
            <span className="arch-lifestyle-label">THE KERALA LIFESTYLE</span>
            
            <h2 className="arch-lifestyle-headline">
              NATURE, CULTURE,<br />
              AND TIMELESS LIVING.
            </h2>

            <p className="arch-lifestyle-subhead">
              From misty mountains to serene backwaters, Kerala offers more than a destination — it offers a lifestyle.
            </p>

            <button
              type="button"
              className="arch-btn-discover-kerala"
              onClick={() => {
                const el = document.getElementById("destinations");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>DISCOVER KERALA</span>
              <span className="arr">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheLandscape;
