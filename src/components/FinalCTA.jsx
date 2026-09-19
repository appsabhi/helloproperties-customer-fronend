import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GetInTouchModal from "./GetInTouchModal";
import "./FinalCTA.css";

const FinalCTA = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="arch-finalcta-section">
        <div className="hp-container">
          <div className="arch-finalcta-box">
            <span className="arch-finalcta-label">YOUR KERALA STORY AWAITS</span>

            <h2 className="arch-finalcta-headline">
              READY TO FIND YOUR<br />PERFECT PROPERTY?
            </h2>

            <p className="arch-finalcta-sub">
              Whether you are searching for a serene hill retreat, prime investment land, or a luxury waterfront home, our dedicated advisors are here to guide you every step of the way.
            </p>

            <div className="arch-finalcta-btn-group">
              <button
                type="button"
                className="arch-btn-primary-red-pill"
                onClick={() => setModalOpen(true)}
              >
                <span>GET IN TOUCH</span>
                <span className="arr">→</span>
              </button>

              <button
                type="button"
                className="arch-btn-secondary-outline-pill"
                onClick={() => navigate("/properties")}
              >
                <span>EXPLORE ALL PROPERTIES</span>
              </button>
            </div>
          </div>
        </div>

        {/* Subtle Botanical Corner Line Art Graphic */}
        <div className="arch-botanical-art">
          <svg width="140" height="140" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M50 90 Q30 50 10 10 M50 90 Q70 50 90 10 M50 90 Q50 40 50 0 M35 60 Q20 40 10 35 M65 60 Q80 40 90 35" opacity="0.15" />
          </svg>
        </div>
      </section>

      {/* Get In Touch Modal */}
      <GetInTouchModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default FinalCTA;
