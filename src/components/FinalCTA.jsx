import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import GetInTouchModal from "./GetInTouchModal";
import "./FinalCTA.css";

import ctaImage from "../assets/hero-panels/new_agricultural_land.jpg";

const FinalCTA = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="arch-finalcta-section" aria-labelledby="finalcta-title">
        <div className="hp-container">
          <motion.div 
            className="arch-finalcta-box"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduceMotion ? 0 : 0.8, ease: "easeOut" }}
          >

            <h2 className="arch-finalcta-headline" id="finalcta-title">
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
