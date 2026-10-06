import React from "react";
import { motion } from "framer-motion";
import "./ConsultancyServices.css";

const services = [
  {
    title: "Buy a Property",
    description: "Find a property aligned with your needs, location and budget.",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  },
  {
    title: "Sell a Property",
    description: "Get guidance on presenting and positioning your property.",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>,
  },
  {
    title: "Property Investment",
    description: "Explore opportunities based on your investment goals.",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>,
  },
  {
    title: "Land & Development",
    description: "Identify land opportunities suited to residential or commercial plans.",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>,
  },
  {
    title: "Rental & Leasing",
    description: "Find suitable properties for your residential or business needs.",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>,
  },
];

const ConsultancyServices = () => {
  return (
    <section className="hp-consultancy-section">
      <div className="hp-container">
        <motion.div 
          className="hp-consultancy-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="meta-label">PROPERTY CONSULTANCY, MADE SIMPLE</span>
          <h2 className="hp-consultancy-title">Our Consultancy Services <span className="title-star">✦</span></h2>
        </motion.div>

        <div className="hp-consultancy-grid">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="hp-consultancy-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            >
              <div className="hp-consultancy-icon-wrapper">
                {service.icon}
              </div>
              <h3 className="hp-consultancy-card-title">{service.title}</h3>
              <p className="hp-consultancy-card-desc">{service.description}</p>
              
              <div className="hp-consultancy-hover-line"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsultancyServices;
