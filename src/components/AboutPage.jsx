import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import GetInTouchModal from "./GetInTouchModal";
import "./AboutPage.css";

import aboutHeroImg from "../assets/png/about_hero_img.jpg";

const STORY_IMG = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=85";
const PHILOSOPHY_IMG = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85";

const AboutPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.title = "About Us | HelloProperties Kerala";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-min-root">
      <Header />

      <main className="about-min-main">
        {/* 1. HERO */}
        <section className="min-hero">
          <div className="min-hero-content hp-container">
            <div className="min-hero-text">
              <span className="min-eyebrow">ABOUT HELLOPROPERTIES</span>
              <h1 className="min-hero-title">
                Property decisions deserve<br />the right guidance.
              </h1>
              <p className="min-hero-sub">
                HelloProperties is a property consultancy helping people discover, evaluate and move forward with the right property opportunities across Kerala.
              </p>
            </div>
            <div className="min-hero-img-wrap">
              <img src={aboutHeroImg} alt="Kerala Property" className="min-hero-img" />
            </div>
          </div>
        </section>

        {/* 2. OUR STORY */}
        <section className="min-story">
          <div className="hp-container">
            <div className="min-story-grid">
              <div className="min-story-img-col">
                <img src={STORY_IMG} alt="Our Story" className="min-story-img" />
              </div>
              <div className="min-story-text-col">
                <span className="min-eyebrow dark">OUR STORY</span>
                <h2 className="min-section-title">More than finding<br/>a property.</h2>
                <div className="min-story-paragraphs">
                  <p>
                    HelloProperties was established to solve a fundamental challenge in Kerala real estate: connecting buyers with genuine, legally pristine land and architectural homes without opacity or friction.
                  </p>
                  <p>
                    From high-altitude tea plantations in Munnar and hill acreage in Wayanad, to serene waterfront parcels in Alleppey and contemporary luxury villas in Kochi & Kozhikode — we curate properties that embody the soul of Kerala.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. OUR PHILOSOPHY */}
        <section className="min-philosophy">
          <div className="hp-container">
            <div className="min-philosophy-content">
              <span className="min-eyebrow dark">OUR PHILOSOPHY</span>
              <h2 className="min-philosophy-statement">
                PROPERTY IS NOT JUST<br/>A PLACE TO OWN.<br/><br/>
                IT IS A LANDSCAPE<br/>TO BELONG TO.
              </h2>
              <div className="min-philosophy-bottom">
                <p>We believe in transparent representation, rigorous verification, and a commitment to matching the right person with the right space.</p>
                <div className="min-philosophy-img-wrap">
                  <img src={PHILOSOPHY_IMG} alt="Philosophy" className="min-philosophy-img" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. HOW WE WORK (APPROACH) */}
        <section className="min-approach">
          <div className="hp-container">
            <div className="min-approach-header">
              <span className="min-eyebrow dark">OUR APPROACH</span>
              <h2 className="min-section-title">From requirement to decision.</h2>
            </div>
            
            <div className="min-timeline">
              <div className="min-timeline-step">
                <div className="min-timeline-num">01</div>
                <h3 className="min-timeline-title">Understand</h3>
                <p>We begin with your requirements.</p>
              </div>
              <div className="min-timeline-step">
                <div className="min-timeline-num">02</div>
                <h3 className="min-timeline-title">Curate</h3>
                <p>We identify relevant opportunities.</p>
              </div>
              <div className="min-timeline-step">
                <div className="min-timeline-num">03</div>
                <h3 className="min-timeline-title">Advise</h3>
                <p>We help you understand your options.</p>
              </div>
              <div className="min-timeline-step">
                <div className="min-timeline-num">04</div>
                <h3 className="min-timeline-title">Move Forward</h3>
                <p>You make the decision with confidence.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. WHY HELLOPROPERTIES */}
        <section className="min-why">
          <div className="hp-container">
            <div className="min-why-header">
              <span className="min-eyebrow dark">WHY HELLOPROPERTIES</span>
              <h2 className="min-section-title">A more considered way<br/>to approach property.</h2>
            </div>
            <div className="min-why-list">
              <div className="min-why-item">
                <span className="min-why-num">01</span>
                <div className="min-why-text">
                  <h3 className="min-why-title">Local Knowledge</h3>
                  <p>Deep understanding of Kerala's diverse terrain, regulations, and distinct market nuances.</p>
                </div>
              </div>
              <div className="min-why-item">
                <span className="min-why-num">02</span>
                <div className="min-why-text">
                  <h3 className="min-why-title">Requirement First</h3>
                  <p>Every search begins with a thorough understanding of your specific lifestyle or investment goals.</p>
                </div>
              </div>
              <div className="min-why-item">
                <span className="min-why-num">03</span>
                <div className="min-why-text">
                  <h3 className="min-why-title">Clear Guidance</h3>
                  <p>Transparent communication regarding title verification, pricing, and structural considerations.</p>
                </div>
              </div>
              <div className="min-why-item">
                <span className="min-why-num">04</span>
                <div className="min-why-text">
                  <h3 className="min-why-title">Curated Opportunities</h3>
                  <p>Access to carefully selected architectural residences, tea estates, and prime land parcels.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FINAL CONSULTATION CTA */}
        <section className="min-final-cta">
          <div className="hp-container">
            <div className="min-cta-box">
              <div className="min-cta-content">
                <h2 className="min-cta-title">Have a property goal in mind?</h2>
                <p className="min-cta-sub">Tell us what you're looking for. We'll help you explore the possibilities.</p>
              </div>
              <button className="min-cta-btn" onClick={() => setModalOpen(true)}>
                TALK TO US →
              </button>
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
