import React, { useState } from 'react';
import './PropertyKeywordsSelector.css';
import { Sparkles, Plus, Check, X } from './Icons';

const DEFAULT_KEYWORDS = [
  'Tar Road Frontage',
  'Clear Title Deed',
  'Well Water Available',
  'Corner Plot',
  'Price Negotiable',
  'Residential Zone',
  'Commercial Zone',
  'Near National Highway',
  'Compound Wall Built',
  '24/7 Water Supply',
  'Panchayat Approval',
  'Bank Loan Available',
  'Gated Community',
  'East Facing',
  'Immediate Registration',
  'Close to School & Hospital'
];

export default function PropertyKeywordsSelector({ value = '', onChange }) {
  const [customKeyword, setCustomKeyword] = useState('');
  const [showAddCustom, setShowAddCustom] = useState(false);

  // Helper to determine if keyword is in current text
  const isSelected = (keyword) => {
    if (!value) return false;
    const regex = new RegExp(`(^|[,\\n•\\-]\\s*)${keyword.replace(/[-\\/\\\\^$*+?.()|[\\]{}]/g, '\\$&')}(\\s*[,\\n]|\$)`, 'i');
    return regex.test(value) || value.toLowerCase().includes(keyword.toLowerCase());
  };

  const toggleKeyword = (keyword) => {
    let currentText = value || '';
    if (isSelected(keyword)) {
      // Remove keyword cleanly
      const cleanRegex = new RegExp(`(,\\s*)?${keyword.replace(/[-\\/\\\\^$*+?.()|[\\]{}]/g, '\\$&')}(\\s*,)?`, 'gi');
      let updated = currentText.replace(cleanRegex, (match, p1, p2) => {
        if (p1 && p2) return ', ';
        return '';
      }).trim();
      updated = updated.replace(/^,\s*/, '').replace(/,\s*$/, '').trim();
      onChange(updated);
    } else {
      // Add keyword
      let updated = currentText.trim();
      if (updated.length > 0) {
        if (!updated.endsWith('.') && !updated.endsWith(',')) {
          updated += ', ' + keyword;
        } else if (updated.endsWith(',')) {
          updated += ' ' + keyword;
        } else {
          updated += ' ' + keyword;
        }
      } else {
        updated = keyword;
      }
      onChange(updated);
    }
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    const trimmed = customKeyword.trim();
    if (trimmed) {
      toggleKeyword(trimmed);
      setCustomKeyword('');
      setShowAddCustom(false);
    }
  };

  return (
    <div className="keywords-selector-container">
      <div className="keywords-header-row">
        <div className="keywords-label">
          <Sparkles className="w-3.5 h-3.5 text-[#B0004F]" />
          <span>Quick Highlights & Key Features:</span>
        </div>
        {!showAddCustom ? (
          <button
            type="button"
            onClick={() => setShowAddCustom(true)}
            className="keywords-add-custom-btn"
          >
            <Plus className="w-3 h-3" />
            <span>Add Custom</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowAddCustom(false)}
            className="keywords-add-custom-btn"
            style={{ color: '#64748B' }}
          >
            <X className="w-3 h-3" />
            <span>Cancel</span>
          </button>
        )}
      </div>

      {showAddCustom && (
        <div className="keywords-custom-form">
          <input
            type="text"
            value={customKeyword}
            onChange={(e) => setCustomKeyword(e.target.value)}
            placeholder="Type custom feature and press Enter..."
            className="keywords-custom-input"
            autoFocus
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.stopPropagation();
                handleAddCustom(event);
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddCustom}
            disabled={!customKeyword.trim()}
            className="keywords-custom-submit-btn"
          >
            Add
          </button>
        </div>
      )}

      <div className="keywords-chips-grid">
        {DEFAULT_KEYWORDS.map((keyword) => {
          const active = isSelected(keyword);
          return (
            <button
              key={keyword}
              type="button"
              onClick={() => toggleKeyword(keyword)}
              className={`keyword-chip-btn ${active ? 'active' : ''}`}
            >
              <span className="keyword-chip-icon">
                {active ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Plus className="w-2.5 h-2.5" />
                )}
              </span>
              <span>{keyword}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
