import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import PYQAnalysisPage from "./pages/PYQAnalysisPage";
import UPSCMetroMapPage from "./pages/UPSCMetroMapPage";
import MainsPYQAnalysisPage from "./pages/MainsPYQAnalysisPage";
import MainsModelAnswersPage from "./pages/MainsModelAnswersPage";
import { Sparkle, X, Handshake } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import WelcomeScreen from "./components/WelcomeScreen";

export default function App() {
  const [activePage, setActivePage] = useState<string>("home");
  const [showTopToast, setShowTopToast] = useState<boolean>(true);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  // Lock scrolling when welcome screen is visible
  useEffect(() => {
    if (showWelcome) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showWelcome]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);

  // Dynamic Page Rendering
  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <Home setActivePage={setActivePage} />;
      case "resources":
        return <Resources setActivePage={setActivePage} />;
      case "pyq-analysis":
        return <PYQAnalysisPage />;
      case "mains-pyq":
        return <MainsPYQAnalysisPage setActivePage={setActivePage} />;
      case "mains-model-answers":
        return <MainsModelAnswersPage setActivePage={setActivePage} />;
      case "metro-map":
        return <UPSCMetroMapPage setActivePage={setActivePage} />;
      case "about":
        return <AboutUs />;
      case "contact":
        return <Contact />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 bg-dot-grid relative selection:bg-brand-red-light selection:text-navy-950">
      
      {/* 0. WELCOME & LAUNCH SCREEN */}
      <AnimatePresence>
        {showWelcome && (
          <WelcomeScreen onLaunchComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {/* 1. EMOTIONAL BANNER AT THE TOP (Dismissible) */}
      {showTopToast && (
        <div 
          id="top-empathy-toast" 
          className="bg-brand-red text-white text-xs py-3.5 px-4 sm:px-6 relative text-center border-b border-brand-red-hover flex items-center justify-center gap-3"
        >
          <div className="flex items-center gap-2 max-w-4xl mx-auto text-left sm:text-center leading-relaxed">
            <Handshake className="w-4 h-4 text-white/70 shrink-0 hidden sm:inline" />
            <span>
              COCKROACH IAS is not about an insect — it is about the human capacity to persist when the world expects you to quit. We are your companions.
            </span>
          </div>
          <button 
            onClick={() => setShowTopToast(false)} 
            className="text-white/60 hover:text-white shrink-0 ml-4 cursor-pointer focus:outline-hidden"
            id="dismiss-toast-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. THE SIGNATURE HEADER */}
      <Header activePage={activePage} setActivePage={setActivePage} />

      {/* 3. CORE DYNAMIC VIEWPORT (Main container) */}
      <main className="flex-1 w-full overflow-hidden" id="main-content-viewport">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. THE TRUSTED FOOTER */}
      <Footer setActivePage={setActivePage} />

    </div>
  );
}
