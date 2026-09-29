import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomerProperties } from "../context/CustomerPropertyContext";
import "./Hero.css";

import heroBgImg from "../assets/png/hero-bg-maroon.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const { properties } = useCustomerProperties();

  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const searchRef = useRef(null);

  // Extract unique locations and districts from real database properties
  const availableLocations = useMemo(() => {
    if (!properties || properties.length === 0) return [];
    const locs = new Set();
    properties.forEach(p => {
      if (p.location) locs.add(p.location.trim());
      if (p.district) locs.add(p.district.trim());
    });
    return Array.from(locs).filter(Boolean).sort();
  }, [properties]);

  const filteredLocations = useMemo(() => {
    if (!searchQuery) return [];
    const q = searchQuery.toLowerCase();
    return availableLocations.filter(loc => loc.toLowerCase().includes(q)).slice(0, 5);
  }, [searchQuery, availableLocations]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (locToSearch = searchQuery) => {
    setShowDropdown(false);
    if (locToSearch.trim()) {
      navigate(`/properties?q=${encodeURIComponent(locToSearch.trim())}`);
    } else {
      navigate("/properties");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (activeSuggestionIndex >= 0 && activeSuggestionIndex < filteredLocations.length) {
        handleSearchSubmit(filteredLocations[activeSuggestionIndex]);
      } else {
        handleSearchSubmit();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex(prev => Math.min(prev + 1, filteredLocations.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <section className="mnzil-hero" style={{ backgroundImage: `url(${heroBgImg})`, backgroundSize: "cover", backgroundPosition: "center right", backgroundRepeat: "no-repeat" }}>

      <div className="mnzil-hero-container hp-container">
        {/* Charcoal Typography Headline */}
        <div className="mnzil-hero-content">
          <h1 className="mnzil-hero-title">
        Find with confidence.<br/><span className="mnzil-title-italic"><span style={{ color: 'rgb(255, 90, 134)' }}>Invest</span> with clarity.</span>
          </h1>

          {/* Location Search Bar */}
          <div className="mnzil-hero-search-wrapper" ref={searchRef}>
            <div className="mnzil-hero-search-bar">
              <div className="mnzil-search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <input 
                type="text" 
                placeholder="Search by city, area, or locality" 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                  setActiveSuggestionIndex(-1);
                }}
                onFocus={() => setShowDropdown(true)}
                onKeyDown={handleKeyDown}
                className="mnzil-search-input"
              />
              {searchQuery && (
                <button type="button" className="mnzil-search-clear" aria-label="Clear search" onClick={() => { setSearchQuery(""); searchRef.current?.querySelector('input').focus(); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              )}
              <button type="button" className="mnzil-search-btn" onClick={() => handleSearchSubmit()}>
                Search properties
              </button>
            </div>

            {/* Autocomplete Dropdown */}
            {showDropdown && searchQuery && (
              <div className="mnzil-search-dropdown">
                {filteredLocations.length > 0 ? (
                  <ul className="mnzil-dropdown-list" role="listbox">
                    {filteredLocations.map((loc, idx) => (
                      <li 
                        key={idx} 
                        role="option"
                        aria-selected={idx === activeSuggestionIndex}
                        className={`mnzil-dropdown-item ${idx === activeSuggestionIndex ? 'active' : ''}`}
                        onClick={() => handleSearchSubmit(loc)}
                        onMouseEnter={() => setActiveSuggestionIndex(idx)}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path></svg>
                        <span>{loc}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mnzil-dropdown-empty">
                    {properties.length === 0 ? "Loading locations..." : "No matching locations found."}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;


