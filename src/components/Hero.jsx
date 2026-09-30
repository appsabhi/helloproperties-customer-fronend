import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, animate, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { propertyCategories } from "./propertyCategories";
import { useCustomerProperties } from "../context/CustomerPropertyContext";
import "./Hero.css";

import heroBgImg from "../assets/png/hero_web.jpeg";
import heroMobileBgImg from "../assets/png/hero_mobile_img.png";

const MotionLink = motion.create(Link);

function CurvedCategoryCard({ category, index, scrollX, cardStep, visibleCards }) {
  const reduceMotion = useReducedMotion();
  const center = (visibleCards - 1) / 2;
  const edge = visibleCards / 2;
  // Recycle cards beyond either end of the arc, where they are no longer visible.
  const position = useTransform(scrollX, (value) => {
    const count = propertyCategories.length;
    const offset = index - value / cardStep + 2;
    return ((offset % count) + count) % count - 2 - center;
  });
  const x = useTransform(position, (value) => (value + center - index) * cardStep);
  const opacity = useTransform(position, [-edge, -center, center, edge], [0, 1, 1, 0]);
  const visibility = useTransform(position, (value) => Math.abs(value) >= edge ? "hidden" : "visible");
  const rotate = useTransform(position, (value) => reduceMotion ? 0 : Math.max(-45, Math.min(45, value * (visibleCards === 2 ? 10 : 16))));
  const y = useTransform(position, (value) => reduceMotion ? 0 : (Math.min(9, value * value) - 0.25) * Math.min(27, cardStep * 0.12));

  return (
    <motion.div className="mnzil-category-slot" style={{ x, opacity, visibility }}>
      <MotionLink className="mnzil-hero-category" to={category.path} style={{ rotate, y }}>
        <img src={category.img} alt="" width="220" height="330" />
        <span>{category.title}</span>
      </MotionLink>
    </motion.div>
  );
}

const Hero = () => {
  const navigate = useNavigate();
  const { properties } = useCustomerProperties();

  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const searchRef = useRef(null);
  const categoryScrollRef = useRef(null);
  const [cardStep, setCardStep] = useState(230);
  const [visibleCards, setVisibleCards] = useState(4);
  const cardOffset = useMotionValue(0);
  const targetCard = useRef(0);
  const reduceMotion = useReducedMotion();
  const scrollX = useTransform(cardOffset, (offset) => offset * cardStep);

  const slideCategories = (direction) => {
    targetCard.current += direction;
    cardOffset.stop();
    animate(cardOffset, targetCard.current, {
      duration: reduceMotion ? 0 : 0.5,
      ease: [0.22, 1, 0.36, 1],
    });
  };

  useEffect(() => () => cardOffset.stop(), [cardOffset]);

  useEffect(() => {
    const gallery = categoryScrollRef.current;
    const measure = () => {
      const styles = getComputedStyle(gallery);
      const contentWidth = gallery.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
      const columns = Number(styles.getPropertyValue("--visible-cards")) || 4;
      setVisibleCards(columns);
      setCardStep((contentWidth + parseFloat(styles.columnGap)) / columns);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(gallery);
    return () => observer.disconnect();
  }, []);

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
    <section className="mnzil-hero" style={{ "--hero-desktop-image": `url(${heroBgImg})`, "--hero-mobile-image": `url(${heroMobileBgImg})` }}>

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
      <div className="mnzil-category-carousel">
        <motion.div
          className="mnzil-category-reveal"
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: reduceMotion ? 0 : 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
        <nav className="mnzil-hero-categories" id="hero-property-types" aria-label="Browse property types" ref={categoryScrollRef}>
          {propertyCategories.map((category, index) => (
            <CurvedCategoryCard key={category.id} category={category} index={index} scrollX={scrollX} cardStep={cardStep} visibleCards={visibleCards} />
          ))}
        </nav>
        <button className="mnzil-category-arrow mnzil-category-arrow-prev" type="button" onClick={() => slideCategories(-1)} aria-label="Previous property types" aria-controls="hero-property-types">
          <span aria-hidden="true">&#8249;</span>
        </button>
        <button className="mnzil-category-arrow mnzil-category-arrow-next" type="button" onClick={() => slideCategories(1)} aria-label="Next property types" aria-controls="hero-property-types">
          <span aria-hidden="true">&#8250;</span>
        </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;




