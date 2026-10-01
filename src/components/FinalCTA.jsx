import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import GetInTouchModal from "./GetInTouchModal";
import "./FinalCTA.css";


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
              Looking for the right property?
            </h2>

            <p className="arch-finalcta-sub">
              Tell us what you need. We'll help you explore the possibilities.
            </p>

            <div className="arch-finalcta-btn-group">
              <button
                type="button"
                className="arch-btn-primary-red-pill"
                onClick={() => setModalOpen(true)}
              >
                <span>TALK TO A CONSULTANT</span>
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
