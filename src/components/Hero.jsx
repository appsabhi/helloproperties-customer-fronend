import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, animate, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { propertyCategories } from "./propertyCategories";
import { useCustomerProperties } from "../context/CustomerPropertyContext";
import "./Hero.css";

import heroBgImg from "../assets/png/hero_new.jpg";
import heroMobileBgImg from "../assets/png/hero_new_mobile.jpg";

const MotionLink = motion.create(Link);

function CurvedCategoryCard({ category, index, scrollX, cardStep, visibleCards }) {
  const reduceMotion = useReducedMotion();
  const center = (visibleCards - 1) / 2;
  const edge = visibleCards / 2;
  // Recycle cards beyond either end of the arc, where they are no longer visible.
  const position = useTransform(scrollX, (value) => {
    const count = propertyCategories.length;
    const offset = index - value / cardStep + 2;
    return ((offset % count) + count) % count - 2 - center;
  });
  const x = useTransform(position, (value) => (value + center - index) * cardStep);
  const opacity = useTransform(position, [-edge, -center, center, edge], [0, 1, 1, 0]);
  const visibility = useTransform(position, (value) => Math.abs(value) >= edge ? "hidden" : "visible");
  const rotate = useTransform(position, (value) => reduceMotion ? 0 : Math.max(-45, Math.min(45, value * (visibleCards === 2 ? 10 : 16))));
  const y = useTransform(position, (value) => reduceMotion ? 0 : (Math.min(9, value * value) - 0.25) * Math.min(27, cardStep * 0.12));

  return (
    <motion.div className="mnzil-category-slot" style={{ x, opacity, visibility }}>
      <MotionLink className="mnzil-hero-category" to={category.path} style={{ rotate, y }}>
        <img src={category.img} alt="" width="220" height="330" />
        <span>{category.title}</span>
      </MotionLink>
    </motion.div>
  );
}

const Hero = () => {
  const navigate = useNavigate();
  const { properties } = useCustomerProperties();


  const searchRef = useRef(null);
  const categoryScrollRef = useRef(null);
  const [cardStep, setCardStep] = useState(230);
  const [visibleCards, setVisibleCards] = useState(4);
  const cardOffset = useMotionValue(0);
  const targetCard = useRef(0);
  const reduceMotion = useReducedMotion();
  const scrollX = useTransform(cardOffset, (offset) => offset * cardStep);

  const slideCategories = (direction) => {
    targetCard.current += direction;
    cardOffset.stop();
    animate(cardOffset, targetCard.current, {
      duration: reduceMotion ? 0 : 0.5,
      ease: [0.22, 1, 0.36, 1],
    });
  };

  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;

    if (deltaX > 50) {
      slideCategories(1); // Swipe left -> Next
    } else if (deltaX < -50) {
      slideCategories(-1); // Swipe right -> Prev
    }
    touchStartX.current = null;
  };

  useEffect(() => () => cardOffset.stop(), [cardOffset]);

  useEffect(() => {
    const gallery = categoryScrollRef.current;
    const measure = () => {
      const styles = getComputedStyle(gallery);
      const contentWidth = gallery.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
      const columns = Number(styles.getPropertyValue("--visible-cards")) || 4;
      setVisibleCards(columns);
      setCardStep((contentWidth + parseFloat(styles.columnGap)) / columns);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(gallery);
    return () => observer.disconnect();
  }, []);


  return (
    <section className="mnzil-hero" style={{ "--hero-desktop-image": `url(${heroBgImg})`, "--hero-mobile-image": `url(${heroMobileBgImg})` }}>

      <div className="mnzil-hero-container hp-container">
        {/* Charcoal Typography Headline */}
        <div className="mnzil-hero-content">
          <h1 className="mnzil-hero-title">
        Find with confidence.<br/><span className="mnzil-title-italic"><span style={{ color: 'rgb(255, 90, 134)' }}>Invest</span> with clarity.</span>
          </h1>

          <div className="mnzil-hero-search-wrapper" ref={searchRef} onClick={() => navigate('/explore')} style={{ cursor: 'pointer' }}>
            <div className="mnzil-hero-search-bar">
              <div className="mnzil-search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <input 
                type="text" 
                placeholder="Search by city, area, or locality" 
                className="mnzil-search-input"
                readOnly
                style={{ cursor: 'pointer' }}
              />
              <button type="button" className="mnzil-search-btn" aria-label="Search properties">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>
            </div>
          </div>
        </div>

      </div>
      <div className="mnzil-category-carousel">
        <motion.div
          className="mnzil-category-reveal"
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: reduceMotion ? 0 : 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
        <nav 
          className="mnzil-hero-categories" 
          id="hero-property-types" 
          aria-label="Browse property types" 
          ref={categoryScrollRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {propertyCategories.map((category, index) => (
            <CurvedCategoryCard key={category.id} category={category} index={index} scrollX={scrollX} cardStep={cardStep} visibleCards={visibleCards} />
          ))}
        </nav>
        <button className="mnzil-category-arrow mnzil-category-arrow-prev" type="button" onClick={() => slideCategories(-1)} aria-label="Previous property types" aria-controls="hero-property-types">
          <span aria-hidden="true">&#8249;</span>
        </button>
        <button className="mnzil-category-arrow mnzil-category-arrow-next" type="button" onClick={() => slideCategories(1)} aria-label="Next property types" aria-controls="hero-property-types">
          <span aria-hidden="true">&#8250;</span>
        </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;




