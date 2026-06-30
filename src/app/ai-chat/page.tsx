"use client";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ProtectedRoute } from "@/components/auth-provider";
import Link from "next/link";
import { ArrowLeft, Send, Mic, MicOff, Bot, User, HeartPulse, AlertCircle, ChevronRight } from "lucide-react";

type Message = { role: "user" | "ai"; content: string; timestamp: Date; };

const quickQuestions = [
  "How to perform CPR?",
  "How to stop bleeding?",
  "Signs of a heart attack?",
  "What to do for a stroke?",
  "Snake bite first aid?",
  "Burns treatment?",
];

const aiResponses: Record<string, string> = {
  "How to perform CPR?": `**CPR Steps (for adults):**

1. ✅ Check for safety — make sure the scene is safe
2. 🔍 Check responsiveness — tap shoulders, shout "Are you okay?"
3. 📞 Call 112 or ask someone to call
4. 🫀 Start chest compressions:
   - Place hands on center of chest
   - Push hard and fast — 100-120 per minute
   - Allow full chest recoil between compressions
5. 💨 Give 2 rescue breaths after every 30 compressions
6. 🔄 Continue until help arrives

⚠️ If untrained, do compression-only CPR (no rescue breaths) — still effective!`,
  "How to stop bleeding?": `**Controlling Bleeding:**

1. 🧤 Put on gloves if available
2. 🩹 Apply firm, direct pressure with clean cloth/gauze
3. ⏱️ Hold pressure for 10-15 minutes without lifting
4. 🔺 Elevate the injured area above heart level if possible
5. 🩸 If bleeding through cloth, add more on top — don't remove
6. ⚕️ For severe limb bleeding: Apply tourniquet 2-3 inches above wound
7. 📞 Call 112 for severe wounds

❌ Do NOT: Remove embedded objects, use a tourniquet on neck/torso`,
};

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Hi! I'm First5 AI, your emergency medical assistant. I can guide you through first aid, answer medical questions, and help in emergencies. What do you need help with?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMessage: Message = { role: "user", content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate AI response (would use Gemini API in production)
    setTimeout(() => {
      const response = aiResponses[text] || generateAIResponse(text);
      setMessages((prev) => [...prev, {
        role: "ai",
        content: response,
        timestamp: new Date(),
      }]);
      setLoading(false);
    }, 1200);
  };

  const generateAIResponse = (question: string): string => {
    const q = question.toLowerCase();
    if (q.includes("heart")) return `**Heart Attack Signs & Response:**\n\n🚨 **FAST Signs:**\n- Chest pain/pressure/tightness\n- Pain radiating to arm, jaw, back\n- Shortness of breath\n- Cold sweat, nausea\n\n**Immediate Actions:**\n1. Call 112 immediately\n2. Have person sit/lie down\n3. Loosen tight clothing\n4. Give aspirin (325mg) if not allergic\n5. Begin CPR if unconscious\n\n⚡ Time is critical — every minute counts!`;
    if (q.includes("stroke")) return `**Stroke: Use FAST Method:**\n\n🧠 **F**ace — Ask to smile. One side drooping?\n💪 **A**rms — Raise both. One drifting down?\n🗣️ **S**peech — Slurred or strange?\n⏰ **T**ime — Call 112 immediately!\n\nDo NOT: Give food/water, let them sleep, ignore symptoms`;
    if (q.includes("burn")) return `**Burn Treatment:**\n\n🔥 **Minor burns:**\n1. Cool with running water 10-20 minutes\n2. Cover with clean non-fluffy material\n3. Do NOT use ice, butter, or toothpaste\n\n🚨 **Serious burns (call 112):**\n- Larger than palm size\n- On face, hands, feet, genitals\n- Chemical or electrical burns`;
    return `I'm here to help with emergency first aid guidance. For life-threatening emergencies, please call 112 immediately.\n\nI can help you with:\n- CPR instructions\n- Bleeding control\n- Stroke/heart attack response\n- Burns, falls, and more\n\nWhat specific emergency are you dealing with?`;
  };

  const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <ProtectedRoute>
    <div className="h-screen bg-[#030712] text-white flex flex-col">
      {/* Header */}
      <div className="glass border-b border-white/5 px-6 h-16 flex items-center gap-4 flex-shrink-0">
        <Link href="/dashboard" className="text-white/60 hover:text-white"><ArrowLeft size={22} /></Link>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full emergency-gradient flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <div className="font-semibold text-sm">First5 AI Assistant</div>
            <div className="flex items-center gap-1 text-xs text-emerald-400">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online · Multilingual
            </div>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs text-white/30">
          <AlertCircle size={12} />
          <span>Not a substitute for 112</span>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto border-b border-white/5 flex-shrink-0">
        {quickQuestions.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs whitespace-nowrap hover:bg-white/10 hover:text-white/80 transition-all"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === "ai" ? "emergency-gradient" : "bg-blue-600"
            }`}>
              {msg.role === "ai" ? <Bot size={14} className="text-white" /> : <User size={14} className="text-white" />}
            </div>
            <div className={`max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
              <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "ai"
                  ? "glass border border-white/10 text-white/80"
                  : "bg-blue-600 text-white"
              }`}>
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
              <div className="text-xs text-white/20 mt-1 px-1">{formatTime(msg.timestamp)}</div>
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full emergency-gradient flex items-center justify-center">
              <Bot size={14} className="text-white" />
            </div>
            <div className="glass rounded-2xl px-4 py-3 border border-white/10">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/5 flex-shrink-0">
        <div className="flex gap-3 items-end">
          <button
            onClick={() => setListening(!listening)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all flex-shrink-0 ${
              listening ? "emergency-gradient" : "bg-white/5 border border-white/10"
            }`}
          >
            {listening ? <Mic size={20} className="text-white" /> : <MicOff size={20} className="text-white/40" />}
          </button>
          <div className="flex-1 glass rounded-2xl border border-white/10 flex items-end gap-2 px-4 py-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder="Ask about first aid, symptoms, medications..."
              className="flex-1 bg-transparent text-white placeholder-white/30 resize-none outline-none text-sm max-h-24 leading-relaxed"
              rows={1}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="w-12 h-12 rounded-2xl emergency-gradient flex items-center justify-center flex-shrink-0 disabled:opacity-40"
          >
            <Send size={18} className="text-white" />
          </motion.button>
        </div>
        <p className="text-center text-xs text-white/20 mt-2">AI guidance only. Always call 112 in real emergencies.</p>
      </div>
    </div>
    </ProtectedRoute>
  );
}
