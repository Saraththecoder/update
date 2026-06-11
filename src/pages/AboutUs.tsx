import React from "react";
import { 
  Users, Target, Compass, Sparkle, 
  Heart, Trophy, Coffee, BookOpen 
} from "@phosphor-icons/react";
import { TEAM_MEMBERS } from "../data";
import { motion } from "motion/react";

import prashanthPhoto from "../../assets/prashanth.jpg";
import anushaPhoto from "../../assets/anusha.jpg";

const memberPhotos: Record<string, string> = {
  "Prashanth Navle": prashanthPhoto,
  "Anusha PC": anushaPhoto
};

export default function AboutUs() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-20" 
      id="about-us-root"
    >
      
      {/* 1. SECTION: Mission and Vision Headline */}
      <section className="text-center max-w-3xl mx-auto space-y-4" id="about-main-header">
        <span className="text-xs font-mono font-bold text-brand-red tracking-widest uppercase">The Sovereign Manifesto</span>
        <h1 className="text-3xl sm:text-5xl font-display font-medium text-navy-950 leading-tight">
          To turn extreme survivors into <br />
          <span className="text-navy-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 inline-block mt-1">nation builders.</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed pt-2">
          We did not emerge from standard corporate design rooms. We emerged from intense study hours, quiet persistence, and the quiet dignity of student rooms where dreams are nurtured.
        </p>
      </section>

      {/* 2. OUR DEEP STORY (The Genesis Story) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white border border-slate-200 p-8 sm:p-12 rounded-3xl shadow-xs" id="genesis-story-layout">
        <div className="space-y-6">
          <span className="text-[10px] font-mono font-bold text-navy-500 uppercase tracking-widest">CHAPTER ONE</span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-950">
            Born out of deep empathy, built on absolute honesty.
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            In recent years, nationwide discussions on civil service exam pressure highlighted the extreme environments and challenges aspirants navigate daily. The intense competition often pushes students to their limits, highlighting the need for real, empathetic ecosystems that protect student dignity and mental endurance.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            We realized that competitive preparation demands far more than just study materials—it demands absolute mental support and a community that acts as a secure shoulder. We chose the name <strong>Cockroachias</strong> to honor the ultimate metaphor of survival, adaptability, and unbreakable resilience.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            The cockroach represents the ultimate survivor in the natural world: <strong>absolute endurance, unbeatable adaptability to any environment, and high physical resilience.</strong> We empower students to cultivate these exact traits—turning pressure into structured, unbreakable focus to master the syllabus.
          </p>
        </div>

        <div className="space-y-6 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80" id="mission-vision-boxes">
          <div className="flex gap-4">
            <div className="bg-navy-900 text-white p-3 rounded-xl shadow-xs shrink-0 self-start">
              <Target className="w-5 h-5 text-navy-200" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-navy-950 uppercase tracking-widest">OUR ACTIVE MISSION</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                To replace impersonal, commercial formats with supportive, highly affordable, and honest companionship. We seek to protect your well-being and mental health while building pure conceptual mastery.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-200 my-4"></div>

          <div className="flex gap-4">
            <div className="bg-navy-900 text-white p-3 rounded-xl shadow-xs shrink-0 self-start">
              <Compass className="w-5 h-5 text-navy-200" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-navy-950 uppercase tracking-widest">OUR GROUND-LEVEL VISION</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                To ensure every single officer entering the Indian bureaucracy has spent a chapter of their life learning ground-level survival. When an alumnus of Cockroachias becomes an administrator of a district, they will understand the exact weight of a poor citizen's struggle—for they spent their training years on the ground level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR BEDROCK VALUES (Holding Hands Core Concepts) */}
      <section className="space-y-12" id="bedrock-values">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-mono font-bold text-slate-400 tracking-widest uppercase">The Sovereign Code</span>
          <h2 className="text-2xl font-display font-medium text-navy-950 mt-1">
            Our 4 Pillars of Educational Companionship
          </h2>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 18 } }
            }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="card-blueprint bg-white border border-slate-200 p-6 rounded-2xl space-y-3 overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300" 
            id="pillar-card-1"
          >
            <div className="bg-brand-red-light text-brand-red p-2.5 rounded-lg inline-block">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-navy-950">Absolute Companionship</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              We do not sell. We hold hands. We guide your daily study frames, analyze rough essays, and call you when mock scores sink.
            </p>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 18 } }
            }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="card-blueprint bg-white border border-slate-200 p-6 rounded-2xl space-y-3 overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300" 
            id="pillar-card-2"
          >
            <div className="bg-navy-100 text-navy-900 p-2.5 rounded-lg inline-block">
              <Coffee className="w-5 h-5" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-navy-950">Micro-Commitments Only</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Never pay continuous lakhs upfront. Unlock our premium companion blocks starting from just ₹249. Your financial freedom remains yours.
            </p>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 18 } }
            }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="card-blueprint bg-white border border-slate-200 p-6 rounded-2xl space-y-3 overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300" 
            id="pillar-card-3"
          >
            <div className="bg-slate-100 text-slate-700 p-2.5 rounded-lg inline-block">
              <Trophy className="w-5 h-5" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-navy-950">Concept focus, No Tricks</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Standard elimination short-cuts have expired. Success now requires core conceptual depths, direct news linkages, and write drills.
            </p>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 18 } }
            }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="card-blueprint bg-white border border-slate-200 p-6 rounded-2xl space-y-3 overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300" 
            id="pillar-card-4"
          >
            <div className="bg-brand-red-light text-brand-red p-2.5 rounded-lg inline-block">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-navy-950">Absolute Resilient Empathy</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              We teach from a place of deep student experience. He who learns to govern his stress and navigate difficult environments will control the administrative challenges of this nation with supreme grace.
            </p>
          </motion.div>

        </motion.div>
      </section>

      {/* 4. MEET YOUR ALLIES (Team Grid with custom metrics) */}
      <section className="space-y-12" id="mentors-allies-section">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-mono font-bold text-brand-red tracking-widest uppercase">The Companion Council</span>
          <h2 className="text-3xl font-display font-medium text-navy-950 mt-1">
            Meet the allies who lived your struggle.
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            No superstars, no commercial salespeople. Just experienced seniors who understand the intense pressure and know how to navigate the exam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="allies-grid">
          {TEAM_MEMBERS.map((member, idx) => {
            const photo = member.name in memberPhotos ? memberPhotos[member.name] : null;
            return (
              <div 
                key={idx} 
                id={`team-member-card-${idx}`}
                className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs flex flex-col justify-between hover:border-navy-300 transition duration-300 overflow-hidden"
              >
                <div>
                  {/* Card Header Profile Layout */}
                  <div className="relative h-28 bg-slate-50 rounded-t-xl -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-10 border-b border-slate-100 overflow-visible flex items-end justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-slate-200/50" />
                    
                    <div className="relative translate-y-6 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md bg-white shrink-0">
                      {photo ? (
                        <img src={photo} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-navy-950 text-white flex items-center justify-center font-display font-bold text-lg tracking-wider">
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Micro metrics tracking */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400 uppercase tracking-widest font-bold">SPECIALIZATION</span>
                      <span className="text-navy-700 bg-navy-50 px-2 py-0.5 rounded-sm font-bold">{member.specialization}</span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-bold font-display text-navy-950">{member.name}</h3>
                      <p className="text-xs text-slate-400 font-mono font-medium">{member.role}</p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Unique Empathy Metric Block */}
                <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between bg-slate-50 border border-slate-100 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-4 sm:p-5 rounded-b-2xl">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block leading-none">STRUGGLE TIME</span>
                    <span className="text-sm font-bold text-navy-950 font-display block mt-1">{member.yearsOfStruggle} Years of Intensive Prep</span>
                  </div>
                  <div className="bg-navy-900 text-white rounded-full p-1 text-[10px] font-semibold px-2">
                    LIVED IT
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

    </motion.div>
  );
}
