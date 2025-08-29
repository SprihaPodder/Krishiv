// src/components/IrrigationAlerts.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tips = [
  "🌧 Rain expected tomorrow, delay irrigation",
  "💧 Soil moisture high, skip irrigation",
  "☀️ High temperature warning, irrigate early morning",
  "✅ Great job! You saved 200 liters this week",
  "🌱 Loamy soil retains water better, reduce frequency"
];

export default function IrrigationAlerts() {
  const [index, setIndex] = useState(0);

  // Cycle through tips automatically every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gray-900/60 backdrop-blur-lg border border-white/10 rounded-xl p-3 shadow-lg overflow-hidden">
      <h3 className="text-lg font-bold text-emerald-300 mb-2">🔔 Smart Alerts</h3>
      <div className="relative h-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full text-white font-medium"
          >
            {tips[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}