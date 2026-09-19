import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import GetInTouchModal from "./GetInTouchModal";
import "./Header.css";
import logoTop from "../assets/png/HelloProperties_static.png";
import logoStatic from "../assets/png/HelloProperties_static.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();

  const isMapPage = location.pathname === "/property-map";
  const isPropertiesPage = location.pathname === "/properties";
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openTouchModal = (e) => {
    e?.preventDefault();
    setMobileOpen(false);
    setModalOpen(true);
  };

  const isHeaderSolid = scrolled || isMapPage || isPropertiesPage;

  return (
    <>
      <header className={`arch-header ${isHeaderSolid ? "arch-header-scrolled" : ""}`}>
        <div className="arch-header-inner">
          {/* Left: Minimal Logo */}
          <Link to="/" className="arch-brand-logo">
            <img 
              src={isHeaderSolid ? logoStatic : logoTop} 
              alt="HelloProperties Kerala" 
              className="arch-logo-img" 
            />
          </Link>

          {/* Center Navigation Links */}
          <nav className="arch-nav-desktop">
            <Link to="/" className={`arch-nav-item ${isHomePage ? "active-route" : ""}`}>HOME</Link>
            <a href="#about" className="arch-nav-item">ABOUT</a>
            <Link to="/properties" className={`arch-nav-item ${isPropertiesPage ? "active-route" : ""}`}>PROPERTIES</Link>
            <Link to="/property-map" className={`arch-nav-item ${isMapPage ? "active-route" : ""}`}>EXPLORE MAP</Link>
            <a href="#contact" className="arch-nav-item" onClick={openTouchModal}>CONTACT</a>
          </nav>

          {/* Right Side Actions */}
          <div className="arch-header-right">
            <button 
              type="button" 
              className="arch-btn-list-property"
              onClick={openTouchModal}
            >
              <span>GET IN TOUCH</span>
            </button>

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
              <Link to="/" onClick={() => setMobileOpen(false)}>HOME</Link>
              <a href="#about" onClick={() => setMobileOpen(false)}>ABOUT</a>
              <Link to="/properties" onClick={() => setMobileOpen(false)}>PROPERTIES</Link>
              <Link to="/property-map" onClick={() => setMobileOpen(false)}>EXPLORE MAP</Link>
              <a href="#contact" onClick={(e) => { e.preventDefault(); openTouchModal(e); }}>CONTACT</a>
            </nav>
            <div className="arch-drawer-footer">
              <button 
                type="button" 
                className="arch-btn-list-property-full" 
                onClick={openTouchModal}
              >
                GET IN TOUCH
              </button>
              <p className="arch-drawer-contact">hello@helloproperties.in • +91 98765 43210</p>
            </div>
          </div>
        </div>
      </header>

      {/* Get In Touch Modal */}
      <GetInTouchModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Header;
