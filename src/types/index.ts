// Shared TypeScript types for First5

export type UserRole = "citizen" | "volunteer" | "hospital" | "admin";

export type EmergencyType =
  | "heart_attack"
  | "stroke"
  | "fall"
  | "accident"
  | "fire"
  | "robbery"
  | "violence"
  | "child_missing"
  | "flood"
  | "gas_leak"
  | "snake_bite"
  | "animal_attack"
  | "earthquake"
  | "suicide_prevention"
  | "road_accident"
  | "medical"
  | "women_safety"
  | "elder_emergency"
  | "other";

export type EmergencyStatus =
  | "active"
  | "responding"
  | "resolved"
  | "cancelled";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type VolunteerTier =
  | "bronze"
  | "silver"
  | "gold"
  | "diamond"
  | "legend";

export interface LatLng {
  lat: number;
  lng: number;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  photoURL?: string;
  role: UserRole;
  location?: LatLng;
  medicalProfile?: MedicalProfile;
  emergencyContacts?: EmergencyContact[];
  createdAt: Date;
}

export interface MedicalProfile {
  bloodGroup: string;
  allergies: string[];
  conditions: string[];
  medications: string[];
  height?: string;
  weight?: string;
  age?: number;
  organDonor: boolean;
  insuranceInfo?: string;
  hospitalPreference?: string;
  emergencyNotes?: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

export interface Emergency {
  id: string;
  type: EmergencyType;
  status: EmergencyStatus;
  riskLevel: RiskLevel;
  location: LatLng;
  address: string;
  reportedBy: string;
  reportedAt: Date;
  description?: string;
  aiConfidence?: number;
  aiSummary?: string;
  responderId?: string;
  responderETA?: number;
  hospitalId?: string;
  hospitalETA?: number;
  resolvedAt?: Date;
}

export interface Volunteer {
  uid: string;
  name: string;
  photoURL?: string;
  tier: VolunteerTier;
  xp: number;
  completedRescues: number;
  successRate: number;
  trustScore: number;
  isAvailable: boolean;
  location?: LatLng;
  distance?: number;
  eta?: number;
  badges: Badge[];
  certifications: string[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: Date;
}

export interface CommunityReport {
  id: string;
  type: string;
  title: string;
  description: string;
  location: LatLng;
  address: string;
  photoURL?: string;
  reportedBy: string;
  reportedAt: Date;
  upvotes: number;
  isVerified: boolean;
}

export interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  description: string;
  icon: string;
  city: string;
  windSpeed: number;
}
