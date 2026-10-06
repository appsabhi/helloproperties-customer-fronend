/**
 * Property Service for Customer Frontend
 * Uses the configured backend consistently across desktop and mobile.
 */

const envApiUrl = typeof import.meta !== "undefined" && import.meta.env ? import.meta.env.VITE_API_BASE_URL : undefined;

const configuredApiUrl =
  (envApiUrl?.trim() || "https://helloproperties-backend.vercel.app/api").replace(/\/+$/, "");

// Vite proxies development requests so LAN devices do not need backend CORS entries.
export const API_BASE_URL = import.meta.env?.DEV ? "/api" : configuredApiUrl;

// Derive backend origin for serving static uploaded media (e.g., /uploads/...)
export const BACKEND_ORIGIN = configuredApiUrl.replace(/\/api\/?$/, "");

/**
 * Resolves full image URL for relative backend paths (/uploads/...) or returns absolute URLs.
 */
export function resolveImageUrl(url) {
  if (!url || typeof url !== "string") {
    return "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85";
  }
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }
  if (url.startsWith("/")) {
    return `${BACKEND_ORIGIN}${url}`;
  }
  return `${BACKEND_ORIGIN}/${url}`;
}

/**
 * Helper to format Indian Rupee prices for Sale / Rent
 */
export function formatPropertyPrice(price, listingType = "Sale") {
  const num = Number(price || 0);
  if (!num || isNaN(num) || num <= 0) return "Price on Request";

  if (listingType === "Rent" || listingType === "rent") {
    return `₹${num.toLocaleString("en-IN")}/mo`;
  }

  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2).replace(/\.00$/, "")} Cr`;
  } else if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2).replace(/\.00$/, "")} Lakhs`;
  } else {
    return `₹${num.toLocaleString("en-IN")}`;
  }
}

/**
 * Normalizes property objects returned from backend PostgreSQL API
 */
export function normalizeProperty(item, index = 0) {
  const id = item.id || item._id || item.propertyId || `prop-${index + 1}`;
  const listingType = item.listingType || item.listing_type || (item.monthly_rent > 0 || item.monthlyRent > 0 ? "Rent" : "Sale");
  const expectedPrice = item.expectedPrice !== undefined ? Number(item.expectedPrice) : Number(item.expected_price || 0);
  const monthlyRent = item.monthlyRent !== undefined ? Number(item.monthlyRent) : Number(item.monthly_rent || 0);
  const securityDeposit = item.securityDeposit !== undefined ? Number(item.securityDeposit) : Number(item.security_deposit || 0);
  const priceRaw = listingType === "Rent" ? monthlyRent : expectedPrice;
  
  // Resolve Image URLs (handle comma-separated strings from backend)
  let rawImagesList = [];
  if (Array.isArray(item.images) && item.images.length > 0) {
    rawImagesList = item.images;
  } else if (typeof item.imageUrl === 'string' && item.imageUrl.includes(',')) {
    rawImagesList = item.imageUrl.split(',').map(s => s.trim()).filter(Boolean);
  } else if (typeof item.image_url === 'string' && item.image_url.includes(',')) {
    rawImagesList = item.image_url.split(',').map(s => s.trim()).filter(Boolean);
  } else if (item.imageUrl || item.image_url || item.image) {
    rawImagesList = [item.imageUrl || item.image_url || item.image];
  }

  const images = rawImagesList.length > 0 ? rawImagesList.map(resolveImageUrl) : [resolveImageUrl("")];
  const imageUrl = images[0];

  const propType = item.propertyType || item.property_type || item.category || "Plot/Land";

  return {
    id,
    _id: id,
    propertyId: item.propertyId || item.property_id || String(id),
    title: item.title || item.name || "Property Listing",
    description: item.description || "",
    listingType,
    propertyType: propType,
    category: propType,
    location: item.location || "",
    district: item.district || "",
    state: item.state || "",
    expectedPrice,
    monthlyRent,
    securityDeposit,
    price: priceRaw,
    priceFormatted: formatPropertyPrice(priceRaw, listingType),
    landArea: item.area || item.landArea || item.land_area || "",
    builtUpArea: item.builtUpArea || item.built_up_area || null,
    bedrooms: item.bedrooms || null,
    bathrooms: item.bathrooms || null,
    videoUrl: item.videoUrl || item.video_url || null,
    lat: (item.latitude || item.lat) ? parseFloat(item.latitude || item.lat) : null,
    lng: (item.longitude || item.lng) ? parseFloat(item.longitude || item.lng) : null,
    imageUrl,
    images,
    status: (!item.status || item.status.toLowerCase() === 'active') ? "Available" : item.status,
    isFeatured: Boolean(item.isFeatured || item.featured),
    isActive: item.isActive !== undefined ? Boolean(item.isActive) : (item.is_active !== undefined ? Boolean(item.is_active) : true),
    createdAt: item.createdAt || item.created_at || new Date().toISOString(),
  };
}

/**
 * Fetches real properties from PostgreSQL backend API
 * Does NOT return mock property data.
 */
export async function fetchProperties() {
  const primaryEndpoint = API_BASE_URL.endsWith("/properties")
    ? API_BASE_URL
    : `${API_BASE_URL.replace(/\/$/, "")}/properties`;
    
  const endpointsToTry = [primaryEndpoint];

  let lastError = null;

  for (const endpoint of endpointsToTry) {
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        lastError = `HTTP ${response.status}: ${response.statusText}`;
        continue;
      }

      const data = await response.json();
      let rawList = [];

      if (Array.isArray(data)) {
        rawList = data;
      } else if (data && Array.isArray(data.data)) {
        rawList = data.data;
      } else if (data && Array.isArray(data.properties)) {
        rawList = data.properties;
      } else if (data && Array.isArray(data.listings)) {
        rawList = data.listings;
      }

      const properties = rawList
        .map((p, i) => normalizeProperty(p, i))
        .filter(p => p.isActive !== false && (p.status || "").toLowerCase() !== "inactive");
      return { success: true, properties };
    } catch (error) {
      console.warn(`fetchProperties failed for ${endpoint}:`, error.message);
      lastError = error.message;
    }
  }

  return {
    success: false,
    properties: [],
    error: lastError || "Failed to retrieve live properties from database",
  };
}

/**
 * Submits buyer requirement to POST /api/buy-requirements
 */
export async function submitRequirement(requirementData) {
  try {
    const response = await fetch(`${API_BASE_URL}/buy-requirements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requirementData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || data.message || "Failed to submit requirement");
    }

    return { success: true, data };
  } catch (error) {
    console.error("submitRequirement error:", error.message);
    return { success: false, error: error.message };
  }
}

