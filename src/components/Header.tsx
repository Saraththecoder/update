import React, { useState } from "react";
import { Compass, BookOpen, Users, PhoneCall, List, X } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import logo from "../../assets/logo.jpg";

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  setResourcePhase?: (phase: "none" | "prelims" | "mains" | "integrity") => void;
}

export default function Header({ activePage, setActivePage, setResourcePhase }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Compass },
    { id: "resources", label: "Our Resources", icon: BookOpen },
    { id: "about", label: "About Us", icon: Users },
    { id: "contact", label: "Contact Companion", icon: PhoneCall },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/50 backdrop-blur-2xl border-b border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.05)] transition-all duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div 
            onClick={() => {
              setActivePage("home");
              setIsMobileMenuOpen(false);
            }} 
            className="flex items-center space-x-3 cursor-pointer group"
            id="header-logo-container"
          >
            <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 overflow-hidden flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105 shrink-0">
              <img src={logo} alt="Cockroach IAS Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-display font-bold text-2xl tracking-tight text-brand-red block leading-none">
                CockroachIAS
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-widest" id="desktop-nav-menu">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              
              if (item.id === "resources") {
                return (
                  <div 
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <button
                      id={`nav-btn-${item.id}`}
                      onClick={() => {
                        setActivePage("resources");
                        if (setResourcePhase) setResourcePhase("none");
                      }}
                      className={`flex items-center space-x-1.5 py-1 transition-all duration-200 cursor-pointer ${
                        activePage === "resources" || activePage === "pyq-analysis" || activePage === "mains-pyq" || activePage === "mains-cockroach-answers" || activePage === "mains-theme-analysis" || activePage === "metro-map" || activePage === "constitution-explorer" || activePage === "governance-pioneers" || activePage === "mythology-ethics"
                          ? "text-brand-red border-b-2 border-brand-red font-bold"
                          : "text-slate-500 hover:text-brand-red font-medium"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {showDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          style={{ transformOrigin: "top" }}
                          className="absolute top-full left-0 mt-1 w-56 bg-white/70 backdrop-blur-xl border border-white/60 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.08)] py-1.5 z-50 font-sans"
                        >
                          <button
                            onClick={() => {
                              setActivePage("resources");
                              if (setResourcePhase) setResourcePhase("prelims");
                              setShowDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-brand-red font-semibold uppercase tracking-wider transition-colors duration-150 flex items-center gap-2 cursor-pointer text-[11px]"
                          >
                            <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                            <span>Prelims Command System</span>
                          </button>
                          <button
                            onClick={() => {
                              setActivePage("resources");
                              if (setResourcePhase) setResourcePhase("mains");
                              setShowDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-brand-red font-semibold uppercase tracking-wider transition-colors duration-150 flex items-center gap-2 cursor-pointer text-[11px]"
                          >
                            <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                            <span>Mains Blueprint Engine</span>
                          </button>
                          <button
                            onClick={() => {
                              setActivePage("resources");
                              if (setResourcePhase) setResourcePhase("integrity");
                              setShowDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-brand-red font-semibold uppercase tracking-wider transition-colors duration-150 flex items-center gap-2 cursor-pointer text-[11px]"
                          >
                            <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                            <span>Administrative Integrity Workspace</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => setActivePage(item.id)}
                  className={`flex items-center space-x-1.5 py-1 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "text-brand-red border-b-2 border-brand-red font-bold"
                      : "text-slate-500 hover:text-brand-red font-medium"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Desktop Login & Mobile Hamburger Container */}
          <div className="flex items-center space-x-3">
            {/* Login CTA (Desktop) */}
            <a
              id="header-login-btn"
              href="https://classplusapp.com/diy"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex bg-brand-red hover:bg-brand-red-hover text-white px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-200 shadow-md hover:shadow-lg active:translate-y-0.5 items-center space-x-2 border border-brand-red"
            >
              <span>Login</span>
            </a>
            
            {/* Hamburger Button (Mobile) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-brand-red hover:bg-slate-50 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <List className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-100 bg-white shadow-lg overflow-hidden absolute w-full left-0 top-full"
          >
            <div className="flex flex-col py-4 px-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActivePage(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-widest transition-all ${
                      isActive
                        ? "bg-navy-50 text-brand-red"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              <div className="pt-4 mt-2 border-t border-slate-100">
                <a
                  href="https://classplusapp.com/diy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-brand-red hover:bg-brand-red-hover text-white px-5 py-3 rounded-lg text-sm font-semibold tracking-wide uppercase transition-all duration-200 shadow-sm"
                >
                  <span>Login</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
