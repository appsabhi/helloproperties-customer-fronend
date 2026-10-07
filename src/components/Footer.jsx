import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../assets/png/HelloProperties_static.png";

const Footer = () => {
  return (
    <footer className="hp-footer-card">
      {/* Animated decorative background blobs */}
      <div className="page-blob page-blob-1"></div>
      <div className="page-blob page-blob-2"></div>
      
      <div className="hp-footer-inner hp-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hp-footer-grid">
          {/* Brand Info */}
          <div className="hp-footer-brand">
            <Link to="/" className="hp-footer-logo">
              <img src={logo} alt="HelloProperties Kerala" className="hp-footer-logo-img" />
            </Link>
            <p className="hp-footer-tagline">
              Curating exceptional architectural residences, tea plantation estates, and prime land across Kerala’s finest landscapes.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="hp-footer-col">
            <h4 className="hp-footer-col-title">Navigation</h4>
            <ul className="hp-footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/properties">Properties</Link></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="hp-footer-col">
            <h4 className="hp-footer-col-title">Contact</h4>
            <p className="hp-footer-info-text">hello@helloproperties.in</p>
            <p className="hp-footer-info-text">+91 79078 98072</p>
          </div>

          {/* Social */}
          <div className="hp-footer-col">
            <h4 className="hp-footer-col-title">Follow</h4>
            <ul className="hp-footer-links">
              <li><a href="https://www.facebook.com/profile.php?id=61593274556512" target="_blank" rel="noreferrer">Facebook</a></li>
              <li><a href="https://www.instagram.com/helloproperties_/" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="tel:+917907898072">+91 79078 98072</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="hp-footer-bottom">
          <p>© 2026 HelloProperties. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
