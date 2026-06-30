"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield, Zap, MapPin, Heart, Users, Bell, ChevronDown,
  ArrowRight, Star, Phone, Activity, Clock, CheckCircle,
  AlertTriangle, Navigation, Wifi, Battery, TrendingUp,
  Award, Globe, Lock, HeartPulse
} from "lucide-react";

const stats = [
  { label: "Response Time", value: "< 3 min", icon: Clock, color: "#3B82F6" },
  { label: "Active Volunteers", value: "12,847", icon: Users, color: "#10B981" },
  { label: "Lives Saved", value: "4,291", icon: Heart, color: "#EF4444" },
  { label: "Cities Covered", value: "89", icon: MapPin, color: "#F59E0B" },
];

const features = [
  {
    icon: Zap,
    title: "AI Emergency Detection",
    description: "Voice-triggered SOS, fall detection, and crash audio analysis using Gemini AI with 96% confidence.",
    color: "#3B82F6",
    gradient: "from-blue-600/20 to-blue-600/5",
  },
  {
    icon: MapPin,
    title: "Hyperlocal Volunteer Network",
    description: "Connect with verified community heroes within 500m. Real-time GPS tracking like Uber.",
    color: "#10B981",
    gradient: "from-emerald-600/20 to-emerald-600/5",
  },
  {
    icon: HeartPulse,
    title: "AI First Aid Assistant",
    description: "Step-by-step CPR, bleeding control, and stroke response with voice guidance and countdown timers.",
    color: "#EF4444",
    gradient: "from-red-600/20 to-red-600/5",
  },
  {
    icon: Activity,
    title: "Smart Escalation Engine",
    description: "If no volunteer responds in 30s, auto-expands search radius and alerts emergency contacts.",
    color: "#F59E0B",
    gradient: "from-amber-600/20 to-amber-600/5",
  },
  {
    icon: Shield,
    title: "AI Incident Summary",
    description: "Instantly generates a medical report shared with hospitals — blood group, allergies, GPS, ETA.",
    color: "#8B5CF6",
    gradient: "from-violet-600/20 to-violet-600/5",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Works in 8 Indian languages. Auto-detects language from voice input via Whisper AI.",
    color: "#EC4899",
    gradient: "from-pink-600/20 to-pink-600/5",
  },
];

const emergencyCards = [
  { type: "Heart Attack", confidence: 96, responders: 3, eta: "2:15", risk: "Critical", color: "#EF4444" },
  { type: "Road Accident", confidence: 89, responders: 5, eta: "1:48", risk: "High", color: "#F97316" },
  { type: "Fall Injury", confidence: 94, responders: 2, eta: "3:02", risk: "Medium", color: "#F59E0B" },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Heart Attack Survivor",
    city: "Bengaluru",
    text: "First5 saved my husband's life. A volunteer reached us in 2 minutes 40 seconds and performed CPR guided by the AI. By the time the ambulance arrived, he was stable.",
    stars: 5,
    avatar: "PS",
  },
  {
    name: "Dr. Rajesh Kumar",
    role: "Community Hero • Gold Tier",
    city: "Chennai",
    text: "I've completed 47 rescues in 8 months. The AI guidance is incredible — it tells me exactly what to do based on the emergency type and the victim's medical profile.",
    stars: 5,
    avatar: "RK",
  },
  {
    name: "Ananya Krishnan",
    role: "Citizen • Hyderabad",
    city: "Hyderabad",
    text: "Being a woman who travels alone, First5 gives me real peace of mind. The panic button, live tracking for my family, and nearby verified volunteers make me feel safe.",
    stars: 5,
    avatar: "AK",
  },
];

function CounterAnimation({ target, suffix = "" }: { target: string; suffix?: string }) {
  return <span className="font-bold">{target}{suffix}</span>;
}

function FloatingEmergencyCard({ card, delay }: { card: typeof emergencyCards[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="glass rounded-2xl p-4 min-w-[220px] border border-white/10"
      style={{ boxShadow: `0 0 30px ${card.color}20` }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: card.color }} />
          <span className="text-xs font-semibold text-white/90">{card.type}</span>
        </div>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{ background: `${card.color}20`, color: card.color }}
        >
          {card.risk}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-lg font-bold text-white">{card.confidence}%</div>
          <div className="text-xs text-white/50">AI Confidence</div>
        </div>
        <div>
          <div className="text-lg font-bold text-white">{card.responders}</div>
          <div className="text-xs text-white/50">Nearby</div>
        </div>
        <div>
          <div className="text-lg font-bold" style={{ color: card.color }}>{card.eta}</div>
          <div className="text-xs text-white/50">ETA</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % emergencyCards.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl emergency-gradient flex items-center justify-center">
              <HeartPulse size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">First5</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Stories</a>
            <a href="#stats" className="hover:text-white transition-colors">Impact</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-white/70 hover:text-white transition-colors px-4 py-2">
              Sign In
            </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-xl emergency-gradient text-white font-medium hover:opacity-90 transition-opacity"
                >            Get Started
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-600/5 rounded-full blur-[80px]" />
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm text-white/70 mb-8"
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span>12,847 volunteers active right now</span>
            <ArrowRight size={14} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold leading-tight mb-6"
          >
            Help arrives in
            <br />
            <span className="gradient-text-emergency">under 3 minutes</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto mb-10"
          >
            AI-powered hyperlocal emergency response. Community heroes reach you before the ambulance.
            One tap. Real time. Life-saving.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/signup"
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl emergency-gradient text-white font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/30"
            >
              <HeartPulse size={22} />
              Open First5 App
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/volunteer"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl glass border border-white/10 text-white font-medium text-lg hover:border-white/30 transition-all"
            >
              <Shield size={22} />
              Become a Hero
            </Link>
          </motion.div>

          {/* Floating Emergency Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {emergencyCards.map((card, i) => (
              <FloatingEmergencyCard key={i} card={card} delay={0.6 + i * 0.15} />
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs">Scroll to explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass rounded-2xl p-6 text-center border border-white/5 hover:border-white/10 transition-colors"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${stat.color}20` }}
                >
                  <stat.icon size={24} style={{ color: stat.color }} />
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  <CounterAnimation target={stat.value} />
                </div>
                <div className="text-sm text-white/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">How <span className="gradient-text">First5</span> Works</h2>
            <p className="text-white/40 text-xl max-w-2xl mx-auto">
              From emergency detection to resolution — powered by AI, driven by community.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-500/50 via-blue-500/50 to-emerald-500/50 hidden md:block" />

            {[
              { step: "01", title: "SOS Activated", desc: "User taps SOS button or AI detects emergency via voice/motion/fall detection.", icon: Bell, color: "#EF4444", side: "left" },
              { step: "02", title: "AI Classification", desc: "Gemini AI analyzes the situation in &lt;2 seconds, classifies emergency type with confidence score.", icon: Activity, color: "#3B82F6", side: "right" },
              { step: "03", title: "Volunteers Notified", desc: "Nearby verified community heroes receive instant push notifications with navigation.", icon: Users, color: "#F59E0B", side: "left" },
              { step: "04", title: "AI First Aid Guides", desc: "Step-by-step voice-guided instructions for both victim and responder in real-time.", icon: HeartPulse, color: "#10B981", side: "right" },
              { step: "05", title: "Hospital Informed", desc: "AI Incident Summary sent to nearest hospital — blood group, allergies, ETA, vitals.", icon: Shield, color: "#8B5CF6", side: "left" },
              { step: "06", title: "Community Rewards", desc: "Volunteer earns XP, badges, and reputation. Both parties get summary report.", icon: Award, color: "#EC4899", side: "right" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: item.side === "left" ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`flex items-center gap-8 mb-12 ${item.side === "right" ? "md:flex-row-reverse" : ""}`}
              >
                <div className={`flex-1 ${item.side === "right" ? "md:text-right" : ""}`}>
                  <div className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${item.color}20` }}
                      >
                        <item.icon size={20} style={{ color: item.color }} />
                      </div>
                      <span className="text-xs font-mono text-white/30">STEP {item.step}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/50">{item.desc}</p>
                  </div>
                </div>
                {/* Center dot */}
                <div className="hidden md:flex w-12 h-12 rounded-full border-2 items-center justify-center flex-shrink-0 z-10"
                  style={{ borderColor: item.color, background: `${item.color}20` }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">Built to <span className="gradient-text">Save Lives</span></h2>
            <p className="text-white/40 text-xl max-w-2xl mx-auto">
              Every feature designed with one goal: reduce emergency response time from 20 minutes to under 3.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all bg-gradient-to-br ${feature.gradient}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${feature.color}20` }}
                >
                  <feature.icon size={24} style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">Real <span className="gradient-text">Impact</span></h2>
            <p className="text-white/50 text-sm max-w-xs">Building a safer tomorrow, together. Because every second counts when it&apos;s about life.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="glass rounded-2xl p-6 border border-white/5"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.stars)].map((_, si) => (
                    <Star key={si} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-white/70 leading-relaxed mb-6 italic">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full emergency-gradient flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{t.name}</div>
                    <div className="text-xs text-white/40">{t.role} • {t.city}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 border border-white/10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-blue-600/10" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl emergency-gradient flex items-center justify-center mx-auto mb-6">
                <HeartPulse size={32} className="text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Join <span className="gradient-text-emergency">First5</span> today
              </h2>
              <p className="text-white/50 text-xl mb-8 max-w-2xl mx-auto">
                Be part of India&apos;s largest community emergency response network. 
                Every second counts. Every life matters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl emergency-gradient text-white font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-red-500/30"
                >
                  <HeartPulse size={22} />
                  Join as Citizen
                </Link>
                <Link
                  href="/signup?role=volunteer"
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl glass border border-emerald-500/30 text-emerald-400 font-semibold text-lg hover:border-emerald-500/60 transition-all"
                >
                  <Shield size={22} />
                  Become a Hero
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl emergency-gradient flex items-center justify-center">
                  <HeartPulse size={18} className="text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">First5</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                AI-powered hyperlocal emergency response network. Saving lives, one community at a time.
              </p>
            </div>
            {[
              { title: "Product", links: ["Dashboard", "SOS", "Volunteer", "Community", "Map"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press", "Contact"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold text-white mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-white/40 text-sm hover:text-white/70 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between">
            <p className="text-white/30 text-sm">© 2026 First5. All rights reserved. Built with ❤️ for India.</p>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Lock size={12} className="text-white/30" />
              <span className="text-white/30 text-xs">GDPR Compliant • End-to-end Encrypted</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
