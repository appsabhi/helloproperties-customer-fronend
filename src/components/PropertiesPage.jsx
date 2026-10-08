import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import GetInTouchModal from "./GetInTouchModal";
import { SkeletonPropertyCard } from "./SkeletonPropertyCard";
import { useCustomerProperties } from "../context/CustomerPropertyContext";
import { formatPropertyPrice } from "../services/propertyService";
import "./PropertiesPage.css";

const getPaginationRange = (currentPage, totalPages) => {
  const delta = 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || i >= currentPage - delta && i <= currentPage + delta) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};

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

const ITEMS_PER_PAGE = 9;

const PropertiesPage = () => {
  const navigate = useNavigate();
  const { properties, loading, error, refetchProperties } = useCustomerProperties();

  // Filter states
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [selectedPriceIdx, setSelectedPriceIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [touchModalOpen, setTouchModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const filteredProperties = properties
    .filter((prop) => {
      // 1. Category filter
      if (activeCategory !== "All") {
        const pType = (prop.propertyType || "").toLowerCase();
        const pCat = (prop.category || "").toLowerCase();
        const target = activeCategory.toLowerCase();
        if (!pType.includes(target) && !pCat.includes(target)) {
          return false;
        }
      }

      // 2. District filter
      if (selectedDistrict !== "All Districts") {
        if (prop.district !== selectedDistrict) return false;
      }

      // 3. Price filter
      if (selectedPriceIdx !== 0) {
        const range = PRICE_RANGES[selectedPriceIdx];
        const val = prop.listingType === "Rent" ? prop.monthlyRent : prop.expectedPrice;
        const pValue = Number(val) || 0;
        if (pValue < range.min || pValue > range.max) return false;
      }

      // 4. Keyword search
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const titleMatch = (prop.title || "").toLowerCase().includes(q);
        const locMatch = (prop.location || "").toLowerCase().includes(q);
        const distMatch = (prop.district || "").toLowerCase().includes(q);
        const typeMatch = (prop.propertyType || "").toLowerCase().includes(q);
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

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, selectedDistrict, selectedPriceIdx, searchQuery, sortBy]);

  const clearAllFilters = () => {
    setActiveCategory("All");
    setSelectedDistrict("All Districts");
    setSelectedPriceIdx(0);
    setSearchQuery("");
    setSortBy("newest");
    setCurrentPage(1);
  };

  return (
    <div className="props-clean-page">
      <Header />

      <main className="props-clean-main">
        {/* Header & Filter Area */}
        <section className="props-clean-header-section">
          <div className="hp-container">
            <h1 className="props-clean-title">Properties <span className="highlight-burgundy">for sale</span></h1>
            <p className="props-clean-subtitle">
              Every listing is handpicked for quality, ensuring you get the best out of your investment in Kerala.
            </p>

            <div className="props-advanced-search-container">
              <div className="props-search-bar">
                <input
                  type="text"
                  placeholder="Search city, address, or home..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className={`props-filter-toggle ${isFilterOpen ? 'active' : ''}`} onClick={() => setIsFilterOpen(!isFilterOpen)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="21" x2="4" y2="14"></line>
                    <line x1="4" y1="10" x2="4" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12" y2="3"></line>
                    <line x1="20" y1="21" x2="20" y2="16"></line>
                    <line x1="20" y1="12" x2="20" y2="3"></line>
                    <line x1="1" y1="14" x2="7" y2="14"></line>
                    <line x1="9" y1="8" x2="15" y2="8"></line>
                    <line x1="17" y1="16" x2="23" y2="16"></line>
                  </svg>
                </button>
                <button className="props-search-btn" onClick={() => setIsFilterOpen(false)}>Search</button>
              </div>

              {isFilterOpen && (
                <div className="props-filter-popover">
                  <div className="filter-row">
                    <label>City / Location</label>
                    <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
                      {KERALA_DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d === "All Districts" ? "Any city" : d}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="filter-row">
                    <label>Property Type</label>
                    <div className="filter-pills">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                          onClick={() => setActiveCategory(cat)}
                        >
                          {cat === "All" ? "Any type" : cat === "Apartment/Flat" ? "Apartment" : cat === "House/Villa" ? "Villa" : cat === "Residential Plot" ? "Plot" : cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-row">
                    <label>Price</label>
                    <div className="filter-pills">
                      {PRICE_RANGES.map((range, idx) => (
                        <button
                          key={idx}
                          className={`filter-pill ${selectedPriceIdx === idx ? 'active' : ''}`}
                          onClick={() => setSelectedPriceIdx(idx)}
                        >
                          {range.label === "Any Price" ? "Any price" : range.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-footer">
                    <button className="filter-clear-btn" onClick={clearAllFilters}>Clear</button>
                    <button className="filter-show-btn" onClick={() => setIsFilterOpen(false)}>Show properties →</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Grid Area */}
        <section className="props-clean-grid-section">
          <div className="hp-container">
            {loading ? (
              <div className="props-clean-grid">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <SkeletonPropertyCard key={n} />
                ))}
              </div>
            ) : error && properties.length === 0 ? (
              <div className="props-clean-empty">
                <h3>Connection Error</h3>
                <p>{error}</p>
                <button type="button" onClick={refetchProperties}>Retry Loading</button>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="props-clean-empty">
                <h3>No Properties Found</h3>
                <p>Try adjusting your search criteria or filters to view available listings.</p>
                <button type="button" onClick={clearAllFilters}>Reset All Filters</button>
              </div>
            ) : (
              <div className="props-clean-grid">
                {paginatedProperties.map((prop) => {
                  const displayPrice =
                    prop.priceFormatted ||
                    formatPropertyPrice(
                      prop.listingType === "Rent" ? prop.monthlyRent : prop.expectedPrice,
                      prop.listingType
                    );

                  return (
                    <article 
                      key={prop.id} 
                      className="clean-card" 
                      onClick={() => navigate(`/property/${prop.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="clean-card-img-wrap" style={{ backgroundColor: prop.videoUrl && prop.videoUrl.includes("instagram.com") ? "transparent" : "#e2e8f0" }}>
                        {prop.videoUrl && (!prop.imageUrl || prop.imageUrl.includes("unsplash.com")) ? (
                          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                            {prop.videoUrl.includes("youtube") || prop.videoUrl.includes("youtu.be") ? (
                              <img 
                                src={`https://img.youtube.com/vi/${prop.videoUrl.split('v=')[1]?.split('&')[0] || prop.videoUrl.split('youtu.be/')[1]?.split('?')[0]}/hqdefault.jpg`}
                                alt={prop.title}
                                className="clean-img"
                                style={{ objectFit: "contain" }}
                              />
                            ) : prop.videoUrl.includes("instagram.com") ? (
                              <a 
                                href={prop.videoUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                style={{ display: "block", width: "100%", height: "100%", position: "absolute", inset: 0, zIndex: 10 }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <iframe 
                                  src={prop.videoUrl.split('?')[0].replace(/\/$/, '') + '/embed'}
                                  className="clean-img"
                                  frameBorder="0"
                                  scrolling="no"
                                  style={{ pointerEvents: "none", width: "350px", height: "450px", transform: "scale(1.45)", transformOrigin: "center center", maxWidth: "none" }}
                                ></iframe>
                              </a>
                            ) : (
                              <video src={`${prop.videoUrl}#t=0.1`} className="clean-img"
                                preload="auto"
                                muted
                                playsInline
                                style={{ objectFit: "contain" }}
                              />
                            )}
                            {!prop.videoUrl.includes("instagram.com") && (
                              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '48px', height: '48px', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ marginLeft: '4px' }}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                              </div>
                            )}
                          </div>
                        ) : prop.imageUrl ? (
                          <img
                            src={prop.imageUrl.split(',')[0].trim()}
                            alt={prop.title}
                            className="clean-img"
                            loading="lazy"
                          />
                        ) : (
                          <div className="clean-img" style={{ backgroundColor: "#e2e8f0" }} />
                        )}
                        
                        {/* Badges Overlay */}
                        <div className="clean-card-badges-left">
                           {prop.status && prop.status !== 'Available' ? (
                             <span className="clean-badge highlight">{prop.status}</span>
                           ) : (
                             <span className="clean-badge highlight">Ready</span>
                           )}
                           <span className="clean-badge base">{prop.listingType === "Rent" ? "For Rent" : "For Sale"}</span>
                        </div>
                      </div>

                      <div className="clean-card-body">
                        <div className="clean-card-meta">
                          {prop.propertyType || "Property"} • {prop.landArea || "Custom Size"} • {prop.bedrooms ? `${prop.bedrooms} BHK` : "Premium"}
                        </div>
                        
                        <div className="clean-card-title-row">
                          <h3 className="clean-card-title">{prop.title}</h3>
                          <span className="clean-card-price">{displayPrice}</span>
                        </div>
                        
                        <p className="clean-card-loc">
                          {prop.location || "Kerala"}{prop.district ? `, ${prop.district}` : ""}
                        </p>

                        <div className="clean-card-tags">
                          <span className="clean-tag">Verified Listing</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="clean-pagination">
                <button
                  className="clean-pagination-nav"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  &lt; PREV
                </button>
                {getPaginationRange(currentPage, totalPages).map((item, idx) => (
                  <button
                    key={idx}
                    className={`clean-pagination-num ${item === currentPage ? 'active' : ''} ${item === '...' ? 'dots' : ''}`}
                    onClick={() => {
                      if (item !== '...') setCurrentPage(item);
                    }}
                    disabled={item === '...'}
                  >
                    {item}
                  </button>
                ))}
                <button
                  className="clean-pagination-nav"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  NEXT &gt;
                </button>
              </div>
            )}
          </div>
        </section>


      </main>

      <Footer />

      {/* Get In Touch Modal */}
      <GetInTouchModal isOpen={touchModalOpen} onClose={() => setTouchModalOpen(false)} />
    </div>
  );
};

export default PropertiesPage;
