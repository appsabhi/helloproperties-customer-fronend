import React from 'react';
import './GlobalLoader.css';
import logoStatic from '../assets/png/HelloProperties_static.png';

const GlobalLoader = () => {
  return (
    <div className="hp-global-loader">
      <div className="hp-loader-brand">
        <img src={logoStatic} alt="HelloProperties Loading" className="hp-loader-logo" />
        <div className="hp-loader-spinner-wrap">
          <div className="hp-loader-circle"></div>
          <div className="hp-loader-circle-spin"></div>
        </div>
        <div className="hp-loader-text">Loading Experience...</div>
      </div>
    </div>
  );
};

export default GlobalLoader;
