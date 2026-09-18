import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../assets/png/HelloProperties_static.png";

const Footer = () => {
  return (
    <footer className="arch-footer">
      {/* Giant Faint Watermark Text */}
      <span className="arch-footer-watermark">KERALA</span>

      <div className="hp-container arch-footer-inner">
        <div className="arch-footer-grid">
          {/* Brand Info */}
          <div className="arch-footer-brand">
            <Link to="/" className="arch-footer-logo">
              <img src={logo} alt="HelloProperties Kerala" className="arch-footer-logo-img" />
            </Link>
            <p className="arch-footer-tagline">
              Curating exceptional architectural residences, tea plantation estates, and prime land across Kerala’s finest landscapes.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="arch-footer-col">
            <h4 className="footer-col-title">NAVIGATION</h4>
            <ul className="footer-links">
              <li><Link to="/properties">Properties</Link></li>
              <li><a href="#destinations">Destinations</a></li>
              <li><a href="#list-property">Sell Property</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="arch-footer-col">
            <h4 className="footer-col-title">CONTACT</h4>
            <p className="footer-info-text">hello@helloproperties.in</p>
            <p className="footer-info-text">+91 98765 43210</p>
            <p className="footer-info-text">Kochi • Wayanad • Kozhikode</p>
          </div>

          {/* Social */}
          <div className="arch-footer-col">
            <h4 className="footer-col-title">FOLLOW</h4>
            <ul className="footer-links">
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram ↗</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn ↗</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="arch-footer-bottom">
          <p>© 2026 HELLOPROPERTIES KERALA. ALL RIGHTS RESERVED.</p>
          <div className="footer-legal">
            <a href="#privacy">PRIVACY POLICY</a>
            <span>•</span>
            <a href="#terms">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
