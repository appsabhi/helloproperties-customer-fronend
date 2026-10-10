import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./ImpactOnGround.css";

import findRightMatchImg from "../assets/find-right-match.webp";
import propertyOptionsImg from "../assets/property-options.webp";
import personalizedAssistanceImg from "../assets/personalized-assistance.webp";
import preferredAreaImg from "../assets/preferred-area.webp";

// Component that animates each letter falling down from the top
const FallingLetters = ({ text, delay = 0, className = "" }) => {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <span className={className}>{text}</span>;
  const words = text.split(" ");
  let globalCharIndex = 0;

  return (
    <span className={`letter-fall-container ${className}`} style={{ display: "inline-block" }}>
      {words.map((word, wordIdx) => {
        const letters = word.split("");
        const startIdx = globalCharIndex;
        globalCharIndex += letters.length + 1;

        return (
          <span 
            key={wordIdx} 
            className="letter-fall-word"
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {letters.map((char, charIdx) => (
              <motion.span
                key={charIdx}
                className="letter-fall-char"
                style={{ display: "inline-block" }}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -25, filter: "blur(2px)" }}
                whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: delay + (startIdx + charIdx) * 0.025,
                  ease: [0.34, 1.4, 0.64, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
            {wordIdx < words.length - 1 && (
              <span className="letter-fall-space" style={{ display: "inline-block" }}>&nbsp;</span>
            )}
          </span>
        );
      })}
    </span>
  );
};

const impactItems = [
  {
    id: 1,
    num: "01",
    title: "Find the Right Match",
    description: "Find properties that suit your budget, location, and needs.",
    image: findRightMatchImg,
    rotate: "-2deg",
    sheetRotate1: "2.5deg",
    sheetRotate2: "-3.5deg",
  },
  {
    id: 2,
    num: "02",
    title: "Property Options That Fit",
    description: "Explore houses, apartments, and land to find your ideal property.",
    image: propertyOptionsImg,
    rotate: "2deg",
    sheetRotate1: "-2.8deg",
    sheetRotate2: "3deg",
  },
  {
    id: 3,
    num: "03",
    title: "Personalized Assistance",
    description: "Get guidance to make your property search easier.",
    image: personalizedAssistanceImg,
    rotate: "-1.8deg",
    sheetRotate1: "2.8deg",
    sheetRotate2: "-2.5deg",
  },
  {
    id: 4,
    num: "04",
    title: "Explore Your Preferred Area",
    description: "Discover properties in locations that matter to you.",
    image: preferredAreaImg,
    rotate: "2.2deg",
    sheetRotate1: "-2.2deg",
    sheetRotate2: "3.5deg",
  },
];

const ImpactOnGround = () => {
  return (
    <section className="impact-ground-section">
      <div className="impact-ground-container">
        {/* Header */}
        <motion.div 
          className="impact-ground-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="impact-pill-badge">THE SIMPLE WAY</div>
          <h2 className="impact-ground-title">
            <span className="impact-title-light">Real Estate,</span>{" "}
            <span className="impact-title-bold">Simplified</span>
          </h2>
        </motion.div>

        {/* Stacked Sticky Deck - Cards layer one over another on scroll */}
        <div className="impact-stack-deck">
          {impactItems.map((item, index) => (
            <div
              key={item.id}
              className="impact-stack-slot"
              style={{
                top: `calc(var(--impact-deck-top, 110px) + ${index} * var(--impact-deck-gap, 22px))`,
                zIndex: index + 1,
              }}
            >
              <div 
                className="impact-note-wrapper"
                style={{ "--note-rotate": item.rotate }}
              >
                {/* Layered paper sheets behind in light burgundy tints */}
                <div 
                  className="impact-sheet-layer impact-sheet-layer-2" 
                  style={{ transform: `rotate(${item.sheetRotate2})` }}
                />
                <div 
                  className="impact-sheet-layer impact-sheet-layer-1" 
                  style={{ transform: `rotate(${item.sheetRotate1})` }}
                />

                {/* Main Card in Light Burgundy */}
                <div className="impact-note-card">
                  {/* Burgundy Pin Dot */}
                  <div className="impact-pin-dot" />

                  <div className="impact-note-num">{item.num}</div>

                  <h3 className="impact-item-heading">
                    <FallingLetters text={item.title} delay={0.15} />
                  </h3>

                  <p className="impact-item-description">
                    {item.description}
                  </p>

                  {/* Overlapping 3D Asset on bottom-left */}
                  <div className="impact-note-asset">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="impact-note-asset-img" 
                      loading="lazy" 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactOnGround;
