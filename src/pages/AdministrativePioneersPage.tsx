import React, { useState, useMemo, useEffect } from "react";
import { ArrowLeft, MagnifyingGlass, BookOpen, Sparkle, Trophy, Tag, ShieldCheck, ListNumbers, X } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import rawPioneersData from "../data/administrativePioneers.json";
import { useNavigate } from "react-router-dom";

interface Pioneer {
  officerName: string;
  initiative: string;
  impact: string;
  values: string;
}

export default function AdministrativePioneersPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedPioneer, setSelectedPioneer] = useState<Pioneer | null>(null);

  // Initialize and shuffle data (excluding the first item, T.N. Seshan)
  const [pioneers] = useState<Pioneer[]>(() => {
    if (rawPioneersData.length <= 1) return [...rawPioneersData];
    const firstRow = rawPioneersData[0];
    const restOfRows = [...rawPioneersData.slice(1)];

    // Fisher-Yates shuffle algorithm for the remaining rows
    for (let i = restOfRows.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = restOfRows[i];
      restOfRows[i] = restOfRows[j];
      restOfRows[j] = temp;
    }

    return [firstRow, ...restOfRows];
  });

  useEffect(() => {
    document.title = "Governance Pioneers: Ethics & Case Studies | CockroachIAS";
  }, []);

  // Compute unique tag categories from values field
  const uniqueTags = useMemo(() => {
    const tagsSet = new Set<string>();
    pioneers.forEach(p => {
      p.values.split(",").forEach(v => {
        const trimmed = v.trim();
        if (trimmed) tagsSet.add(trimmed);
      });
    });
    return ["All", ...Array.from(tagsSet).sort()];
  }, [pioneers]);

  // Filter pioneers based on search and selected tag
  const filteredPioneers = useMemo(() => {
    return pioneers.filter((p, index) => {
      // Row 1 (T. N. Seshan) is always visible
      if (index === 0) return true;

      const matchesSearch = 
        p.officerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.initiative.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.impact.toLowerCase().includes(searchQuery.toLowerCase());
      
      const pTags = p.values.split(",").map(v => v.trim());
      const matchesTag = selectedTag === "All" || pTags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [pioneers, searchQuery, selectedTag]);

  // Compute summary stats dynamically
  const stats = useMemo(() => {
    const totalInitiatives = pioneers.length;
    const uniqueValuesCount = uniqueTags.length - 1; // subtract "All"
    
    // Count high-impact cases based on keyword indicators
    const highImpactCount = pioneers.filter(p => 
      p.impact.includes("Magsaysay") || 
      p.impact.includes("croer") || 
      p.impact.includes("lakh") || 
      p.impact.includes("transfers") || 
      p.impact.includes("Award")
    ).length;

    return {
      totalInitiatives,
      uniqueValuesCount,
      highImpactCount
    };
  }, [pioneers, uniqueTags]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8"
      id="governance-pioneers-root"
    >
      {/* Header section with Back Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-2">
          <button
            onClick={() => navigate("/resources")}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-red uppercase tracking-wider transition-colors cursor-pointer group mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Resources</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-brand-red-light text-brand-red rounded-lg border border-brand-red/10">
              <Trophy className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-navy-950">
              Governance Pioneers
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-4xl">
            A curated diagnostic database of real-life administrative case studies and ethical innovations. Use these case examples to substantiate your GS Paper 4 (Ethics) answers and GS Paper 2 (Governance) statements.
          </p>
        </div>
      </div>

      {/* KPI Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/80 p-5 rounded-xl flex items-center gap-4 shadow-sm card-blueprint">
          <div className="p-3 bg-brand-red-light text-brand-red rounded-xl shrink-0">
            <ListNumbers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Total Case Studies</span>
            <span className="text-2xl font-display font-bold text-navy-950 font-mono mt-0.5 block">
              {stats.totalInitiatives}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 p-5 rounded-xl flex items-center gap-4 shadow-sm card-blueprint">
          <div className="p-3 bg-brand-red-light text-brand-red rounded-xl shrink-0">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Ethics Values Mapped</span>
            <span className="text-2xl font-display font-bold text-navy-950 font-mono mt-0.5 block">
              {stats.uniqueValuesCount}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 p-5 rounded-xl flex items-center gap-4 shadow-sm card-blueprint">
          <div className="p-3 bg-brand-red-light text-brand-red rounded-xl shrink-0">
            <Sparkle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Highlight Cases</span>
            <span className="text-2xl font-display font-bold text-navy-950 font-mono mt-0.5 block">
              {stats.highImpactCount}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-xl shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="w-full md:flex-1 relative flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
            <MagnifyingGlass className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
            <input
              type="text"
              placeholder="Search by officer name, initiative keywords, or impact text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 p-0 text-sm focus:outline-hidden text-slate-800 placeholder-slate-400 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-slate-400 hover:text-slate-600 bg-slate-200/50 hover:bg-slate-200/80 px-2 py-0.5 rounded-md font-bold transition-all shrink-0 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Value Tag dropdown */}
          <div className="flex flex-col w-full md:w-[220px]">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-hidden hover:border-slate-300 w-full"
            >
              <option value="All">All Value Classes</option>
              {uniqueTags.filter(t => t !== "All").map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          {/* View Mode Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 self-stretch md:self-auto justify-center">
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer transition-all uppercase tracking-wider ${
                viewMode === "table"
                  ? "bg-white text-navy-950 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer transition-all uppercase tracking-wider ${
                viewMode === "grid"
                  ? "bg-white text-navy-950 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Workspace Grid
            </button>
          </div>
        </div>
      </div>

      {/* Conditional rendering based on active view mode */}
      {viewMode === "table" ? (
        /* Case studies table list */
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed min-w-[900px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  <th className="p-4 w-[180px]">Officer Name</th>
                  <th className="p-4 w-[240px]">Initiative</th>
                  <th className="p-4 w-[360px]">Impact & Outcomes</th>
                  <th className="p-4 w-[180px]">Core Values Mapped</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPioneers.map((pioneer, index) => {
                  // Determine if this is the constant T.N. Seshan row
                  const isTN = index === 0 && pioneer.officerName.includes("Seshan");

                  return (
                    <tr 
                      key={pioneer.officerName + pioneer.initiative + index} 
                      onClick={() => setSelectedPioneer(pioneer)}
                      className={`hover:bg-slate-50/50 cursor-pointer transition-colors text-xs text-slate-700 ${isTN ? "bg-brand-red-light/35 border-l-4 border-l-brand-red font-medium" : ""}`}
                    >
                      {/* Name */}
                      <td className="p-4 align-top leading-relaxed text-navy-950 font-bold font-sans">
                        <div className="space-y-1">
                          <span>{pioneer.officerName}</span>
                          {isTN && (
                            <span className="block text-[9px] font-mono text-brand-red font-bold uppercase tracking-wider">
                              ★ Anchor Standard Case
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Initiative */}
                      <td className="p-4 align-top leading-relaxed text-slate-900 font-semibold">
                        {pioneer.initiative}
                      </td>

                      {/* Impact */}
                      <td className="p-4 align-top leading-relaxed text-slate-600 font-sans font-normal line-clamp-4 mt-2">
                        {pioneer.impact}
                      </td>

                      {/* Values tags */}
                      <td className="p-4 align-top">
                        <div className="flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
                          {pioneer.values.split(",").map(val => {
                            const tag = val.trim();
                            if (!tag) return null;
                            const isMatch = tag === selectedTag;
                            return (
                              <span 
                                key={tag} 
                                onClick={() => setSelectedTag(tag)}
                                className={`text-[9px] font-bold px-2 py-0.5 rounded-full border cursor-pointer transition-all duration-150 ${
                                  isMatch 
                                    ? "bg-brand-red text-white border-brand-red" 
                                    : "bg-slate-100 text-slate-600 border-slate-200/50 hover:bg-slate-200/60"
                                }`}
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Workspace Card Grid view mode */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPioneers.map((pioneer, index) => {
            const isTN = index === 0 && pioneer.officerName.includes("Seshan");
            return (
              <motion.div
                key={pioneer.officerName + index}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedPioneer(pioneer)}
                className={`p-6 rounded-xl border bg-white shadow-xs cursor-pointer hover:shadow-md transition-all flex flex-col justify-between ${
                  isTN ? "border-brand-red ring-1 ring-brand-red bg-brand-red-light/10" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-sm uppercase ${
                      isTN ? "bg-brand-red text-white" : "bg-slate-100 text-slate-450"
                    }`}>
                      {isTN ? "★ GOLD STANDARD" : `CASE BRIEF #${index}`}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-950 font-display line-clamp-1">{pioneer.officerName}</h4>
                    <span className="text-xs font-semibold text-slate-600 block mt-1 line-clamp-1">{pioneer.initiative}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {pioneer.impact}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
                  {pioneer.values.split(",").slice(0, 3).map(v => (
                    <span 
                      key={v.trim()} 
                      onClick={() => setSelectedTag(v.trim())}
                      className="text-[9px] font-bold bg-slate-50 hover:bg-brand-red-light text-slate-500 hover:text-brand-red px-2 py-0.5 rounded-full border border-slate-200/50 transition-colors"
                    >
                      {v.trim()}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
      
      {/* Slide-over Briefing Drawer */}
      <AnimatePresence>
        {selectedPioneer && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPioneer(null)}
              className="fixed inset-0 bg-black z-40 cursor-pointer"
            />
            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-white border-l border-slate-200 z-50 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-8">
                {/* Header block */}
                <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-brand-red bg-brand-red-light px-2.5 py-0.5 rounded-md uppercase border border-brand-red/10">
                      Officer Case File
                    </span>
                    <h3 className="text-xl font-display font-bold text-navy-950 pt-2">{selectedPioneer.officerName}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedPioneer(null)}
                    className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600 cursor-pointer shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content blocks */}
                <div className="space-y-6">
                  {/* Initiative */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">ADMINISTRATIVE INITIATIVE</span>
                    <p className="text-xs font-semibold text-navy-950 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 font-sans">
                      {selectedPioneer.initiative}
                    </p>
                  </div>

                  {/* Impact */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">IMPACT & OUTCOMES</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans font-normal">
                      {selectedPioneer.impact}
                    </p>
                  </div>

                  {/* Values mapped */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block font-sans">CORE VALUES MAPPED</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedPioneer.values.split(",").map(val => (
                        <span key={val.trim()} className="text-[9px] font-bold bg-brand-red-light text-brand-red border border-brand-red/10 px-2.5 py-1 rounded-full uppercase font-mono">
                          {val.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* UPSC Application Guidance */}
                  <div className="space-y-2 pt-4 border-t border-slate-150">
                    <span className="text-[9px] font-mono font-bold text-brand-red uppercase tracking-widest block">UPSC ESSAY / GS4 APPLICATION</span>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[11px] text-slate-500 leading-relaxed space-y-2 font-sans font-normal">
                      <p>
                        <strong>GS4 Ethics Cases:</strong> Quote this officer's initiative to justify values like <em>Integrity</em>, <em>Moral Courage</em>, or <em>Citizen-Centricity</em>.
                      </p>
                      <p>
                        <strong>GS2 Governance:</strong> Highlight the use of technology, cost-effectiveness, or community participation as best practice examples.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-8">
                <button
                  onClick={() => setSelectedPioneer(null)}
                  className="w-full bg-[#171717] hover:bg-black text-white text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-colors cursor-pointer"
                >
                  Close Case File
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
