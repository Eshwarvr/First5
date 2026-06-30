export const INDIA_CITIES: Record<string, { lat: number; lng: number }> = {
  "Bengaluru": { lat: 12.9716, lng: 77.5946 },
  "Mumbai": { lat: 19.0760, lng: 72.8777 },
  "Delhi": { lat: 28.7041, lng: 77.1025 },
  "Chennai": { lat: 13.0827, lng: 80.2707 },
  "Hyderabad": { lat: 17.3850, lng: 78.4867 },
  "Kolkata": { lat: 22.5726, lng: 88.3639 },
  "Pune": { lat: 18.5204, lng: 73.8567 },
  "Ahmedabad": { lat: 23.0225, lng: 72.5714 },
};

export function getCityCoordinates(city: string | undefined): { lat: number; lng: number } {
  if (!city) return INDIA_CITIES["Bengaluru"]; // Default fallback
  
  // Try to match the city name loosely
  const normalizedCity = city.trim().toLowerCase();
  for (const [key, coords] of Object.entries(INDIA_CITIES)) {
    if (key.toLowerCase() === normalizedCity) {
      return coords;
    }
  }
  
  // If city not found, default to Bengaluru for the mock data
  return INDIA_CITIES["Bengaluru"];
}
