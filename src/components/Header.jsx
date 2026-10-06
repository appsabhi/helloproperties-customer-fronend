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
        </header>
      </div>

      {/* Mobile Fullscreen Menu */}
      <div className={`arch-mobile-fullscreen ${mobileOpen ? "active" : ""}`}>
        
        {/* Top Bar inside Menu */}
        <div className="arch-menu-top">
          <button className="arch-menu-close-btn" onClick={() => setMobileOpen(false)}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B9A" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <div className="arch-menu-brand">
            <img src={logoStatic} alt="HelloProperties Kerala" style={{ height: '20px', width: 'auto' }} />
          </div>
          
          <div className="arch-menu-spacer">
            {/* Empty space to balance the close button */}
          </div>
        </div>

        {/* Main Navigation Stack */}
        <nav className="arch-menu-main-nav">
          <Link to="/" onClick={() => setMobileOpen(false)}>HOME</Link>
          <Link to="/properties" onClick={() => setMobileOpen(false)}>PROPERTIES</Link>
          <Link to="/contact" onClick={() => setMobileOpen(false)}>CONTACT</Link>
        </nav>

        {/* Secondary Navigation Stack */}
        <div className="arch-menu-secondary-nav">
          <button 
            type="button" 
            className="arch-btn-list-property"
            onClick={openTouchModal}
            style={{ padding: '0.9rem 2rem', fontSize: '0.85rem' }}
          >
            <span>ENQUIRE NOW</span>
          </button>
        </div>

        {/* Footer / Social Icons */}
        <div className="arch-menu-social-footer">
          <a href="#" aria-label="Facebook"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
          <a href="#" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
        </div>
      </div>

      {/* Get In Touch Modal */}
      <GetInTouchModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Header;
