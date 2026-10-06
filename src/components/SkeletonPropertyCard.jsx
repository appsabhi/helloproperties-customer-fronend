import React from 'react';
import './SkeletonPropertyCard.css';

export const SkeletonPropertyCard = () => {
  return (
    <article className="skeleton-card">
      <div className="skeleton-img-frame skeleton-shimmer"></div>
      <div className="skeleton-body">
        <div className="skeleton-location skeleton-shimmer"></div>
        <div className="skeleton-title skeleton-shimmer"></div>
        
        <div className="skeleton-specs-row">
          <div className="skeleton-spec skeleton-shimmer"></div>
          <div className="skeleton-spec skeleton-shimmer"></div>
          <div className="skeleton-spec skeleton-shimmer"></div>
        </div>
        
        <div className="skeleton-footer">
          <div className="skeleton-price skeleton-shimmer"></div>
          {/* <div className="skeleton-btn skeleton-shimmer"></div> */}
        </div>
      </div>
    </article>
  );
};

export const SkeletonListItem = () => {
  return (
    <div className="skeleton-list-item">
      <div className="skeleton-list-img skeleton-shimmer"></div>
      <div className="skeleton-list-details">
        <div className="skeleton-list-title skeleton-shimmer"></div>
        <div className="skeleton-list-loc skeleton-shimmer"></div>
        <div className="skeleton-list-price skeleton-shimmer"></div>
      </div>
    </div>
  );
};
