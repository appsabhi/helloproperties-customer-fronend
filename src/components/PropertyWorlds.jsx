import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./PropertyWorlds.css";

import villaImg from "../assets/hero-panels/villa_panel_1790572124793.jpg";
import apartmentImg from "../assets/hero-panels/apartment_panel_1790572137625.jpg";
import plotImg from "../assets/hero-panels/residential_plot_panel_1790572150494.jpg";
import commercialImg from "../assets/hero-panels/commercial_panel_1790572163668.jpg";
import landImg from "../assets/hero-panels/agricultural_land_panel_1790572177078.jpg";

const categories = [
  { id: "apartments", title: "Apartments", path: "/properties?type=Apartments", img: apartmentImg, desc: "Modern living spaces in prime city locations." },
  { id: "plots", title: "Residential Plots", path: "/properties?type=Land", img: plotImg, desc: "Build your dream home on premium verified plots." },
  { id: "villas", title: "Luxury Villas", path: "/properties?type=Villas", img: villaImg, desc: "Exclusive, spacious homes with premium amenities." },
  { id: "commercial", title: "Commercial Spaces", path: "/properties?type=Commercial", img: commercialImg, desc: "Strategic locations for business growth and ROI." },
  { id: "agricultural", title: "Agricultural Land", path: "/properties?type=Land", img: landImg, desc: "Fertile land and plantations across Kerala." },
];

const PropertyWorlds = () => {
  const navigate = useNavigate();

  return (
    <section className="arch-category-section" id="categories">
      <div className="hp-container">
        {/* Header */}
        <motion.div 
          className="arch-category-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <span className="meta-label">CATEGORIES</span>
            <h2 className="arch-category-title">EXPLORE BY PROPERTY TYPE</h2>
          </div>
        </motion.div>

        {/* Horizontal Expanding Gallery */}
        <div className="mnzil-accordion-gallery" role="region" aria-label="Property Categories">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="mnzil-accordion-panel"
              tabIndex={0}
              role="button"
              aria-label={`View ${cat.title}`}
              onClick={() => navigate(cat.path)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(cat.path);
                } else if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  e.currentTarget.nextElementSibling?.focus();
                } else if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  e.currentTarget.previousElementSibling?.focus();
                }
              }}
            >
              <div className="mnzil-accordion-img-wrap">
                <img src={cat.img} alt={cat.title} loading="lazy" />
                <div className="mnzil-accordion-overlay"></div>
              </div>
              <div className="mnzil-accordion-content">
                <h3>{cat.title}</h3>
                <p className="mnzil-accordion-desc">{cat.desc}</p>
                <div className="mnzil-accordion-explore">
                  <span>Explore</span> <span className="mnzil-arr">→</span>
                </div>
              </div>
              <div className="mnzil-accordion-collapsed-title">
                <span>{cat.title}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PropertyWorlds;
