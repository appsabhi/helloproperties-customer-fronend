import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logoTop from "../assets/png/HelloProperties.png";
import logoStatic from "../assets/png/HelloProperties_static.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`arch-header ${scrolled ? "arch-header-scrolled" : ""}`}>
      <div className="arch-header-inner">
        {/* Left: Minimal Logo */}
        <Link to="/" className="arch-brand-logo">
          <img 
            src={scrolled ? logoStatic : logoTop} 
            alt="HelloProperties Kerala" 
            className="arch-logo-img" 
          />
        </Link>

        {/* Center Navigation Links */}
        <nav className="arch-nav-desktop">
          <Link to="/properties" className="arch-nav-item">PROPERTIES</Link>
          <Link to="/properties?type=Land" className="arch-nav-item">LAND</Link>
          <Link to="/properties?type=Villa" className="arch-nav-item">VILLAS</Link>
          <a href="#destinations" className="arch-nav-item">DESTINATIONS</a>
          <a href="#about" className="arch-nav-item">ABOUT</a>
        </nav>

        {/* Right Side Actions */}
        <div className="arch-header-right">
          <a href="#list-property" className="arch-btn-list-property">
            <span>LIST YOUR PROPERTY</span>
          </a>

          {/* Minimal Mobile Menu Icon */}
          <button
            type="button"
            className="arch-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className={`arch-toggle-line ${mobileOpen ? "open" : ""}`}></span>
            <span className={`arch-toggle-line ${mobileOpen ? "open" : ""}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`arch-mobile-drawer ${mobileOpen ? "active" : ""}`}>
        <div className="arch-drawer-backdrop" onClick={() => setMobileOpen(false)}></div>
        <div className="arch-drawer-content">
          <div className="arch-drawer-header">
            <img src={logoStatic} alt="HelloProperties Kerala" className="arch-drawer-logo-img" />
            <button className="arch-drawer-close" onClick={() => setMobileOpen(false)}>✕</button>
          </div>
          <nav className="arch-drawer-nav">
            <Link to="/properties" onClick={() => setMobileOpen(false)}>PROPERTIES</Link>
            <Link to="/properties?type=Land" onClick={() => setMobileOpen(false)}>LAND</Link>
            <Link to="/properties?type=Villa" onClick={() => setMobileOpen(false)}>VILLAS</Link>
            <a href="#destinations" onClick={() => setMobileOpen(false)}>DESTINATIONS</a>
            <a href="#about" onClick={() => setMobileOpen(false)}>ABOUT</a>
          </nav>
          <div className="arch-drawer-footer">
            <a href="#list-property" className="arch-btn-list-property-full" onClick={() => setMobileOpen(false)}>
              LIST YOUR PROPERTY
            </a>
            <p className="arch-drawer-contact">hello@helloproperties.in • +91 98765 43210</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
