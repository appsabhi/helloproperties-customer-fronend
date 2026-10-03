import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useCustomerProperties } from "../context/CustomerPropertyContext";
import { formatPropertyPrice } from "../services/propertyService";
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

  const handleCardHover = (prop) => {
    setHoveredProperty(prop);
  };

  const handleCardClick = (prop) => {
    setHoveredProperty(prop);
    setSelectedProperty(prop);
    if (prop.lat && prop.lng && mapRef.current) {
      const map = mapRef.current;
      // 1. Smoothly pan to the location
      map.panTo({ lat: prop.lat, lng: prop.lng });
      
      // 2. Smoothly zoom in step-by-step (simulating Leaflet's flyTo)
      setTimeout(() => {
        let currentZoom = map.getZoom();
        const targetZoom = 18; // Max zoom for satellite maps
        
        if (currentZoom < targetZoom) {
          const zoomInterval = setInterval(() => {
            currentZoom++;
            map.setZoom(currentZoom);
            if (currentZoom >= targetZoom) clearInterval(zoomInterval);
          }, 150); // 150ms per zoom step
        } else if (currentZoom > targetZoom) {
          map.setZoom(targetZoom); // if already too close, just snap out
        }
      }, 600); // wait for pan animation to mostly finish
    }
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
      <svg viewBox="0 0 24 24" width="${30 * scale}" height="${30 * scale}" xmlns="http://www.w3.org/2000/svg">
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
              mapTypeId: 'hybrid' // Keeping existing
            }}
          >
            {filteredProperties.map((prop) => {
              if (prop.lat && prop.lng) {
                const isSelected = selectedProperty?.id === prop.id;
                const isHovered = hoveredProperty?.id === prop.id;
                
                return (
                  <Marker
                    key={prop.id}
                    position={{ lat: prop.lat, lng: prop.lng }}
                    icon={getMarkerIcon(isSelected, isHovered)}
                    onClick={() => handleCardClick(prop)}
                    onMouseOver={() => handleCardHover(prop)}
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
                <span className="back-link" onClick={resetMap}>
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
                <h1 className="panel-main-heading">Find a property<br/>that feels right.</h1>
                
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
                    return (
                      <div 
                        className={`premium-card ${isSelected ? 'selected' : ''}`} 
                        key={prop.id}
                        onMouseEnter={() => handleCardHover(prop)}
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

