import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./PropertyWorlds.css";

import newHouseVillaImg from "../assets/hero-panels/new_house_villa.jpg";
import newResidentialPlotImg from "../assets/hero-panels/new_residential_plot.jpg";
import newIndustrialPlotImg from "../assets/hero-panels/new_industrial_plot.jpg";
import newCommercialBuildingImg from "../assets/hero-panels/new_commercial_building.jpg";
import newAgriculturalLandImg from "../assets/hero-panels/new_agricultural_land.jpg";

import apartmentImg from "../assets/hero-panels/apartment_panel_1790572137625.jpg";
import commercialLandImg from "../assets/land-commercial.jpg";

const categories = [
  { id: "plot-land", title: "Plot/Land", path: "/properties?type=Plot%2FLand", img: newResidentialPlotImg, desc: "Prime land parcels for versatile development." },
  { id: "house-villa", title: "House/Villa", path: "/properties?type=House%2FVilla", img: newHouseVillaImg, desc: "Exclusive, spacious homes with premium amenities." },
  { id: "apartment-flat", title: "Apartment/Flat", path: "/properties?type=Apartment%2FFlat", img: apartmentImg, desc: "Modern living spaces in prime city locations." },
  { id: "commercial-building", title: "Commercial Building", path: "/properties?type=Commercial%20Building", img: newCommercialBuildingImg, desc: "Strategic locations for business growth." },
  { id: "residential-plot", title: "Residential Plot", path: "/properties?type=Residential%20Plot", img: newResidentialPlotImg, desc: "Build your dream home on premium verified plots." },
  { id: "commercial-plot", title: "Commercial Plot", path: "/properties?type=Commercial%20Plot", img: commercialLandImg, desc: "Ideal plots for commercial ventures and ROI." },
  { id: "agricultural-land", title: "Agricultural Land", path: "/properties?type=Agricultural%20Land", img: newAgriculturalLandImg, desc: "Fertile land and plantations across Kerala." },
  { id: "industrial-plot", title: "Industrial Plot", path: "/properties?type=Industrial%20Plot", img: newIndustrialPlotImg, desc: "Spacious plots for industrial development." },
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
