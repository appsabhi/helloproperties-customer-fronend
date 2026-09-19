import React from "react";
import { motion } from "framer-motion";
import "./PropertyWorlds.css";

const CATEGORIES = [
  {
    id: "plot-land",
    title: "PLOT / LAND",
    subtitle: "Prime Parcels & Acreage",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
    sizeClass: "cat-card-large-hero",
  },
  {
    id: "house-villa",
    title: "HOUSE / VILLA",
    subtitle: "Luxury Private Residences",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    sizeClass: "cat-card-large",
  },
  {
    id: "apartment-flat",
    title: "APARTMENT / FLAT",
    subtitle: "Contemporary Urban Living",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
    sizeClass: "cat-card-small",
  },
  {
    id: "residential-plot",
    title: "RESIDENTIAL PLOT",
    subtitle: "Plotted Communities & Sites",
    img: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=85",
    sizeClass: "cat-card-small",
  },
  {
    id: "commercial-plot",
    title: "COMMERCIAL PLOT",
    subtitle: "High-Yield Business & Resort Land",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    sizeClass: "cat-card-small",
  },
  {
    id: "agricultural-land",
    title: "AGRICULTURAL LAND",
    subtitle: "Fertile Plantations & Farmland",
    img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=85",
    sizeClass: "cat-card-wide",
  },
  {
    id: "industrial-plot",
    title: "INDUSTRIAL PLOT",
    subtitle: "Logistics & Manufacturing Zones",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85",
    sizeClass: "cat-card-medium",
  },
];

const PropertyWorlds = () => {
  return (
    <section className="arch-category-section" id="categories">
      <div className="hp-container">
        {/* Header - View All Button Removed */}
        <motion.div 
          className="arch-category-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <span className="meta-label">TYPOLOGIES</span>
            <h2 className="arch-category-title">EXPLORE BY PROPERTY TYPE</h2>
          </div>
        </motion.div>

        {/* Varied Size Bento Grid (Non-clickable Category Showcase) */}
        <div className="arch-category-grid">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              className={`arch-category-card ${cat.sizeClass}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="arch-cat-media">
                <img src={cat.img} alt={cat.title} className="arch-cat-img" loading="lazy" />
                <div className="arch-cat-overlay"></div>
              </div>

              <div className="arch-cat-content">
                <div>
                  <h3 className="arch-cat-title">{cat.title}</h3>
                  <div className="arch-cat-bottom">
                    <span className="arch-cat-sub">{cat.subtitle}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyWorlds;
