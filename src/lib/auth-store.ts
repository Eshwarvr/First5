import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  role: string;
  bloodGroup?: string;
  age?: string;
  allergies?: string;
  conditions?: string;
  emergencyContact?: string;
  isGuest: boolean;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  signup: (userData: Omit<AuthUser, "isGuest">) => void;
  loginAsGuest: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email: string, _password: string) => {
        // Extract name from email for display
        const namePart = email.split("@")[0];
        const firstName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        set({
          user: {
            firstName,
            lastName: "",
            email,
            phone: "",
            city: "",
            role: "citizen",
            isGuest: false,
          },
          isAuthenticated: true,
        });
      },

      signup: (userData) => {
        set({
          user: { ...userData, isGuest: false },
          isAuthenticated: true,
        });
      },

      loginAsGuest: () => {
        set({
          user: {
            firstName: "Guest",
            lastName: "",
            email: "",
            phone: "",
            city: "",
            role: "citizen",
            isGuest: true,
          },
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "first5-auth",
    }
  )
);
