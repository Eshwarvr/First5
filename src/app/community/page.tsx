"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth-provider";
import { useAuthStore } from "@/lib/auth-store";
import { getFeedByCity } from "@/lib/mock-data";
import { ArrowLeft, MapPin, Search, ChevronRight, Activity, Users, FileText, CheckCircle, Clock } from "lucide-react";

export default function CommunityPage() {
  const [filter, setFilter] = useState("all");
  const { user } = useAuthStore();
  const feedData = getFeedByCity(user?.city);

  const mappedFeedData = feedData.map(item => ({
    ...item,
    location: item.city,
    details: item.desc,
    reporter: item.author,
    upvotes: item.likes,
    severity: item.type === "alert" ? "Medium" : "High"
  }));

  const filters = [
    { id: "all", label: "All Updates" },
    { id: "verified", label: "Verified Only" },
    { id: "critical", label: "Critical" },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical": return "bg-red-500 text-white";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-yellow-500 text-black";
      default: return "bg-blue-500 text-white";
    }
  };

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-[#030712] text-white flex flex-col">
       {/* Header */}
       <div className="glass border-b border-white/5 px-6 h-16 flex items-center gap-4 sticky top-0 z-20">
        <Link href="/dashboard" className="text-white/60 hover:text-white"><ArrowLeft size={22} /></Link>
        <h1 className="font-semibold">Community Feed</h1>
        <div className="ml-auto">
           <button className="flex items-center gap-2 px-3 py-1.5 rounded-full emergency-gradient text-xs font-semibold text-white shadow-sm hover:opacity-90">
             + Report
           </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full p-4 md:p-6 space-y-6">
        {/* Important Alert */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-start gap-3">
            <Activity size={20} className="text-red-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-red-400 font-semibold text-sm mb-1">Critical Blood Shortage</h3>
              <p className="text-white/70 text-xs leading-relaxed">
                Manipal Hospital (Old Airport Road) urgently needs O-ve blood. Please contact hospital directly if you can donate.
              </p>
            </div>
        </motion.div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map(f => (
               <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                  filter === f.id ? "bg-white/10 border-white/20 text-white" : "bg-transparent border-white/5 text-white/50 hover:bg-white/5"
                }`}
              >
                {f.label}
              </button>
            ))}
        </div>

        {/* Feed List */}
        <div className="space-y-4">
           {mappedFeedData.map((item, i) => (
             <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-4 md:p-5 border border-white/5 hover:border-white/10 transition-colors"
             >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-white text-sm md:text-base">{item.type}</span>
                      {item.verified && <CheckCircle size={14} className="text-emerald-400" />}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide ${getSeverityColor(item.severity)}`}>
                        {item.severity}
                      </span>
                    </div>
                    <div className="text-xs text-white/40 flex items-center gap-1.5 mt-1">
                       <MapPin size={12} className="text-blue-400" />
                       <span className="truncate">{item.location}</span>
                    </div>
                  </div>
                  <div className="text-xs text-white/30 flex items-center gap-1">
                     <Clock size={12} />
                     {item.time}
                  </div>
                </div>

                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  {item.details}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                   <div className="flex items-center gap-2 text-xs text-white/40">
                      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center font-bold text-[10px] text-white">
                         {item.reporter.charAt(0)}
                      </div>
                      <span>Reported by {item.reporter}</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <button className="flex items-center gap-1.5 text-xs text-white/40 hover:text-emerald-400 transition-colors">
                        ▲ {item.upvotes}
                     </button>
                     <button className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors">
                        Share
                     </button>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

      </div>
    </div>
    </ProtectedRoute>
  );
}
