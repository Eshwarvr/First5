"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth-provider";
import {
  Zap, Mic, MicOff, Phone, ArrowLeft, AlertTriangle,
  Shield, HeartPulse, Navigation, Clock, Users, Activity,
  Volume2, Smartphone
} from "lucide-react";

type EmergencyType = { label: string; icon: string; color: string; key: string; };

const emergencyTypes: EmergencyType[] = [
  { label: "Heart Attack", icon: "❤️", color: "#EF4444", key: "heart_attack" },
  { label: "Stroke", icon: "🧠", color: "#8B5CF6", key: "stroke" },
  { label: "Fall Injury", icon: "🩹", color: "#F59E0B", key: "fall" },
  { label: "Road Accident", icon: "🚗", color: "#F97316", key: "road_accident" },
  { label: "Fire", icon: "🔥", color: "#EF4444", key: "fire" },
  { label: "Robbery", icon: "🚨", color: "#8B5CF6", key: "robbery" },
  { label: "Flood", icon: "🌊", color: "#3B82F6", key: "flood" },
  { label: "Women Safety", icon: "🛡️", color: "#EC4899", key: "women_safety" },
  { label: "Child Missing", icon: "👶", color: "#F59E0B", key: "child_missing" },
  { label: "Gas Leak", icon: "⚠️", color: "#EF4444", key: "gas_leak" },
  { label: "Medical", icon: "🏥", color: "#10B981", key: "medical" },
  { label: "Other", icon: "📞", color: "#6B7280", key: "other" },
];

export default function SOSPage() {
  const [activated, setActivated] = useState(false);
  const [listening, setListening] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [phase, setPhase] = useState<"idle" | "counting" | "classifying" | "active">("idle");
  const [selectedType, setSelectedType] = useState<EmergencyType | null>(null);
  const [aiResult, setAiResult] = useState<{ type: string; confidence: number; action: string } | null>(null);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startSOS = () => {
    setPhase("counting");
    setCountdown(5);
    let c = 5;
    const ci = setInterval(() => {
      c--;
      setCountdown(c);
      if (c <= 0) {
        clearInterval(ci);
        classifyEmergency();
      }
    }, 1000);
  };

  const classifyEmergency = () => {
    setPhase("classifying");
    setTimeout(() => {
      setAiResult({
        type: selectedType?.label || "Medical Emergency",
        confidence: 94,
        action: "CPR may be needed. Keep patient calm. Call ambulance.",
      });
      setPhase("active");
      setActivated(true);
      intervalRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    }, 2000);
  };

  const cancelSOS = () => {
    setPhase("idle");
    setCountdown(5);
    setActivated(false);
    setAiResult(null);
    setSelectedType(null);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimer(0);
  };

  const formatTimer = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#030712] text-white flex flex-col">
        {/* Header */}
        <div className="glass border-b border-white/5 px-6 h-16 flex items-center gap-4">
          <Link href="/dashboard" className="text-white/60 hover:text-white">
            <ArrowLeft size={22} />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-semibold">Emergency SOS</span>
          </div>
          <div className="ml-auto flex items-center gap-2 text-white/40 text-sm">
            <Phone size={14} />
            <span>112</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
          <AnimatePresence>
            {/* Background glow */}
            <div className={`absolute inset-0 transition-all duration-1000 ${activated ? "bg-red-950/30" : "bg-transparent"}`} />
            <div className={`absolute inset-0 rounded-full blur-[200px] transition-all duration-1000 ${
              activated ? "bg-red-600/20 scale-150" : "bg-transparent"
            }`} />

            {/* IDLE STATE */}
            {phase === "idle" && !selectedType && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center w-full max-w-lg relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2">Select Emergency Type</h2>
                <p className="text-white/40 mb-8 text-sm">Or tap the big SOS button for any emergency</p>
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {emergencyTypes.map((type) => (
                    <motion.button
                      key={type.key}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedType(type)}
                      className="glass rounded-2xl p-4 border border-white/5 hover:border-white/20 transition-all text-center"
                    >
                      <div className="text-2xl mb-1">{type.icon}</div>
                      <div className="text-xs text-white/70">{type.label}</div>
                    </motion.button>
                  ))}
                </div>
                {/* SOS Button */}
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-red-500/20 scale-150 animate-ping" style={{ animationDuration: "2s" }} />
                    <div className="absolute inset-0 rounded-full bg-red-500/10 scale-125 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={startSOS}
                      className="relative w-40 h-40 rounded-full emergency-gradient flex flex-col items-center justify-center shadow-2xl shadow-red-500/50 z-10"
                    >
                      <Zap size={48} className="text-white mb-1" />
                      <span className="text-white font-bold text-xl">SOS</span>
                    </motion.button>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setListening(!listening)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                        listening ? "border-red-500/60 bg-red-500/20 text-red-400" : "border-white/10 bg-white/5 text-white/50"
                      }`}
                    >
                      {listening ? <Mic size={16} /> : <MicOff size={16} />}
                      {listening ? "Listening..." : "Voice Trigger"}
                    </button>
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white/50 text-sm">
                      <Smartphone size={16} />
                      Shake to SOS
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TYPE SELECTED - Pre-SOS */}
            {phase === "idle" && selectedType && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center relative z-10">
                <div className="text-6xl mb-4">{selectedType.icon}</div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: selectedType.color }}>{selectedType.label}</h2>
                <p className="text-white/50 mb-8">Emergency selected. Tap SOS to activate.</p>
                <div className="relative mb-8">
                  <div className="absolute inset-0 rounded-full animate-ping" style={{ background: `${selectedType.color}20`, animationDuration: "2s" }} />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={startSOS}
                    className="relative w-36 h-36 rounded-full flex flex-col items-center justify-center shadow-2xl z-10"
                    style={{ background: `linear-gradient(135deg, ${selectedType.color}, ${selectedType.color}aa)`, boxShadow: `0 0 60px ${selectedType.color}50` }}
                  >
                    <Zap size={40} className="text-white mb-1" />
                    <span className="text-white font-bold text-lg">SOS</span>
                  </motion.button>
                </div>
                <button onClick={() => setSelectedType(null)} className="text-white/40 text-sm hover:text-white/60">← Change type</button>
              </motion.div>
            )}

            {/* COUNTING DOWN */}
            {phase === "counting" && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center relative z-10">
                <div className="text-8xl font-bold text-red-400 mb-4 tabular-nums">{countdown}</div>
                <h2 className="text-2xl font-bold text-white mb-2">Activating SOS...</h2>
                <p className="text-white/50 mb-8">Notifying emergency network</p>
                <button
                  onClick={cancelSOS}
                  className="px-8 py-3 rounded-2xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
              </motion.div>
            )}

            {/* AI CLASSIFYING */}
            {phase === "classifying" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center relative z-10">
                <div className="w-24 h-24 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-white mb-2">AI Analyzing...</h2>
                <p className="text-white/50">Classifying emergency type</p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <Activity size={16} className="text-blue-400 animate-pulse" />
                  <span className="text-blue-400 text-sm">Gemini AI processing</span>
                </div>
              </motion.div>
            )}

            {/* ACTIVE EMERGENCY */}
            {phase === "active" && aiResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-lg relative z-10 space-y-4"
              >
                {/* Live timer */}
                <div className="text-center">
                  <div className="text-5xl font-bold text-red-400 tabular-nums">{formatTimer(timer)}</div>
                  <div className="text-white/40 text-sm mt-1">Emergency active</div>
                </div>

                {/* AI Result Card */}
                <div className="glass rounded-2xl p-5 border border-red-500/30 bg-red-500/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity size={16} className="text-blue-400" />
                    <span className="text-sm font-semibold text-blue-400">AI Emergency Summary</span>
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">{aiResult.confidence}% confidence</span>
                  </div>
                  <div className="text-xl font-bold text-white mb-1">{aiResult.type}</div>
                  <p className="text-white/60 text-sm">{aiResult.action}</p>
                </div>

                {/* Responder info */}
                <div className="glass rounded-2xl p-5 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full tier-gold flex items-center justify-center text-white font-bold">R</div>
                    <div>
                      <div className="font-semibold text-white">Rajesh Kumar</div>
                      <div className="text-xs text-white/40">Gold Hero · CPR Certified</div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-emerald-400 font-bold">1:47</div>
                      <div className="text-xs text-white/40">ETA</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1 bg-white/5 rounded-xl p-3 text-center">
                      <div className="text-sm font-bold text-white">0.3 km</div>
                      <div className="text-xs text-white/40">Distance</div>
                    </div>
                    <div className="flex-1 bg-white/5 rounded-xl p-3 text-center">
                      <div className="text-sm font-bold text-white">4.9★</div>
                      <div className="text-xs text-white/40">Rating</div>
                    </div>
                    <div className="flex-1 bg-white/5 rounded-xl p-3 text-center">
                      <div className="text-sm font-bold text-white">47</div>
                      <div className="text-xs text-white/40">Rescues</div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/ai-chat" className="glass rounded-2xl p-4 border border-blue-500/30 text-center hover:border-blue-500/60 transition-colors">
                    <HeartPulse size={24} className="text-blue-400 mx-auto mb-2" />
                    <div className="text-sm font-medium text-white">AI First Aid</div>
                  </Link>
                  <Link href={`/emergency/em-001`} className="glass rounded-2xl p-4 border border-emerald-500/30 text-center hover:border-emerald-500/60 transition-colors">
                    <Navigation size={24} className="text-emerald-400 mx-auto mb-2" />
                    <div className="text-sm font-medium text-white">Live Track</div>
                  </Link>
                </div>

                <button
                  onClick={cancelSOS}
                  className="w-full py-3 rounded-2xl border border-white/10 text-white/50 text-sm font-medium hover:border-white/20 hover:text-white/70 transition-all"
                >
                  Cancel Emergency
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ProtectedRoute>
  );
}
