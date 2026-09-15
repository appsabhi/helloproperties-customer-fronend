import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';

import { useCustomerProperties } from "../context/CustomerPropertyContext";
import { formatPropertyPrice } from "../services/propertyService";
import "./FeaturedProperties.css";

const FeaturedProperties = () => {
  const { properties, loading, error, refetchProperties } = useCustomerProperties();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const sectionRef = useRef(null);

  // IntersectionObserver for on-scroll entrance reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = [
    "All",
    "Plantation & Agricultural",
    "Waterfront Parcels",
    "Residential Plots",
    "Hillside & Mountain Lands",
    "Commercial & Resort Land",
  ];

  const filteredProperties = properties.filter((p) => {
    if (activeCategory === "All") return true;
    const cat = activeCategory.toLowerCase();
    const pType = (p.propertyType || "").toLowerCase();
    const pCat = (p.category || "").toLowerCase();

    if (cat.includes("plantation") || cat.includes("agri")) {
      return pType.includes("plant") || pType.includes("agri") || pCat.includes("plant") || pCat.includes("agri");
    }
    if (cat.includes("waterfront")) {
      return pType.includes("water") || pType.includes("lake") || pType.includes("river") || pCat.includes("water");
    }
    if (cat.includes("residential")) {
      return pType.includes("residen") || pType.includes("plot") || pType.includes("land") || pType.includes("villa");
    }
    if (cat.includes("hillside")) {
      return pType.includes("hill") || pType.includes("mount") || pCat.includes("hill");
    }
    if (cat.includes("commercial")) {
      return pType.includes("commerc") || pCat.includes("commerc");
    }

    return pType.includes(cat) || pCat.includes(cat);
  });

  // Display initial 3 featured properties or all when expanded
  const displayProperties = showAll ? filteredProperties : filteredProperties.slice(0, 3);

  return (
    <section
      className={`featured-props-section ${isInView ? "in-view" : ""}`}
      id="properties"
      ref={sectionRef}
    >
      <div className="featured-props-container">
        {/* Section Header */}
        <div className="featured-props-header">
          <div className="header-eyebrow-wrap">
            <span className="props-eyebrow">CURATED PORTFOLIO</span>
          </div>
          <h2 className="props-title">Featured Properties</h2>
          <p className="props-subtitle">
            Explore a selection of properties currently available on HelloProperties.
          </p>

          {/* Category Filter Pills */}
          <div className="category-pill-row">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`cat-pill-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowAll(false);
                }}
              >
                {cat === "All" ? "All Properties" : cat.split(" & ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="props-loading-state">
            <div className="props-spinner"></div>
            <span>Fetching live properties from database...</span>
          </div>
        ) : error && properties.length === 0 ? (
          /* Error / Retry State */
          <div className="props-error-state">
            <div className="error-icon">⚠️</div>
            <h3>Unable to Load Properties</h3>
            <p>{error}</p>
            <button className="retry-btn" onClick={refetchProperties}>
              Retry Connection
            </button>
          </div>
        ) : filteredProperties.length === 0 ? (
          /* Empty State */
          <div className="props-empty-state">
            <p>No properties found in "{activeCategory === "All" ? "All Properties" : activeCategory}".</p>
           <Link to="/properties" className="view-all-btn">
  View All Properties
</Link>

          </div>
        ) : (
          /* Properties Grid */
          <div className="properties-grid">
            {displayProperties.map((prop, idx) => {
              const displayPrice = prop.priceFormatted || formatPropertyPrice(
                prop.listingType === "Rent" ? prop.monthlyRent : prop.expectedPrice,
                prop.listingType
              );

              return (
                <article
                  key={prop.id}
                  className="prop-card"
                  style={{ "--card-index": idx }}
                  onClick={() => setSelectedProperty(prop)}
                >
                  {/* Image Frame */}
                  <div className="prop-img-frame">
                    <img
                      src={prop.imageUrl}
                      alt={prop.title}
                      className="prop-img"
                      loading="lazy"
                    />
                    <div className="prop-img-overlay"></div>

                    {/* Top Badges */}
                    <div className="prop-top-badges">
                      <span className="prop-status-tag">{prop.status || "Available"}</span>
                      <span className="prop-type-badge">{prop.listingType || "Sale"}</span>
                    </div>

                    {/* Price Tag in Image */}
                    <div className="prop-price-float">
                      <span className="price-label">
                        {prop.listingType === "Rent" ? "Monthly Rent" : "Expected Price"}
                      </span>
                      <span className="price-value">{displayPrice}</span>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="prop-info-body">
                    <div className="prop-location-row">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{prop.location || "Location unavailable"}{prop.district ? `, ${prop.district}` : ""}</span>
                    </div>

                    <h3 className="prop-card-title">{prop.title}</h3>

                    <p className="prop-card-desc">{prop.description || "Property details available upon request."}</p>

                    {/* Metrics Specs Strip */}
                    <div className="prop-specs-strip">
                      <div className="spec-item">
                        <span className="spec-label">Land Area</span>
                        <span className="spec-val">{prop.landArea || "N/A"}</span>
                      </div>
                      {prop.bedrooms ? (
                        <div className="spec-item">
                          <span className="spec-label">Bedrooms</span>
                          <span className="spec-val">{prop.bedrooms} Beds</span>
                        </div>
                      ) : (
                        <div className="spec-item">
                          <span className="spec-label">District</span>
                          <span className="spec-val">{prop.district || "Kerala"}</span>
                        </div>
                      )}
                      <div className="spec-item action-spec">
                        <span className="view-detail-link">
                          Explore <span>↗</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* View All Properties Action Strip */}
        {!loading && filteredProperties.length > 0 && (
          <div className="view-all-action-wrap">
            <a
              href="/properties"
              // target="_blank"
              rel="noopener noreferrer"
              className="view-all-btn"
              aria-label="View all properties in a new tab"
            >
              <span className="view-all-text">
                View All Properties
              </span>
              <span className="view-all-count">
                {filteredProperties.length} Properties Available
              </span>
              <span className="view-all-arrow">↗</span>
            </a>
          </div>
        )}
      </div>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <div className="prop-modal-backdrop" onClick={() => setSelectedProperty(null)}>
          <div
            className="prop-modal-box"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="prop-modal-close"
              onClick={() => setSelectedProperty(null)}
              aria-label="Close details"
            >
              ✕
            </button>

            <div className="prop-modal-grid">
              <div className="modal-img-col">
                <img
                  src={selectedProperty.imageUrl}
                  alt={selectedProperty.title}
                  className="modal-hero-img"
                />
                <div className="modal-img-badges">
                  <span className="prop-status-tag">{selectedProperty.status || "Available"}</span>
                  <span className="prop-type-badge">{selectedProperty.listingType || "Sale"}</span>
                </div>
              </div>

              <div className="modal-content-col">
                <div className="modal-loc-header">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{selectedProperty.location}{selectedProperty.district ? `, ${selectedProperty.district}` : ""}</span>
                </div>

                <h2 className="modal-title">{selectedProperty.title}</h2>

                <div className="modal-price-box">
                  <span className="modal-price-label">
                    {selectedProperty.listingType === "Rent" ? "Monthly Rental" : "Expected Price"}
                  </span>
                  <span className="modal-price-value">{selectedProperty.priceFormatted}</span>
                </div>

                <p className="modal-desc">{selectedProperty.description || "No description provided."}</p>

                {/* Technical Specifications */}
                <div className="modal-specs-table">
                  <div className="modal-spec-row">
                    <span className="k">Land Area</span>
                    <span className="v">{selectedProperty.landArea || "N/A"}</span>
                  </div>
                  <div className="modal-spec-row">
                    <span className="k">Listing Type</span>
                    <span className="v">{selectedProperty.listingType || "Sale"}</span>
                  </div>
                  <div className="modal-spec-row">
                    <span className="k">Property Type</span>
                    <span className="v">{selectedProperty.propertyType || "N/A"}</span>
                  </div>
                  <div className="modal-spec-row">
                    <span className="k">District</span>
                    <span className="v">{selectedProperty.district || "N/A"}</span>
                  </div>
                  {selectedProperty.bedrooms && (
                    <div className="modal-spec-row">
                      <span className="k">Bedrooms / Baths</span>
                      <span className="v">
                        {selectedProperty.bedrooms} Beds / {selectedProperty.bathrooms || 1} Baths
                      </span>
                    </div>
                  )}
                  <div className="modal-spec-row">
                    <span className="k">Status</span>
                    <span className="v">{selectedProperty.status || "Available"}</span>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="modal-ctas">
                  <a
                    href={`https://wa.me/918009244355?text=Hello%2C%20I%20am%20interested%20in%20${encodeURIComponent(selectedProperty.title)}%20(${selectedProperty.priceFormatted})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-whatsapp-btn"
                  >
                    <span>Inquire via WhatsApp</span>
                    <span>→</span>
                  </a>
                  <a
                    href="tel:+918009244355"
                    className="modal-call-btn"
                  >
                    Call Office
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedProperties;

