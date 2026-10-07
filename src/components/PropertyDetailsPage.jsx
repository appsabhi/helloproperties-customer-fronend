import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCustomerProperties } from "../context/CustomerPropertyContext";
import Header from "./Header";
import Footer from "./Footer";
import GetInTouchModal from "./GetInTouchModal";
import "./PropertyDetailsPage.css";

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, loading } = useCustomerProperties();
  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [touchModalOpen, setTouchModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!loading && properties.length > 0) {
      const found = properties.find((p) => String(p.id) === String(id) || String(p.propertyId) === String(id));
      if (found) {
        setProperty(found);
        setActiveImage(found.imageUrl || "");
        document.title = `${found.title} | HelloProperties Kerala`;
      } else {
        // Handle not found
        navigate("/properties");
      }
    }
  }, [id, properties, loading, navigate]);

  if (loading || !property) {
    return (
      <div className="prop-detail-loader">
        <div className="spinner"></div>
      </div>
    );
  }

  // Formatting location
  const locArr = [property.location, property.district, property.state].filter(Boolean);
  const formattedLocation = locArr.join(", ");

  // Specifications
  const specs = [
    { label: "Configuration", value: property.bedrooms ? `${property.bedrooms} BHK` : null },
    { label: "Bathrooms", value: property.bathrooms },
    { label: "Property Type", value: property.propertyType },
    { label: "Listing Type", value: property.listingType },
    { label: "Status", value: property.status },
    { label: "Land Area", value: property.landArea },
    { label: "Built-up Area", value: property.builtUpArea ? (String(property.builtUpArea).toLowerCase().includes("sq") ? property.builtUpArea : `${property.builtUpArea} sq ft`) : null },
    { label: "Price", value: property.priceFormatted },
  ].filter(s => s.value && s.value !== "");

  return (
    <div className="prop-detail-root">
      <Header />
      
      <main className="prop-detail-main">
        {/* Title Area */}
        <section className="prop-detail-header">
          <div className="hp-container">
            <button className="back-btn" onClick={() => navigate(-1)}>
              ← Back to Properties
            </button>
            <div className="prop-header-content">
              <div className="prop-header-left">
                <h1 className="prop-title">{property.title}</h1>
                <p className="prop-location">📍 {formattedLocation}</p>
              </div>
              <div className="prop-header-right">
                <div className="prop-price">{property.priceFormatted}</div>
                <div className="prop-meta-badges">
                  <span className="prop-badge highlight">{property.listingType === "Rent" ? "For Rent" : "For Sale"}</span>
                  {property.status && property.status !== "Available" && (
                    <span className="prop-badge status">{property.status}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Area */}
        <section className="prop-gallery-section">
          <div className="hp-container">
            <div className={`prop-gallery-grid ${property.images && property.images.length > 1 ? 'multi-photo' : 'single-photo'}`}>
              <div className="main-image-wrap">
                {property.images && property.images.length > 0 ? (
                  <>
                    <img src={property.images[0]} alt={property.title} className="main-image" />
                    {property.images.length > 1 && (
                      <button 
                        className="photo-count-badge" 
                        onClick={() => {
                          setCurrentGalleryIndex(0);
                          setIsGalleryOpen(true);
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        <span>{property.images.length} photos</span>
                      </button>
                    )}
                  </>
                ) : (
                  <div className="no-image-fallback">No image available</div>
                )}
              </div>
              
              {property.images && property.images.length > 1 && (
                <>
                  {property.images.slice(1, 5).map((img, idx) => (
                    <div 
                      key={idx} 
                      className="side-image-wrap"
                      onClick={() => {
                        setCurrentGalleryIndex(idx + 1);
                        setIsGalleryOpen(true);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <img src={img} alt={`View ${idx + 2}`} loading="lazy" />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </section>

        {/* Main Content Split */}
        <section className="prop-content-section">
          <div className="hp-container">
            <div className="prop-content-grid">
              
              {/* Left Column: Details */}
              <div className="prop-details-col">
                
                {/* About Section */}
                {property.description && (
                  <div className="detail-block">
                    <h2>About this Property</h2>
                    <div className="detail-description">
                      {property.description.split('\n').map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Property Details */}
                {specs.length > 0 && (
                  <div className="detail-block">
                    <h2>Property Details</h2>
                    <div className="specs-grid">
                      {specs.map((spec, i) => (
                        <div key={i} className="spec-item">
                          <span className="spec-label">{spec.label}</span>
                          <span className="spec-value">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Video Link */}
                {property.videoUrl && (
                  <div className="detail-block">
                    <h2>Property Tour</h2>
                    <a href={property.videoUrl} target="_blank" rel="noopener noreferrer" className="video-link-btn">
                      ▶ Watch Video Tour
                    </a>
                  </div>
                )}


              </div>

              {/* Right Column: Enquiry CTA */}
              <div className="prop-sidebar-col">
                <div className="enquiry-card sticky">
                  <h3>Interested in this property?</h3>
                  <p>Talk to our advisory team to understand this property and explore the next steps.</p>
                  
                  <div className="enquiry-contacts">
                    <div className="e-contact">
                      <span>Advisory Desk</span>
                      <strong>+91 79078 98072</strong>
                    </div>
                    <div className="e-contact">
                      <span>Email</span>
                      <strong>advisory@helloproperties.in</strong>
                    </div>
                  </div>

                  <button className="consultancy-btn" onClick={() => setTouchModalOpen(true)}>
                    TALK TO A CONSULTANT
                  </button>
                </div>
              </div>

            </div>

            {/* Location Map (Coordinates) - Full Width */}
            {property.lat && property.lng && (
              <div className="detail-block full-width-map">
                <h2>Location & Connectivity</h2>
                <div className="map-container">
                  <iframe
                    title="Property Location"
                    width="100%"
                    height="450"
                    style={{ border: 0, borderRadius: "12px" }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=${property.lat},${property.lng}&hl=es;z=14&output=embed`}
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Fullscreen Photo Gallery Modal */}
      {isGalleryOpen && property.images && property.images.length > 0 && (
        <div className="arch-photo-modal-overlay">
          <div className="arch-photo-modal-header">
            <span>{currentGalleryIndex + 1} / {property.images.length}</span>
            <button className="arch-photo-modal-close" onClick={() => setIsGalleryOpen(false)}>×</button>
          </div>
          
          <div className="arch-photo-modal-body">
            <button 
              className="arch-photo-nav-btn left" 
              onClick={() => setCurrentGalleryIndex(prev => (prev === 0 ? property.images.length - 1 : prev - 1))}
            >
              ←
            </button>
            
            <img 
              src={property.images[currentGalleryIndex]} 
              alt={`Gallery view ${currentGalleryIndex + 1}`} 
              className="arch-photo-modal-main-img" 
            />
            
            <button 
              className="arch-photo-nav-btn right" 
              onClick={() => setCurrentGalleryIndex(prev => (prev === property.images.length - 1 ? 0 : prev + 1))}
            >
              →
            </button>
          </div>
          
          <div className="arch-photo-modal-thumbs">
            {property.images.map((img, idx) => (
              <div 
                key={idx} 
                className={`arch-photo-modal-thumb ${idx === currentGalleryIndex ? 'active' : ''}`}
                onClick={() => setCurrentGalleryIndex(idx)}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer />
      <GetInTouchModal isOpen={touchModalOpen} onClose={() => setTouchModalOpen(false)} />
    </div>
  );
};

export default PropertyDetailsPage;
