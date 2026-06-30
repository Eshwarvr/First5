"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth-provider";
import { useAuthStore } from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Heart, Settings, Shield, Award, MapPin, Phone, Info, Eye, LogOut, ChevronRight, Mail } from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"general" | "medical">("general");
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const medicalInfo = [
    { label: "Blood Group", value: "B+", alert: false },
    { label: "Allergies", value: "Penicillin, Peanuts", alert: true },
    { label: "Medical Conditions", value: "Asthma", alert: true },
    { label: "Current Medications", value: "Albuterol Inhaler", alert: false },
    { label: "Organ Donor", value: "Yes", alert: false },
    { label: "Emergency Contact", value: "+91 9876543210 (Mother)", alert: false },
  ];

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Header */}
      <div className="glass border-b border-white/5 px-6 h-16 flex items-center gap-4 sticky top-0 z-20">
        <Link href="/dashboard" className="text-white/60 hover:text-white">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="font-semibold">Profile</h1>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-6 border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4">
            <button className="text-white/40 hover:text-white transition-colors">
              <Settings size={20} />
            </button>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <div className="w-24 h-24 rounded-full emergency-gradient flex items-center justify-center text-4xl font-bold border-4 border-[#030712] shadow-xl">
                {user?.firstName?.[0] || 'P'}
              </div>
              <div className="text-center md:text-left flex-1">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                  <h1 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h1>
                  <div className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-semibold flex items-center gap-1 border border-blue-500/30">
                    <Shield size={10} />
                    Verified
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-white/60">
                  <div className="flex items-center gap-1.5"><Mail size={12} />{user?.email}</div>
                  <div className="flex items-center gap-1.5"><Phone size={12} />+91 {user?.phone}</div>
                  <div className="flex items-center gap-1.5"><MapPin size={12} />{user?.city || "Unknown Location"}</div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 w-full">
              <div className="flex-1 bg-white/5 rounded-2xl p-3 border border-white/5">
                <div className="text-xs text-white/40 mb-1">Status</div>
                <div className="text-emerald-400 font-semibold text-sm">Protected</div>
              </div>
              <div className="flex-1 bg-white/5 rounded-2xl p-3 border border-white/5">
                <div className="text-xs text-white/40 mb-1">Network</div>
                <div className="text-white font-semibold text-sm">Active</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Toggle */}
        <div className="flex rounded-2xl bg-white/5 p-1">
          <button
            onClick={() => setActiveTab("general")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === "general" ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/60"
            }`}
          >
            <User size={16} />
            General
          </button>
          <button
            onClick={() => setActiveTab("medical")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === "medical" ? "bg-red-500/20 text-red-400 shadow-sm" : "text-white/40 hover:text-red-400/60"
            }`}
          >
            <Heart size={16} />
            Medical Info
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "general" ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="glass rounded-2xl p-1 border border-white/5">
                <Link href="#" className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors">
                  <div className="flex items-center gap-3 text-white/80">
                    <Shield size={18} className="text-emerald-400" />
                    <span className="text-sm font-medium">Privacy & Security</span>
                  </div>
                  <ChevronRight size={16} className="text-white/30" />
                </Link>
                <div className="h-px bg-white/5 mx-4" />
                <Link href="/volunteer" className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors">
                  <div className="flex items-center gap-3 text-white/80">
                    <Award size={18} className="text-yellow-400" />
                    <span className="text-sm font-medium">Become a Volunteer</span>
                  </div>
                  <ChevronRight size={16} className="text-white/30" />
                </Link>
              </div>

              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors">
                <LogOut size={16} />
                Sign Out
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex gap-3 mb-6 text-sm">
                <Info size={20} className="text-red-400 flex-shrink-0" />
                <p className="text-white/70">
                  This information is encrypted and only shared with verified first responders during an active emergency.
                </p>
              </div>

              <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                {medicalInfo.map((info, idx) => (
                  <div key={idx}>
                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/5 transition-colors">
                      <div className="text-white/50 text-xs sm:text-sm">{info.label}</div>
                      <div className={`text-sm font-medium ${info.alert ? "text-red-400" : "text-white"}`}>
                        {info.value}
                      </div>
                    </div>
                    {idx < medicalInfo.length - 1 && <div className="h-px bg-white/5 mx-4" />}
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                 <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-white/10 bg-white/5 text-white/70 text-sm font-medium hover:bg-white/10 hover:text-white transition-colors">
                  <Eye size={16} />
                  View Smart Card
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl emergency-gradient text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  Edit Info
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
