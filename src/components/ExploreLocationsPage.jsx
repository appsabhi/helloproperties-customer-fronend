import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useCustomerProperties } from "../context/CustomerPropertyContext";
import { formatPropertyPrice } from "../services/propertyService";
import "./ExploreLocationsPage.css";
import brandLogo from "../assets/png/helloproperties_fav.png";

// Fix Leaflet's default icon path issues in React
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map view updates
function MapUpdater({ center, zoom, bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [100, 100], maxZoom: 14 });
    }
  }, [bounds, map]);

  useEffect(() => {
    if (center && !bounds) {
      map.flyTo(center, zoom, { duration: 2.5 });
    }
  }, [center, zoom, bounds, map]);
  return null;
}

const ExploreLocationsPage = () => {
  const { properties, loading } = useCustomerProperties();
  const [hoveredProperty, setHoveredProperty] = useState(null);
  const [mapCenter, setMapCenter] = useState([10.8505, 76.2711]); // Kerala Default
  const [mapZoom, setMapZoom] = useState(7);
  const [mapBounds, setMapBounds] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    document.title = "Explore | HelloProperties";
    const searchParams = new URLSearchParams(location.search);
    const qParam = searchParams.get("q");
    if (qParam) {
      setSearchQuery(qParam);
    }
  }, [location.search]);

  // Filter properties by search query
  const filteredProperties = properties.filter((p) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleMatch = (p.title || "").toLowerCase().includes(q);
      const locMatch = (p.location || "").toLowerCase().includes(q);
      const distMatch = (p.district || "").toLowerCase().includes(q);
      return titleMatch || locMatch || distMatch;
    }
    return true;
  });

  const handleCardHover = (prop) => {
    setHoveredProperty(prop);
  };

  const handleCardClick = (prop) => {
    setHoveredProperty(prop);
    setSelectedProperty(prop);
    if (prop.lat && prop.lng) {
      setMapBounds(null);
      setMapCenter([prop.lat, prop.lng]);
      setMapZoom(18); // Zoom 18 is the safest max for satellite maps in rural areas
    }
  };

  const resetMap = () => {
    setHoveredProperty(null);
    setSelectedProperty(null);
    if (filteredProperties.length > 0) {
      const lats = filteredProperties.map(p => p.lat).filter(Boolean);
      const lngs = filteredProperties.map(p => p.lng).filter(Boolean);
      if (lats.length > 0 && lngs.length > 0) {
        setMapBounds([
          [Math.min(...lats), Math.min(...lngs)],
          [Math.max(...lats), Math.max(...lngs)]
        ]);
      }
    }
  };

  useEffect(() => {
    resetMap();
  }, [searchQuery, properties]);

  return (
    <div className="explore-page-root">
      
      {/* Background Full Screen Map */}
      <div className="explore-map-container">
        <MapContainer center={mapCenter} zoom={mapZoom} className="explore-leaflet-map" zoomControl={false}>
          <TileLayer
            attribution='Map Data &copy;2026 GeoBasis-DE/BKG (&copy;2009), Google Imagery &copy;2026 NASA | Terms'
            url="http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}"
            maxZoom={18}
          />
          <MapUpdater center={mapCenter} zoom={mapZoom} bounds={mapBounds} />
          
          {filteredProperties.map((prop) => {
            if (prop.lat && prop.lng) {
              const isSelected = selectedProperty?.id === prop.id;
              const isHovered = hoveredProperty?.id === prop.id;
              
              // Only render the marker if the property is selected or hovered
              if (!isSelected && !isHovered) return null;
              
              // Custom marker HTML (Pin only, no background)
              const priceMarkerHtml = `
                <div style="display: flex; justify-content: center; align-items: center; width: 40px; height: 40px;">
                  <svg viewBox="0 0 24 24" width="36" height="36" style="filter: drop-shadow(0px 3px 5px rgba(0,0,0,0.4)); transition: transform 0.2s; transform: scale(${isSelected || isHovered ? 1.2 : 1});">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#C71E51" stroke="#ffffff" stroke-width="1.5"></path>
                    <circle cx="12" cy="10" r="4" fill="#ffffff" stroke="none"></circle>
                  </svg>
                </div>
              `;
              
              const customIcon = L.divIcon({
                html: priceMarkerHtml,
                className: 'custom-transparent-icon', // Avoid inheriting any global marker backgrounds
                iconSize: [40, 40],
                iconAnchor: [20, 40]
              });

              return (
                  <Marker 
                    key={prop.id} 
                    position={[prop.lat, prop.lng]} 
                    icon={customIcon}
                    eventHandlers={{
                      click: () => handleCardClick(prop),
                      mouseover: () => handleCardHover(prop)
                    }}
                  />
              );
            }
            return null;
          })}
        </MapContainer>
        
        {/* Floating Button over Map */}
        <button className="map-request-btn">Request Unit</button>
      </div>

      {/* Floating UI Blur Backdrop */}
      <div className="panel-blur-backdrop"></div>

      {/* Floating UI Panel */}
      <div className="floating-panel">
        
        {/* Left Action Bar */}
        <div className="action-bar">
          <div className="brand-icon" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
            <img src={brandLogo} alt="Logo" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
          </div>
          <div className="action-bar-spacer"></div>
        </div>

        {/* Main Panel Content */}
        <div className="panel-content">
          {selectedProperty ? (
            <div className="details-view-container">
              
              {/* Breadcrumb Header */}
              <div className="details-breadcrumb">
                <span className="back-link" onClick={() => setSelectedProperty(null)}>Properties</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                <span className="current">{selectedProperty.title}</span>
              </div>
              
              {/* Title & Price */}
              <div className="details-header-info">
                <h2 className="details-title">{selectedProperty.title}</h2>
                <div className="details-price-row">
                  Price <strong>{selectedProperty.priceFormatted ? selectedProperty.priceFormatted : selectedProperty.price}</strong>
                </div>
                <div className="details-location-row">
                  {selectedProperty.location}{selectedProperty.district ? `, ${selectedProperty.district}` : ''}
                </div>
              </div>

              {/* Main Property Image */}
              {selectedProperty.imageUrl && (
                <div style={{ flexShrink: 0, margin: '20px 24px', borderRadius: '16px', overflow: 'hidden', height: '240px', minHeight: '240px', position: 'relative', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0' }}>
                  <img src={selectedProperty.imageUrl} alt={selectedProperty.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  {selectedProperty.videoUrl && (
                    <a href={selectedProperty.videoUrl} target="_blank" rel="noopener noreferrer" style={{position: 'absolute', bottom: '16px', right: '16px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', color: 'white', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', fontWeight: 500}}>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg> Watch Video
                    </a>
                  )}
                </div>
              )}

              {/* Amenities */}
              <div className="details-amenities">
                {selectedProperty.bedrooms && (
                  <div className="amenity-pill">🚪 {selectedProperty.bedrooms} Rooms</div>
                )}
                {selectedProperty.bathrooms && (
                  <div className="amenity-pill">🚿 {selectedProperty.bathrooms} Bathrooms</div>
                )}
              </div>

              <h3 className="details-section-title">Property Overview</h3>

              <div className="details-card-group">
                
                {/* Description Card */}
                <div className="details-card">
                  <div className="dc-row" style={{borderBottom: 'none', paddingBottom: 0, marginBottom: 0}}>
                    <div className="dc-icon" style={{background:'#f8fafc', color:'#0f172a'}}>📝</div>
                    <div className="dc-content">
                      <div className="dc-title">About this property</div>
                      <div className="dc-desc" style={{marginTop: '12px', lineHeight: '1.6'}}>
                        {selectedProperty.description ? selectedProperty.description : "An excellent real estate opportunity located in a prime area. Contact our agents for a detailed brochure and viewing arrangements."}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specifications Card */}
                <div className="details-card">
                  <div className="dc-row" style={{paddingBottom: '16px'}}>
                    <div className="dc-icon" style={{background:'#f8fafc', color:'#0f172a'}}>📋</div>
                    <div className="dc-content">
                      <div className="dc-title">Specifications</div>
                      <div className="dc-desc">Complete details and property metrics.</div>
                    </div>
                  </div>
                  
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>

                    {selectedProperty.propertyType && (
                      <div>
                        <div style={{fontSize: '12px', color: '#64748b', marginBottom: '4px'}}>Property Type</div>
                        <div style={{fontSize: '14px', fontWeight: '600', color: '#0f172a'}}>{selectedProperty.propertyType}</div>
                      </div>
                    )}
                    {selectedProperty.listingType && (
                      <div>
                        <div style={{fontSize: '12px', color: '#64748b', marginBottom: '4px'}}>Listing Type</div>
                        <div style={{fontSize: '14px', fontWeight: '600', color: '#0f172a'}}>{selectedProperty.listingType === "Rent" ? "For Rent" : "For Sale"}</div>
                      </div>
                    )}
                    {selectedProperty.landArea && (
                      <div>
                        <div style={{fontSize: '12px', color: '#64748b', marginBottom: '4px'}}>Land Area</div>
                        <div style={{fontSize: '14px', fontWeight: '600', color: '#0f172a'}}>{selectedProperty.landArea}</div>
                      </div>
                    )}
                    {selectedProperty.builtUpArea && (
                      <div>
                        <div style={{fontSize: '12px', color: '#64748b', marginBottom: '4px'}}>Built-up Area</div>
                        <div style={{fontSize: '14px', fontWeight: '600', color: '#0f172a'}}>{selectedProperty.builtUpArea}</div>
                      </div>
                    )}
                    {selectedProperty.bedrooms && (
                      <div>
                        <div style={{fontSize: '12px', color: '#64748b', marginBottom: '4px'}}>Bedrooms</div>
                        <div style={{fontSize: '14px', fontWeight: '600', color: '#0f172a'}}>{selectedProperty.bedrooms} Beds</div>
                      </div>
                    )}
                    {selectedProperty.bathrooms && (
                      <div>
                        <div style={{fontSize: '12px', color: '#64748b', marginBottom: '4px'}}>Bathrooms</div>
                        <div style={{fontSize: '14px', fontWeight: '600', color: '#0f172a'}}>{selectedProperty.bathrooms} Baths</div>
                      </div>
                    )}
                    {selectedProperty.status && (
                      <div>
                        <div style={{fontSize: '12px', color: '#64748b', marginBottom: '4px'}}>Status</div>
                        <div style={{fontSize: '14px', fontWeight: '600', color: '#0f172a'}}>{selectedProperty.status}</div>
                      </div>
                    )}
                    {selectedProperty.createdAt && (
                      <div>
                        <div style={{fontSize: '12px', color: '#64748b', marginBottom: '4px'}}>Listed On</div>
                        <div style={{fontSize: '14px', fontWeight: '600', color: '#0f172a'}}>
                          {new Date(selectedProperty.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                    {selectedProperty.securityDeposit > 0 && (
                      <div>
                        <div style={{fontSize: '12px', color: '#64748b', marginBottom: '4px'}}>Security Deposit</div>
                        <div style={{fontSize: '14px', fontWeight: '600', color: '#0f172a'}}>
                          ₹{selectedProperty.securityDeposit.toLocaleString('en-IN')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Action Card */}
              <div className="summary-card">
                <div className="summary-total">
                  <div>Price</div>
                  <div>{selectedProperty.priceFormatted ? selectedProperty.priceFormatted : selectedProperty.price}</div>
                </div>

                <button className="checkout-btn" onClick={() => navigate('/contact')}>Contact Agent</button>
              </div>

            </div>
          ) : (
            <>
              <div className="panel-header">
                <div className="search-pills">
                  <div className="pill">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    Properties in map area
                  </div>
                  <div className="pill active">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    Available Now
                  </div>
                  <div className="pill active">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    Any size
                  </div>
                </div>
                <div className="divider-line"></div>
              </div>
              
              <div className="results-count">{filteredProperties.length} properties matching</div>

              <div className="property-list">
                {loading ? (
                  <div style={{textAlign: 'center', padding: '40px', color: '#64748b'}}>Loading properties...</div>
                ) : filteredProperties.length > 0 ? (
                  filteredProperties.map((prop) => (
                    <div 
                      className="horizontal-card" 
                      key={prop.id}
                      onMouseEnter={() => handleCardHover(prop)}
                      onClick={() => handleCardClick(prop)}
                      style={{ opacity: hoveredProperty?.id === prop.id ? 1 : 0.7 }}
                    >
                      <div className="hc-img-wrapper">
                        {prop.imageUrl ? (
                          <img src={prop.imageUrl} alt={prop.title} className="hc-img" loading="lazy" />
                        ) : (
                          <div className="hc-img" style={{backgroundColor: '#e2e8f0'}} />
                        )}
                      </div>
                      
                      <div className="hc-details">
                        <div className="hc-title">{prop.title}</div>
                        <div className="hc-location">{prop.location || "Kerala"}{prop.district ? `, ${prop.district}` : ""}</div>
                        
                        <div className="hc-price">
                          {prop.priceFormatted || formatPropertyPrice(prop.price, prop.listingType)}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{textAlign: 'center', padding: '40px', color: '#64748b'}}>No properties found.</div>
                )}
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default ExploreLocationsPage;

