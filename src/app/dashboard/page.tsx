"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  HeartPulse, MapPin, Bell, Shield, Zap, Users, Clock,
  ChevronRight, AlertTriangle, Phone, Activity, TrendingUp,
  Sun, Cloud, CloudRain, Wind, Eye, Plus, Navigation,
  CheckCircle, XCircle, Star, Award, Settings, LogOut,
  Menu, X, Home, Map, MessageSquare, History, User,
  Heart, Thermometer, Droplets, Waves
} from "lucide-react";
import { ProtectedRoute, GuestBanner } from "@/components/auth-provider";
import { useAuthStore } from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import { getVolunteersByCity } from "@/lib/mock-data";

const mockActivities = [
  { type: "Medical Emergency", time: "2 hours ago", status: "resolved", location: "Koramangala, Bengaluru", responder: "Rajesh K." },
  { type: "Road Accident", time: "Yesterday", status: "resolved", location: "MG Road, Bengaluru", responder: "Priya M." },
  { type: "Fall Injury", time: "3 days ago", status: "resolved", location: "Indiranagar, Bengaluru", responder: "Arjun S." },
];

const quickActions = [
  { label: "SOS", href: "/sos", icon: Zap, color: "#EF4444", bg: "emergency-gradient", urgent: true },
  { label: "Map", href: "/map", icon: Map, color: "#3B82F6", bg: "bg-blue-500/20" },
  { label: "AI Chat", href: "/ai-chat", icon: MessageSquare, color: "#10B981", bg: "bg-emerald-500/20" },
  { label: "History", href: "/history", icon: History, color: "#F59E0B", bg: "bg-amber-500/20" },
];

function WeatherWidget() {
  const [weather, setWeather] = useState<{temp: number, desc: string, humidity: number, wind: number, city: string} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
        );
        if (res.ok) {
          const data = await res.json();
          setWeather({
            temp: Math.round(data.main.temp),
            desc: data.weather[0].description,
            humidity: data.main.humidity,
            wind: Math.round(data.wind.speed * 3.6),
            city: data.name,
          });
        }
      } catch (e) {
        setWeather({ temp: 28, desc: "partly cloudy", humidity: 72, wind: 15, city: "Bengaluru" });
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  return (
    <div className="glass rounded-2xl p-4 border border-white/10 flex items-center gap-4">
      <div className="text-4xl">⛅</div>
      <div className="flex-1">
        {loading ? (
          <div className="shimmer h-8 rounded w-24" />
        ) : (
          <>
            <div className="text-2xl font-bold text-white">{weather?.temp}°C</div>
            <div className="text-white/50 text-sm capitalize">{weather?.desc} · {weather?.city}</div>
          </>
        )}
      </div>
      {weather && (
        <div className="text-right text-xs text-white/40 space-y-1">
          <div className="flex items-center gap-1 justify-end"><Droplets size={10} /> {weather.humidity}%</div>
          <div className="flex items-center gap-1 justify-end"><Wind size={10} /> {weather.wind} km/h</div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color, change }: { label: string; value: string; icon: any; color: string; change?: string }) {
  return (
    <div className="glass rounded-2xl p-4 border border-white/5">
      <div className="flex items-center justify-between mb-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
          <Icon size={16} style={{ color }} />
        </div>
        {change && <span className="text-xs text-emerald-400">↑ {change}</span>}
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-white/40 mt-1">{label}</div>
    </div>
  );
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const hour = new Date().getHours();
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const mockVolunteers = getVolunteersByCity(user?.city);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: Home },
    { label: "SOS Emergency", href: "/sos", icon: Zap },
    { label: "Map", href: "/map", icon: Map },
    { label: "Volunteer", href: "/volunteer", icon: Shield },
    { label: "AI Assistant", href: "/ai-chat", icon: MessageSquare },
    { label: "Community", href: "/community", icon: Users },
    { label: "History", href: "/history", icon: History },
    { label: "Medical Profile", href: "/medical-profile", icon: Heart },
    { label: "Family", href: "/family", icon: User },
    { label: "Leaderboard", href: "/leaderboard", icon: Award },
    { label: "Safe Places", href: "/safe-places", icon: MapPin },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#030712] text-white flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        className="fixed left-0 top-0 bottom-0 w-72 glass border-r border-white/5 z-50 flex flex-col"
      >
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl emergency-gradient flex items-center justify-center">
                <HeartPulse size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">First5</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="text-white/40 hover:text-white">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* User profile */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full emergency-gradient flex items-center justify-center text-white font-bold">{user?.firstName?.[0] || 'P'}</div>
            <div>
              <div className="font-semibold text-white text-sm">{user?.firstName} {user?.lastName}</div>
              <div className="text-xs text-white/40 capitalize">{user?.role} · {user?.city || "Unknown Location"}</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-red-400 w-full text-sm transition-colors">
            <LogOut size={18} />Sign out
          </button>
        </div>
      </motion.aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="sticky top-0 z-30 glass border-b border-white/5 px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="text-white/60 hover:text-white transition-colors">
              <Menu size={22} />
            </button>
            <div className="flex items-center gap-2 text-sm text-white/40">
              <MapPin size={14} className="text-red-400" />
              <span className="capitalize">{user?.city || "Bengaluru"}</span>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/notifications" className="relative w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Bell size={18} className="text-white/60" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </Link>
            <Link href="/medical-profile" className="w-9 h-9 rounded-full emergency-gradient flex items-center justify-center text-white font-bold text-sm">
              {user?.firstName?.[0] || 'P'}
            </Link>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <GuestBanner />
          
          {/* Greeting */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold text-white">{greeting}, {user?.firstName || 'Priya'}! 👋</h1>
            <p className="text-white/40 mt-1">You're safe. {mockVolunteers.length} community heroes are near you in {user?.city || 'Bengaluru'}.</p>
          </motion.div>

          {/* SOS Button */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
            <Link href="/sos">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="relative rounded-3xl p-8 text-center overflow-hidden cursor-pointer"
                style={{ background: "linear-gradient(135deg, #FF2D55, #FF6B35, #FF2D55)" }}
              >
                <div className="absolute inset-0 sos-pulse-outer rounded-3xl" />
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 sos-pulse">
                    <Zap size={40} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Emergency SOS</h2>
                  <p className="text-white/70 mt-1">Tap to activate • Voice: "Help"</p>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="grid grid-cols-4 gap-3">
              {quickActions.map((action, i) => (
                <Link key={i} href={action.href}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass rounded-2xl p-4 text-center border border-white/5 hover:border-white/10 transition-all"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${action.urgent ? action.bg : ""}`}
                      style={!action.urgent ? { background: `${action.color}20` } : {}}>
                      <action.icon size={20} style={{ color: action.urgent ? "white" : action.color }} />
                    </div>
                    <div className="text-xs font-medium text-white/70">{action.label}</div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Weather + Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <WeatherWidget />
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Nearby Heroes" value="3" icon={Users} color="#10B981" change="2 online" />
              <StatCard label="Nearest Hospital" value="1.2 km" icon={HeartPulse} color="#EF4444" />
              <StatCard label="Avg Response" value="2:34" icon={Clock} color="#3B82F6" />
              <StatCard label="Trust Score" value="4.9★" icon={Star} color="#F59E0B" />
            </div>
          </motion.div>

          {/* Nearby Volunteers */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Nearby Heroes</h2>
              <Link href="/map" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                View map <ChevronRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {mockVolunteers.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="glass rounded-2xl p-4 border border-white/5 flex items-center gap-4"
                >
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold tier-${v.tier}`}>
                      {v.name[0]}
                    </div>
                    {v.online && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#030712]" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white text-sm">{v.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      {v.skills.map((s, si) => (
                        <span key={si} className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-white">{v.distance}</div>
                    <div className="text-xs text-emerald-400">ETA {v.eta}</div>
                    <div className="text-xs text-white/40">{v.rating}★</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Recent Activity</h2>
              <Link href="/history" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                View all <ChevronRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {mockActivities.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="glass rounded-2xl p-4 border border-white/5 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle size={18} className="text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm">{a.type}</div>
                    <div className="text-xs text-white/40 mt-0.5">{a.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-white/40">{a.time}</div>
                    <div className="text-xs text-emerald-400 mt-0.5 capitalize">{a.status}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Emergency Tips */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <div className="glass rounded-2xl p-5 border border-yellow-500/20 bg-yellow-500/5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={16} className="text-yellow-400" />
                <span className="text-sm font-semibold text-yellow-400">Emergency Tip of the Day</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                During a heart attack, have the person chew (not swallow whole) an aspirin (325mg) unless allergic. 
                Begin CPR if they become unconscious. Push hard and fast — 100-120 compressions per minute.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
