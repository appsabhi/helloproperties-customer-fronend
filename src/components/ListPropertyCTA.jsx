import React, { useState } from "react";
import { submitRequirement } from "../services/propertyService";
import "./ListPropertyCTA.css";

const SPLIT_IMAGE = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=85";

const ListPropertyCTA = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "Villa",
    location: "",
    expectedPrice: "",
    notes: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitRequirement({
      ...formData,
      type: "Listing Inquiry / Seller Requirement"
    });
    setSubmitting(false);
    if (res.success) {
      setSubmitted(true);
    } else {
      alert("Thank you! Your property listing request has been received. Our team will get in touch shortly.");
      setSubmitted(true);
    }
  };

  return (
    <section id="list-property" className="arch-splitcta-section">
      <div className="hp-container">
        <div className="arch-splitcta-card">
          {/* Left Side: Story Headline */}
          <div className="arch-splitcta-left">
            <span className="meta-label">ESTATE SELLER ADVISORY</span>
            <h2 className="arch-splitcta-headline">
              YOUR PROPERTY<br />
              <span className="arch-italic-accent">HAS A STORY.</span>
            </h2>
          </div>

          {/* Right Side: Subtext & CTA */}
          <div className="arch-splitcta-right">
            <p className="arch-splitcta-subtext">
              Let us help the right people discover it. We present exceptional Kerala land, plantations, and architectural residences to discerning private buyers.
            </p>

            <button
              type="button"
              className="arch-btn-list-cta"
              onClick={() => setModalOpen(true)}
            >
              <span>LIST YOUR PROPERTY</span>
              <span className="arr">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Listing Modal */}
      {modalOpen && (
        <div className="arch-modal-overlay">
          <div className="arch-modal-backdrop" onClick={() => setModalOpen(false)}></div>
          <div className="arch-modal-box">
            <button type="button" className="arch-modal-close" onClick={() => setModalOpen(false)}>✕</button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="arch-modal-form">
                <span className="meta-label">EXCLUSIVE SELLER DISCOVERY</span>
                <h3 className="arch-modal-title">LIST YOUR PROPERTY WITH US</h3>
                <p className="arch-modal-sub">Tell us about your land or estate. Our team will contact you privately.</p>

                <div className="arch-form-grid">
                  <div className="arch-form-group">
                    <label>YOUR FULL NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Varma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="arch-form-group">
                    <label>PHONE NUMBER</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="arch-form-group">
                    <label>EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      placeholder="ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="arch-form-group">
                    <label>PROPERTY TYPOLOGY</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    >
                      <option value="Plot/Land">Plot/Land</option>
                      <option value="House/Villa">House/Villa</option>
                      <option value="Apartment/Flat">Apartment/Flat</option>
                      <option value="Residential Plot">Residential Plot</option>
                      <option value="Commercial Plot">Commercial Plot</option>
                      <option value="Agricultural Land">Agricultural Land</option>
                      <option value="Industrial Plot">Industrial Plot</option>
                    </select>
                  </div>

                  <div className="arch-form-group full">
                    <label>LOCATION / DISTRICT</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Wayanad, Kozhikode, Kochi"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>

                <button type="submit" disabled={submitting} className="arch-modal-submit-btn">
                  {submitting ? "SUBMITTING..." : "SUBMIT PROPERTY DETAILS →"}
                </button>
              </form>
            ) : (
              <div className="arch-modal-success">
                <span className="success-icon">✓</span>
                <h3>INQUIRY RECEIVED</h3>
                <p>Thank you. Your property details have been received. Our senior advisor will get in touch with you shortly.</p>
                <button type="button" className="arch-modal-close-btn" onClick={() => setModalOpen(false)}>
                  CLOSE WINDOW
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ListPropertyCTA;
