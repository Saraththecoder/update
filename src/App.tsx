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
import MainsCockroachAnswersPage from "./pages/MainsCockroachAnswersPage";
import MainsThemeWiseAnalysisPage from "./pages/MainsThemeWiseAnalysisPage";
import ConstitutionExplorerPage from "./pages/ConstitutionExplorerPage";
import AdministrativePioneersPage from "./pages/AdministrativePioneersPage";
import MythologyEthicsPage from "./pages/MythologyEthicsPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import { Sparkle, X, Handshake } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import Chatbot from "./components/Chatbot";
import CustomCursor from "./components/CustomCursor";
import AmbientBackground from "./components/AmbientBackground";
import { ReactLenis } from "lenis/react";

export default function App() {
  const [activePage, setActivePage] = useState<string>("home");
  const [resourcePhase, setResourcePhase] = useState<"none" | "prelims" | "mains" | "integrity">("none");
  const [showTopToast, setShowTopToast] = useState<boolean>(true);

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
        return <Resources setActivePage={setActivePage} activePhase={resourcePhase} setActivePhase={setResourcePhase} />;
      case "pyq-analysis":
        return <PYQAnalysisPage />;
      case "mains-pyq":
        return <MainsPYQAnalysisPage setActivePage={setActivePage} />;
      case "mains-cockroach-answers":
        return <MainsCockroachAnswersPage setActivePage={setActivePage} />;
      case "mains-theme-analysis":
        return <MainsThemeWiseAnalysisPage setActivePage={setActivePage} />;
      case "constitution-explorer":
        return <ConstitutionExplorerPage setActivePage={setActivePage} />;
      case "governance-pioneers":
        return <AdministrativePioneersPage setActivePage={setActivePage} />;
      case "mythology-ethics":
        return <MythologyEthicsPage setActivePage={setActivePage} />;
      case "metro-map":
        return <UPSCMetroMapPage setActivePage={setActivePage} />;
      case "about":
        return <AboutUs />;
      case "contact":
        return <Contact />;
      case "privacy-policy":
        return <PrivacyPolicy />;
      case "refund-policy":
        return <RefundPolicy />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div className="min-h-screen flex flex-col relative selection:bg-brand-red-light selection:text-navy-950 cursor-none sm:cursor-auto text-slate-800">
        <AmbientBackground />
        <CustomCursor />
      
      {/* 0. WELCOME & LAUNCH SCREEN REMOVED */}

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
      <Header activePage={activePage} setActivePage={setActivePage} setResourcePhase={setResourcePhase} />

      {/* 3. CORE DYNAMIC VIEWPORT (Main container) */}
      <main className="flex-1 w-full overflow-hidden" id="main-content-viewport">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. THE TRUSTED FOOTER */}
      <Footer setActivePage={setActivePage} />

      {/* 5. FLOATING COMPANION CHATBOT */}
      <Chatbot setActivePage={setActivePage} />

      </div>
    </ReactLenis>
  );
}
