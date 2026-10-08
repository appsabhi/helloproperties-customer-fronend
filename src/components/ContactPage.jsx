import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { submitRequirement } from "../services/propertyService";
import "./ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    agreeToPolicy: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact | HelloProperties Kerala";
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreeToPolicy) {
      alert("Please agree to the privacy policy to continue.");
      return;
    }
    setSubmitting(true);
    const res = await submitRequirement({
      name: formData.name,
      email: formData.email,
      phone: "Not provided",
      propertyType: "Contact Inquiry",
      location: "Contact Form",
      type: "Contact Page Inquiry",
      notes: `Subject: ${formData.subject}\n\nMessage: ${formData.message}`
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
        {/* Dark Blue Hero Section */}
        <section className="contact-hero">
          <div className="hp-container">
            <h1 className="contact-hero-title">Feel free to get in touch</h1>
          </div>
        </section>

        {/* Slanted Background & Content */}
        <section className="contact-content-section">
          <div className="contact-slant-bg"></div>
          
          <div className="hp-container">
            <div className="contact-grid">
              
              {/* Left Side: Form Card */}
              <div className="contact-form-col">
                <div className="contact-form-card">
                  <h2>Leave your message</h2>
                  
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="target-contact-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            required
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Subject</label>
                        <input
                          type="text"
                          required
                          placeholder="Subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label>Message</label>
                        <textarea
                          required
                          placeholder="Message"
                          rows="5"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        ></textarea>
                      </div>

                      <div className="form-footer">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={formData.agreeToPolicy}
                            onChange={(e) => setFormData({ ...formData, agreeToPolicy: e.target.checked })}
                          />
                          <span>I agree to the privacy policy</span>
                        </label>
                        
                        <button type="submit" disabled={submitting} className="submit-btn">
                          {submitting ? "Sending..." : "Send Message"}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="contact-form-success">
                      <span className="success-icon">✓</span>
                      <h3>Message Sent!</h3>
                      <p>Thank you for reaching out. We will get back to you shortly.</p>
                      <button type="button" className="reset-btn" onClick={() => setSubmitted(false)}>
                        Send Another Message
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side: Info Section */}
              <div className="contact-info-col">
                <h2 className="info-title">Don't hesitate to contact us</h2>
                <p className="info-subtitle">
                  We are here to answer any questions you may have. Reach out to us and we'll respond as soon as we can.
                </p>

                <div className="info-cards-grid">
                  {/* Office */}
                  <div className="info-card">
                    <div className="icon-circle office-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div className="info-card-text">
                      <h4>Office</h4>
                      <p>4th Floor, Business Park,<br/>HiLITE City, Kozhikode, Kerala</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="info-card">
                    <div className="icon-circle phone-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    <div className="info-card-text">
                      <h4>Phone</h4>
                      <p>+91 79078 98072</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="info-card email-card-center">
                    <div className="icon-circle email-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </div>
                    <div className="info-card-text">
                      <h4>Email</h4>
                      <p>hello@helloproperties.in</p>
                    </div>
                  </div>
                </div>

                <div className="social-section">
                  <h4 className="social-title">Social Media :</h4>
                  <div className="social-icons">
                    <a href="https://www.facebook.com/profile.php?id=61593274556512" target="_blank" rel="noreferrer" className="social-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                    <a href="https://www.instagram.com/helloproperties_/" target="_blank" rel="noreferrer" className="social-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
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
