import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import logoImg from "../assets/png/Helloproperties.svg";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Auto update active tab based on current route / pathname
  useEffect(() => {
    if (location.pathname === "/properties") {
      setActiveTab("Properties");
    } else {
      if (location.hash === "#about") {
        setActiveTab("About");
      } else if (location.hash === "#contact") {
        setActiveTab("Contact");
      } else {
        setActiveTab("Home");
      }
    }
  }, [location.pathname, location.hash]);

  // Search filter states
  const [searchIntent, setSearchIntent] = useState("buy"); // 'buy' | 'rent'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [selectedLocality, setSelectedLocality] = useState("All Localities");
  const [selectedType, setSelectedType] = useState("All Typologies");
  const [selectedBudget, setSelectedBudget] = useState("Any Budget");

  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || isSearchOpen ? "hidden" : "unset";
  }, [mobileOpen, isSearchOpen]);

  // Keyboard shortcut (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 150);
    }
  }, [isSearchOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Properties", href: "/properties" },
    { name: "Contact", href: "/#contact" },
  ];

  const handleNavClick = (name) => {
    setActiveTab(name);
    setMobileOpen(false);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedDistrict("All Districts");
    setSelectedLocality("All Localities");
    setSelectedType("All Typologies");
    setSelectedBudget("Any Budget");
  };

  return (
    <div className="floating-header-wrapper" ref={searchContainerRef}>
      <header className={`floating-capsule ${isScrolled ? "is-compact" : ""}`}>
        {/* Brand Segment */}
        <Link to="/" className="capsule-brand" onClick={() => handleNavClick("Home")}>
          <img
            src={logoImg}
            alt="Hello Properties"
            className="capsule-logo"
          />
        </Link>

        {/* Center Floating Segmented Nav */}
        <nav className="capsule-nav" aria-label="Main Navigation">
          <div className="nav-pill-group">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-pill ${activeTab === item.name ? "active" : ""}`}
                onClick={() => handleNavClick(item.name)}
              >
                <span>{item.name}</span>
                {item.count && (
                  <span className="pill-badge">{item.count}</span>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Right Compact Property Search Icon Button */}
        <div className="capsule-actions">
          <button
            className={`header-search-icon-btn ${isSearchOpen ? "active" : ""}`}
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search properties and locations"
            title="Search properties (⌘K)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          {/* Minimal Mobile Toggle Pill */}
          <button
            className={`mobile-pill-toggle ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation"
            aria-expanded={mobileOpen}
          >
            <div className="hamburger-dot-group">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </button>
        </div>
      </header>

      {/* Expanded Property Discovery Search Modal / Panel */}
      {isSearchOpen && (
        <div className="search-modal-backdrop" onClick={() => setIsSearchOpen(false)}>
          <div
            className="search-expanded-panel"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Property Discovery Search"
          >
            {/* 1. Header & Intent Switcher */}
            <div className="search-panel-top">
              <div className="intent-switcher-pill">
                <button
                  className={`intent-btn ${searchIntent === "buy" ? "active" : ""}`}
                  onClick={() => setSearchIntent("buy")}
                >
                  Buy
                </button>
                <button
                  className={`intent-btn ${searchIntent === "rent" ? "active" : ""}`}
                  onClick={() => setSearchIntent("rent")}
                >
                  Rent
                </button>
              </div>

              {/* Main Text Input Field */}
              <div className="search-primary-input-wrap">
                <svg className="input-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search properties, locations, districts, or estates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-primary-input"
                />
                {searchQuery && (
                  <button className="clear-input-btn" onClick={() => setSearchQuery("")} aria-label="Clear Search">
                    ✕
                  </button>
                )}
              </div>

              {/* Close Button */}
              <button
                className="search-close-btn"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close Search"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 2. Structured Discovery Filters Matrix */}
            <div className="search-filter-matrix">
              {/* District */}
              <div className="matrix-field">
                <label className="matrix-label">District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="matrix-select"
                >
                  <option value="All Districts">All Districts</option>
                  <option value="Ernakulam (Kochi)">Ernakulam (Kochi)</option>
                  <option value="Wayanad">Wayanad</option>
                  <option value="Idukki (Munnar)">Idukki (Munnar)</option>
                  <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                  <option value="Kozhikode">Kozhikode</option>
                  <option value="Alappuzha">Alappuzha</option>
                </select>
              </div>

              {/* Locality */}
              <div className="matrix-field">
                <label className="matrix-label">Locality / Zone</label>
                <select
                  value={selectedLocality}
                  onChange={(e) => setSelectedLocality(e.target.value)}
                  className="matrix-select"
                >
                  <option value="All Localities">All Localities</option>
                  <option value="Marine Drive / Waterfront">Marine Drive / Waterfront</option>
                  <option value="Highland Plantation Belt">Highland Plantation Belt</option>
                  <option value="Panampilly Nagar / Urban">Panampilly Nagar / Urban</option>
                  <option value="Cliff & Ocean Ridge">Cliff & Ocean Ridge</option>
                  <option value="Backwater Lagoon">Backwater Lagoon</option>
                </select>
              </div>

              {/* Property / Land Type */}
              <div className="matrix-field">
                <label className="matrix-label">Property Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="matrix-select"
                >
                  <option value="All Typologies">All Typologies</option>
                  <option value="Plantation & Agricultural">Plantation & Agricultural</option>
                  <option value="Residential Plots">Residential Plots</option>
                  <option value="Waterfront Parcels">Waterfront Parcels</option>
                  <option value="Hillside & Mountain Lands">Hillside & Mountain Lands</option>
                  <option value="Commercial & Resort Land">Commercial & Resort Land</option>
                </select>
              </div>

              {/* Budget Range */}
              <div className="matrix-field">
                <label className="matrix-label">Budget Range</label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="matrix-select"
                >
                  <option value="Any Budget">Any Budget</option>
                  <option value="₹50L – ₹1.5 Cr">₹50L – ₹1.5 Cr</option>
                  <option value="₹1.5 Cr – ₹5 Cr">₹1.5 Cr – ₹5 Cr</option>
                  <option value="₹5 Cr – ₹15 Cr">₹5 Cr – ₹15 Cr</option>
                  <option value="₹15 Cr+ (Ultra-Luxury)">₹15 Cr+ (Ultra-Luxury)</option>
                </select>
              </div>
            </div>

            {/* 3. Quick Curated Tags */}
            <div className="search-tags-row">
              <span className="tags-label">Popular Searches:</span>
              <div className="tags-list">
                {["Wayanad Coffee Estates", "Kochi Waterfront Plots", "Munnar Tea Hills", "Gated Villa Plots", "Alleppey Lakefront"].map((tag) => (
                  <button
                    key={tag}
                    className="quick-search-tag"
                    onClick={() => {
                      setSearchQuery(tag);
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Action Footer */}
            <div className="search-panel-footer">
              <button className="reset-filter-btn" onClick={handleClearFilters}>
                Clear Filters
              </button>
              <button
                className="execute-search-btn"
                onClick={() => {
                  setIsSearchOpen(false);
                  const el = document.getElementById("properties") || document.getElementById("land-types");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>Search Properties</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Backdrop */}
      <div
        className={`capsule-backdrop ${mobileOpen ? "visible" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Floating Sheet Menu */}
      <div className={`capsule-mobile-sheet ${mobileOpen ? "open" : ""}`}>
        <div className="sheet-top">
          <img src={logoImg} alt="Hello Properties" className="sheet-logo" />
          <button
            className="sheet-close-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Close Navigation"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Search Quick Action */}
        <div className="mobile-search-prompt">
          <button
            className="mobile-search-btn"
            onClick={() => {
              setMobileOpen(false);
              setIsSearchOpen(true);
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <span>Search properties & locations...</span>
          </button>
        </div>

        <div className="sheet-nav-list">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className={`sheet-nav-item ${activeTab === item.name ? "active" : ""}`}
              onClick={() => handleNavClick(item.name)}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span className="sheet-item-name">{item.name}</span>
              {item.count ? (
                <span className="sheet-count-tag">{item.count} Listings</span>
              ) : (
                <span className="sheet-arrow">→</span>
              )}
            </a>
          ))}
        </div>

        <div className="sheet-footer">
          <div className="sheet-contact-card">
            <span className="sheet-contact-label">Direct Concierge</span>
            <a href="tel:+18009244355" className="sheet-contact-value">+1 (800) 924-4355</a>
            <a href="mailto:inquiries@helloproperties.com" className="sheet-contact-sub">inquiries@helloproperties.com</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
