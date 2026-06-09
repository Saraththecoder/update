import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import logo from "../../assets/logo.jpg";
import { Sparkle, ArrowRight } from "@phosphor-icons/react";

interface WelcomeScreenProps {
  onLaunchComplete: () => void;
}

export default function WelcomeScreen({ onLaunchComplete }: WelcomeScreenProps) {
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunch = () => {
    setIsLaunching(true);
    // Call completion callback after curtain animation finishes (1.2s duration)
    setTimeout(() => {
      onLaunchComplete();
    }, 1400); // 1.4s gives slightly extra time for fadeout
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden select-none">
      <AnimatePresence>
        {!isLaunching && (
          <motion.div
            key="welcome-content"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 z-[110] flex flex-col items-center justify-center text-center px-4 pointer-events-auto"
          >
            {/* Logo Container */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-32 h-32 md:w-36 md:h-36 bg-white rounded-2xl border-4 border-amber-400/90 shadow-2xl p-2 mb-6 flex items-center justify-center overflow-hidden"
            >
              <img src={logo} alt="Cockroach IAS Logo" className="w-full h-full object-contain" />
            </motion.div>

            {/* Main Welcome Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-wider uppercase leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
            >
              Welcome to <span className="text-amber-400">COCKROACH IAS</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-4 font-serif italic text-sm sm:text-base md:text-lg text-slate-200 max-w-lg tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            >
              India’s First Academy Dedicated to the Science of Resilience
            </motion.p>

            {/* Motivational Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-6 flex items-center gap-2 bg-black/40 text-amber-300 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-amber-400/20 backdrop-blur-xs"
            >
              <Sparkle className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>For those who refused to quit</span>
            </motion.div>

            {/* Launch Button */}
            <motion.button
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(245, 158, 11, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLaunch}
              className="mt-16 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-navy-950 font-bold uppercase tracking-widest text-xs sm:text-sm px-10 py-4 rounded-xl shadow-lg border border-amber-400 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:translate-y-0.5 animate-pulse"
            >
              <span>Launch Website</span>
              <ArrowRight className="w-4 h-4 text-navy-950 font-bold animate-bounce-right" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Curtains Backdrop */}
      <div className="absolute inset-0 flex select-none pointer-events-none overflow-hidden">
        {/* Left Curtain half */}
        <motion.div
          initial={{ x: 0, opacity: 1 }}
          animate={{
            x: isLaunching ? "-100%" : 0,
            opacity: isLaunching ? 0 : 1
          }}
          transition={{
            x: { duration: 1.2, ease: [0.77, 0, 0.175, 1] },
            opacity: { duration: 1.0, ease: "easeOut", delay: 0.2 }
          }}
          className="w-1/2 h-full bg-gradient-to-r from-red-950 via-brand-red to-red-900 border-r-2 border-amber-400/30 flex justify-end items-center relative shadow-[10px_0_30px_rgba(0,0,0,0.5)] pointer-events-auto"
        >
          {/* Gold trim along center edge */}
          <div className="absolute top-0 right-0 w-[4px] h-full bg-gradient-to-b from-amber-300 via-amber-500 to-amber-300 opacity-90 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          
          {/* Fabric pleats texture */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.15)_25%,transparent_50%,rgba(0,0,0,0.15)_75%,transparent_100%)] opacity-35 mix-blend-overlay pointer-events-none" />
        </motion.div>

        {/* Right Curtain half */}
        <motion.div
          initial={{ x: 0, opacity: 1 }}
          animate={{
            x: isLaunching ? "100%" : 0,
            opacity: isLaunching ? 0 : 1
          }}
          transition={{
            x: { duration: 1.2, ease: [0.77, 0, 0.175, 1] },
            opacity: { duration: 1.0, ease: "easeOut", delay: 0.2 }
          }}
          className="w-1/2 h-full bg-gradient-to-r from-red-900 via-brand-red to-red-950 border-l-2 border-amber-400/30 flex justify-start items-center relative shadow-[-10px_0_30px_rgba(0,0,0,0.5)] pointer-events-auto"
        >
          {/* Gold trim along center edge */}
          <div className="absolute top-0 left-0 w-[4px] h-full bg-gradient-to-b from-amber-300 via-amber-500 to-amber-300 opacity-90 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          
          {/* Fabric pleats texture */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.15)_25%,transparent_50%,rgba(0,0,0,0.15)_75%,transparent_100%)] opacity-35 mix-blend-overlay pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
}
