import React from "react";
import logo from "../../assets/logo.jpg";
import lbsnaaImage from "../../assets/LBSNAA.png";

interface FooterProps {
  setActivePage: (page: string) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  return (
    <footer className="w-full bg-slate-50 mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-slate-200" id="app-footer">
      {/* 1. Centered header text & logo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-4 sm:pb-6 space-y-3 sm:space-y-4">
        <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-navy-950 font-semibold tracking-wide">
          Your journey to the ultimate training ground.
        </h3>
        <div className="flex justify-center">
          <div className="w-[120px] sm:w-[150px] h-[40px] sm:h-[50px] flex items-center justify-center shrink-0 cursor-pointer" onClick={() => setActivePage("home")}>
            <img src={logo} alt="CockroachIAS Logo" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      {/* 2. Full-Width LBSNAA Silhouette Image */}
      <div className="w-full overflow-hidden flex justify-center border-b border-slate-200 bg-white">
        <img
          src={lbsnaaImage}
          alt="LBSNAA Silhouette"
          className="w-full max-w-7xl h-auto max-h-36 sm:max-h-48 md:max-h-60 object-contain select-none pointer-events-none"
        />
      </div>

      {/* 3. Navy Bottom Banner */}
      <div className="bg-navy-950 text-slate-300 py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-4 sm:space-y-6">
          {/* Horizontal Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-400">
            <button
              onClick={() => setActivePage("home")}
              className="hover:text-white transition duration-200 cursor-pointer"
            >
              Home Classroom
            </button>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <button
              onClick={() => setActivePage("resources")}
              className="hover:text-white transition duration-200 cursor-pointer"
            >
              Survivor's Resources
            </button>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <button
              onClick={() => setActivePage("about")}
              className="hover:text-white transition duration-200 cursor-pointer"
            >
              Our Honest Story
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Support Line</span>
                <span className="text-[10px] text-slate-500 italic">We listen. Always.</span>
              </div>
              <a
                href="https://classplusapp.com/diy"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-red hover:bg-brand-red-hover text-white font-bold text-[10px] sm:text-xs px-4 py-2 rounded-lg uppercase tracking-widest transition duration-200 cursor-pointer shadow-md hover:shadow-lg"
              >
                Login
              </a>
            </div>
          </div>

          {/* Legal / Copyright Bottom Row */}
          <div className="w-full border-t border-navy-900 pt-4 sm:pt-6 flex flex-col md:flex-row items-center justify-between text-[10px] sm:text-xs text-slate-500 gap-2 sm:gap-4 text-center md:text-left">
            <p className="order-2 md:order-1">
              UPSC is a marathon. Walk slow, walk long.
            </p>
            <p className="order-1 md:order-2 font-medium">
              © {new Date().getFullYear()} CockroachIAS Companion Institute. Built on the bedrock of disciplined consistency.
            </p>
            <p className="order-3 flex gap-2">
              <button 
                onClick={() => setActivePage("privacy-policy")}
                className="hover:text-white transition duration-200 cursor-pointer underline underline-offset-2"
              >
                Privacy Policy
              </button>
              <span className="text-slate-700">|</span>
              <button 
                onClick={() => setActivePage("refund-policy")}
                className="hover:text-white transition duration-200 cursor-pointer underline underline-offset-2"
              >
                Refund Policy
              </button>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}