import React, { useState } from "react";
import { motion } from "framer-motion";
import "./PropertyJourneys.css";

const STEPS = [
  {
    num: "01",
    title: "DISCOVER",
    subtitle: "Landscape & Vision Alignment",
    desc: "Explore curated private listings tailored to your architectural preferences, geographical desires, and capital goals.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85",
  },
  {
    num: "02",
    title: "EXPLORE",
    subtitle: "Architectural & Land Analysis",
    desc: "Review detailed contour maps, elevation profiles, soil studies, and high-definition architectural video dossiers.",
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=85",
  },
  {
    num: "03",
    title: "VISIT",
    subtitle: "Bespoke Ground Immersion",
    desc: "Experience private guided site walkthroughs hosted by local landscape specialists who know every mountain spring and boundary stone.",
    img: "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&w=800&q=85",
  },
  {
    num: "04",
    title: "VERIFY",
    subtitle: "Rigorous Legal Due Diligence",
    desc: "Clear 30-year title verification, zoning approvals, revenue records, and environmental clearance check before any commitment.",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=85",
  },
  {
    num: "05",
    title: "OWN",
    subtitle: "Seamless White-Glove Handover",
    desc: "Effortless registration, tax optimization, architect onboarding, and estate management initialization.",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=85",
  },
];

const PropertyJourneys = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="arch-journey-section">
      <div className="hp-container">
        {/* Section Header */}
        <motion.div 
          className="arch-journey-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <span className="meta-label">THE ADVISORY PROCESS</span>
            <h2 className="arch-journey-title">FROM SEARCH TO SIGNATURE</h2>
          </div>
          <p className="arch-journey-subhead">
            A structured, transparent roadmap designed to protect your investment and elevate your discovery experience.
          </p>
        </motion.div>

        {/* Horizontal Process Steps Bar */}
        <motion.div 
          className="arch-journey-steps"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {STEPS.map((step, idx) => (
            <button
              key={step.num}
              type="button"
              className={`arch-journey-step-btn ${activeStep === idx ? "active" : ""}`}
              onClick={() => setActiveStep(idx)}
            >
              <span className="step-btn-num">{step.num}</span>
              <span className="step-btn-title">{step.title}</span>
              <span className="step-btn-line"></span>
            </button>
          ))}
        </motion.div>

        {/* Active Journey Detail Card */}
        <motion.div 
          className="arch-journey-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <div className="arch-journey-text">
            <span className="arch-journey-index">STAGE {STEPS[activeStep].num} OF 05</span>
            <h3 className="arch-journey-card-title">{STEPS[activeStep].title}</h3>
            <p className="arch-journey-card-subtitle">{STEPS[activeStep].subtitle}</p>
            <p className="arch-journey-card-desc">{STEPS[activeStep].desc}</p>
          </div>

          <div className="arch-journey-media">
            <img src={STEPS[activeStep].img} alt={STEPS[activeStep].title} className="arch-journey-img" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PropertyJourneys;
