"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth-provider";
import { useAuthStore } from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Bell, Shield, Moon, Globe, LogOut, ChevronRight, Fingerprint, Lock, HelpCircle } from "lucide-react";

export default function SettingsPage() {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#030712] text-white flex flex-col">
         {/* Header */}
         <div className="glass border-b border-white/5 px-6 h-16 flex items-center gap-4 sticky top-0 z-20">
          <Link href="/dashboard" className="text-white/60 hover:text-white"><ArrowLeft size={22} /></Link>
          <h1 className="font-semibold">Settings</h1>
        </div>

        <div className="max-w-2xl mx-auto w-full p-4 md:p-6 space-y-6">
           
           {/* Profile summary */}
           <Link href="/medical-profile" className="glass rounded-3xl p-5 border border-white/10 flex items-center gap-4 hover:border-white/20 transition-colors">
              <div className="w-16 h-16 rounded-full emergency-gradient flex items-center justify-center text-xl font-bold text-white">
                 P
              </div>
              <div className="flex-1">
                 <h2 className="text-xl font-bold text-white mb-0.5">Priya Sharma</h2>
                 <p className="text-sm text-white/50">+91 9876543210</p>
              </div>
              <ChevronRight size={20} className="text-white/30" />
           </Link>

           {/* Settings Sections */}
           <div className="space-y-6">
              
              {/* Account */}
              <div>
                 <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3 px-2">Account</h3>
                 <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                    <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5">
                       <div className="flex items-center gap-3 text-white/80">
                          <Lock size={18} className="text-blue-400" />
                          <span className="text-sm font-medium">Privacy & Data</span>
                       </div>
                       <ChevronRight size={18} className="text-white/30" />
                    </div>
                     <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5">
                       <div className="flex items-center gap-3 text-white/80">
                          <Shield size={18} className="text-emerald-400" />
                          <span className="text-sm font-medium">Security</span>
                       </div>
                       <ChevronRight size={18} className="text-white/30" />
                    </div>
                    <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer">
                       <div className="flex items-center gap-3 text-white/80">
                          <Fingerprint size={18} className="text-purple-400" />
                          <span className="text-sm font-medium">Biometric Login</span>
                       </div>
                       <div className="w-10 h-6 bg-emerald-500/20 rounded-full relative border border-emerald-500/30">
                          <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-emerald-400"></div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* App Settings */}
              <div>
                 <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3 px-2">App Settings</h3>
                 <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                    <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5">
                       <div className="flex items-center gap-3 text-white/80">
                          <Bell size={18} className="text-yellow-400" />
                          <span className="text-sm font-medium">Notifications</span>
                       </div>
                       <ChevronRight size={18} className="text-white/30" />
                    </div>
                     <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5">
                       <div className="flex items-center gap-3 text-white/80">
                          <Globe size={18} className="text-blue-400" />
                          <span className="text-sm font-medium">Language</span>
                       </div>
                       <div className="flex items-center gap-2 text-white/40 text-sm">
                          English <ChevronRight size={18} />
                       </div>
                    </div>
                    <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer">
                       <div className="flex items-center gap-3 text-white/80">
                          <Moon size={18} className="text-gray-400" />
                          <span className="text-sm font-medium">Dark Mode</span>
                       </div>
                       <div className="flex items-center gap-2 text-white/40 text-sm">
                          System <ChevronRight size={18} />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Support */}
              <div>
                 <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3 px-2">Support</h3>
                 <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                    <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5">
                       <div className="flex items-center gap-3 text-white/80">
                          <HelpCircle size={18} className="text-white/60" />
                          <span className="text-sm font-medium">Help Center</span>
                       </div>
                       <ChevronRight size={18} className="text-white/30" />
                    </div>
                    <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer">
                       <div className="flex items-center gap-3 text-white/80">
                          <span className="text-sm font-medium text-white/60 pl-[30px]">About First5</span>
                       </div>
                       <span className="text-xs text-white/30">v1.0.0</span>
                    </div>
                 </div>
              </div>

           </div>

           {/* Logout */}
           <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors mt-8">
              <LogOut size={18} />
              Sign Out
           </button>

        </div>
      </div>
    </ProtectedRoute>
  );
}
