import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, animate, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { propertyCategories } from "./propertyCategories";
import { useCustomerProperties } from "../context/CustomerPropertyContext";
import "./Hero.css";
import { MorphIcon } from "morphicons/react";
import { svgToIcon } from "morphicons/adapters";

const mapPinSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';
const MapPinIcon = svgToIcon(mapPinSvg);

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

          <div className="mnzil-hero-cta-wrapper" style={{ marginTop: '2rem' }}>
            <button className="mnzil-hero-cta-button" onClick={() => navigate('/explore')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MorphIcon icon={MapPinIcon} size={20} />
              Discover on Map
            </button>
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




