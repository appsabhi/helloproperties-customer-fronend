import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import GetInTouchModal from "./GetInTouchModal";
import "./FinalCTA.css";

const CTA_BG = "https://images.unsplash.com/photo-1613490908236-fa332b500318?auto=format&fit=crop&w=2000&q=85"; // Premium modern architecture at dusk

const FinalCTA = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="arch-finalcta-section">
        <div className="hp-container">
          <motion.div 
            className="arch-finalcta-box"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="arch-cta-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18"></path>
                <path d="M5 21V7l8-4v18"></path>
                <path d="M19 21V11l-6-4"></path>
                <path d="M9 9v.01"></path>
                <path d="M9 13v.01"></path>
                <path d="M9 17v.01"></path>
              </svg>
            </div>

            <h2 className="arch-finalcta-headline">
              Ready to Find Your<br />Perfect Property?
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
                className="arch-btn-secondary-white-outline"
                onClick={() => navigate("/properties")}
              >
                <span>EXPLORE ALL PROPERTIES</span>
              </button>
            </div>
          </motion.div>
        </div>


      </section>

      {/* Get In Touch Modal */}
      <GetInTouchModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default FinalCTA;
