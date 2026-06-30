import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)}m`;
  return `${(meters / 1000).toFixed(1)}km`;
}

export function getEmergencyColor(type: string): string {
  const colors: Record<string, string> = {
    heart_attack: "#FF2D55",
    stroke: "#FF3B30",
    fall: "#FF9500",
    accident: "#FF6B35",
    fire: "#FF2D00",
    robbery: "#8B5CF6",
    violence: "#DC2626",
    child_missing: "#F59E0B",
    flood: "#3B82F6",
    gas_leak: "#EF4444",
    snake_bite: "#10B981",
    medical: "#FF2D55",
    women_safety: "#EC4899",
    elder_emergency: "#F97316",
    other: "#6B7280",
  };
  return colors[type] || "#FF2D55";
}

export function getEmergencyLabel(type: string): string {
  const labels: Record<string, string> = {
    heart_attack: "Heart Attack",
    stroke: "Stroke",
    fall: "Fall Injury",
    accident: "Accident",
    fire: "Fire Emergency",
    robbery: "Robbery",
    violence: "Violence",
    child_missing: "Child Missing",
    flood: "Flood",
    gas_leak: "Gas Leak",
    snake_bite: "Snake Bite",
    animal_attack: "Animal Attack",
    earthquake: "Earthquake",
    suicide_prevention: "Mental Health Crisis",
    road_accident: "Road Accident",
    medical: "Medical Emergency",
    women_safety: "Women Safety",
    elder_emergency: "Elder Emergency",
    other: "Other Emergency",
  };
  return labels[type] || "Emergency";
}

export function getRiskColor(level: string): string {
  const colors: Record<string, string> = {
    low: "#10B981",
    medium: "#F59E0B",
    high: "#EF4444",
    critical: "#DC2626",
  };
  return colors[level] || "#EF4444";
}

export function getVolunteerTierColor(tier: string): string {
  const colors: Record<string, string> = {
    bronze: "#CD7F32",
    silver: "#C0C0C0",
    gold: "#FFD700",
    diamond: "#B9F2FF",
    legend: "#FF6B35",
  };
  return colors[tier] || "#CD7F32";
}

export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
