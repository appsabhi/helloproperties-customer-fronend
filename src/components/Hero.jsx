import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, animate, useMotionValue, useTransform, useReducedMotion, color } from "framer-motion";
import { propertyCategories } from "./propertyCategories";
import { useCustomerProperties } from "../context/CustomerPropertyContext";
import "./Hero.css";
import { MorphIcon } from "morphicons/react";
import { svgToIcon } from "morphicons/adapters";

const mapPinSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';
const MapPinIcon = svgToIcon(mapPinSvg);

import heroBgImg from "../assets/png/hero_new.jpg";
import heroMobileBgImg from "../assets/png/hero_new_mobile.jpg";
import heroLineOne from "../assets/png/hero_line_curve_one.png";
import heroLineTwo from "../assets/png/hero_line_curve_two.png";
import brushStroke from "../assets/png/Golden orange brush stroke.png";

const MotionLink = motion.create(Link);

function CurvedCategoryCard({ category, index, scrollX, cardStep, visibleCards }) {
  const [imgLoaded, setImgLoaded] = useState(false);
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
    <motion.div className="mnzil-category-slot" style={{ x, opacity, visibility, willChange: 'transform, opacity' }}>
      <MotionLink className="mnzil-hero-category" to={category.path} style={{ rotate, y, willChange: 'transform' }}>
        {!imgLoaded && <div className="mnzil-card-skeleton"></div>}
        <img 
          src={category.img} 
          alt="" 
          width="220" 
          height="330" 
          onLoad={() => setImgLoaded(true)}
          style={{ opacity: imgLoaded ? 1 : 0 }}
        />
        <span>{category.title}</span>
      </MotionLink>
    </motion.div>
  );
}

const TypingFadeText = ({ text, delay = 0, className = "", style = {} }) => {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <span className={className} style={style}>{text}</span>;
  const characters = text.split("");

  return (
    <span className={className} style={style}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={reduceMotion ? false : { opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.4, delay: delay + index * 0.03, ease: "easeOut" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};
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
    if (!gallery) return;

    const measure = () => {
      const styles = getComputedStyle(gallery);
      const pLeft = parseFloat(styles.paddingLeft) || 0;
      const pRight = parseFloat(styles.paddingRight) || 0;
      const cGap = parseFloat(styles.columnGap) || 0;
      const contentWidth = gallery.clientWidth - pLeft - pRight;
      const columns = Number(styles.getPropertyValue("--visible-cards")) || 4;
      setVisibleCards(columns);
      const step = (contentWidth + cGap) / columns;
      setCardStep(step || 230);
    };
    
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(gallery);
    return () => observer.disconnect();
  }, []);


  return (
    <section className="mnzil-hero" style={{ backgroundColor: "#ffffff" }}>
      <motion.img 
        src={heroLineTwo} 
        alt="" 
        className="hero-curve-right"
        initial={reduceMotion ? false : { clipPath: "circle(0% at 100% 0%)", opacity: 0 }}
        animate={{ clipPath: "circle(150% at 100% 0%)", opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.2, ease: "easeInOut" }}
      />
      <motion.img 
        src={heroLineOne} 
        alt="" 
        className="hero-curve-left"
        initial={reduceMotion ? false : { clipPath: "circle(0% at 0% 100%)", opacity: 0 }}
        animate={{ clipPath: "circle(150% at 0% 100%)", opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.6, ease: "easeInOut" }}
      />

      <div className="mnzil-hero-container hp-container">
        {/* Charcoal Typography Headline */}
        <div className="mnzil-hero-content">
          <div className="mnzil-hero-title-container">
            <h1 className="mnzil-hero-title">
              <TypingFadeText text="Your Property" delay={0.2} />
              <br/>
              <TypingFadeText text="Your Possibilities" delay={0.9} className="mnzil-title-italic" />
            </h1>
          </div>
            <motion.button 
              className="mnzil-hero-cta-button" 
              onClick={() => navigate('/explore')}
              initial={reduceMotion ? false : { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
              transition={{ duration: 1, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="cta-text">Discover on Map</span>
              <div className="cta-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="cta-arrow">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </motion.button>
          <h2 className="mnzil-hero-subtitle-styled" style={{ position: 'relative' }}>
            <TypingFadeText text="Explore " delay={1.6} className="light" />
            <TypingFadeText text="homes and spaces, " delay={1.84} className="bold" style={{color: "rgb(194 78 100 / 81%)"}} />
            <br/>
            <TypingFadeText text="that fit your " delay={2.38} className="bold" />
            <TypingFadeText text="vision " delay={2.8} className="light" />
            <TypingFadeText text="and lifestyle " delay={3.01} className="bold" />
            <br/>
            <TypingFadeText text="and budget " delay={3.43} className="accent" />
            <TypingFadeText text="with Hello Properties" delay={3.76} className="bold" />
            
            <motion.img 
              src={brushStroke} 
              alt="" 
              className="subtitle-brush-stroke"
              initial={reduceMotion ? false : { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 0.9 }}
              transition={{ duration: 1, delay: 3.7, ease: "easeOut" }}
            />
          </h2>

          <div className="mnzil-hero-cta-wrapper" style={{ marginTop: '2rem' }}>
          
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
