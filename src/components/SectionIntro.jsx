import React from "react";
import "./SectionIntro.css";

const INTRO_IMAGE = "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&w=1000&q=85"; // Arch-shaped tea garden hill image

const SectionIntro = () => {
  return (
    <section id="brand-intro" className="arch-intro-section">
      <div className="hp-container">
        <div className="arch-intro-grid">
          {/* Left Text Block */}
          <div className="arch-intro-text">
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
          </div>

          {/* Right Arch Visual Frame */}
          <div className="arch-intro-media">
            <div className="arch-intro-arch-frame">
              <img src={INTRO_IMAGE} alt="Kerala Misty Hills & Tea Gardens" className="arch-intro-arch-img" />
            </div>

            {/* Handwritten overlay decoration */}
            <div className="arch-handwritten-note">
              <span>More than real estate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionIntro;
