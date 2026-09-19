import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import GetInTouchModal from "./GetInTouchModal";
import "./AboutPage.css";

const HERO_IMG = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85";
const STORY_IMG = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=85";

const PILLARS = [
  {
    num: "01",
    title: "100% Title Verified",
    desc: "Every land parcel and architectural villa undergoes rigorous multi-layer title search, encumbrance verification, and boundary mapping.",
  },
  {
    num: "02",
    title: "Terrain & Soil Intelligence",
    desc: "We provide deep site intelligence including slope analysis, soil type, water source verification, and access road evaluation.",
  },
  {
    num: "03",
    title: "Discrete Private Advisory",
    desc: "Confidential representation for high-net-worth buyers and estate sellers seeking privacy, discretion, and transparent pricing.",
  },
  {
    num: "04",
    title: "White-Glove Registration",
    desc: "End-to-end legal support, valuation certificates, registration coordination, and seamless property onboarding.",
  },
];

const CLIENT_LOGOS = [
  {
    id: 1,
    name: "SOBHA DEVELOPERS",
    tagline: "LUXURY REAL ESTATE",
    svg: (
      <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#0D0E0E"/>
        <path d="M12 28L20 12L28 28H23L20 22L17 28H12Z" fill="#FFFFFF"/>
      </svg>
    )
  },
  {
    id: 2,
    name: "PRESTIGE GROUP",
    tagline: "COMMERCIAL & LAND",
    svg: (
      <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#0D0E0E"/>
        <path d="M14 13H26V16H14V13ZM14 18.5H24V21.5H14V18.5ZM14 24H26V27H14V24Z" fill="#FFFFFF"/>
      </svg>
    )
  },
  {
    id: 3,
    name: "SKYLINE BUILDERS",
    tagline: "URBAN ENCLAVES",
    svg: (
      <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#0D0E0E"/>
        <path d="M13 28V16L20 11L27 16V28H22V20H18V28H13Z" fill="#FFFFFF"/>
      </svg>
    )
  },
  {
    id: 4,
    name: "GOKULAM REALTY",
    tagline: "INSTITUTIONAL ACREAGE",
    svg: (
      <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#0D0E0E"/>
        <circle cx="20" cy="20" r="9" stroke="#FFFFFF" strokeWidth="2.5"/>
        <path d="M20 14V26M14 20H26" stroke="#FFFFFF" strokeWidth="2.5"/>
      </svg>
    )
  },
  {
    id: 5,
    name: "MUTHOOT ESTATE",
    tagline: "PLANTATION & ADVISORY",
    svg: (
      <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#0D0E0E"/>
        <path d="M20 10L29 20L20 30L11 20L20 10Z" fill="#FFFFFF"/>
      </svg>
    )
  },
  {
    id: 6,
    name: "ASSET HOMES",
    tagline: "ECO RESIDENCES",
    svg: (
      <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#0D0E0E"/>
        <path d="M12 26V14L20 20L28 14V26H24V19L20 22L16 19V26H12Z" fill="#FFFFFF"/>
      </svg>
    )
  }
];

const AboutPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.title = "About Us | HelloProperties Kerala";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page-root">
      <Header />

      <main className="about-page-main">
        {/* Banner Section */}
        <section className="about-hero-section">
          <div className="about-hero-bg">
            <img src={HERO_IMG} alt="HelloProperties Kerala Estate" className="about-hero-img" />
            <div className="about-hero-overlay"></div>
          </div>

          <div className="hp-container about-hero-container">
            <span className="about-eyebrow">ABOUT HELLOPROPERTIES</span>
            <h1 className="about-main-title">
              CURATING KERALA'S FINEST<br />
              ESTATES & ARCHITECTURAL LANDSCAPES.
            </h1>
            <p className="about-main-subtitle">
              A private real estate advisory built on 100% verified titles, terrain intelligence, and discrete client guidance.
            </p>
          </div>
        </section>

        {/* Our Story & Philosophy */}
        <section className="about-story-section">
          <div className="hp-container">
            <div className="about-story-grid">
              <div className="about-story-text">
                <span className="section-meta-lbl">OUR PHILOSOPHY</span>
                <h2 className="about-section-heading">
                  PROPERTY IS NOT JUST A PLACE TO OWN.<br />
                  IT IS A LANDSCAPE TO BELONG TO.
                </h2>
                <p className="about-paragraph">
                  HelloProperties was established to solve a fundamental challenge in Kerala real estate: connecting buyers with genuine, legally pristine land and architectural homes without opacity or friction.
                </p>
                <p className="about-paragraph">
                  From high-altitude tea plantations in Munnar and hill acreage in Wayanad, to serene waterfront parcels in Alleppey and contemporary luxury villas in Kochi & Kozhikode — we curate properties that embody the soul of Kerala.
                </p>

                <div className="about-actions">
                  <button className="about-cta-btn primary" onClick={() => setModalOpen(true)}>
                    <span>GET IN TOUCH WITH ADVISOR</span>
                    <span>→</span>
                  </button>
                  <Link to="/properties" className="about-cta-btn secondary">
                    <span>EXPLORE LISTINGS</span>
                  </Link>
                </div>
              </div>

              <div className="about-story-media">
                <div className="story-img-frame">
                  <img src={STORY_IMG} alt="Kerala Estate Landscape" className="story-img" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Pillars of Distinction */}
        <section className="about-pillars-section">
          <div className="hp-container">
            <div className="about-pillars-header">
              <span className="section-meta-lbl">OUR DISTINCTION</span>
              <h2 className="pillars-title">WHY DISCERNING BUYERS CHOOSE US</h2>
            </div>

            <div className="pillars-grid">
              {PILLARS.map((p) => (
                <div key={p.num} className="pillar-card">
                  <span className="pillar-num">{p.num}</span>
                  <h3 className="pillar-card-title">{p.title}</h3>
                  <p className="pillar-card-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Logos / Corporate Partners Section */}
        <section className="about-clients-section">
          <div className="hp-container">
            <div className="about-clients-header">
              <span className="section-meta-lbl">OUR TRUSTED CLIENTELE</span>
              <h2 className="clients-title">PARTNERING WITH INDUSTRY LEADERS</h2>
              <p className="clients-subtitle">
                Collaborating with Kerala’s premier developers, institutional investors, and private estate owners.
              </p>
            </div>

            <div className="clients-grid">
              {CLIENT_LOGOS.map((client) => (
                <div key={client.id} className="client-card">
                  <div className="client-logo-icon">{client.svg}</div>
                  <div className="client-info">
                    <span className="client-name">{client.name}</span>
                    <span className="client-tagline">{client.tagline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal */}
      <GetInTouchModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default AboutPage;
