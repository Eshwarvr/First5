"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { HeartPulse, Loader2 } from "lucide-react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      toast.error("Please sign in to continue", {
        icon: "🔒",
        duration: 3000,
      });
      router.replace("/login");
    }
  }, [isAuthenticated, router, isMounted]);

  if (!isMounted || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-14 h-14 rounded-2xl emergency-gradient flex items-center justify-center">
            <HeartPulse size={28} className="text-white animate-pulse" />
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Loader2 size={16} className="animate-spin" />
            Verifying authentication...
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}

export function GuestBanner() {
  const { user } = useAuthStore();

  if (!user?.isGuest) return null;

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-amber-500/10 border border-amber-500/20 px-4 py-2 text-center text-sm text-amber-400"
    >
      ⚠️ You&apos;re in Guest mode. Some features are limited.{" "}
      <a href="/signup" className="underline font-semibold hover:text-amber-300">
        Create an account
      </a>{" "}
      for full access.
    </motion.div>
  );
}
