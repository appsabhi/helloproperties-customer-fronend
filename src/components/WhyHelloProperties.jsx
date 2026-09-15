import React from "react";
import "./WhyHelloProperties.css";

const features = [
  {
    id: "verified",
    number: "01",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    title: "100% Verified Estates",
    description: "Every land parcel and luxury home undergoes rigorous title verification, boundary checking, and physical inspection."
  },
  {
    id: "match",
    number: "02",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <path d="M11 8v6M8 11h6"/>
      </svg>
    ),
    title: "Smart Matching Engine",
    description: "Our proprietary 2-way algorithm connects buyers with exact-match properties based on location, budget, and soil/terrain needs."
  },
  {
    id: "transparent",
    number: "03",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    title: "Transparent Legal Guidance",
    description: "Complete clarity on property valuations, title deeds, encumbrance certificates, and registration paperwork."
  },
  {
    id: "concierge",
    number: "04",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: "White-Glove Service",
    description: "Dedicated real estate advisors guide you from private site visits to seamless deal execution and handover."
  }
];

export function WhyHelloProperties() {
  return (
    <section className="why-hp-section">
      <div className="why-hp-container">
        
        {/* Header Badge & Title */}
        <div className="why-hp-header">
          <span className="why-hp-badge">The HelloProperties Distinction</span>
          <h2 className="why-hp-title">
            Why Discerning Buyers Choose <span>HelloProperties</span>
          </h2>
          <p className="why-hp-subtitle">
            We bridge the gap between premium land buyers and verified property owners through unmatched integrity and smart property intelligence.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="why-hp-grid">
          {features.map((item) => (
            <div key={item.id} className="why-hp-card">
              <div className="why-hp-card-top">
                <div className="why-hp-icon-box">{item.icon}</div>
                <span className="why-hp-number">{item.number}</span>
              </div>
              <h3 className="why-hp-card-title">{item.title}</h3>
              <p className="why-hp-card-desc">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Banner Stats */}
        <div className="why-hp-stats-banner">
          <div className="why-hp-stat">
            <span className="why-hp-stat-val">500+</span>
            <span className="why-hp-stat-lbl">Verified Acres Listed</span>
          </div>
          <div className="why-hp-stat-divider"></div>
          <div className="why-hp-stat">
            <span className="why-hp-stat-val">98%</span>
            <span className="why-hp-stat-lbl">Match Satisfaction</span>
          </div>
          <div className="why-hp-stat-divider"></div>
          <div className="why-hp-stat">
            <span className="why-hp-stat-val">100%</span>
            <span className="why-hp-stat-lbl">Clear Title Assurance</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default WhyHelloProperties;
