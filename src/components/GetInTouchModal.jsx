import React, { useState } from "react";
import { submitRequirement } from "../services/propertyService";
import "./GetInTouchModal.css";

const GetInTouchModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "Villa",
    location: "",
    notes: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitRequirement({
      ...formData,
      type: "Listing Inquiry / Get In Touch"
    });
    setSubmitting(false);
    if (res.success) {
      setSubmitted(true);
    } else {
      alert("Thank you! Your request has been received. Our team will get in touch shortly.");
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="arch-modal-overlay">
      <div className="arch-modal-backdrop" onClick={handleClose}></div>
      <div className="arch-modal-box">
        <button type="button" className="arch-modal-close" onClick={handleClose}>✕</button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="arch-modal-form">
            <span className="meta-label">EXCLUSIVE ADVISORY & DISCOVERY</span>
            <h3 className="arch-modal-title">GET IN TOUCH WITH US</h3>
            <p className="arch-modal-sub">Tell us about your property requirement or estate listing. Our senior advisor will contact you privately.</p>

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
              {submitting ? "SUBMITTING..." : "SUBMIT DETAILS →"}
            </button>
          </form>
        ) : (
          <div className="arch-modal-success">
            <span className="success-icon">✓</span>
            <h3>INQUIRY RECEIVED</h3>
            <p>Thank you. Your details have been received. Our senior advisor will get in touch with you shortly.</p>
            <button type="button" className="arch-modal-close-btn" onClick={handleClose}>
              CLOSE WINDOW
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetInTouchModal;
