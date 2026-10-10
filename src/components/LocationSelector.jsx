import { useState } from 'react';
import './LocationSelector.css';
import { 
  ALL_INDIAN_STATES, 
  getDistrictsForState,
} from '../data/indiaLocationData';
import { MapPin, Search, ChevronDown, X } from './Icons';
import GoogleMapPickerModal from './GoogleMapPickerModal';

export default function LocationSelector({
  value,
  onChange,
  allowMultiple = false,
  error = null,
  required = false,
  label = 'Location Details'
}) {
  // Normalize value state
  // For single: { state: '', district: '', locality: '', address: '', pincode: '' }
  // For multiple: array of location items or array of strings, or { locations: [...] }
  const parseInitialSingle = (val) => {
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      return {
        state: val.state || 'Kerala',
        district: val.district || '',
        locality: val.locality || '',
        address: val.address || '',
        pincode: val.pincode || '',
        lat: val.lat == null ? null : Number(val.lat),
        lng: val.lng == null ? null : Number(val.lng)
      };
    }
    if (typeof val === 'string' && val) {
      const parts = val.split(',').map(s => s.trim());
      return {
        locality: parts[0] || '',
        district: parts[1] || '',
        state: parts[2] || 'Kerala',
        address: '',
        pincode: '',
        lat: null,
        lng: null
      };
    }
    return {
      state: 'Kerala',
      district: '',
      locality: '',
      address: '',
      pincode: '',
      lat: null,
      lng: null
    };
  };

  const parseInitialMulti = (val) => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string' && val) return val.split(';').map(s => s.trim()).filter(Boolean);
    return [];
  };

  const [singleLoc, setSingleLoc] = useState(() => parseInitialSingle(value));
  const [multiList, setMultiList] = useState(() => parseInitialMulti(value));
  const availableDistricts = getDistrictsForState(singleLoc.state);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // Map Location Selection Confirmation
  const handleMapLocationConfirm = (mapLoc) => {
    if (allowMultiple) {
      const formatted = mapLoc.locality && mapLoc.district
        ? `${mapLoc.locality}, ${mapLoc.district}`
        : mapLoc.locality || mapLoc.formattedAddress;

      if (formatted && !multiList.includes(formatted)) {
        const nextList = [...multiList, formatted];
        setMultiList(nextList);
        onChange(nextList);
      }
    } else {
      const updated = {
        ...singleLoc,
        locality: mapLoc.locality || mapLoc.formattedAddress || singleLoc.locality,
        district: mapLoc.district || '',
        state: mapLoc.state || '',
        address: mapLoc.address || '',
        pincode: mapLoc.pincode || '',
        lat: mapLoc.lat,
        lng: mapLoc.lng
      };
      setSingleLoc(updated);
      onChange(updated);
    }
  };

  // Update parent for single mode
  const handleSingleFieldChange = (field, newVal) => {
    const updated = { ...singleLoc, [field]: newVal };
    if (field === 'state' || field === 'district') {
      Object.assign(updated, { locality: '', address: '', pincode: '', lat: null, lng: null });
      if (field === 'state') updated.district = '';
    }
    setSingleLoc(updated);
    onChange(updated);
  };

  // Multiple mode tag removal
  const handleRemoveMultiple = (index) => {
    const nextList = multiList.filter((_, i) => i !== index);
    setMultiList(nextList);
    onChange(nextList);
  };

  return (
    <div className="location-selector-wrap">
      {/* Top Header Label */}
      <div className="location-top-bar">
        <label className="location-main-label">
          <MapPin className="w-3.5 h-3.5" style={{ color: '#B0004F' }} />
          <span>{label}</span>
          {required && <span className="location-required-star">*</span>}
        </label>
        {allowMultiple && (
          <span className="location-helper-text">
            Select one or more preferred areas
          </span>
        )}
      </div>

      {/* Locality Search & Auto-resolution via Google Map */}
      <div className="location-locality-section">
        <label className="location-sub-label">
          {allowMultiple ? 'Add Preferred Locality / Area' : 'Locality / Town / Village'}
        </label>

        <div 
          className="location-search-trigger-wrap"
          onClick={() => setIsMapModalOpen(true)}
          role="button"
          aria-label={allowMultiple ? 'Add preferred locality' : 'Select locality'}
          aria-haspopup="dialog"
          tabIndex={0}
          title="Click to search on Google Maps"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsMapModalOpen(true);
            }
          }}
        >
          <Search className="location-search-icon w-4 h-4" />
          <input
            type="text"
            readOnly
            tabIndex={-1}
            aria-label="Selected locality"
            value={
              allowMultiple 
                ? '' 
                : (singleLoc.locality ? `${singleLoc.locality}${singleLoc.district ? `, ${singleLoc.district}` : ''}` : '')
            }
            placeholder={
              allowMultiple
                ? 'Search & select preferred area on Google Maps...'
                : 'Click to search & select location on Google Maps...'
            }
            className="location-text-input location-clickable-input"
          />
        </div>

        {/* Selected Coordinates Indicator for single mode */}
        {!allowMultiple && singleLoc.lat && singleLoc.lng && (
          <div className="location-coords-badge">
            <MapPin className="w-3 h-3 text-emerald-600" />
            <span>Pinned on Map: {singleLoc.lat.toFixed(4)}, {singleLoc.lng.toFixed(4)}</span>
            <button
              type="button"
              onClick={() => setIsMapModalOpen(true)}
            >
              (Edit on Map)
            </button>
          </div>
        )}

      </div>

      {/* Primary selectors: State & District */}
      <div className="location-dropdowns-grid">
        {/* State Dropdown */}
        <div className="location-field-group">
          <label className="location-sub-label">
            State
          </label>
          <div className="location-select-wrap">
            <select
              value={singleLoc.state}
              onChange={(e) => handleSingleFieldChange('state', e.target.value)}
              className="location-select-box"
            >
              {ALL_INDIAN_STATES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
            <ChevronDown className="location-select-chevron w-4 h-4" />
          </div>
        </div>

        {/* District Dropdown */}
        <div className="location-field-group">
          <label className="location-sub-label">
            District
          </label>
          <div className="location-select-wrap">
            <select
              value={singleLoc.district}
              onChange={(e) => handleSingleFieldChange('district', e.target.value)}
              className="location-select-box"
            >
              <option value="">Select District</option>
              {singleLoc.district && !availableDistricts.includes(singleLoc.district) && <option value={singleLoc.district}>{singleLoc.district}</option>}
              {availableDistricts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <ChevronDown className="location-select-chevron w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Multiple mode: Selected Locations chips */}
      {allowMultiple && multiList.length > 0 && (
        <div className="location-chips-container">
          <div className="location-chips-title">Selected Preferred Areas:</div>
          <div className="location-chips-list">
            {multiList.map((loc, idx) => (
              <span key={idx} className="location-chip">
                <MapPin className="w-3 h-3" />
                <span>{loc}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveMultiple(idx)}
                  className="location-chip-remove"
                  title="Remove area"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Single mode: optional Address line & Pincode */}
      {!allowMultiple && (
        <div className="location-address-grid">
          <div>
            <label className="location-sub-label" style={{ display: 'block', marginBottom: '4px' }}>
              Street / Landmark / House Name (Optional)
            </label>
            <input
              type="text"
              value={singleLoc.address}
              onChange={(e) => handleSingleFieldChange('address', e.target.value)}
              placeholder="e.g. Near Metro Pillar 420, Civil Line Road"
              className="location-extra-input"
            />
          </div>
          <div>
            <label className="location-sub-label" style={{ display: 'block', marginBottom: '4px' }}>
              Pincode (Optional)
            </label>
            <input
              type="text"
              maxLength={6}
              value={singleLoc.pincode}
              onChange={(e) => handleSingleFieldChange('pincode', e.target.value.replace(/\D/g, ''))}
              placeholder="682025"
              className="location-extra-input"
            />
          </div>
        </div>
      )}

      {error && (
        <div className="location-error-text">
          <span>{error}</span>
        </div>
      )}

      {/* Interactive Google Map Picker Modal */}
      <GoogleMapPickerModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        onConfirm={handleMapLocationConfirm}
        initialLocation={!allowMultiple ? singleLoc : null}
      />
    </div>
  );
}
