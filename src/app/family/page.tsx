"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, UserPlus, PhoneCall, ShieldCheck, Heart, MapPin, Eye, Settings, ShieldAlert, Bell, LogOut, ChevronRight } from "lucide-react";
import { ProtectedRoute } from "@/components/auth-provider";

export default function FamilyPage() {
  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-[#030712] text-white flex flex-col">
       {/* Header */}
       <div className="glass border-b border-white/5 px-6 h-16 flex items-center gap-4 sticky top-0 z-20">
        <Link href="/dashboard" className="text-white/60 hover:text-white"><ArrowLeft size={22} /></Link>
        <h1 className="font-semibold">Family & Circle</h1>
        <div className="ml-auto">
           <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <UserPlus size={16} className="text-white" />
           </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full p-4 md:p-6 space-y-6">
         
         {/* Live Status Map (Mock) */}
         <div className="glass rounded-3xl p-1 border border-white/10 overflow-hidden relative h-48 flex items-center justify-center bg-[#0a0f1d]">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #3B82F6 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <div className="text-center relative z-10">
               <MapPin size={24} className="text-blue-400 mx-auto mb-2 opacity-50" />
               <p className="text-sm text-white/50">Live Family Tracking Active</p>
               <button className="mt-2 text-xs text-blue-400 hover:text-blue-300">View Full Map</button>
            </div>
         </div>

         {/* Members List */}
         <div>
            <h2 className="text-sm font-semibold text-white/60 mb-3 px-1 uppercase tracking-wider">Family Members</h2>
            <div className="space-y-3">
               
               {/* Member 1 */}
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-4 border border-white/5 flex items-center gap-4">
                  <div className="relative">
                     <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg font-bold border border-blue-500/30">
                        A
                     </div>
                     <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#030712]"></div>
                  </div>
                  <div className="flex-1">
                     <div className="font-semibold text-white text-sm">Arun Sharma</div>
                     <div className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                        <MapPin size={10} /> Home · Updated 2m ago
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10">
                        <PhoneCall size={14} className="text-white/70" />
                     </button>
                     <button className="w-9 h-9 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center hover:bg-red-500/20">
                        <ShieldAlert size={14} className="text-red-400" />
                     </button>
                  </div>
               </motion.div>

               {/* Member 2 */}
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-4 border border-white/5 flex items-center gap-4">
                  <div className="relative">
                     <div className="w-12 h-12 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center text-lg font-bold border border-pink-500/30">
                        M
                     </div>
                     <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-yellow-500 rounded-full border-2 border-[#030712]"></div>
                  </div>
                  <div className="flex-1">
                     <div className="font-semibold text-white text-sm">Meera Sharma</div>
                     <div className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                        <MapPin size={10} /> School · Updated 15m ago
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10">
                        <PhoneCall size={14} className="text-white/70" />
                     </button>
                  </div>
               </motion.div>

            </div>
         </div>

         {/* Circle Settings */}
         <div>
            <h2 className="text-sm font-semibold text-white/60 mb-3 px-1 uppercase tracking-wider mt-8">Circle Settings</h2>
            <div className="glass rounded-2xl border border-white/5 overflow-hidden">
               <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5">
                  <div className="flex items-center gap-3 text-white/80">
                     <MapPin size={18} className="text-blue-400" />
                     <div>
                        <div className="text-sm font-medium text-white">Location Sharing</div>
                        <div className="text-xs text-white/40">Always on for family</div>
                     </div>
                  </div>
                  <div className="w-10 h-6 bg-emerald-500/20 rounded-full relative border border-emerald-500/30">
                     <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-emerald-400"></div>
                  </div>
               </div>
               
               <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 text-white/80">
                     <Bell size={18} className="text-yellow-400" />
                     <div>
                        <div className="text-sm font-medium text-white">Safe Check-in Alerts</div>
                        <div className="text-xs text-white/40">Notify when arriving at Home/School</div>
                     </div>
                  </div>
                  <ChevronRight size={18} className="text-white/30" />
               </div>
            </div>
         </div>

      </div>
    </div>
    </ProtectedRoute>
  );
}
