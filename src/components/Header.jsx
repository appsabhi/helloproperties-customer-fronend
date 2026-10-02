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
  const isContactPage = location.pathname === "/contact";
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

  const isHeaderSolid = scrolled;

  return (
    <>
      <div className={`arch-header-wrapper ${isHeaderSolid ? "arch-header-scrolled-wrapper" : ""}`}>
        <header className="arch-header">
          <div className="arch-header-inner">
               {/* Center: Minimal Logo */}
            <Link to="/" className="arch-brand-logo">
              <img 
                src={logoStatic} 
                alt="HelloProperties Kerala" 
                className="arch-logo-img" 
              />
            </Link>

            {/* Right Side Actions */}
            {/* Left: Navigation Links */}
            <nav className="arch-nav-desktop">
              <Link to="/" className={`arch-nav-item ${isHomePage ? "active-route" : ""}`}>HOME</Link>
              <Link to="/properties" className={`arch-nav-item ${isPropertiesPage ? "active-route" : ""}`}>PROPERTIES</Link>
              <Link to="/contact" className={`arch-nav-item ${isContactPage ? "active-route" : ""}`}>CONTACT</Link>
            </nav>

         
            <div className="arch-header-right">
              
              <button 
                type="button" 
                className="arch-btn-list-property"
                onClick={openTouchModal}
              >
                <span>ENQUIRE NOW</span>
              </button>

              <button
                type="button"
                className="arch-menu-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation menu"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, alignItems: 'center', justifyContent: 'center' }}
              >
                {mobileOpen ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                )}
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
                <Link to="/properties" onClick={() => setMobileOpen(false)}>PROPERTIES</Link>
                <Link to="/contact" onClick={() => setMobileOpen(false)}>CONTACT</Link>
              </nav>
              <div className="arch-drawer-footer">
                <button 
                  type="button" 
                  className="arch-btn-list-property-full" 
                  onClick={openTouchModal}
                >
                  ENQUIRE NOW
                </button>
                <p className="arch-drawer-contact">hello@helloproperties.in • +91 98765 43210</p>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Get In Touch Modal */}
      <GetInTouchModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Header;
