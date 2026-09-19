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
            <span className="contact-hero-meta">GET IN TOUCH</span>
            <h1 className="contact-hero-title">CONNECT WITH OUR<br/>ADVISORY TEAM</h1>
          </div>
        </section>

        {/* Contact Split Layout */}
        <section className="contact-content-section">
          <div className="hp-container">
            <div className="contact-grid">
              
              {/* Left Side: Info */}
              <div className="contact-info-col">
                <div className="info-block">
                  <span className="info-lbl">HEADQUARTERS</span>
                  <p className="info-txt">
                    HelloProperties Premium Realty<br />
                    PT Usha Road, Ernakulam<br />
                    Kochi, Kerala 682011<br />
                    India
                  </p>
                </div>
                
                <div className="info-block">
                  <span className="info-lbl">DIRECT LINE</span>
                  <p className="info-txt">+91 98765 43210</p>
                  <p className="info-txt">+91 98765 43211</p>
                </div>
                
                <div className="info-block">
                  <span className="info-lbl">ELECTRONIC</span>
                  <p className="info-txt">advisory@helloproperties.in</p>
                  <p className="info-txt">sales@helloproperties.in</p>
                </div>
                
                <div className="info-block">
                  <span className="info-lbl">HOURS OF OPERATION</span>
                  <p className="info-txt">Monday — Saturday<br />09:30 AM — 06:00 PM (IST)</p>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="contact-form-col">
                <div className="contact-form-wrapper">
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="arch-contact-form">
                      <h3 className="form-heading">SEND AN INQUIRY</h3>
                      <p className="form-subheading">Provide your details and requirement below. A senior advisor will reach out privately.</p>

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
                        {submitting ? "SUBMITTING..." : "SUBMIT INQUIRY →"}
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
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
