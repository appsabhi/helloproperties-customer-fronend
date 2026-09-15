/**
 * Property Service for Customer Frontend
 * Base API URL: https://helloproperties-backend.vercel.app/api (Fallback: http://localhost:5000/api)
 */

const envApiUrl = typeof import.meta !== "undefined" && import.meta.env ? import.meta.env.VITE_API_BASE_URL : undefined;

export const API_BASE_URL =
  envApiUrl || "https://helloproperties-backend.vercel.app/api";


// Derive backend origin for serving static uploaded media (e.g., /uploads/...)
export const BACKEND_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

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
  const priceRaw = listingType === "Rent" ? monthlyRent : expectedPrice;
  
  // Resolve Image URL
  let rawImg = item.imageUrl || item.image_url || (Array.isArray(item.images) && item.images[0]) || item.image || "";
  const imageUrl = resolveImageUrl(rawImg);

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
    price: priceRaw,
    priceFormatted: formatPropertyPrice(priceRaw, listingType),
    landArea: item.area || item.landArea || item.land_area || "",
    builtUpArea: item.builtUpArea || item.built_up_area || null,
    bedrooms: item.bedrooms || null,
    bathrooms: item.bathrooms || null,
    imageUrl,
    images: Array.isArray(item.images) && item.images.length > 0 ? item.images.map(resolveImageUrl) : [imageUrl],
    status: item.status || "Available",
    isFeatured: Boolean(item.isFeatured || item.featured),
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
    
  const fallbackEndpoint = "http://localhost:5000/api/properties";
  
  const endpointsToTry = [primaryEndpoint];
  if (primaryEndpoint !== fallbackEndpoint) {
    endpointsToTry.push(fallbackEndpoint);
  }

  let lastError = null;

  for (const endpoint of endpointsToTry) {
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
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

      const properties = rawList.map((p, i) => normalizeProperty(p, i));
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

