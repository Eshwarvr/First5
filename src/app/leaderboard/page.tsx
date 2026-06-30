"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth-provider";
import { ArrowLeft, Trophy, Star, Award, Shield, Zap, ChevronRight, TrendingUp, Users, Clock } from "lucide-react";

const volunteers = [
  { rank: 1, name: "Rajesh Kumar", city: "Bengaluru", tier: "legend", xp: 48920, rescues: 234, rating: 4.98, badge: "🏆", avatar: "RK" },
  { rank: 2, name: "Dr. Priya Menon", city: "Chennai", tier: "diamond", xp: 41200, rescues: 198, rating: 4.95, badge: "💎", avatar: "PM" },
  { rank: 3, name: "Arjun Sharma", city: "Mumbai", tier: "diamond", xp: 36800, rescues: 176, rating: 4.93, badge: "💎", avatar: "AS" },
  { rank: 4, name: "Kavitha Nair", city: "Hyderabad", tier: "gold", xp: 29100, rescues: 143, rating: 4.91, badge: "🥇", avatar: "KN" },
  { rank: 5, name: "Vikram Singh", city: "Delhi", tier: "gold", xp: 24600, rescues: 121, rating: 4.88, badge: "🥇", avatar: "VS" },
  { rank: 6, name: "Ananya Roy", city: "Kolkata", tier: "gold", xp: 21300, rescues: 108, rating: 4.87, badge: "🥇", avatar: "AR" },
  { rank: 7, name: "Mohammed Rafi", city: "Bengaluru", tier: "silver", xp: 16400, rescues: 84, rating: 4.82, badge: "🥈", avatar: "MR" },
  { rank: 8, name: "Sneha Patel", city: "Surat", tier: "silver", xp: 13900, rescues: 71, rating: 4.79, badge: "🥈", avatar: "SP" },
  { rank: 9, name: "Deepak Joshi", city: "Pune", tier: "silver", xp: 12100, rescues: 62, rating: 4.76, badge: "🥈", avatar: "DJ" },
  { rank: 10, name: "Meera Reddy", city: "Vizag", tier: "bronze", xp: 9200, rescues: 47, rating: 4.71, badge: "🥉", avatar: "MR" },
];

const tierColors: Record<string, string> = {
  legend: "from-orange-500 to-red-500",
  diamond: "from-cyan-400 to-blue-500",
  gold: "from-yellow-400 to-amber-500",
  silver: "from-gray-300 to-gray-500",
  bronze: "from-amber-700 to-amber-900",
};

const badges = [
  { icon: "🚑", name: "First Responder", desc: "10 completed rescues", earned: true },
  { icon: "💪", name: "Life Saver", desc: "50 completed rescues", earned: true },
  { icon: "⚡", name: "Speed Hero", desc: "< 2 min avg response", earned: true },
  { icon: "❤️", name: "Heart Guardian", desc: "CPR certified", earned: true },
  { icon: "🌙", name: "Night Owl", desc: "10 night rescues", earned: false },
  { icon: "🔥", name: "Streak Master", desc: "30 day streak", earned: false },
  { icon: "👑", name: "Community King", desc: "Top 10 nationally", earned: false },
  { icon: "🎖️", name: "Legend", desc: "200+ rescues", earned: false },
];

import { useAuthStore } from "@/lib/auth-store";

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<"monthly" | "alltime">("monthly");
  const [tab, setTab] = useState<"leaders" | "badges">("leaders");
  const [locationScope, setLocationScope] = useState<"national" | "city">("national");
  const { user } = useAuthStore();
  const city = user?.city || "Bengaluru";
  
  const displayedVolunteers = locationScope === "city" 
    ? volunteers.filter(v => v.city.toLowerCase() === city.toLowerCase())
    : volunteers;

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Header */}
      <div className="glass border-b border-white/5 px-6 h-16 flex items-center gap-4 sticky top-0 z-20">
        <Link href="/dashboard" className="text-white/60 hover:text-white"><ArrowLeft size={22} /></Link>
        <h1 className="font-semibold">Leaderboard</h1>
        <div className="ml-auto flex items-center gap-2">
          <Trophy size={18} className="text-yellow-400" />
          <span className="text-sm text-yellow-400">June 2026</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* My rank */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-5 border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-orange-500/5"
        >
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold text-yellow-400">#47</div>
            <div className="w-12 h-12 rounded-full tier-gold flex items-center justify-center text-white font-bold">
               {user?.firstName?.charAt(0) || 'P'}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white">{user?.firstName || 'Priya'} {user?.lastName || 'Sharma'}</div>
              <div className="text-xs text-white/40">Gold Hero · {city}</div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold">8,420 XP</div>
              <div className="text-xs text-white/40">42 rescues</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-white/40 mb-1">
              <span>Progress to Diamond</span>
              <span>8,420 / 15,000 XP</span>
            </div>
          
          <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
             <button
                onClick={() => setLocationScope("national")}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  locationScope === "national" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
                }`}
             >
                National
             </button>
             <button
                onClick={() => setLocationScope("city")}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  locationScope === "city" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
                }`}
             >
                {city}
             </button>
          </div>

          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "56%" }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Period toggle */}
        <div className="flex rounded-2xl bg-white/5 p-1">
          {(["monthly", "alltime"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                period === p ? "bg-white/10 text-white" : "text-white/40"
              }`}
            >
              {p === "alltime" ? "All Time" : "This Month"}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(["leaders", "badges"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                tab === t ? "emergency-gradient text-white" : "bg-white/5 text-white/50 hover:bg-white/10"
              }`}
            >
              {t === "leaders" ? <Trophy size={14} /> : <Award size={14} />}
              {t}
            </button>
          ))}
        </div>

        {tab === "leaders" && (
          <div className="space-y-3">
            {/* Top 3 */}
            <div className="flex gap-3 mb-6">
              {/* 2nd */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex-1 glass rounded-2xl p-4 border border-white/10 text-center mt-6"
              >
                <div className="text-2xl mb-2">{displayedVolunteers[1]?.badge || "🥈"}</div>
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${displayedVolunteers[1] ? tierColors[displayedVolunteers[1].tier] : "from-gray-300 to-gray-500"} flex items-center justify-center text-white font-bold mx-auto mb-2`}>
                  {displayedVolunteers[1]?.avatar || "N/A"}
                </div>
                <div className="text-sm font-semibold text-white truncate">{displayedVolunteers[1]?.name.split(" ")[0] || "No Data"}</div>
                <div className="text-xs text-white/40">{displayedVolunteers[1]?.xp.toLocaleString() || 0} XP</div>
                <div className="text-xs text-white/30">#2</div>
              </motion.div>

              {/* 1st */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="flex-1 glass rounded-2xl p-4 border border-yellow-500/30 bg-yellow-500/5 text-center"
                style={{ boxShadow: "0 0 40px rgba(234,179,8,0.1)" }}
              >
                <div className="text-3xl mb-2">{displayedVolunteers[0]?.badge || "🏆"}</div>
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${displayedVolunteers[0] ? tierColors[displayedVolunteers[0].tier] : "from-yellow-400 to-amber-500"} flex items-center justify-center text-white font-bold mx-auto mb-2`}>
                  {displayedVolunteers[0]?.avatar || "N/A"}
                </div>
                <div className="text-sm font-semibold text-white">{displayedVolunteers[0]?.name.split(" ")[0] || "No Data"}</div>
                <div className="text-xs text-yellow-400">{displayedVolunteers[0]?.xp.toLocaleString() || 0} XP</div>
                <div className="text-xs text-white/30">#1 🏆</div>
              </motion.div>

              {/* 3rd */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex-1 glass rounded-2xl p-4 border border-white/10 text-center mt-6"
              >
                <div className="text-2xl mb-2">{displayedVolunteers[2]?.badge || "🥉"}</div>
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${displayedVolunteers[2] ? tierColors[displayedVolunteers[2].tier] : "from-amber-700 to-amber-900"} flex items-center justify-center text-white font-bold mx-auto mb-2`}>
                  {displayedVolunteers[2]?.avatar || "N/A"}
                </div>
                <div className="text-sm font-semibold text-white truncate">{displayedVolunteers[2]?.name.split(" ")[0] || "No Data"}</div>
                <div className="text-xs text-white/40">{displayedVolunteers[2]?.xp.toLocaleString() || 0} XP</div>
                <div className="text-xs text-white/30">#3</div>
              </motion.div>
            </div>

            {/* Rest of list */}
            {displayedVolunteers.slice(3).map((v, i) => (
              <motion.div
                key={v.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="glass rounded-xl p-4 border border-white/5 flex items-center gap-4"
              >
                <div className="text-lg font-bold text-white/30 w-6">#{v.rank}</div>
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${tierColors[v.tier]} flex items-center justify-center text-white font-bold text-sm`}>
                  {v.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white text-sm">{v.name}</div>
                  <div className="text-xs text-white/40">{v.city}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-white text-sm">{v.xp.toLocaleString()} XP</div>
                  <div className="text-xs text-white/40">{v.rescues} rescues</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === "badges" && (
          <div className="grid grid-cols-2 gap-4">
            {badges.map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`glass rounded-2xl p-4 border text-center ${
                  badge.earned
                    ? "border-yellow-500/30 bg-yellow-500/5"
                    : "border-white/5 opacity-50"
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <div className={`font-semibold text-sm ${badge.earned ? "text-white" : "text-white/40"}`}>{badge.name}</div>
                <div className="text-xs text-white/40 mt-1">{badge.desc}</div>
                {badge.earned && <div className="mt-2 text-xs text-yellow-400">Earned ✓</div>}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}
