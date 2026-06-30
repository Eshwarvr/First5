// Centralized nationwide mock data

export type Volunteer = { name: string; tier: string; distance?: string; eta?: string; skills: string[]; rating: number; online: boolean; rescues?: number; city: string; avatar?: string };

const ALL_VOLUNTEERS: Volunteer[] = [
  // Bengaluru
  { name: "Rajesh K.", tier: "gold", distance: "0.3 km", eta: "1:20", skills: ["CPR", "First Aid"], rating: 4.9, online: true, rescues: 47, city: "Bengaluru", avatar: "R" },
  { name: "Sneha M.", tier: "silver", distance: "0.8 km", eta: "2:45", skills: ["Nurse", "Trauma"], rating: 4.7, online: true, rescues: 24, city: "Bengaluru", avatar: "S" },
  { name: "Vikram S.", tier: "bronze", distance: "1.2 km", eta: "4:00", skills: ["Basic Aid"], rating: 4.5, online: false, rescues: 8, city: "Bengaluru", avatar: "V" },
  { name: "Amit P.", tier: "gold", distance: "1.5 km", eta: "5:00", skills: ["Doctor", "Trauma"], rating: 5.0, online: true, rescues: 112, city: "Bengaluru", avatar: "A" },
  
  // Mumbai
  { name: "Pooja D.", tier: "gold", distance: "0.5 km", eta: "2:10", skills: ["CPR", "Advanced First Aid"], rating: 4.9, online: true, rescues: 89, city: "Mumbai", avatar: "P" },
  { name: "Rahul S.", tier: "silver", distance: "1.1 km", eta: "3:30", skills: ["Paramedic"], rating: 4.8, online: true, rescues: 56, city: "Mumbai", avatar: "R" },
  { name: "Neha K.", tier: "bronze", distance: "2.0 km", eta: "6:00", skills: ["First Aid"], rating: 4.6, online: false, rescues: 12, city: "Mumbai", avatar: "N" },
  
  // Delhi
  { name: "Suresh S.", tier: "gold", distance: "0.4 km", eta: "1:50", skills: ["Doctor", "Trauma Care"], rating: 5.0, online: true, rescues: 145, city: "Delhi", avatar: "S" },
  { name: "Anjali G.", tier: "silver", distance: "0.9 km", eta: "3:10", skills: ["CPR", "Nurse"], rating: 4.8, online: true, rescues: 41, city: "Delhi", avatar: "A" },
  
  // Chennai
  { name: "Karthik R.", tier: "gold", distance: "0.6 km", eta: "2:30", skills: ["Paramedic", "First Aid"], rating: 4.9, online: true, rescues: 67, city: "Chennai", avatar: "K" },
  { name: "Meena M.", tier: "silver", distance: "1.4 km", eta: "4:15", skills: ["CPR"], rating: 4.7, online: true, rescues: 33, city: "Chennai", avatar: "M" },
];

export function getVolunteersByCity(city: string | undefined): Volunteer[] {
  if (!city) return ALL_VOLUNTEERS.filter(v => v.city === "Bengaluru");
  const normalizedCity = city.trim().toLowerCase();
  const matched = ALL_VOLUNTEERS.filter(v => v.city.toLowerCase() === normalizedCity);
  return matched.length > 0 ? matched : ALL_VOLUNTEERS.filter(v => v.city === "Bengaluru"); // fallback
}

export function getNationalLeaderboard(): Volunteer[] {
  return [...ALL_VOLUNTEERS].sort((a, b) => (b.rescues || 0) - (a.rescues || 0));
}

// SAFE PLACES
export type SafePlace = { name: string; type: string; lat: number; lng: number; phone: string; city: string };

const ALL_SAFE_PLACES: SafePlace[] = [
  // Bengaluru
  { name: "Apollo Hospital", type: "hospital", lat: 12.9352, lng: 77.6145, phone: "080-2630-4050", city: "Bengaluru" },
  { name: "Fortis Hospital", type: "hospital", lat: 12.9716, lng: 77.5946, phone: "1800-500-4321", city: "Bengaluru" },
  { name: "Koramangala Police", type: "police", lat: 12.9341, lng: 77.6269, phone: "080-2553-7777", city: "Bengaluru" },
  { name: "Indiranagar Fire", type: "fire", lat: 12.9784, lng: 77.6408, phone: "101", city: "Bengaluru" },
  
  // Mumbai
  { name: "Lilavati Hospital", type: "hospital", lat: 19.0503, lng: 72.8277, phone: "022-2675-1000", city: "Mumbai" },
  { name: "Bandra Police", type: "police", lat: 19.0553, lng: 72.8300, phone: "022-2642-3000", city: "Mumbai" },
  
  // Delhi
  { name: "AIIMS", type: "hospital", lat: 28.5672, lng: 77.2100, phone: "011-2658-8500", city: "Delhi" },
  { name: "Connaught Place Police", type: "police", lat: 28.6304, lng: 77.2177, phone: "011-2336-1234", city: "Delhi" },
];

export function getSafePlacesByCity(city: string | undefined): SafePlace[] {
  if (!city) return ALL_SAFE_PLACES.filter(v => v.city === "Bengaluru");
  const normalizedCity = city.trim().toLowerCase();
  const matched = ALL_SAFE_PLACES.filter(v => v.city.toLowerCase() === normalizedCity);
  return matched.length > 0 ? matched : ALL_SAFE_PLACES.filter(v => v.city === "Bengaluru");
}

// COMMUNITY FEEDS
export type FeedEvent = { id: string; author: string; role: string; type: string; title: string; desc: string; likes: number; comments: number; time: string; verified: boolean; city: string };

const ALL_FEEDS: FeedEvent[] = [
  // Bengaluru
  { id: "1", author: "Rajesh K.", role: "Gold Hero", type: "rescue", title: "Cardiac arrest response", desc: "Successfully administered CPR to a 55yo male in Koramangala. Ambulance arrived in 8 mins.", likes: 245, comments: 18, time: "2 hours ago", verified: true, city: "Bengaluru" },
  { id: "2", author: "First5 System", role: "Alert", type: "alert", title: "Heavy traffic blocking emergency lanes", desc: "Silk Board junction is highly congested. First responders please use alternate routes.", likes: 112, comments: 4, time: "4 hours ago", verified: true, city: "Bengaluru" },
  // Mumbai
  { id: "3", author: "Pooja D.", role: "Gold Hero", type: "rescue", title: "Road accident assistance", desc: "Provided first aid at Bandra intersection until medics arrived.", likes: 310, comments: 25, time: "1 hour ago", verified: true, city: "Mumbai" },
  // Delhi
  { id: "4", author: "Suresh S.", role: "Gold Hero", type: "training", title: "CPR Training Drive", desc: "Organized a free CPR training camp in Connaught Place. 50 new volunteers trained!", likes: 520, comments: 42, time: "1 day ago", verified: true, city: "Delhi" },
];

export function getFeedByCity(city: string | undefined): FeedEvent[] {
  if (!city) return ALL_FEEDS.filter(v => v.city === "Bengaluru");
  const normalizedCity = city.trim().toLowerCase();
  const matched = ALL_FEEDS.filter(v => v.city.toLowerCase() === normalizedCity);
  return matched.length > 0 ? matched : ALL_FEEDS.filter(v => v.city === "Bengaluru");
}
