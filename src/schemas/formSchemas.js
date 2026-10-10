/**
 * Schema-driven form definitions for Customer-facing forms:
 * 1. sellPropertyFormSchema: Dedicated "Want to Sell Your Property?" Form (Fixed to Sale)
 * 2. rentPropertyFormSchema: Dedicated "Want to Rent Your Property?" Form (Fixed to Rent)
 * 3. buyerRequirementFormSchema: Dedicated "Looking for a Property?" Form (Buy or Rent)
 * 
 * Also exports sellPropertySchema and buyRequirementSchema for backwards compatibility.
 */

export const PROPERTY_TYPES = [
  'Residential Land / Plot',
  'Commercial Land / Plot',
  'Independent House / Villa',
  'Apartment / Flat',
  'Commercial Building / Office',
  'Shop / Showroom',
  'Agricultural Land / Farm',
  'Industrial Land / Warehouse'
];

export const AREA_UNITS = [
  'Cent',
  'Sq. Ft.',
  'Acre',
  'Sq. Meter',
  'Sq. Yard',
  'Ground',
  'Guntha'
];

export const PRICE_UNITS = [
  'Total Amount',
  '/ Cent',
  '/ Sq. Ft.',
  '/ Acre',
  '/ Month',
  '/ Sq. Meter',
  '/ Year'
];

export const CUSTOMER_SOURCES = [
  'Google Search',
  'Social Media (Instagram / Facebook)',
  'Friends or Family Referral',
  'Newspaper or Hoarding',
  'Property Portal',
  'Other'
];

/**
 * 1. Dedicated SELL PROPERTY Form Schema (Fixed to Sale)
 * Reproduces Admin Sell Property layout & fields adapted for customer use.
 */
export const sellPropertyFormSchema = [
  // --- Section: Property Information ---
  {
    id: 'propertyTitle',
    label: 'Property Title / Headline',
    type: 'text',
    section: 'Property Information',
    placeholder: 'e.g. 10 Cents Residential Plot near Metro Station, Kakkanad',
    required: true,
    defaultValue: ''
  },
  {
    id: 'propertyType',
    label: 'Property Type',
    type: 'select',
    required: true,
    defaultValue: 'Residential Land / Plot',
    options: PROPERTY_TYPES
  },

  // --- Section: Location & Address ---
  {
    id: 'location',
    label: 'Property Locality / Area',
    type: 'location_selector',
    section: 'Location & Address',
    required: true,
    allowMultiple: false,
    defaultValue: {
      state: 'Kerala',
      district: 'Ernakulam',
      locality: '',
      address: '',
      pincode: ''
    }
  },

  // --- Section: Specifications & Pricing ---
  {
    id: 'area',
    label: 'Plot / Built-up Area',
    type: 'number',
    section: 'Specifications & Pricing',
    required: true,
    defaultValue: '',
    hasUnit: true,
    unitId: 'areaUnit',
    unitOptions: AREA_UNITS,
    defaultUnit: 'Cent'
  },
  {
    id: 'expectedPrice',
    label: 'Expected Sale Price (₹)',
    type: 'number',
    required: true,
    defaultValue: '',
    hasUnit: true,
    unitId: 'expectedPriceUnit',
    unitOptions: ['Total Amount', '/ Cent', '/ Sq. Ft.', '/ Acre', '/ Sq. Meter'],
    defaultUnit: 'Total Amount',
    isPricePerArea: true
  },

  // --- Section: Description & Features ---
  {
    id: 'description',
    label: 'Property Description',
    type: 'textarea',
    section: 'Description & Highlights',
    placeholder: 'Describe key property features, road frontage, water supply, neighborhood, landmarks...',
    required: true,
    defaultValue: '',
    hasKeywords: true
  },

  // --- Section: Media & Walkthrough ---
  {
    id: 'images',
    label: 'Property Photos',
    type: 'image',
    section: 'Photos & Video',
    required: false,
    defaultValue: []
  },
  {
    id: 'video',
    label: 'Property Video / YouTube Walkthrough',
    type: 'video',
    required: false,
    defaultValue: null
  },

  // --- Section: Owner Information ---
  {
    id: 'fullName',
    label: 'Owner Full Name',
    type: 'text',
    section: 'Owner & Contact Information',
    required: true,
    defaultValue: ''
  },
  {
    id: 'phoneNumber',
    label: 'Phone / WhatsApp Number',
    type: 'tel',
    required: true,
    defaultValue: ''
  },
  {
    id: 'ownerAddress',
    label: 'Owner Contact Address / City',
    type: 'text',
    required: false,
    defaultValue: '',
    placeholder: 'e.g. Kochi, Kerala'
  },
  {
    id: 'email',
    label: 'Email Address',
    type: 'text',
    required: false,
    defaultValue: ''
  }
];

/**
 * 2. Dedicated RENT PROPERTY Form Schema (Fixed to Rent)
 * Reproduces Admin Rent Property layout & fields adapted for customer use.
 */
export const rentPropertyFormSchema = [
  // --- Section: Property Information ---
  {
    id: 'propertyTitle',
    label: 'Property Title / Headline',
    type: 'text',
    section: 'Property Information',
    placeholder: 'e.g. 3 BHK Luxury Villa for Rent near InfoPark, Kakkanad',
    required: true,
    defaultValue: ''
  },
  {
    id: 'propertyType',
    label: 'Property Type',
    type: 'select',
    required: true,
    defaultValue: 'Independent House / Villa',
    options: PROPERTY_TYPES
  },

  // --- Section: Location & Address ---
  {
    id: 'location',
    label: 'Property Locality / Area',
    type: 'location_selector',
    section: 'Location & Address',
    required: true,
    allowMultiple: false,
    defaultValue: {
      state: 'Kerala',
      district: 'Ernakulam',
      locality: '',
      address: '',
      pincode: ''
    }
  },

  // --- Section: Specifications & Rent Pricing ---
  {
    id: 'area',
    label: 'Built-up / Plot Area',
    type: 'number',
    section: 'Specifications & Rent Pricing',
    required: true,
    defaultValue: '',
    hasUnit: true,
    unitId: 'areaUnit',
    unitOptions: AREA_UNITS,
    defaultUnit: 'Sq. Ft.'
  },
  {
    id: 'monthlyRent',
    label: 'Expected Monthly Rent (₹)',
    type: 'number',
    required: true,
    defaultValue: '',
    hasUnit: true,
    unitId: 'monthlyRentUnit',
    unitOptions: ['/ Month', '/ Year'],
    defaultUnit: '/ Month'
  },
  {
    id: 'securityDeposit',
    label: 'Security Deposit (₹)',
    type: 'number',
    required: false,
    defaultValue: '',
    placeholder: 'e.g. 50000'
  },

  // --- Section: Description & Features ---
  {
    id: 'description',
    label: 'Rental Property Description',
    type: 'textarea',
    section: 'Description & Highlights',
    placeholder: 'Describe furnishing, amenities, car parking, power backup, water supply, lease terms...',
    required: true,
    defaultValue: '',
    hasKeywords: true
  },

  // --- Section: Media & Walkthrough ---
  {
    id: 'images',
    label: 'Property Photos',
    type: 'image',
    section: 'Photos & Video',
    required: false,
    defaultValue: []
  },
  {
    id: 'video',
    label: 'Property Video / YouTube Walkthrough',
    type: 'video',
    required: false,
    defaultValue: null
  },

  // --- Section: Owner Information ---
  {
    id: 'fullName',
    label: 'Owner Full Name',
    type: 'text',
    section: 'Owner & Contact Information',
    required: true,
    defaultValue: ''
  },
  {
    id: 'phoneNumber',
    label: 'Phone / WhatsApp Number',
    type: 'tel',
    required: true,
    defaultValue: ''
  },
  {
    id: 'ownerAddress',
    label: 'Owner Contact Address / City',
    type: 'text',
    required: false,
    defaultValue: '',
    placeholder: 'e.g. Kochi, Kerala'
  },
  {
    id: 'email',
    label: 'Email Address',
    type: 'text',
    required: false,
    defaultValue: ''
  }
];

/**
 * 3. Dedicated BUYER REQUIREMENT Form Schema
 * Excludes internal admin fields:
 * - buyerStatus
 * - enquirySource
 * - interestedProperty
 */
export const buyerRequirementFormSchema = [
  // --- Section: Requirement Type ---
  {
    id: 'requirementType',
    label: 'Requirement Type',
    type: 'select',
    section: 'Requirement Overview',
    required: true,
    defaultValue: 'Buy',
    options: [
      { label: 'Looking to Buy Property', value: 'Buy' },
      { label: 'Looking to Rent / Lease Property', value: 'Rent' }
    ]
  },
  {
    id: 'requirementTitle',
    label: 'Requirement Title / Headline',
    type: 'text',
    placeholder: 'e.g. Looking for 3 BHK Villa in Kochi under ₹1.5 Cr',
    required: true,
    defaultValue: ''
  },
  {
    id: 'propertyType',
    label: 'Required Property Type',
    type: 'select',
    required: true,
    defaultValue: 'Residential Land / Plot',
    options: PROPERTY_TYPES
  },

  // --- Section: Target Locations ---
  {
    id: 'preferredLocations',
    label: 'Preferred Locality / Area',
    type: 'location_selector',
    section: 'Preferred Locations',
    required: true,
    allowMultiple: true,
    defaultValue: []
  },

  // --- Section: Budget & Specifications ---
  {
    id: 'requiredArea',
    label: 'Required Area / Size',
    type: 'number',
    section: 'Budget & Size Requirements',
    required: false,
    defaultValue: '',
    hasUnit: true,
    unitId: 'requiredAreaUnit',
    unitOptions: AREA_UNITS,
    defaultUnit: 'Cent'
  },
  {
    id: 'budget',
    label: 'Maximum Purchase Budget (₹)',
    type: 'number',
    required: true,
    defaultValue: '',
    hasUnit: true,
    unitId: 'budgetUnit',
    unitOptions: ['Total Amount', '/ Cent', '/ Sq. Ft.', '/ Acre'],
    defaultUnit: 'Total Amount',
    isPricePerArea: true,
    showIf: (formData) => formData.requirementType === 'Buy'
  },
  {
    id: 'maxMonthlyRent',
    label: 'Maximum Monthly Rent (₹)',
    type: 'number',
    required: true,
    defaultValue: '',
    hasUnit: true,
    unitId: 'maxMonthlyRentUnit',
    unitOptions: ['/ Month', '/ Year'],
    defaultUnit: '/ Month',
    showIf: (formData) => formData.requirementType === 'Rent'
  },
  {
    id: 'urgencyTimeline',
    label: 'Purchase / Move-in Timeline',
    type: 'select',
    required: false,
    defaultValue: 'Within 1-3 Months',
    options: [
      'Immediate (Within 15 days)',
      'Within 1 Month',
      'Within 1-3 Months',
      'Within 3-6 Months',
      'Just exploring options'
    ]
  },

  // --- Section: Remarks & Preferences ---
  {
    id: 'description',
    label: 'Specific Requirements & Remarks',
    type: 'textarea',
    section: 'Preferences & Remarks',
    placeholder: 'Mention any specific road frontage, water source, budget flexibility, amenities, or nearby landmarks...',
    required: false,
    defaultValue: '',
    hasKeywords: true
  },

  // --- Section: Buyer Contact Information ---
  {
    id: 'fullName',
    label: 'Your Full Name',
    type: 'text',
    section: 'Buyer Information',
    required: true,
    defaultValue: ''
  },
  {
    id: 'phoneNumber',
    label: 'Phone / WhatsApp Number',
    type: 'tel',
    required: true,
    defaultValue: ''
  },
  {
    id: 'buyerAddress',
    label: 'Current Address / City',
    type: 'text',
    required: false,
    defaultValue: '',
    placeholder: 'e.g. Ernakulam, Kerala'
  },
  {
    id: 'email',
    label: 'Email Address',
    type: 'text',
    required: false,
    defaultValue: ''
  }
];

// Backwards compatibility aliases
export const sellPropertySchema = sellPropertyFormSchema;
export const buyRequirementSchema = buyerRequirementFormSchema;
