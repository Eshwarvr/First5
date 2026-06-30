"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeartPulse, Mail, Phone, Eye, EyeOff, ArrowRight, Shield, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import toast from "react-hot-toast";

interface FormErrors {
  email?: string;
  password?: string;
  phone?: string;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState<"email" | "phone">("email");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [shakeForm, setShakeForm] = useState(false);

  const router = useRouter();
  const { login, loginAsGuest } = useAuthStore();

  const validateEmail = (val: string): string | undefined => {
    if (!val.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Please enter a valid email address";
    return undefined;
  };

  const validatePassword = (val: string): string | undefined => {
    if (!val.trim()) return "Password is required";
    if (val.length < 6) return "Password must be at least 6 characters";
    return undefined;
  };

  const validatePhone = (val: string): string | undefined => {
    if (!val.trim()) return "Phone number is required";
    if (!/^\d{10}$/.test(val)) return "Please enter a valid 10-digit phone number";
    return undefined;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === "email") setErrors(prev => ({ ...prev, email: validateEmail(email) }));
    if (field === "password") setErrors(prev => ({ ...prev, password: validatePassword(password) }));
    if (field === "phone") setErrors(prev => ({ ...prev, phone: validatePhone(phone) }));
  };

  const triggerShake = () => {
    setShakeForm(true);
    setTimeout(() => setShakeForm(false), 600);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    if (tab === "email") {
      newErrors.email = validateEmail(email);
      newErrors.password = validatePassword(password);
    } else {
      newErrors.phone = validatePhone(phone);
    }

    // Mark all fields as touched
    if (tab === "email") {
      setTouched({ email: true, password: true });
    } else {
      setTouched({ phone: true });
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(e => e !== undefined);
    if (hasErrors) {
      triggerShake();
      toast.error("Please fill in all required fields correctly", { icon: "⚠️" });
      return;
    }

    setLoading(true);

    // Simulate login
    setTimeout(() => {
      if (tab === "email") {
        login(email, password);
      } else {
        login(phone + "@phone.local", "phone-auth");
      }
      toast.success("Welcome back! 🎉");
      setLoading(false);
      router.push("/dashboard");
    }, 1200);
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    toast("Continuing as guest — some features are limited", { icon: "👤" });
    router.push("/dashboard");
  };

  const getFieldState = (field: string, error: string | undefined) => {
    if (!touched[field]) return "";
    if (error) return "border-red-500/60 bg-red-500/5";
    return "border-emerald-500/60 bg-emerald-500/5";
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-red-600/10 rounded-full blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-2xl emergency-gradient flex items-center justify-center">
              <HeartPulse size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">First5</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-white/50">Sign in to your emergency network</p>
        </div>

        <motion.div
          animate={shakeForm ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-8 border border-white/10"
        >
          {/* Google Sign In */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl bg-white text-gray-800 font-semibold text-sm hover:bg-gray-50 transition-colors mb-6 shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </motion.button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-sm">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Tab switcher */}
          <div className="flex rounded-xl bg-white/5 p-1 mb-6">
            {(["email", "phone"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setErrors({}); setTouched({}); }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize flex items-center justify-center gap-2 ${
                  tab === t ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"
                }`}
              >
                {t === "email" ? <Mail size={14} /> : <Phone size={14} />}
                {t}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {tab === "email" ? (
              <>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (touched.email) setErrors(prev => ({ ...prev, email: validateEmail(e.target.value) }));
                    }}
                    onBlur={() => handleBlur("email")}
                    placeholder="you@example.com"
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-all ${
                      getFieldState("email", errors.email) || "border-white/10 focus:border-blue-500/60"
                    }`}
                  />
                  <AnimatePresence>
                    {touched.email && errors.email && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -5, height: 0 }}
                        className="flex items-center gap-1.5 mt-1.5 text-red-400 text-xs"
                      >
                        <AlertCircle size={12} />
                        {errors.email}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {touched.email && !errors.email && email && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-center gap-1.5 mt-1.5 text-emerald-400 text-xs"
                      >
                        <CheckCircle2 size={12} />
                        Valid email
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (touched.password) setErrors(prev => ({ ...prev, password: validatePassword(e.target.value) }));
                      }}
                      onBlur={() => handleBlur("password")}
                      placeholder="••••••••"
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-all pr-12 ${
                        getFieldState("password", errors.password) || "border-white/10 focus:border-blue-500/60"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <AnimatePresence>
                    {touched.password && errors.password && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -5, height: 0 }}
                        className="flex items-center gap-1.5 mt-1.5 text-red-400 text-xs"
                      >
                        <AlertCircle size={12} />
                        {errors.password}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <Link href="/forgot-password" className="block text-right mt-1 text-xs text-blue-400 hover:text-blue-300">
                    Forgot password?
                  </Link>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Phone number</label>
                <div className="flex gap-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white text-sm">+91</div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setPhone(val);
                      if (touched.phone) setErrors(prev => ({ ...prev, phone: validatePhone(val) }));
                    }}
                    onBlur={() => handleBlur("phone")}
                    placeholder="9876543210"
                    className={`flex-1 bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-all ${
                      getFieldState("phone", errors.phone) || "border-white/10 focus:border-blue-500/60"
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {touched.phone && errors.phone && (
                    <motion.div
                      initial={{ opacity: 0, y: -5, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -5, height: 0 }}
                      className="flex items-center gap-1.5 mt-1.5 text-red-400 text-xs"
                    >
                      <AlertCircle size={12} />
                      {errors.phone}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl emergency-gradient text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-2 disabled:opacity-60"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {tab === "phone" ? "Send OTP" : "Sign In"}
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Guest Mode */}
          <button
            onClick={handleGuestLogin}
            className="w-full mt-4 py-3 rounded-2xl border border-white/10 text-white/50 text-sm font-medium hover:border-white/20 hover:text-white/70 transition-all flex items-center justify-center gap-2"
          >
            <Shield size={16} />
            Continue as Guest (Limited access)
          </button>
        </motion.div>

        <p className="text-center mt-6 text-white/40 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
            Join First5
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
