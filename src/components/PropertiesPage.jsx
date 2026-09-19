import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useCustomerProperties } from "../context/CustomerPropertyContext";
import { formatPropertyPrice } from "../services/propertyService";
import "./PropertiesPage.css";

const PropertiesPage = () => {
  const { properties, loading, error, refetchProperties } = useCustomerProperties();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedProperty, setSelectedProperty] = useState(null);

  const categories = [
    "All",
    "Plot/Land",
    "House/Villa",
    "Apartment/Flat",
    "Residential Plot",
    "Commercial Plot",
    "Agricultural Land",
    "Industrial Plot",
  ];

  useEffect(() => {
    document.title = "Properties | HelloProperties";
    window.scrollTo(0, 0);

    const searchParams = new URLSearchParams(window.location.search);
    const typeParam = searchParams.get("type");
    if (typeParam) {
      const match = categories.find(
        (c) => c.toLowerCase() === typeParam.toLowerCase() || c.toLowerCase().includes(typeParam.toLowerCase())
      );
      if (match) setActiveCategory(match);
    }

    const propId = searchParams.get("id");
    if (propId && properties.length > 0) {
      const matchProp = properties.find((p) => String(p.id) === String(propId));
      if (matchProp) setSelectedProperty(matchProp);
    }
  }, [properties]);

  // Filtering Logic
  const filteredProperties = properties
    .filter((p) => {
      // Category filter
      if (activeCategory !== "All") {
        const cat = activeCategory.toLowerCase();
        const pType = (p.propertyType || "").toLowerCase();
        const pCat = (p.category || "").toLowerCase();

        let matchesCat = false;
        if (cat === "plot/land") {
          matchesCat = pType.includes("plot") || pType.includes("land") || pCat.includes("plot") || pCat.includes("land");
        } else if (cat === "house/villa") {
          matchesCat = pType.includes("house") || pType.includes("villa") || pCat.includes("house") || pCat.includes("villa");
        } else if (cat === "apartment/flat") {
          matchesCat = pType.includes("apart") || pType.includes("flat") || pCat.includes("apart") || pCat.includes("flat");
        } else if (cat === "residential plot") {
          matchesCat = pType.includes("residen") || pCat.includes("residen");
        } else if (cat === "commercial plot") {
          matchesCat = pType.includes("commerc") || pCat.includes("commerc");
        } else if (cat === "agricultural land") {
          matchesCat = pType.includes("agri") || pType.includes("plant") || pCat.includes("agri") || pCat.includes("plant");
        } else if (cat === "industrial plot") {
          matchesCat = pType.includes("indust") || pCat.includes("indust");
        } else {
          matchesCat = pType.includes(cat) || pCat.includes(cat);
        }
        if (!matchesCat) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = (p.title || "").toLowerCase().includes(q);
        const locMatch = (p.location || "").toLowerCase().includes(q);
        const distMatch = (p.district || "").toLowerCase().includes(q);
        const typeMatch = (p.propertyType || "").toLowerCase().includes(q);
        return titleMatch || locMatch || distMatch || typeMatch;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") {
        return (a.price || 0) - (b.price || 0);
      }
      if (sortBy === "price-desc") {
        return (b.price || 0) - (a.price || 0);
      }
      // Newest first
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

  return (
    <div className="properties-page-root">
      <Header />

      <main className="properties-page-main">
        {/* Banner Section */}
        <section className="properties-banner">
          <div className="properties-banner-container">
            <span className="properties-eyebrow">PORTFOLIO LISTINGS</span>
            <h1 className="properties-main-title">Available Properties</h1>
            <p className="properties-main-subtitle">
              Explore live property listings retrieved directly from HelloProperties.
            </p>
          </div>
        </section>

        {/* Search & Filter Toolbar */}
        <section className="properties-toolbar-section">
          <div className="properties-toolbar-container">
            {/* Search Input */}
            <div className="properties-search-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search by title, district, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="properties-search-input"
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery("")}>
                  ✕
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="properties-sort-wrap">
              <label htmlFor="sort-select" className="sort-label">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="properties-sort-select"
              >
                <option value="newest">Newest Listings</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="properties-categories-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`all-props-cat-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === "All" ? "All Properties" : cat}
              </button>
            ))}
          </div>
        </section>

        {/* Content Container */}
        <section className="properties-list-section">
          <div className="properties-list-container">
            {/* Loading State */}
            {loading ? (
              <div className="props-page-loading">
                <div className="props-spinner"></div>
                <span>Fetching live properties from database...</span>
              </div>
            ) : error && properties.length === 0 ? (
              /* Error State */
              <div className="props-page-error">
                <div className="error-icon">⚠️</div>
                <h2>Unable to Load Properties</h2>
                <p>{error}</p>
                <button className="retry-btn" onClick={refetchProperties}>
                  Retry Connection
                </button>
              </div>
            ) : filteredProperties.length === 0 ? (
              /* Empty State */
              <div className="props-page-empty">
                <h3>No properties found</h3>
                <p>No matching properties for your search or category filter.</p>
                <button
                  className="reset-filter-btn"
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              /* Properties Grid */
              <div className="properties-page-grid">
                {filteredProperties.map((prop) => {
                  const displayPrice =
                    prop.priceFormatted ||
                    formatPropertyPrice(
                      prop.listingType === "Rent" ? prop.monthlyRent : prop.expectedPrice,
                      prop.listingType
                    );

                  return (
                    <article
                      key={prop.id}
                      className="page-prop-card"
                      onClick={() => setSelectedProperty(prop)}
                    >
                      <div className="page-prop-img-frame">
                        <img
                          src={prop.imageUrl}
                          alt={prop.title}
                          className="page-prop-img"
                          loading="lazy"
                        />
                        <div className="page-prop-badges">
                          <span className="page-prop-status">{prop.status || "Available"}</span>
                          <span className="page-prop-type">{prop.listingType || "Sale"}</span>
                        </div>
                        <div className="page-prop-price">
                          <span className="price-label">
                            {prop.listingType === "Rent" ? "Monthly Rent" : "Expected Price"}
                          </span>
                          <span className="price-val">{displayPrice}</span>
                        </div>
                      </div>

                      <div className="page-prop-body">
                        <div className="page-prop-loc">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <span>
                            {prop.location || "Location unavailable"}
                            {prop.district ? `, ${prop.district}` : ""}
                          </span>
                        </div>

                        <h3 className="page-prop-title">{prop.title}</h3>

                        <p className="page-prop-desc">
                          {prop.description || "Property details available upon request."}
                        </p>

                        <div className="page-prop-specs">
                          <div className="spec">
                            <span className="lbl">Land Area</span>
                            <span className="val">{prop.landArea || "N/A"}</span>
                          </div>
                          <div className="spec">
                            <span className="lbl">Type</span>
                            <span className="val">{prop.propertyType || "Plot/Land"}</span>
                          </div>
                          <div className="spec action">
                            <span className="explore-link">Explore ↗</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

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
                  <a href="tel:+918009244355" className="modal-call-btn">
                    Call Office
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesPage;
