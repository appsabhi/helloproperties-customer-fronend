import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { submitRequirement } from "../services/propertyService";
import "./ContactPage.css";

const ContactPage = () => {
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

  useEffect(() => {
    document.title = "Contact | HelloProperties Kerala";
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitRequirement({
      ...formData,
      type: "Contact Page Inquiry"
    });
    setSubmitting(false);
    if (res.success) {
      setSubmitted(true);
    } else {
      alert("Thank you! Your request has been received. Our team will get in touch shortly.");
      setSubmitted(true);
    }
  };

  return (
    <div className="contact-page-root">
      <Header />

      <main className="contact-page-main">
        {/* Minimal Hero Header */}
        <section className="contact-hero">
          <div className="hp-container">
            <h1 className="contact-hero-title">Get In Touch</h1>
            <p className="contact-hero-subtitle">
              We'll connect you with premium properties and expert advisory services across Kerala, paving the way for you to find your perfect investment.
            </p>
          </div>
        </section>

        {/* Contact Split Layout */}
        <section className="contact-content-section">
          <div className="hp-container">
            <div className="contact-card-wrapper">
              <div className="contact-grid">
                
                {/* Left Side: Info */}
                <div className="contact-info-col">
                  <div className="info-blocks">
                    <div className="info-block">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      <div className="info-text">
                        <span>+91 79078 98072</span>
                      </div>
                    </div>
                    
                    <div className="info-block">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      <div className="info-text">
                        <span>advisory@helloproperties.in</span>
                      </div>
                    </div>
                    
                    <div className="info-block">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      <div className="info-text">
                        <span>PT Usha Road, Ernakulam<br/>Kochi, Kerala</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative circle matching the screenshot */}
                  <div className="contact-info-blob"></div>
                </div>

                {/* Right Side: Form */}
              <div className="contact-form-col">
                <div className="contact-form-wrapper">
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="arch-contact-form">

                      <div className="c-form-group">
                        <input
                          type="text"
                          required
                          placeholder=" "
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <label>YOUR FULL NAME</label>
                      </div>

                      <div className="c-form-row">
                        <div className="c-form-group">
                          <input
                            type="tel"
                            required
                            placeholder=" "
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                          <label>PHONE NUMBER</label>
                        </div>
                        <div className="c-form-group">
                          <input
                            type="email"
                            required
                            placeholder=" "
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                          <label>EMAIL ADDRESS</label>
                        </div>
                      </div>

                      <div className="c-form-row">
                        <div className="c-form-group">
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
                          <label className="select-lbl">PROPERTY TYPOLOGY</label>
                        </div>
                        <div className="c-form-group">
                          <input
                            type="text"
                            required
                            placeholder=" "
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          />
                          <label>LOCATION / DISTRICT</label>
                        </div>
                      </div>

                      <div className="c-form-group">
                        <textarea
                          placeholder=" "
                          rows="4"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        ></textarea>
                        <label>ADDITIONAL DETAILS (OPTIONAL)</label>
                      </div>

                      <button type="submit" disabled={submitting} className="c-submit-btn">
                        {submitting ? "Sending..." : "Send Message"}
                      </button>
                    </form>
                  ) : (
                    <div className="contact-form-success">
                      <span className="c-success-icon">✓</span>
                      <h3>INQUIRY RECEIVED</h3>
                      <p>Thank you for reaching out. Your details have been received and a member of our advisory team will contact you shortly.</p>
                      <button type="button" className="c-reset-btn" onClick={() => setSubmitted(false)}>
                        SUBMIT ANOTHER INQUIRY
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
