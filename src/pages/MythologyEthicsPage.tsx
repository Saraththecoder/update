import React, { useState, useMemo, useEffect } from "react";
import { ArrowLeft, MagnifyingGlass, BookOpen, Copy, Check, ArrowsClockwise } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import rawStoriesData from "../data/mythologyEthics.json";
import { useNavigate } from "react-router-dom";

interface MythStory {
  id: number;
  title: string;
  subtitle: string;
  source: string;
  theme: string;
  useIn: string;
  context: string;
  dilemma: string;
  cutsBothWays: string;
  modernParallel: string;
  quoteReady: string;
}

export default function MythologyEthicsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  useEffect(() => {
    document.title = "Mythology for Ethics: Dilemmas & Cases | CockroachIAS";
  }, []);

  // Compute unique sources for filtering
  const sources = useMemo(() => {
    const set = new Set<string>();
    rawStoriesData.forEach(s => {
      if (s.source.includes("Mahabharata")) set.add("Mahabharata");
      else if (s.source.includes("Ramayana")) set.add("Ramayana");
      else if (s.source.includes("Purana")) set.add("Puranas");
      else if (s.source.includes("Upanishad")) set.add("Upanishads");
      else if (s.source.includes("Greek")) set.add("Greek");
      else if (s.source.includes("Norse")) set.add("Norse");
      else if (s.source.includes("Biblical") || s.source.includes("Roman")) set.add("World");
      else set.add("Other");
    });
    return ["All", ...Array.from(set)];
  }, []);

  // Filter stories based on query and selected source
  const filteredStories = useMemo(() => {
    return rawStoriesData.filter(s => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        s.title.toLowerCase().includes(query) ||
        s.subtitle.toLowerCase().includes(query) ||
        s.theme.toLowerCase().includes(query) ||
        s.context.toLowerCase().includes(query) ||
        s.dilemma.toLowerCase().includes(query);

      if (selectedSource === "All") return matchesSearch;
      if (selectedSource === "Mahabharata") return matchesSearch && s.source.includes("Mahabharata");
      if (selectedSource === "Ramayana") return matchesSearch && s.source.includes("Ramayana");
      if (selectedSource === "Puranas") return matchesSearch && s.source.includes("Purana");
      if (selectedSource === "Upanishads") return matchesSearch && s.source.includes("Upanishad");
      if (selectedSource === "Greek") return matchesSearch && s.source.includes("Greek");
      if (selectedSource === "Norse") return matchesSearch && s.source.includes("Norse");
      if (selectedSource === "World") return matchesSearch && (s.source.includes("Biblical") || s.source.includes("Roman"));
      return matchesSearch;
    });
  }, [searchQuery, selectedSource]);

  const handleCopyQuote = (quote: string, id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(quote);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleFlip = (id: number) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8"
      id="mythology-ethics-root"
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
              <BookOpen className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-navy-950">
              Mythology for Ethics
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-4xl">
            An interactive catalog of 40 classic dilemmas from Indian Epics and World Mythology. Flip each card to study the dilemma context, structural arguments, and quote-ready scripts.
          </p>
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
              placeholder="Search by title, themes, dilemma statements, or context..."
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

          {/* Epic Source filter */}
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 self-stretch md:self-auto overflow-x-auto gap-1">
            {sources.map(source => (
              <button
                key={source}
                onClick={() => setSelectedSource(source)}
                className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap transition-all ${
                  selectedSource === source
                    ? "bg-white text-navy-950 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {source}
              </button>
            ))}
          </div>

          {/* View Mode Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 self-stretch md:self-auto justify-center">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer transition-all uppercase tracking-wider ${
                viewMode === "grid"
                  ? "bg-white text-navy-950 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Reference Cards
            </button>
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
          </div>
        </div>
      </div>

      {/* Case studies rendering */}
      {viewMode === "grid" ? (
        /* Workspace Reference Cards View with CSS 3D Flipping */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => {
            const isFlipped = !!flippedCards[story.id];
            return (
              <div 
                key={story.id} 
                className="perspective-container cursor-pointer"
                onClick={() => toggleFlip(story.id)}
              >
                <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
                  
                  {/* Front Side of Card */}
                  <div className="flip-card-front p-6 border border-slate-200 rounded-2xl flex flex-col justify-between shadow-xs hover:shadow-md hover:border-slate-350 transition-all duration-300">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500 uppercase tracking-widest">
                          {story.source}
                        </span>
                        <span className="text-[9px] font-mono font-bold text-brand-red uppercase tracking-wider">
                          Dilemma Card
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-navy-950 font-display">
                          {story.title}
                        </h4>
                        <span className="text-xs text-slate-500 italic block">
                          {story.subtitle}
                        </span>
                      </div>
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">THE DILEMMA</span>
                        <p className="text-xs font-semibold text-navy-900 leading-relaxed font-sans line-clamp-4">
                          {story.dilemma}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 hover:text-brand-red transition-colors">
                      <span className="flex items-center gap-1.5">
                        <ArrowsClockwise className="w-3.5 h-3.5 animate-spin-slow" />
                        <span>Flip to read context and usage in answers</span>
                      </span>
                    </div>
                  </div>

                  {/* Back Side of Card */}
                  <div className="flip-card-back p-6 border border-slate-200 rounded-2xl flex flex-col justify-between shadow-xs bg-slate-50/50">
                    <div className="space-y-3.5 overflow-hidden flex flex-col h-[300px]">
                      <div className="flex items-center justify-between shrink-0">
                        <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                          CASE INSIGHT
                        </span>
                        <div className="flex gap-1.5">
                          {story.useIn.split("·").map(u => (
                            <span key={u.trim()} className="text-[8px] font-mono font-bold text-brand-red bg-brand-red-light px-1.5 py-0.5 rounded uppercase">
                              {u.trim()}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Scrollable details wrapper to prevent text clippings */}
                      <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                        {/* Context */}
                        <div className="space-y-0.5">
                          <span className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Context</span>
                          <p className="text-[11px] text-slate-600 leading-normal font-sans font-normal">
                            {selectedSource === "All" || story.context.length > 150 ? story.context : story.context}
                          </p>
                        </div>
                        {/* Usage in Answer */}
                        <div className="space-y-0.5">
                          <span className="text-[8px] font-mono font-bold text-brand-red uppercase tracking-widest block">Modern Parallel</span>
                          <p className="text-[11px] text-slate-700 font-semibold leading-normal font-sans">
                            {story.modernParallel}
                          </p>
                        </div>
                        {/* Quote Ready Script */}
                        <div className="relative group bg-navy-950 text-slate-300 p-2.5 rounded-lg font-mono text-[9px] leading-normal flex items-center justify-between gap-2 shrink-0">
                          <span>{story.quoteReady}</span>
                          <button
                            onClick={(e) => handleCopyQuote(story.quoteReady, story.id, e)}
                            className="p-1 bg-slate-800 hover:bg-slate-700 text-white rounded-md transition-colors cursor-pointer shrink-0"
                          >
                            {copiedId === story.id ? (
                              <Check className="w-3 text-green-400" />
                            ) : (
                              <Copy className="w-3" />
                            )}
                          </button>
                        </div>
                        {/* Themes */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {story.theme.split("·").map(t => (
                            <span key={t.trim()} className="text-[8px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full uppercase">
                              {t.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 hover:text-brand-red transition-colors shrink-0">
                      <span className="flex items-center gap-1.5">
                        <ArrowsClockwise className="w-3.5 h-3.5" />
                        <span>Flip to read dilemma</span>
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View Mode */
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed min-w-[900px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  <th className="p-4 w-[160px]">Epic Case</th>
                  <th className="p-4 w-[180px]">Theme</th>
                  <th className="p-4 w-[380px]">Context / Dilemma</th>
                  <th className="p-4 w-[180px]">Application Area</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStories.map((story) => (
                  <tr
                    key={story.id}
                    onClick={() => toggleFlip(story.id)}
                    className="hover:bg-slate-50/50 cursor-pointer transition-colors text-xs text-slate-700"
                  >
                    <td className="p-4 align-top leading-relaxed text-navy-950 font-bold font-sans">
                      <div className="space-y-1">
                        <span>{story.title}</span>
                        <span className="block text-[8px] font-mono text-slate-400 uppercase">
                          {story.source}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 align-top leading-relaxed text-slate-900 font-semibold uppercase tracking-wider text-[10px]">
                      {story.theme}
                    </td>
                    <td className="p-4 align-top leading-relaxed text-slate-600 font-sans font-normal">
                      <div className="line-clamp-2">{story.context}</div>
                      <div className="text-[10px] text-brand-red font-medium mt-1">Dilemma: {story.dilemma}</div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="flex flex-wrap gap-1">
                        {story.useIn.split("·").map(u => (
                          <span key={u.trim()} className="text-[9px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            {u.trim()}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}
