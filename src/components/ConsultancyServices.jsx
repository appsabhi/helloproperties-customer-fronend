import React from "react";
import { motion } from "framer-motion";
import { Home, Tag, TrendingUp, Map, Key } from "lucide-react";
import "./ConsultancyServices.css";

const services = [
  {
    title: "Buy a Property",
    description: "Find a property aligned with your needs, location and budget.",
    icon: <Home size={28} strokeWidth={1.5} />,
  },
  {
    title: "Sell a Property",
    description: "Get guidance on presenting and positioning your property.",
    icon: <Tag size={28} strokeWidth={1.5} />,
  },
  {
    title: "Property Investment",
    description: "Explore opportunities based on your investment goals.",
    icon: <TrendingUp size={28} strokeWidth={1.5} />,
  },
  {
    title: "Land & Development",
    description: "Identify land opportunities suited to residential or commercial plans.",
    icon: <Map size={28} strokeWidth={1.5} />,
  },
  {
    title: "Rental & Leasing",
    description: "Find suitable properties for your residential or business needs.",
    icon: <Key size={28} strokeWidth={1.5} />,
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
          viewport={{ once: true, amount: 0.3 }}
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
              viewport={{ once: true, amount: 0.1 }}
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
