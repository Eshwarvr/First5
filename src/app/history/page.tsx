"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth-provider";
import { ArrowLeft, Clock, MapPin, Search, ChevronRight, Filter, AlertTriangle } from "lucide-react";

const historyData = [
  { id: "EM-042", date: "June 28, 2026", time: "14:32", type: "Medical Emergency", status: "Resolved", location: "Koramangala, Bengaluru", responder: "Rajesh Kumar", duration: "18m", risk: "High" },
  { id: "EM-038", date: "May 15, 2026", time: "09:15", type: "Road Accident", status: "Resolved", location: "MG Road, Bengaluru", responder: "Priya Menon", duration: "32m", risk: "Critical" },
  { id: "EM-029", date: "April 02, 2026", time: "19:45", type: "Fall Injury", status: "Resolved", location: "Indiranagar, Bengaluru", responder: "Arjun Sharma", duration: "12m", risk: "Medium" },
  { id: "EM-015", date: "January 11, 2026", time: "08:20", type: "Medical Emergency", status: "Cancelled", location: "HSR Layout, Bengaluru", responder: "-", duration: "-", risk: "Low" },
];

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "cancelled": return "text-white/40 bg-white/5 border-white/10";
      case "active": return "text-red-400 bg-red-500/10 border-red-500/20";
      default: return "text-blue-400 bg-blue-500/10 border-blue-500/20";
    }
  };

  const getRiskColor = (risk: string) => {
     switch (risk.toLowerCase()) {
      case "critical": return "text-red-400";
      case "high": return "text-orange-400";
      case "medium": return "text-yellow-400";
      default: return "text-emerald-400";
    }
  }

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-[#030712] text-white flex flex-col">
      {/* Header */}
      <div className="glass border-b border-white/5 px-6 h-16 flex items-center gap-4 flex-shrink-0 sticky top-0 z-20">
        <Link href="/dashboard" className="text-white/60 hover:text-white"><ArrowLeft size={22} /></Link>
        <h1 className="font-semibold">Emergency History</h1>
      </div>

      <div className="p-6 space-y-6 flex-1 overflow-y-auto max-w-3xl mx-auto w-full">
        
        {/* Search & Filter */}
        <div className="flex gap-3">
          <div className="flex-1 glass rounded-2xl border border-white/10 flex items-center gap-2 px-4 py-3">
            <Search size={18} className="text-white/30" />
            <input
              type="text"
              placeholder="Search by ID, type or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-sm"
            />
          </div>
          <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors flex-shrink-0">
            <Filter size={18} className="text-white/70" />
          </button>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {historyData
            .filter(item => 
              item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
              item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.location.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/history/${item.id}`} className="block glass rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-white">{item.type}</span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="text-xs text-white/40 flex items-center gap-1.5">
                      <Clock size={12} /> {item.date} • {item.time}
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-white/20" />
                </div>
                
                <div className="h-px bg-white/5 w-full my-3" />
                
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
                  <div>
                    <div className="text-white/30 text-xs mb-0.5">Location</div>
                    <div className="text-white/80 truncate pr-2 flex items-center gap-1">
                        <MapPin size={12} className="text-blue-400 flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                    </div>
                  </div>
                   <div>
                    <div className="text-white/30 text-xs mb-0.5">Responder</div>
                    <div className="text-white/80 truncate">{item.responder}</div>
                  </div>
                  <div>
                    <div className="text-white/30 text-xs mb-0.5">Duration</div>
                    <div className="text-white/80">{item.duration}</div>
                  </div>
                  <div>
                    <div className="text-white/30 text-xs mb-0.5 flex items-center gap-1">Risk <AlertTriangle size={10} className={getRiskColor(item.risk)} /></div>
                    <div className="text-white/80">{item.risk}</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          
          {historyData.filter(item => item.id.toLowerCase().includes(searchTerm.toLowerCase()) || item.type.toLowerCase().includes(searchTerm.toLowerCase()) || item.location.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
             <div className="text-center py-12 text-white/40 text-sm">
                 No records found matching &quot;{searchTerm}&quot;
             </div>
          )}
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
