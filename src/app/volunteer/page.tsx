"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth-provider";
import { ArrowLeft, Shield, Award, Activity, Target, Navigation, BellRing, HeartPulse, CheckCircle } from "lucide-react";

export default function VolunteerPage() {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-[#030712] text-white flex flex-col">
       {/* Header */}
       <div className="glass border-b border-white/5 px-6 h-16 flex items-center gap-4 sticky top-0 z-20">
        <Link href="/dashboard" className="text-white/60 hover:text-white"><ArrowLeft size={22} /></Link>
        <h1 className="font-semibold">Community Hero Hub</h1>
        <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-white/50">{isOnline ? "Online" : "Offline"}</span>
            <button 
               onClick={() => setIsOnline(!isOnline)}
               className={`w-12 h-6 rounded-full p-1 transition-colors ${isOnline ? 'bg-emerald-500' : 'bg-white/10'}`}
            >
               <motion.div 
                  className={`w-4 h-4 rounded-full bg-white shadow-sm`}
                  animate={{ x: isOnline ? 24 : 0 }}
               />
            </button>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-6 max-w-3xl mx-auto w-full space-y-6 overflow-y-auto">
         
         {/* Status Banner */}
         {isOnline ? (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
               <div className="flex-1">
                  <h3 className="text-emerald-400 font-semibold text-sm">You are active & visible</h3>
                  <p className="text-white/50 text-xs mt-0.5">Scanning for nearby emergencies within 2km radius.</p>
               </div>
            </motion.div>
         ) : (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-white/20" />
               <div className="flex-1">
                  <h3 className="text-white/60 font-semibold text-sm">You are currently offline</h3>
                  <p className="text-white/40 text-xs mt-0.5">Toggle status above to start receiving alerts.</p>
               </div>
            </div>
         )}

         {/* Stats Grid */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="glass rounded-2xl p-4 border border-white/5 text-center">
               <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center mx-auto mb-2">
                  <Shield size={16} />
               </div>
               <div className="text-xs text-white/40 mb-1">Rank</div>
               <div className="text-lg font-bold text-white">Gold Tier</div>
            </div>
             <div className="glass rounded-2xl p-4 border border-white/5 text-center">
               <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                  <HeartPulse size={16} />
               </div>
               <div className="text-xs text-white/40 mb-1">Rescues</div>
               <div className="text-lg font-bold text-white">42</div>
            </div>
            <div className="glass rounded-2xl p-4 border border-white/5 text-center">
               <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-2">
                  <Target size={16} />
               </div>
               <div className="text-xs text-white/40 mb-1">Avg Response</div>
               <div className="text-lg font-bold text-white">2.4 min</div>
            </div>
             <div className="glass rounded-2xl p-4 border border-white/5 text-center">
               <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-2">
                  <Award size={16} />
               </div>
               <div className="text-xs text-white/40 mb-1">Trust Score</div>
               <div className="text-lg font-bold text-white">98%</div>
            </div>
         </div>

         {/* Active Incident (Only show if online for demo) */}
         {isOnline && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-3xl p-5 border border-red-500/30 bg-gradient-to-br from-red-500/10 to-transparent relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />
               <div className="flex items-center gap-2 mb-3">
                  <div className="px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded uppercase tracking-wider animate-pulse">Critical Alert</div>
                  <span className="text-xs text-white/60">0.8 km away</span>
               </div>
               <h2 className="text-2xl font-bold text-white mb-1">Suspected Heart Attack</h2>
               <p className="text-white/60 text-sm mb-4">Elderly male. AI Confidence: 94%. Immediate CPR required.</p>
               
               <div className="flex gap-3">
                  <button className="flex-1 py-3.5 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold transition-colors flex items-center justify-center gap-2">
                     <CheckCircle size={18} /> Accept
                  </button>
                  <button className="w-14 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 transition-colors flex items-center justify-center">
                     ✕
                  </button>
               </div>
            </motion.div>
         )}

         {/* Certifications */}
         <div>
            <div className="flex items-center justify-between mb-3 px-1">
               <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider">Skills & Certifications</h2>
               <button className="text-xs text-blue-400 hover:text-blue-300">Add New</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
               <div className="glass rounded-2xl p-4 border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between">
                  <div>
                     <div className="font-semibold text-white text-sm">Basic Life Support (BLS)</div>
                     <div className="text-xs text-emerald-400 mt-0.5">Verified by Red Cross</div>
                  </div>
                  <CheckCircle size={18} className="text-emerald-500" />
               </div>
               <div className="glass rounded-2xl p-4 border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between">
                  <div>
                     <div className="font-semibold text-white text-sm">First Aid Provider</div>
                     <div className="text-xs text-emerald-400 mt-0.5">Verified by St. John</div>
                  </div>
                  <CheckCircle size={18} className="text-emerald-500" />
               </div>
            </div>
         </div>
         
      </div>
    </div>
    </ProtectedRoute>
  );
}
