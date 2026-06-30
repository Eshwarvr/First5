"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeartPulse, ArrowRight, Shield, User, Building2, Stethoscope, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuthStore, AuthUser } from "@/lib/auth-store";
import toast from "react-hot-toast";

const roles = [
  { id: "citizen", label: "Citizen", desc: "Request emergency help, track responders, manage health profile", icon: User, color: "#3B82F6" },
  { id: "volunteer", label: "Community Hero", desc: "Respond to emergencies, earn badges, build reputation", icon: Shield, color: "#10B981" },
  { id: "hospital", label: "Hospital", desc: "Receive emergency alerts, manage incoming patients", icon: Stethoscope, color: "#8B5CF6" },
];

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  city?: string;
  age?: string;
  emergencyContact?: string;
}

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    bloodGroup: "O+",
    age: "",
    allergies: "",
    conditions: "",
    emergencyContact: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [shakeForm, setShakeForm] = useState(false);

  const router = useRouter();
  const { signup } = useAuthStore();

  const validators = {
    firstName: (val: string) => !val.trim() ? "First name is required" : val.length < 2 ? "Must be at least 2 characters" : /[^a-zA-Z\s]/.test(val) ? "Letters only" : undefined,
    lastName: (val: string) => !val.trim() ? "Last name is required" : val.length < 2 ? "Must be at least 2 characters" : /[^a-zA-Z\s]/.test(val) ? "Letters only" : undefined,
    email: (val: string) => !val.trim() ? "Email is required" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? "Valid email required" : undefined,
    phone: (val: string) => !val.trim() ? "Phone is required" : !/^\d{10}$/.test(val) ? "10 digits required" : undefined,
    city: (val: string) => !val.trim() ? "City is required" : val.length < 2 ? "Must be at least 2 characters" : undefined,
    age: (val: string) => !val ? "Age is required" : (parseInt(val) < 1 || parseInt(val) > 120) ? "Valid age 1-120 required" : undefined,
    emergencyContact: (val: string) => !val.trim() ? "Contact is required" : !/^\d{10}$/.test(val.replace(/\D/g, "")) ? "Valid phone number required" : undefined,
  };

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      // @ts-expect-error: dynamic key access
      setErrors(prev => ({ ...prev, [field]: validators[field]?.(value) }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    // @ts-expect-error: dynamic key access
    setErrors(prev => ({ ...prev, [field]: validators[field]?.(formData[field as keyof typeof formData]) }));
  };

  const triggerShake = () => {
    setShakeForm(true);
    setTimeout(() => setShakeForm(false), 600);
  };

  const handleContinue = () => {
    if (step === 1) {
      if (!selectedRole) {
        triggerShake();
        toast.error("Please select a role to continue");
        return;
      }
      setStep(2);
      return;
    }
    
    if (step === 2) {
      // Validate all step 2 fields
      const newErrors: FormErrors = {
        firstName: validators.firstName(formData.firstName),
        lastName: validators.lastName(formData.lastName),
        email: validators.email(formData.email),
        phone: validators.phone(formData.phone),
        city: validators.city(formData.city),
      };
      
      setTouched({ firstName: true, lastName: true, email: true, phone: true, city: true });
      setErrors(prev => ({ ...prev, ...newErrors }));
      
      const hasErrors = Object.values(newErrors).some(e => e !== undefined);
      if (hasErrors) {
        triggerShake();
        toast.error("Please fill in all required fields correctly", { icon: "⚠️" });
        return;
      }
      
      setStep(3);
      return;
    }
    
    if (step === 3) {
      const newErrors: FormErrors = {
        age: validators.age(formData.age),
        emergencyContact: validators.emergencyContact(formData.emergencyContact),
      };
      
      setTouched(prev => ({ ...prev, age: true, emergencyContact: true }));
      setErrors(prev => ({ ...prev, ...newErrors }));
      
      const hasErrors = Object.values(newErrors).some(e => e !== undefined);
      if (hasErrors) {
        triggerShake();
        toast.error("Please fill in all required fields correctly", { icon: "⚠️" });
        return;
      }
      
      setLoading(true);
      
      // Simulate signup
      setTimeout(() => {
        const userData: Omit<AuthUser, "isGuest"> = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          role: selectedRole,
          bloodGroup: formData.bloodGroup,
          age: formData.age,
          allergies: formData.allergies,
          conditions: formData.conditions,
          emergencyContact: formData.emergencyContact,
        };
        
        signup(userData);
        toast.success("Account created successfully! 🎉");
        setLoading(false);
        router.push("/dashboard");
      }, 1500);
    }
  };

  const getFieldState = (field: string) => {
    if (!touched[field]) return "border-white/10 focus:border-blue-500/60";
    // @ts-expect-error: dynamic key access
    if (errors[field]) return "border-red-500/60 bg-red-500/5";
    return "border-emerald-500/60 bg-emerald-500/5";
  };

  const renderError = (field: string) => {
    // @ts-expect-error: dynamic key access
    const error = errors[field];
    if (!touched[field] || !error) return null;
    return (
      <motion.div
        initial={{ opacity: 0, y: -5, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        className="flex items-center gap-1.5 mt-1.5 text-red-400 text-xs"
      >
        <AlertCircle size={12} />
        {error}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-2xl emergency-gradient flex items-center justify-center">
              <HeartPulse size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">First5</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            {step === 1 ? "Choose your role" : step === 2 ? "Personal details" : "Medical profile"}
          </h1>
          <p className="text-white/50">
            {step === 1 ? "How will you use First5?" : step === 2 ? "Tell us about yourself" : "Help responders help you better"}
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                s <= step ? "emergency-gradient text-white" : "bg-white/10 text-white/30"
              }`}>{s}</div>
              {s < 3 && <div className={`h-px w-12 transition-all ${s < step ? "bg-red-500" : "bg-white/10"}`} />}
            </div>
          ))}
        </div>

        <motion.div 
          animate={shakeForm ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-8 border border-white/10"
        >
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              {roles.map((role) => (
                <motion.button
                  key={role.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center gap-4 ${
                    selectedRole === role.id
                      ? "border-emerald-500/50 bg-emerald-500/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${role.color}20` }}>
                    <role.icon size={22} style={{ color: role.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{role.label}</div>
                    <div className="text-sm text-white/40 mt-0.5">{role.desc}</div>
                  </div>
                  {selectedRole === role.id && <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-white" /></div>}
                </motion.button>
              ))}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">First name <span className="text-red-400">*</span></label>
                  <input 
                    type="text" 
                    value={formData.firstName} 
                    onChange={(e) => updateForm("firstName", e.target.value)}
                    onBlur={() => handleBlur("firstName")}
                    placeholder="Priya" 
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-colors ${getFieldState("firstName")}`} 
                  />
                  {renderError("firstName")}
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Last name <span className="text-red-400">*</span></label>
                  <input 
                    type="text" 
                    value={formData.lastName} 
                    onChange={(e) => updateForm("lastName", e.target.value)} 
                    onBlur={() => handleBlur("lastName")}
                    placeholder="Sharma" 
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-colors ${getFieldState("lastName")}`} 
                  />
                  {renderError("lastName")}
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Email address <span className="text-red-400">*</span></label>
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => updateForm("email", e.target.value)} 
                  onBlur={() => handleBlur("email")}
                  placeholder="priya@example.com" 
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-colors ${getFieldState("email")}`} 
                />
                {renderError("email")}
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Phone number <span className="text-red-400">*</span></label>
                <div className="flex gap-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white text-sm">+91</div>
                  <input 
                    type="tel" 
                    value={formData.phone} 
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                      updateForm("phone", val);
                    }} 
                    onBlur={() => handleBlur("phone")}
                    placeholder="9876543210" 
                    className={`flex-1 bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-colors ${getFieldState("phone")}`} 
                  />
                </div>
                {renderError("phone")}
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">City <span className="text-red-400">*</span></label>
                <input 
                  type="text" 
                  value={formData.city} 
                  onChange={(e) => updateForm("city", e.target.value)} 
                  onBlur={() => handleBlur("city")}
                  placeholder="Bengaluru" 
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-colors ${getFieldState("city")}`} 
                />
                {renderError("city")}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Blood Group</label>
                  <select 
                    value={formData.bloodGroup} 
                    onChange={(e) => updateForm("bloodGroup", e.target.value)} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/60 transition-colors"
                  >
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(g => <option key={g} value={g} className="bg-gray-900">{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Age <span className="text-red-400">*</span></label>
                  <input 
                    type="number" 
                    value={formData.age} 
                    onChange={(e) => updateForm("age", e.target.value)} 
                    onBlur={() => handleBlur("age")}
                    placeholder="25" 
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-colors ${getFieldState("age")}`} 
                  />
                  {renderError("age")}
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Known Allergies (Optional)</label>
                <input 
                  type="text" 
                  value={formData.allergies} 
                  onChange={(e) => updateForm("allergies", e.target.value)} 
                  placeholder="Penicillin, Peanuts..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/60 transition-colors" 
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Medical Conditions (Optional)</label>
                <input 
                  type="text" 
                  value={formData.conditions} 
                  onChange={(e) => updateForm("conditions", e.target.value)} 
                  placeholder="Diabetes, Hypertension..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/60 transition-colors" 
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Emergency Contact <span className="text-red-400">*</span></label>
                <input 
                  type="tel" 
                  value={formData.emergencyContact} 
                  onChange={(e) => updateForm("emergencyContact", e.target.value)} 
                  onBlur={() => handleBlur("emergencyContact")}
                  placeholder="9876543210" 
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-colors ${getFieldState("emergencyContact")}`} 
                />
                {renderError("emergencyContact")}
              </div>
              <p className="text-xs text-white/30">This information is encrypted and only shared during active emergencies.</p>
            </motion.div>
          )}

          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(step - 1)}
                className="px-6 py-3.5 rounded-2xl glass border border-white/10 text-white font-medium hover:bg-white/5 transition-all"
              >
                Back
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContinue}
              disabled={step === 1 && !selectedRole}
              className="flex-1 py-3.5 rounded-2xl emergency-gradient text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (
                <>{step === 3 ? "Create Account" : "Continue"}<ArrowRight size={18} /></>
              )}
            </motion.button>
          </div>
        </motion.div>

        <p className="text-center mt-6 text-white/40 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
