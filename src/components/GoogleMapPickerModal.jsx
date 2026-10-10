import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { MapPin, Search, X, Loader2, Check, AlertCircle } from './Icons';
import { googleMapsLoaderOptions } from '../services/googleMapsConfig';
import './GoogleMapPickerModal.css';

const DEFAULT_CENTER = { lat: 10.8505, lng: 76.2711 };
const MAP_OPTIONS = { streetViewControl: false, mapTypeControl: false, fullscreenControl: true, gestureHandling: 'greedy', clickableIcons: false };
const hasCoordinates = (location) => location?.lat != null && location?.lng != null && Number.isFinite(Number(location.lat)) && Number.isFinite(Number(location.lng));

function parseAddress(result, coords, name = '') {
  const components = result.addressComponents || result.address_components || [];
  const part = (type) => {
    const component = components.find(item => item.types.includes(type));
    return component?.longText || component?.long_name || '';
  };
  const formattedAddress = result.formattedAddress || result.formatted_address || '';
  return {
    ...coords,
    locality: name || part('sublocality_level_1') || part('sublocality') || part('neighborhood') || part('locality') || formattedAddress.split(',')[0],
    district: (part('administrative_area_level_3') || part('administrative_area_level_2')).replace(/ District$/i, ''),
    state: part('administrative_area_level_1'),
    pincode: part('postal_code'),
    address: formattedAddress,
    formattedAddress,
  };
}

export default function GoogleMapPickerModal({ isOpen, ...props }) {
  return isOpen ? createPortal(<LocationPicker {...props} />, document.body) : null;
}

function LocationPicker({ onClose, onConfirm, initialLocation }) {
  const { isLoaded, loadError } = useJsApiLoader(googleMapsLoaderOptions);
  const [selection, setSelection] = useState(() => hasCoordinates(initialLocation) ? { ...initialLocation, lat: Number(initialLocation.lat), lng: Number(initialLocation.lng) } : null);
  const [center, setCenter] = useState(() => hasCoordinates(initialLocation) ? { lat: Number(initialLocation.lat), lng: Number(initialLocation.lng) } : DEFAULT_CENTER);
  const [zoom, setZoom] = useState(hasCoordinates(initialLocation) ? 16 : 7);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searching, setSearching] = useState(false);
  const [resolving, setResolving] = useState(false);
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const timerRef = useRef(null);
  const searchVersion = useRef(0);
  const selectionVersion = useRef(0);
  const sessionRef = useRef(null);
  const unavailable = !googleMapsLoaderOptions.googleMapsApiKey || !!loadError;

  useEffect(() => {
    const searchRequests = searchVersion;
    const selectionRequests = selectionVersion;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    inputRef.current?.focus();
    const keydown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopImmediatePropagation();
        onClose();
      }
      if (event.key === 'Tab') {
        const items = [...dialogRef.current.querySelectorAll('button:not(:disabled), input:not(:disabled), [tabindex="0"]')].filter(item => item.getClientRects().length);
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener('keydown', keydown, true);
    return () => {
      clearTimeout(timerRef.current);
      searchRequests.current++;
      selectionRequests.current++;
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', keydown, true);
      previousFocus?.focus();
    };
  }, [onClose]);

  useEffect(() => {
    if (activeIndex >= 0) document.getElementById(`map-place-${activeIndex}`)?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const dismissSearch = () => {
    clearTimeout(timerRef.current);
    searchVersion.current++;
    setSuggestions([]);
    setSearching(false);
    setActiveIndex(-1);
  };

  const search = (text) => {
    setQuery(text);
    dismissSearch();
    setMessage('');
    if (text.trim().length < 2 || !isLoaded || unavailable) return;
    const version = searchVersion.current;
    setSearching(true);
    timerRef.current = setTimeout(async () => {
      try {
        const { AutocompleteSuggestion, AutocompleteSessionToken } = window.google.maps.places;
        sessionRef.current ||= new AutocompleteSessionToken();
        const result = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: text.trim(), includedRegionCodes: ['in'], sessionToken: sessionRef.current,
          // Autocomplete (New) accepts a maximum circular bias of 50 km.
          locationBias: { center: DEFAULT_CENTER, radius: 50000 },
        });
        if (version !== searchVersion.current) return;
        const predictions = result.suggestions.map(item => item.placePrediction).filter(Boolean);
        setSuggestions(predictions);
        if (!predictions.length) setMessage('No places found. Try another area or click on the map.');
      } catch {
        if (version === searchVersion.current) setMessage('Location search is unavailable. Please try again or choose a point on the map.');
      } finally {
        if (version === searchVersion.current) setSearching(false);
      }
    }, 300);
  };

  const resolveLocation = async (prediction, coords) => {
    dismissSearch();
    const version = ++selectionVersion.current;
    setSelection(null);
    setResolving(true);
    setMessage('');
    if (coords) setCenter(coords);
    try {
      let result;
      if (prediction) {
        setQuery(prediction.text.toString());
        result = prediction.toPlace();
        await result.fetchFields({ fields: ['addressComponents', 'formattedAddress', 'location'] });
        sessionRef.current = null;
        if (!result.location) throw new Error('No location');
        coords = { lat: result.location.lat(), lng: result.location.lng() };
      } else {
        const response = await new window.google.maps.Geocoder().geocode({ location: coords });
        result = response.results[0];
        if (!result) throw new Error('No address');
      }
      if (version !== selectionVersion.current) return;
      const parsed = parseAddress(result, coords, prediction?.mainText?.toString());
      if (!parsed.locality) throw new Error('No locality');
      setSelection(parsed);
      setCenter(coords);
      if (prediction) setZoom(16);
      else setQuery(parsed.formattedAddress);
    } catch {
      if (version === selectionVersion.current) setMessage('Could not resolve this address. Please choose another place or try again.');
    } finally {
      if (version === selectionVersion.current) setResolving(false);
    }
  };

  return (
    <div className="map-modal-overlay" onClick={event => event.stopPropagation()}>
      <div className="map-modal-backdrop" onClick={onClose} />
      <section ref={dialogRef} className="map-modal-box" role="dialog" aria-modal="true" aria-labelledby="map-picker-title" aria-describedby="map-picker-description">
        <header className="map-modal-header">
          <div>
            <h2 id="map-picker-title" className="map-modal-title"><MapPin />Search &amp; Select Location</h2>
            <p id="map-picker-description" className="map-modal-subtitle">Search for a location or click anywhere on the map.</p>
          </div>
          <button type="button" className="map-modal-close-btn" onClick={onClose} aria-label="Close map picker"><X /></button>
        </header>
        <div className="map-modal-body">
          <div className="map-floating-search-wrap">
            <div className="map-floating-search-bar">
              <Search />
              <input ref={inputRef} className="map-search-input" aria-label="Search for a location" role="combobox" aria-autocomplete="list" aria-expanded={suggestions.length > 0} aria-controls="map-place-results" aria-activedescendant={activeIndex >= 0 ? `map-place-${activeIndex}` : undefined} autoComplete="off" placeholder="Search address, landmark, town, or area..." value={query} onChange={event => search(event.target.value)} onKeyDown={event => {
                if (event.key === 'Enter') { event.preventDefault(); if (suggestions.length) resolveLocation(suggestions[Math.max(activeIndex, 0)]); }
                if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && suggestions.length) {
                  event.preventDefault();
                  setActiveIndex(index => (index + (event.key === 'ArrowDown' ? 1 : -1) + suggestions.length) % suggestions.length);
                }
              }} />
              {searching ? <Loader2 className="map-spinner" /> : query && <button type="button" className="map-clear-btn" aria-label="Clear location search" onClick={() => { search(''); inputRef.current?.focus(); }}><X /></button>}
            </div>
            {suggestions.length > 0 && <div className="map-suggestions-dropdown">
              <div className="map-suggestions-heading">Places</div>
              <div id="map-place-results" role="listbox" aria-label="Places">
                {suggestions.map((item, index) => <button id={`map-place-${index}`} key={item.placeId} type="button" role="option" aria-selected={index === activeIndex} className="map-suggestion-item" onClick={() => resolveLocation(item)}>
                  <span className="map-suggestion-pin"><MapPin /></span>
                  <span><span className="map-suggestion-main">{item.mainText?.toString() || item.text.toString()}</span><span className="map-suggestion-sub">{item.secondaryText?.toString()}</span></span>
                </button>)}
              </div>
            </div>}
            {message && <div className="map-search-message" role="status">{message}</div>}
          </div>
          {unavailable ? <div className="map-status-overlay"><AlertCircle /><p>Location search is temporarily unavailable.</p><p>Please close this window and try again later.</p></div> : isLoaded ? <GoogleMap mapContainerStyle={{ width: '100%', height: '100%' }} center={center} zoom={zoom} options={MAP_OPTIONS} onClick={event => event.latLng && resolveLocation(null, { lat: event.latLng.lat(), lng: event.latLng.lng() })}>
            {selection && <Marker position={{ lat: selection.lat, lng: selection.lng }} draggable onDragEnd={event => event.latLng && resolveLocation(null, { lat: event.latLng.lat(), lng: event.latLng.lng() })} />}
          </GoogleMap> : <div className="map-status-overlay"><Loader2 className="map-spinner" /><p>Loading interactive map...</p></div>}
          {(selection || resolving) && !suggestions.length && <div className="map-modal-bottom-bar" aria-live="polite">
            <div className="map-selected-info"><div className="map-selected-label">Selected location</div><div className="map-selected-address">{resolving ? 'Resolving address...' : selection.formattedAddress || [selection.locality, selection.district, selection.state].filter(Boolean).join(', ')}</div></div>
            <button type="button" className="map-confirm-btn" disabled={resolving || !selection} onClick={() => { onConfirm(selection); onClose(); }}><Check />Confirm Location</button>
          </div>}
        </div>
      </section>
    </div>
  );
}
