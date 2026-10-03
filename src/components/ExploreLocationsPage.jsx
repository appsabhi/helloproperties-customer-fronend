import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useCustomerProperties } from "../context/CustomerPropertyContext";
import { formatPropertyPrice } from "../services/propertyService";
import logoStatic from "../assets/png/HelloProperties_static.png";
import "./ExploreLocationsPage.css";

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = { lat: 10.8505, lng: 76.2711 }; // Kerala Default

const ExploreLocationsPage = () => {
  const { properties, loading } = useCustomerProperties();
  const [hoveredProperty, setHoveredProperty] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [listingTypeFilter, setListingTypeFilter] = useState("All");

  const [selectedProperty, setSelectedProperty] = useState(null);

  const mapRef = useRef(null);
  const zoomOutIntervalRef = useRef(null);
  const zoomInIntervalRef = useRef(null);
  const zoomTimeoutRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""
  });

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
    // Fit bounds on initial load if we have properties
    if (properties && properties.length > 0) {
      applyBounds(map);
    }
  }, [properties]);

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = null;
  }, []);

  useEffect(() => {
    document.title = "Explore | HelloProperties";
    const searchParams = new URLSearchParams(location.search);
    const qParam = searchParams.get("q");
    if (qParam) {
      setSearchQuery(qParam);
    }
  }, [location.search]);

  // Filter properties by search query and listing type
  const filteredProperties = properties.filter((p) => {
    let matchesSearch = true;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleMatch = (p.title || "").toLowerCase().includes(q);
      const locMatch = (p.location || "").toLowerCase().includes(q);
      const distMatch = (p.district || "").toLowerCase().includes(q);
      matchesSearch = titleMatch || locMatch || distMatch;
    }
    
    let matchesListingType = true;
    if (listingTypeFilter !== "All") {
      matchesListingType = p.listingType === listingTypeFilter;
    }

    return matchesSearch && matchesListingType;
  });

  const applyBounds = (mapInstance) => {
    if (!mapInstance) return;
    if (filteredProperties.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      let hasValidCoords = false;
      filteredProperties.forEach((p) => {
        if (p.lat && p.lng) {
          bounds.extend({ lat: p.lat, lng: p.lng });
          hasValidCoords = true;
        }
      });
      if (hasValidCoords) {
        mapInstance.fitBounds(bounds);
        // Ensure we don't zoom in too much on a single marker
        const listener = window.google.maps.event.addListener(mapInstance, "idle", function() {
          if (mapInstance.getZoom() > 14) mapInstance.setZoom(14);
          window.google.maps.event.removeListener(listener);
        });
      }
    }
  };

  const clearMapAnimations = () => {
    if (zoomOutIntervalRef.current) clearInterval(zoomOutIntervalRef.current);
    if (zoomInIntervalRef.current) clearInterval(zoomInIntervalRef.current);
    if (zoomTimeoutRef.current) clearTimeout(zoomTimeoutRef.current);
  };

  const flyToProperty = (prop) => {
    if (!prop.lat || !prop.lng || !mapRef.current) return;
    
    clearMapAnimations();
    
    const map = mapRef.current;
    const targetLat = prop.lat;
    const targetLng = prop.lng;
    
    let currentZoom = map.getZoom();
    
    if (currentZoom > 12) {
      zoomOutIntervalRef.current = setInterval(() => {
        currentZoom--;
        map.setZoom(currentZoom);
        
        if (currentZoom <= 12) {
          clearInterval(zoomOutIntervalRef.current);
          map.panTo({ lat: targetLat, lng: targetLng });
          
          zoomTimeoutRef.current = setTimeout(() => {
            zoomInIntervalRef.current = setInterval(() => {
              currentZoom++;
              map.setZoom(currentZoom);
              if (currentZoom >= 17) clearInterval(zoomInIntervalRef.current);
            }, 120);
          }, 600);
        }
      }, 120);
    } else {
      map.panTo({ lat: targetLat, lng: targetLng });
      zoomTimeoutRef.current = setTimeout(() => {
        zoomInIntervalRef.current = setInterval(() => {
          currentZoom++;
          map.setZoom(currentZoom);
          if (currentZoom >= 17) clearInterval(zoomInIntervalRef.current);
        }, 120);
      }, 600);
    }
  };

  const handleCardHover = (prop) => {
    setHoveredProperty(prop);
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Only fly if they hold the hover for 250ms to prevent erratic glitching when quickly scrolling through the list
    hoverTimeoutRef.current = setTimeout(() => {
      flyToProperty(prop);
    }, 250);
  };

  const handleCardLeave = () => {
    setHoveredProperty(null);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleCardClick = (prop) => {
    setHoveredProperty(prop);
    setSelectedProperty(prop);
    
    // Scroll card into view if it was clicked via map marker
    const card = document.getElementById(`property-card-${prop.id}`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    flyToProperty(prop);
  };

  const resetMap = () => {
    setHoveredProperty(null);
    setSelectedProperty(null);
    applyBounds(mapRef.current);
  };

  useEffect(() => {
    if (isLoaded) {
      resetMap();
    }
  }, [searchQuery, properties, isLoaded]);

  const getMarkerIcon = (isSelected, isHovered) => {
    const scale = isSelected || isHovered ? 1.3 : 1;
    // Burgundy: #8E1D3B, Ivory: #FFF9F2
    const fill = isSelected ? "#8E1D3B" : "#8E1D3B";
    const stroke = isSelected ? "#FFF9F2" : "#ffffff";
    const strokeWidth = isSelected ? "3" : "1.5";
    
    const svg = `
      <svg viewBox="0 0 24 24" width="${30 * scale}" height="${30 * scale}" xmlns="http://www.w3.org/2000/svg" style="transition: all 0.3s ease;">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"></path>
        <circle cx="12" cy="10" r="${isSelected ? 5 : 4}" fill="${stroke}" stroke="none"></circle>
      </svg>
    `;
    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
      scaledSize: new window.google.maps.Size(30 * scale, 30 * scale),
      anchor: new window.google.maps.Point(15 * scale, 30 * scale)
    };
  };

  return (
    <div className="explore-page-root">
      
      {/* Background Full Screen Map */}
      <div className="explore-map-container">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              disableDefaultUI: true,
              zoomControl: false,
              mapTypeId: 'hybrid', // Keeping existing
              backgroundColor: '#1C1C1C' // Dark background prevents light grey flashes while satellite tiles load
            }}
          >
            {filteredProperties.map((prop) => {
              if (prop.lat && prop.lng) {
                const isSelected = selectedProperty?.id === prop.id;
                const isHovered = hoveredProperty?.id === prop.id;
                const isActive = isSelected || isHovered;
                const formattedPrice = prop.priceFormatted || formatPropertyPrice(prop.price, prop.listingType);
                
                return (
                  <Marker
                    key={prop.id}
                    position={{ lat: prop.lat, lng: prop.lng }}
                    icon={getMarkerIcon(isSelected, isHovered)}
                    onClick={() => handleCardClick(prop)}
                    onMouseOver={() => handleCardHover(prop)}
                    onMouseOut={handleCardLeave}
                  />
                );
              }
              return null;
            })}
          </GoogleMap>
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9' }}>
            Loading Map...
          </div>
        )}
      </div>

      {/* Floating UI Panel */}
      <div className="floating-panel">
        
        {/* Main Panel Content */}
        <div className="panel-content">
          {selectedProperty ? (
            <div className="details-view-container">
              
              {/* Breadcrumb Header */}
              <div className="details-breadcrumb">
                <span className="back-link" onClick={() => setSelectedProperty(null)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  Back to properties
                </span>
              </div>
              
              {/* Full Details View */}
              <div className="premium-details-full">
                {selectedProperty.imageUrl && (
                  <div className="pdf-img-wrapper">
                    <img src={selectedProperty.imageUrl.split(',')[0].trim()} alt={selectedProperty.title} className="pdf-img" />
                    <div className="pdf-badge">{selectedProperty.listingType === "Rent" ? "For Rent" : "For Sale"}</div>
                  </div>
                )}
                
                <div className="pdf-header">
                  <div className="pdf-location">{selectedProperty.location}{selectedProperty.district ? `, ${selectedProperty.district}` : ''}</div>
                  <h2 className="pdf-title">{selectedProperty.title}</h2>
                  <div className="pdf-price">
                    {selectedProperty.priceFormatted ? selectedProperty.priceFormatted : formatPropertyPrice(selectedProperty.price, selectedProperty.listingType)}
                    {selectedProperty.listingType === "Rent" && <span className="pdf-price-suffix">/mo</span>}
                  </div>
                </div>

                <div className="pdf-specs-grid">
                  {selectedProperty.propertyType && (
                    <div className="pdf-spec-item">
                      <div className="pdf-spec-label">Type</div>
                      <div className="pdf-spec-val">{selectedProperty.propertyType}</div>
                    </div>
                  )}
                  {selectedProperty.bedrooms && (
                    <div className="pdf-spec-item">
                      <div className="pdf-spec-label">Bedrooms</div>
                      <div className="pdf-spec-val">{selectedProperty.bedrooms} Beds</div>
                    </div>
                  )}
                  {selectedProperty.bathrooms && (
                    <div className="pdf-spec-item">
                      <div className="pdf-spec-label">Bathrooms</div>
                      <div className="pdf-spec-val">{selectedProperty.bathrooms} Baths</div>
                    </div>
                  )}
                  {selectedProperty.landArea && (
                    <div className="pdf-spec-item">
                      <div className="pdf-spec-label">Land Area</div>
                      <div className="pdf-spec-val">{selectedProperty.landArea}</div>
                    </div>
                  )}
                  {selectedProperty.builtUpArea && (
                    <div className="pdf-spec-item">
                      <div className="pdf-spec-label">Built-up Area</div>
                      <div className="pdf-spec-val">{selectedProperty.builtUpArea}</div>
                    </div>
                  )}
                  {selectedProperty.status && (
                    <div className="pdf-spec-item">
                      <div className="pdf-spec-label">Status</div>
                      <div className="pdf-spec-val">{selectedProperty.status}</div>
                    </div>
                  )}
                </div>

                {selectedProperty.description && (
                  <div className="pdf-section">
                    <h3 className="pdf-section-title">About this property</h3>
                    <p className="pdf-desc">{selectedProperty.description}</p>
                  </div>
                )}

                {/* <div className="pdf-actions">
                  <a
                    href={`https://wa.me/918009244355?text=Hello%2C%20I%20am%20interested%20in%20${encodeURIComponent(selectedProperty.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pdf-btn-solid"
                  >
                    Inquire on WhatsApp
                  </a>
                </div> */}
              </div>
            </div>
          ) : (
            <>
              <div className="panel-header">
                <div className="panel-eyebrow">EXPLORE KERALA</div>
                <div 
                  onClick={() => navigate('/')}
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', marginBottom: '24px', marginTop: '16px' }}
                >
                  <img src={logoStatic} alt="HelloProperties" style={{ height: '56px', width: 'auto' }} />
                </div>
                
                <div className="search-pills">
                  <div 
                    className={`pill ${listingTypeFilter === 'All' ? 'active' : ''}`}
                    onClick={() => setListingTypeFilter('All')}
                  >
                    All Properties
                  </div>
                  <div 
                    className={`pill ${listingTypeFilter === 'Rent' ? 'active' : ''}`}
                    onClick={() => setListingTypeFilter('Rent')}
                  >
                    For Rent
                  </div>
                  <div 
                    className={`pill ${listingTypeFilter === 'Sale' ? 'active' : ''}`}
                    onClick={() => setListingTypeFilter('Sale')}
                  >
                    For Sale
                  </div>
                </div>
                
                <div className="results-count">{filteredProperties.length} properties matching</div>
              </div>
              
              <div className="property-list">
                {loading ? (
                  <div className="loading-state">Loading properties...</div>
                ) : filteredProperties.length > 0 ? (
                  filteredProperties.map((prop) => {
                    const isSelected = selectedProperty?.id === prop.id;
                    const isHovered = hoveredProperty?.id === prop.id;
                    return (
                      <div 
                        id={`property-card-${prop.id}`}
                        className={`premium-card ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`} 
                        key={prop.id}
                        onMouseEnter={() => handleCardHover(prop)}
                        onMouseLeave={handleCardLeave}
                        onClick={() => handleCardClick(prop)}
                      >
                        <div className="pc-img-wrapper">
                          {prop.imageUrl ? (
                            <img src={prop.imageUrl.split(',')[0].trim()} alt={prop.title} className="pc-img" loading="lazy" />
                          ) : (
                            <div className="pc-img-placeholder" />
                          )}
                        </div>
                        
                        <div className="pc-details">
                          <div className="pc-title">{prop.title}</div>
                          <div className="pc-location">{prop.location || "Kerala"}{prop.district ? `, ${prop.district}` : ""}</div>
                          <div className="pc-price">
                            {prop.priceFormatted || formatPropertyPrice(prop.price, prop.listingType)}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="empty-state">No properties found.</div>
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

