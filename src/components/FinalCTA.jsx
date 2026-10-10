import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import PropertyActionModal from "./PropertyActionModal";
import "./FinalCTA.css";

import lookingForPropertyImg from "../assets/looking-for-property.jpg";
import sellPropertyImg from "../assets/want-to-sell.jpg";
import rentPropertyImg from "../assets/want-to-rent.jpg";

const helpCards = [
  {
    id: "buyer",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5l9-7 9 7v10.5a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 20V9.5z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Looking for a Property?",
    description: "Quality properties aligned with your budget, preferred location, and requirements.",
    image: lookingForPropertyImg,
    formType: "buyer",
  },
  {
    id: "seller",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
    title: "Want to Sell Your Property?",
    description: "Share your property details with us and let the right buyers find you quickly.",
    image: sellPropertyImg,
    formType: "seller",
  },
  {
    id: "renter",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
      </svg>
    ),
    title: "Want to Rent Your Property?",
    description: "List your property for rent and seamlessly connect with verified potential tenants.",
    image: rentPropertyImg,
    formType: "renter",
  },
];

const FinalCTA = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFormType, setActiveFormType] = useState("buyer");
  const reduceMotion = useReducedMotion();

  const handleCardClick = (type) => {
    setActiveFormType(type);
    setModalOpen(true);
  };

  return (
    <section className="how-help-section" aria-labelledby="how-help-title">
      <div className="how-help-container">
        {/* Main Outer Card with Brand Burgundy */}
        <motion.div 
          className="how-help-outer-card"
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header with Two-line Typography */}
          <div className="how-help-header">
            <h2 className="how-help-title" id="how-help-title">
              <span className="how-help-title-light">How Can We</span>
              <span className="how-help-title-bold">Help You Today?</span>
            </h2>
          </div>

          {/* Inset Container enclosing the cards */}
          <div className="how-help-inner-box">
            <div className="how-help-cards-grid">
              {helpCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  className="how-help-card"
                  onClick={() => handleCardClick(card.formType)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleCardClick(card.formType);
                    }
                  }}
                  initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                >
                  {/* Top Row: Icon + Title inline */}
                  <div className="how-help-card-header">
                    <span className="how-help-card-icon">
                      {card.icon}
                    </span>
                    <h3 className="how-help-card-title">{card.title}</h3>
                  </div>

                  {/* Description Paragraph */}
                  <p className="how-help-card-desc">{card.description}</p>

                  {/* Bottom Rounded Image */}
                  <div className="how-help-card-media">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="how-help-card-img"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Dedicated Form Modal for Buyer, Seller, or Renter */}
      <PropertyActionModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        formType={activeFormType}
      />
    </section>
  );
};

export default FinalCTA;
