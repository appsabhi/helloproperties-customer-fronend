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
            <button className="mnzil-hero-cta-button" onClick={() => navigate('/explore')}>
              <span className="cta-text">Discover on Map</span>
              <span className="cta-svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="20"
                  viewBox="0 0 38 15"
                  fill="none"
                >
                  <path
                    fill="#7A0B2E"
                    d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>

      </div>
      <div className="mnzil-category-carousel">
        <motion.div
          className="mnzil-category-reveal"
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
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




