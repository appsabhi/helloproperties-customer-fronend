import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import GetInTouchModal from "./GetInTouchModal";
import { useCustomerProperties } from "../context/CustomerPropertyContext";
import { formatPropertyPrice } from "../services/propertyService";
import "./PropertiesPage.css";
import heroImg from "../assets/png/Properties_hero_bgimg.jpg";

const HERO_IMG = heroImg;

const KERALA_DISTRICTS = [
  "All Districts",
  "Alappuzha",
  "Ernakulam",
  "Idukki",
  "Kannur",
  "Kasaragod",
  "Kollam",
  "Kottayam",
  "Kozhikode",
  "Malappuram",
  "Palakkad",
  "Pathanamthitta",
  "Thiruvananthapuram",
  "Thrissur",
  "Wayanad",
];

const PRICE_RANGES = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under ₹50 Lakhs", min: 0, max: 5000000 },
  { label: "₹50 L - ₹1 Crore", min: 5000000, max: 10000000 },
  { label: "₹1 Cr - ₹3 Crores", min: 10000000, max: 30000000 },
  { label: "Above ₹3 Crores", min: 30000000, max: Infinity },
];

const CATEGORIES = [
  "All",
  "Plot/Land",
  "House/Villa",
  "Apartment/Flat",
  "Residential Plot",
  "Commercial Plot",
  "Agricultural Land",
  "Industrial Plot",
];

const PropertiesPage = () => {
  const { properties, loading, error, refetchProperties } = useCustomerProperties();

  // Filter & Search states
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [selectedPriceIdx, setSelectedPriceIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Selection & Modal states
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [touchModalOpen, setTouchModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Properties Portfolio | HelloProperties Kerala";
    window.scrollTo(0, 0);

    const searchParams = new URLSearchParams(window.location.search);
    const typeParam = searchParams.get("type");
    if (typeParam) {
      const match = CATEGORIES.find(
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

      // District Filter
      if (selectedDistrict !== "All Districts") {
        const d = selectedDistrict.toLowerCase();
        const pDistrict = (p.district || "").toLowerCase();
        const pLocation = (p.location || "").toLowerCase();
        if (!pDistrict.includes(d) && !pLocation.includes(d)) return false;
      }

      // Price Range Filter
      const priceRange = PRICE_RANGES[selectedPriceIdx] || PRICE_RANGES[0];
      const pPrice = Number(p.price || p.expectedPrice || p.monthlyRent || 0);
      if (pPrice > 0) {
        if (pPrice < priceRange.min || pPrice > priceRange.max) return false;
      }

      // Text Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = (p.title || "").toLowerCase().includes(q);
        const locMatch = (p.location || "").toLowerCase().includes(q);
        const distMatch = (p.district || "").toLowerCase().includes(q);
        const typeMatch = (p.propertyType || "").toLowerCase().includes(q);
        if (!titleMatch && !locMatch && !distMatch && !typeMatch) return false;
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
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

  const clearAllFilters = () => {
    setActiveCategory("All");
    setSelectedDistrict("All Districts");
    setSelectedPriceIdx(0);
    setSearchQuery("");
    setSortBy("newest");
  };

  return (
    <div className="props-ref-page-root">
      <Header />

      <main className="props-ref-main">
        {/* 1. Hero Section (Reference Image Design) */}
        <section className="props-ref-hero-section">
          {/* Full-bleed background */}
          <div className="hero-bg-wrapper">
            <img src={HERO_IMG} alt="Kerala Real Estate Hero" className="props-ref-hero-img" />
            <div className="props-ref-hero-overlay"></div>
          </div>

          <div className="hp-container hero-content-container">
            <div className="props-ref-hero-content">
              <span className="hero-meta">
                <span className="meta-line"></span> PREMIUM PROPERTIES | TRUSTED PARTNER
              </span>
              <h1 className="props-ref-hero-title">
                Your Reliable Ally in<br />
                <span className="hero-highlight">Kerala Real Estate</span>
              </h1>
              <p className="hero-desc">
                Find your dream home, premium plots, and the best investment opportunities in Kerala — all in one place.
              </p>

              <div className="hero-features">
                <div className="feature-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  <span className="feature-text">Verified<br/>Properties</span>
                </div>
                <div className="feature-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
                  <span className="feature-text">Trusted<br/>Developers</span>
                </div>
                <div className="feature-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span className="feature-text">Prime<br/>Locations</span>
                </div>
                <div className="feature-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 6L9 17l-5-5"></path></svg>
                  <span className="feature-text">Hassle-Free<br/>Process</span>
                </div>
              </div>
            </div>

            <div className="hero-decorative-text">
              Better Spaces<br/>Brighter Future
            </div>
          </div>

          {/* Floating Multi-Filter Pill */}
          <div className="hp-container search-pill-container">
            <div className="props-ref-search-bar">
              <div className="search-field-group">
                <div className="field-top-wrap">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                  <span className="field-caption">TYPE</span>
                </div>
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="search-field-select"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "All" ? "All Types" : cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="search-field-divider"></div>

              <div className="search-field-group">
                <div className="field-top-wrap">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  <span className="field-caption">PRICE</span>
                </div>
                <select
                  value={selectedPriceIdx}
                  onChange={(e) => setSelectedPriceIdx(Number(e.target.value))}
                  className="search-field-select"
                >
                  {PRICE_RANGES.map((range, idx) => (
                    <option key={range.label} value={idx}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="search-field-divider"></div>

              <div className="search-field-group">
                <div className="field-top-wrap">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span className="field-caption">AREA / DISTRICT</span>
                </div>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="search-field-select"
                >
                  {KERALA_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="props-ref-search-btn"
                onClick={() => {
                  document.getElementById("properties-grid-anchor")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </section>

        {/* 2. Toolbar & Category Filter Bar */}
        <section id="properties-grid-anchor" className="props-ref-toolbar-section">
          <div className="hp-container">
            <div className="props-ref-toolbar">
              {/* Category Pills */}
              {/* <div className="props-ref-pills-bar">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`props-ref-pill-btn ${activeCategory === cat ? "active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat === "All" ? "All Properties" : cat}
                  </button>
                ))}
              </div> */}

              {/* Search Box & Sort Selector */}
              <div className="props-ref-controls-wrap">
                <div className="props-ref-search-input-box">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="props-ref-text-input"
                  />
                  {searchQuery && (
                    <button type="button" className="clear-text-btn" onClick={() => setSearchQuery("")}>
                      ✕
                    </button>
                  )}
                </div>

                <div className="props-ref-sort-box">
                  <span className="sort-caption">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="props-ref-sort-select"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters Summary Indicator */}
            {(activeCategory !== "All" || selectedDistrict !== "All Districts" || selectedPriceIdx !== 0 || searchQuery) && (
              <div className="props-ref-active-filters-bar">
                <span className="active-filters-title">Active Filters:</span>
                {activeCategory !== "All" && <span className="filter-tag">Type: {activeCategory}</span>}
                {selectedDistrict !== "All Districts" && <span className="filter-tag">District: {selectedDistrict}</span>}
                {selectedPriceIdx !== 0 && <span className="filter-tag">Price: {PRICE_RANGES[selectedPriceIdx].label}</span>}
                {searchQuery && <span className="filter-tag">Query: "{searchQuery}"</span>}

                <button type="button" className="reset-all-link" onClick={clearAllFilters}>
                  Clear All
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 3. 3-Column Property Grid (Reference Webflow Design) */}
        <section className="props-ref-list-section">
          <div className="hp-container">
            {loading ? (
              <div className="props-ref-state-box">
                <div className="props-ref-spinner"></div>
                <p>Retrieving live properties...</p>
              </div>
            ) : error && properties.length === 0 ? (
              <div className="props-ref-state-box error">
                <h3>Connection Error</h3>
                <p>{error}</p>
                <button type="button" className="props-ref-action-btn" onClick={refetchProperties}>
                  Retry Loading
                </button>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="props-ref-state-box empty">
                <h3>No Properties Found</h3>
                <p>Try adjusting your search criteria or filters to view available listings.</p>
                <button type="button" className="props-ref-action-btn" onClick={clearAllFilters}>
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="props-ref-grid">
                {filteredProperties.map((prop) => {
                  const displayPrice =
                    prop.priceFormatted ||
                    formatPropertyPrice(
                      prop.listingType === "Rent" ? prop.monthlyRent : prop.expectedPrice,
                      prop.listingType
                    );

                  const isHouseOrVilla =
                    (prop.propertyType || "").toLowerCase().includes("house") ||
                    (prop.propertyType || "").toLowerCase().includes("villa") ||
                    (prop.propertyType || "").toLowerCase().includes("apart") ||
                    (prop.category || "").toLowerCase().includes("villa");

                  return (
                    <article key={prop.id} className="ref-prop-card">
                      {/* Top Image Frame */}
                      <div className="ref-card-img-frame">
                        <img
                          src={prop.imageUrl}
                          alt={prop.title}
                          className="ref-card-img"
                          loading="lazy"
                        />
                        <div className="ref-card-badge">
                          <span>{prop.listingType === "Rent" ? "For Rent" : "For Sale"}</span>
                        </div>
                      </div>

                      {/* Card Content Body */}
                      <div className="ref-card-body">
                        <div className="ref-card-location">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <span>
                            {prop.location || "Kerala"}
                            {prop.district ? `, ${prop.district}` : ""}
                          </span>
                        </div>

                        <h3 className="ref-card-title">{prop.title}</h3>

                        {/* Specs Row */}
                        <div className="ref-card-specs-row">
                          {isHouseOrVilla ? (
                            <>
                              <div className="spec-item">
                                <span className="spec-icon">🛏</span>
                                <span className="spec-txt">{prop.bedrooms || 3} Bed Room</span>
                              </div>
                              <div className="spec-item">
                                <span className="spec-icon">🛁</span>
                                <span className="spec-txt">{prop.bathrooms || 2} Bath</span>
                              </div>
                              <div className="spec-item">
                                <span className="spec-icon">📐</span>
                                <span className="spec-txt">{prop.landArea || "2,100 SQ FT"}</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="spec-item">
                                <span className="spec-icon">📐</span>
                                <span className="spec-txt">{prop.landArea || "50 Cents"}</span>
                              </div>
                              <div className="spec-item">
                                <span className="spec-icon">🏷</span>
                                <span className="spec-txt">{prop.propertyType || "Plot/Land"}</span>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Card Footer: Price + View Details Button */}
                        <div className="ref-card-footer">
                          <div className="ref-card-price-wrap">
                            <span className="ref-card-price-val">{displayPrice}</span>
                          </div>

                          <button
                            type="button"
                            className="ref-card-btn"
                            onClick={() => setSelectedProperty(prop)}
                          >
                            <span>View Details</span>
                            <span className="btn-arrow">→</span>
                          </button>
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

      <Footer />

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
                  <span className="modal-price-value">
                    {selectedProperty.priceFormatted ||
                      formatPropertyPrice(
                        selectedProperty.listingType === "Rent" ? selectedProperty.monthlyRent : selectedProperty.expectedPrice,
                        selectedProperty.listingType
                      )}
                  </span>
                </div>

                <p className="modal-desc">{selectedProperty.description || "No description provided."}</p>

                <div className="modal-specs-table">
                  <div className="modal-spec-row">
                    <span className="k">Land Area / Size</span>
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
                    href={`https://wa.me/918009244355?text=Hello%2C%20I%20am%20interested%20in%20${encodeURIComponent(selectedProperty.title)}%20(${selectedProperty.priceFormatted || ''})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-whatsapp-btn"
                  >
                    <span>Inquire via WhatsApp</span>
                    <span>→</span>
                  </a>
                  <button
                    type="button"
                    className="modal-call-btn"
                    onClick={() => setTouchModalOpen(true)}
                  >
                    Get In Touch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Get In Touch Modal */}
      <GetInTouchModal isOpen={touchModalOpen} onClose={() => setTouchModalOpen(false)} />
    </div>
  );
};

export default PropertiesPage;
