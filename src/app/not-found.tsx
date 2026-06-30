"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { HeartPulse, CheckCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center p-6 text-center">
       <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] bg-red-600/10 rounded-full blur-[80px]" />
        </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-md w-full">
         <div className="w-20 h-20 rounded-3xl emergency-gradient flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-500/20">
            <HeartPulse size={40} className="text-white" />
         </div>
         <h1 className="text-5xl font-bold mb-4">404</h1>
         <h2 className="text-2xl font-bold mb-4 text-white/80">Page not found</h2>
         <p className="text-white/40 max-w-sm mx-auto mb-8 text-sm">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
         </p>
         <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all border border-white/5">
            <CheckCircle size={18} className="text-emerald-400" />
            Return to Dashboard
         </Link>
      </motion.div>
    </div>
  );
}
