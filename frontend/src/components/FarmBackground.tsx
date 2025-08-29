import React from 'react';
import { motion } from 'framer-motion';

interface FarmBackgroundProps {
  darkMode: boolean;
}

export const FarmBackground: React.FC<FarmBackgroundProps> = ({ darkMode }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky Gradient */}
      <div className={`absolute inset-0 transition-all duration-1000 ${
        darkMode 
          ? 'bg-gradient-to-b from-slate-800 via-blue-900 to-emerald-900' 
          : 'bg-gradient-to-b from-sky-200 via-sky-100 to-green-100'
      }`} />
      
      {/* Animated Clouds */}
      <motion.div
        animate={{ x: [-100, typeof window !== 'undefined' ? window.innerWidth + 100 : 1200] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className={`absolute top-10 w-32 h-16 rounded-full blur-sm ${
          darkMode ? 'bg-slate-600/30' : 'bg-white/40'
        }`}
      />
      <motion.div
        animate={{ x: [-80, typeof window !== 'undefined' ? window.innerWidth + 80 : 1200] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear", delay: 20 }}
        className={`absolute top-20 w-24 h-12 rounded-full blur-sm ${
          darkMode ? 'bg-slate-600/20' : 'bg-white/30'
        }`}
      />
      
      {/* Farm Fields with Parallax */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className={`absolute bottom-0 left-0 right-0 h-40 ${
          darkMode 
            ? 'bg-gradient-to-t from-emerald-900/50 to-transparent' 
            : 'bg-gradient-to-t from-green-200/50 to-transparent'
        }`}
      />
      
      {/* Water Ripples */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`ripple-${i}`}
          animate={{
            scale: [0, 2, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.8,
          }}
          className={`absolute w-8 h-8 rounded-full border-2 ${
            darkMode ? 'border-cyan-400/30' : 'border-blue-400/30'
          }`}
          style={{
            left: `${20 + i * 15}%`,
            bottom: `${10 + Math.sin(i) * 5}%`,
          }}
        />
      ))}
      
      {/* Floating Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          className={`absolute w-2 h-2 rounded-full ${
            darkMode ? 'bg-cyan-400/40' : 'bg-blue-400/50'
          }`}
          style={{
            left: `${5 + i * 8}%`,
            top: `${50 + Math.sin(i) * 30}%`,
          }}
        />
      ))}

      {/* Animated Sun/Moon */}
      <motion.div
        animate={{ 
          rotate: darkMode ? 0 : 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity }
        }}
        className={`absolute top-16 right-16 w-16 h-16 rounded-full ${
          darkMode 
            ? 'bg-gradient-to-br from-slate-300 to-slate-400 shadow-lg shadow-slate-300/20' 
            : 'bg-gradient-to-br from-yellow-300 to-orange-400 shadow-lg shadow-yellow-300/30'
        }`}
      />
    </div>
  );
};