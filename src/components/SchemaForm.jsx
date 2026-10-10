import React, { useState, useEffect, useRef } from 'react';
import './SchemaForm.css';
import { 
  ChevronDown, 
  ImagePlus, 
  Video, 
  Film, 
  Link as LinkIcon, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Loader2 
} from './Icons';
import LocationSelector from './LocationSelector';
import PropertyKeywordsSelector from './PropertyKeywordsSelector';

export default function SchemaForm({
  schema = [],
  initialValues = {},
  onSubmit,
  onCancel,
  submitText = 'Submit',
  cancelText = 'Cancel',
  isSubmitting = false
}) {
  // Initialize formData from schema defaults and initialValues
  const [formData, setFormData] = useState(() => {
    const data = { ...initialValues };
    schema.forEach((field) => {
      if (data[field.id] === undefined) {
        data[field.id] = field.defaultValue !== undefined ? field.defaultValue : '';
      }
      if (field.hasUnit && field.unitId && data[field.unitId] === undefined) {
        data[field.unitId] = field.defaultUnit || (field.unitOptions && field.unitOptions[0]) || '';
      }
    });
    return data;
  });

  const [errors, setErrors] = useState({});
  const [imageFiles, setImageFiles] = useState([]); // Array of { file, previewUrl, size }
  const [videoMode, setVideoMode] = useState('upload'); // 'upload' | 'link'
  const [videoFile, setVideoFile] = useState(null); // { file, previewUrl, size }
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const formRef = useRef(null);

  // Initialize media if initialValues contains them
  useEffect(() => {
    if (initialValues.images && Array.isArray(initialValues.images)) {
      const existing = initialValues.images.map((item) => {
        if (typeof item === 'string') {
          return { previewUrl: item, size: 'Existing', isRemote: true };
        }
        return item;
      });
      setImageFiles(existing);
    }

    if (initialValues.video) {
      if (typeof initialValues.video === 'string') {
        if (initialValues.video.startsWith('http')) {
          setVideoMode('link');
          setVideoUrlInput(initialValues.video);
        } else {
          setVideoFile({ previewUrl: initialValues.video, size: 'Existing', isRemote: true });
        }
      } else {
        setVideoFile(initialValues.video);
      }
    }
  }, [initialValues]);

  // Handle unit synchronization rules
  const handleUnitSync = (fieldId, newUnitVal, currentData) => {
    const updated = { ...currentData };

    // 1. If areaUnit changes, synchronize price/rent units
    if (fieldId === 'areaUnit') {
      const cleanUnit = newUnitVal.replace('/', '').trim();
      const matchedPriceUnit = `/ ${cleanUnit}`;
      
      // Sync expectedPriceUnit if it exists and has matching option
      const priceField = schema.find(f => f.id === 'expectedPrice');
      if (priceField && priceField.unitOptions && priceField.unitOptions.includes(matchedPriceUnit)) {
        updated.expectedPriceUnit = matchedPriceUnit;
      }
      // If rent unit exists
      const rentField = schema.find(f => f.id === 'monthlyRent');
      if (rentField && rentField.unitOptions && rentField.unitOptions.includes(matchedPriceUnit)) {
        updated.monthlyRentUnit = matchedPriceUnit;
      }
    }

    // 2. If requiredAreaUnit changes in requirement form, synchronize budgetUnit
    if (fieldId === 'requiredAreaUnit') {
      const cleanUnit = newUnitVal.replace('/', '').trim();
      const matchedPriceUnit = `/ ${cleanUnit}`;
      const budgetField = schema.find(f => f.id === 'budget');
      if (budgetField && budgetField.unitOptions && budgetField.unitOptions.includes(matchedPriceUnit)) {
        updated.budgetUnit = matchedPriceUnit;
      }
    }

    return updated;
  };

  const handleChange = (fieldId, value) => {
    let nextData = { ...formData, [fieldId]: value };

    // Clear error for this field
    if (errors[fieldId]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    }

    setFormData(nextData);
  };

  const handleUnitChange = (unitId, unitValue, parentFieldId) => {
    let nextData = { ...formData, [unitId]: unitValue };
    nextData = handleUnitSync(unitId, unitValue, nextData);
    setFormData(nextData);
  };

  // Image Upload Handling
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newError = {};
    const validUploads = [];

    files.forEach((file) => {
      // 10 MB per file limit
      if (file.size > 10 * 1024 * 1024) {
        newError.images = `File "${file.name}" exceeds the 10 MB limit.`;
      } else {
        const previewUrl = URL.createObjectURL(file);
        const formattedSize = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
        validUploads.push({ file, previewUrl, size: formattedSize });
      }
    });

    if (Object.keys(newError).length > 0) {
      setErrors((prev) => ({ ...prev, ...newError }));
    }

    if (validUploads.length > 0) {
      const updated = [...imageFiles, ...validUploads];
      setImageFiles(updated);
      handleChange('images', updated.map(u => u.file || u.previewUrl));
    }

    e.target.value = '';
  };

  const handleRemoveImage = (index) => {
    const itemToRemove = imageFiles[index];
    if (itemToRemove && itemToRemove.previewUrl && !itemToRemove.isRemote) {
      URL.revokeObjectURL(itemToRemove.previewUrl);
    }
    const updated = imageFiles.filter((_, i) => i !== index);
    setImageFiles(updated);
    handleChange('images', updated.map(u => u.file || u.previewUrl));
  };

  // Video Upload Handling
  const handleVideoSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // 100 MB video limit
    if (file.size > 100 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        video: `Video exceeds maximum limit of 100 MB (${(file.size / (1024 * 1024)).toFixed(1)} MB)`
      }));
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    const formattedSize = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    const videoObj = { file, previewUrl, size: formattedSize, name: file.name };
    setVideoFile(videoObj);
    handleChange('video', file);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.video;
      return next;
    });

    e.target.value = '';
  };

  const handleRemoveVideo = () => {
    if (videoFile && videoFile.previewUrl && !videoFile.isRemote) {
      URL.revokeObjectURL(videoFile.previewUrl);
    }
    setVideoFile(null);
    handleChange('video', null);
  };

  const handleVideoUrlSave = () => {
    const trimmed = videoUrlInput.trim();
    if (!trimmed) {
      handleChange('video', null);
      return;
    }
    handleChange('video', trimmed);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.video;
      return next;
    });
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    schema.forEach((field) => {
      // Check if field is visible
      if (field.showIf && !field.showIf(formData)) {
        return;
      }

      const val = formData[field.id];

      // Required validation
      if (field.required) {
        if (field.type === 'location_selector') {
          if (field.allowMultiple) {
            if (!Array.isArray(val) || val.length === 0) {
              newErrors[field.id] = 'Please add at least one preferred location';
            }
          } else {
            if (!val || (!val.district && !val.locality)) {
              newErrors[field.id] = 'Please provide district and locality';
            }
          }
        } else if (field.type === 'image') {
          if (!imageFiles || imageFiles.length === 0) {
            newErrors[field.id] = 'At least one photo is required';
          }
        } else if (val === undefined || val === null || String(val).trim() === '') {
          newErrors[field.id] = `${field.label || 'This field'} is required`;
        }
      }

      // Telephone validation
      if (field.type === 'tel' && val) {
        const cleanPhone = String(val).replace(/\D/g, '');
        if (cleanPhone.length < 10) {
          newErrors[field.id] = 'Please enter a valid 10-digit phone number';
        }
      }

      // Email format
      if (field.id === 'email' && val) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(String(val).trim())) {
          newErrors[field.id] = 'Please enter a valid email address';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (onSubmit) {
        onSubmit(formData);
      }
    } else {
      // Scroll to first error
      const firstErrorEl = formRef.current?.querySelector('.has-error');
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Helper to render field
  const renderField = (field) => {
    // Check conditional visibility
    if (field.showIf && !field.showIf(formData)) {
      return null;
    }

    const value = formData[field.id] !== undefined ? formData[field.id] : '';
    const error = errors[field.id];
    const isFilled = value !== '' && value !== null && value !== undefined;
    const isFocused = focusedField === field.id;

    // 1. Location Selector
    if (field.type === 'location_selector') {
      return (
        <div key={field.id} className="schema-field-wrapper">
          <LocationSelector
            label={field.label}
            required={field.required}
            allowMultiple={field.allowMultiple}
            value={value}
            onChange={(newLoc) => handleChange(field.id, newLoc)}
            error={error}
          />
        </div>
      );
    }

    // 2. Image Uploader
    if (field.type === 'image') {
      return (
        <div key={field.id} className="schema-field-wrapper">
          <label className="schema-media-label">
            <ImagePlus style={{ width: '14px', height: '14px', color: '#B0004F' }} />
            <span>{field.label}</span>
            {field.required && <span style={{ color: '#EF4444' }}>*</span>}
          </label>

          <label className="schema-media-dropzone">
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              multiple
              onChange={handleImageSelect}
              style={{ display: 'none' }}
            />
            <div className="schema-dropzone-content">
              <div className="schema-dropzone-icon-circle">
                <ImagePlus style={{ width: '20px', height: '20px' }} />
              </div>
              <div className="schema-dropzone-title">
                Click to upload property photos
              </div>
              <p className="schema-dropzone-desc">
                PNG, JPG, WEBP up to 10 MB per image. Select multiple photos.
              </p>
            </div>
          </label>

          {/* Thumbnails grid */}
          {imageFiles.length > 0 && (
            <div className="schema-thumbnails-grid">
              {imageFiles.map((item, idx) => (
                <div key={idx} className="schema-thumb-item group">
                  <img src={item.previewUrl} alt={`Upload ${idx + 1}`} />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="schema-thumb-remove-btn"
                    title="Remove Photo"
                  >
                    <X style={{ width: '12px', height: '12px' }} />
                  </button>
                  {item.size && (
                    <span className="schema-thumb-badge">{item.size}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="schema-error-text">
              <AlertCircle style={{ width: '14px', height: '14px' }} />
              <span>{error}</span>
            </div>
          )}
        </div>
      );
    }

    // 3. Video Uploader
    if (field.type === 'video') {
      return (
        <div key={field.id} className="schema-field-wrapper">
          <label className="schema-media-label">
            <Video style={{ width: '14px', height: '14px', color: '#B0004F' }} />
            <span>{field.label}</span>
            {field.required && <span style={{ color: '#EF4444' }}>*</span>}
          </label>

          {/* Video mode toggler */}
          <div className="schema-video-tabs">
            <button
              type="button"
              onClick={() => setVideoMode('upload')}
              className={`schema-video-tab-btn ${videoMode === 'upload' ? 'active' : ''}`}
            >
              Upload Video File
            </button>
            <button
              type="button"
              onClick={() => setVideoMode('link')}
              className={`schema-video-tab-btn ${videoMode === 'link' ? 'active' : ''}`}
            >
              Paste Video / YouTube Link
            </button>
          </div>

          {videoMode === 'upload' ? (
            <div>
              {!videoFile ? (
                <label className="schema-media-dropzone">
                  <input
                    type="file"
                    accept="video/mp4, video/quicktime, video/webm"
                    onChange={handleVideoSelect}
                    style={{ display: 'none' }}
                  />
                  <div className="schema-dropzone-content">
                    <div className="schema-dropzone-icon-circle">
                      <Film style={{ width: '20px', height: '20px' }} />
                    </div>
                    <div className="schema-dropzone-title">
                      Upload property walkthrough video
                    </div>
                    <p className="schema-dropzone-desc">
                      MP4, MOV, WEBM up to 100 MB.
                    </p>
                  </div>
                </label>
              ) : (
                <div className="schema-video-uploaded-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                    <Film style={{ width: '20px', height: '20px', color: '#B0004F', flexShrink: 0 }} />
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#1E293B', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {videoFile.name || 'Uploaded Video'}
                      </div>
                      <div style={{ fontSize: '11px', color: '#94A3B8' }}>{videoFile.size}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveVideo}
                    className="schema-thumb-remove-btn"
                    style={{ position: 'static', opacity: 1, color: '#64748B' }}
                    title="Remove Video"
                  >
                    <X style={{ width: '16px', height: '16px' }} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="schema-input-container">
                <input
                  type="url"
                  value={videoUrlInput}
                  onChange={(e) => setVideoUrlInput(e.target.value)}
                  onBlur={handleVideoUrlSave}
                  placeholder="https://www.youtube.com/watch?v=... or Drive Link"
                  className="schema-base-input"
                  style={{ paddingTop: 12, paddingBottom: 12 }}
                />
              </div>
              <p className="schema-dropzone-desc">
                You can paste a YouTube, Vimeo, or Google Drive link to the video.
              </p>
            </div>
          )}

          {error && (
            <div className="schema-error-text">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{error}</span>
            </div>
          )}
        </div>
      );
    }

    // 4. Textarea (with optional Keyword Chips)
    if (field.type === 'textarea') {
      return (
        <div key={field.id} className="schema-field-wrapper">
          <div
            className={`schema-input-container schema-textarea-container ${
              isFilled ? 'is-active' : ''
            } ${error ? 'has-error' : ''}`}
          >
            <label className="schema-floating-label">
              <span>{field.label}</span>
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              rows={4}
              value={value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              onFocus={() => setFocusedField(field.id)}
              onBlur={() => setFocusedField(null)}
              placeholder={field.placeholder || ''}
              className="schema-textarea-input"
            />
          </div>

          {/* Quick Keywords Chips below description */}
          {field.hasKeywords && (
            <PropertyKeywordsSelector
              value={value}
              onChange={(newVal) => handleChange(field.id, newVal)}
            />
          )}

          {error && (
            <div className="schema-error-text">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{error}</span>
            </div>
          )}
        </div>
      );
    }

    // 5. Select dropdown
    if (field.type === 'select') {
      return (
        <div key={field.id} className="schema-field-wrapper">
          <div
            className={`schema-input-container schema-select-container is-active ${
              error ? 'has-error' : ''
            }`}
          >
            <label className="schema-floating-label">
              <span>{field.label}</span>
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              onFocus={() => setFocusedField(field.id)}
              onBlur={() => setFocusedField(null)}
              className="schema-base-select"
            >
              {field.options &&
                field.options.map((opt) => {
                  const optVal = typeof opt === 'object' ? opt.value : opt;
                  const optLabel = typeof opt === 'object' ? opt.label : opt;
                  return (
                    <option key={optVal} value={optVal}>
                      {optLabel}
                    </option>
                  );
                })}
            </select>
            <ChevronDown className="schema-select-chevron w-4 h-4" />
          </div>
          {error && (
            <div className="schema-error-text">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{error}</span>
            </div>
          )}
        </div>
      );
    }

    // 6. Integrated Numeric Input with Unit Selector
    if (field.hasUnit) {
      const unitValue = formData[field.unitId] || field.defaultUnit || '';

      return (
        <div key={field.id} className="schema-field-wrapper">
          <div
            className={`schema-input-container ${
              isFilled ? 'is-active' : ''
            } ${error ? 'has-error' : ''}`}
          >
            <div className="schema-unit-input-group">
              {/* Numeric Input */}
              <div className="relative flex-1">
                <label className="schema-floating-label">
                  <span>{field.label}</span>
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={field.type || 'number'}
                  step="any"
                  value={value}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  onFocus={() => setFocusedField(field.id)}
                  onBlur={() => setFocusedField(null)}
                  placeholder={field.placeholder || ''}
                  className="schema-base-input"
                />
              </div>

              {/* Vertical Divider */}
              <div className="schema-unit-divider" />

              {/* Compact Unit Dropdown */}
              <div className="schema-unit-select-wrapper">
                <select
                  value={unitValue}
                  onChange={(e) => handleUnitChange(field.unitId, e.target.value, field.id)}
                  className="schema-unit-select"
                >
                  {field.unitOptions &&
                    field.unitOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                </select>
                <ChevronDown className="schema-unit-select-chevron w-3.5 h-3.5" />
              </div>
            </div>
          </div>
          {error && (
            <div className="schema-error-text">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{error}</span>
            </div>
          )}
        </div>
      );
    }

    // 7. Standard Input (text, number, tel, etc.)
    return (
      <div key={field.id} className="schema-field-wrapper">
        <div
          className={`schema-input-container ${
            isFilled ? 'is-active' : ''
          } ${error ? 'has-error' : ''}`}
        >
          <label className="schema-floating-label">
            <span>{field.label}</span>
            {field.required && <span className="text-red-500">*</span>}
          </label>
          <input
            type={field.type || 'text'}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            onFocus={() => setFocusedField(field.id)}
            onBlur={() => setFocusedField(null)}
            placeholder={field.placeholder || ''}
            className="schema-base-input"
          />
        </div>
        {error && (
          <div className="schema-error-text">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  };

  // Group fields and render section headers
  let lastSection = null;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="schema-form-container" noValidate>
      {schema.map((field) => {
        // Render section header divider if section changes
        let sectionHeader = null;
        if (field.section && field.section !== lastSection) {
          lastSection = field.section;
          sectionHeader = (
            <div key={`section-${field.section}`} className="schema-section-header">
              <span className="schema-section-title">{field.section}</span>
              <div className="schema-section-line" />
            </div>
          );
        }

        const renderedField = renderField(field);

        if (!renderedField && !sectionHeader) return null;

        return (
          <React.Fragment key={`group-${field.id}`}>
            {sectionHeader}
            {renderedField}
          </React.Fragment>
        );
      })}

      {/* Form Action Buttons */}
      <div className="schema-form-actions">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="schema-btn-cancel"
          >
            {cancelText}
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="schema-btn-submit"
        >
          {isSubmitting && <Loader2 className="w-4 h-4" />}
          <span>{isSubmitting ? 'Submitting...' : submitText}</span>
        </button>
      </div>
    </form>
  );
}
