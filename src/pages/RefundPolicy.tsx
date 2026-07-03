import React from 'react';
import { Handshake } from "@phosphor-icons/react";
import { motion } from "motion/react";

export default function RefundPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 font-sans"
      id="refund-policy-root"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-navy-50 text-navy-800 p-2.5 rounded-full">
          <Handshake className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-mono font-bold text-brand-red tracking-widest uppercase block">Legal Document</span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-navy-950 tracking-tight">Refund &amp; Cancellation Policy</h1>
        </div>
      </div>

      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-8">
        <p className="text-base sm:text-lg text-slate-600 bg-slate-50 p-5 rounded-xl border border-slate-100">
          At <strong className="text-navy-950">CockroachIAS Companion Institute</strong>, we believe in absolute transparency and fairness. We do not demand upfront lakhs or push aggressive sales. Our pricing is designed to be as affordable as what a regular student pays for tea daily. This refund policy reflects our commitment to your trust.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mt-10 mb-4 font-display">1. Free Resources — No Payment Required</h2>
        <p>The following tools and resources on CockroachIAS are <strong className="text-navy-950">completely free</strong> and require no payment or login:</p>
        <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
          <li><strong>Prelims PYQ Analysis Engine</strong> — Interactive year-wise and subject-wise analysis of UPSC Preliminary examination questions.</li>
          <li><strong>UPSC Metro Map</strong> — Visual syllabus navigator for Prelims and Mains preparation.</li>
          <li><strong>Constitution Explorer</strong> — Full interactive exploration of the Indian Constitution with articles, amendments, and schedules.</li>
          <li><strong>Mains PYQ Analysis &amp; Theme-Wise Analysis</strong> — Comprehensive Mains question bank with topic clustering.</li>
          <li><strong>Cockroach Model Answers</strong> — Sample model answers for Mains GS papers.</li>
          <li><strong>Administrative Pioneers Module</strong> — Case studies of exemplary civil servants and governance innovations.</li>
          <li><strong>Mythology &amp; Ethics Case Studies</strong> — Indian mythology-based ethical dilemma explorations for GS Paper IV.</li>
          <li><strong>Survivor Resilience Quiz</strong> — Interactive quiz to assess your UPSC survival quotient.</li>
          <li><strong>Companion Chatbot</strong> — 24/7 AI-assisted support for resources and guidance.</li>
          <li><strong>Emergency SOS Support</strong> — Mental health support with immediate calming response and Tele-MANAS referral.</li>
        </ul>
        <p className="text-sm text-slate-500 italic">Since these are free, no refund applies.</p>

        <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mt-10 mb-4 font-display">2. Paid Trial Companion Cohorts</h2>
        <p>Our paid companion modules (trial cohorts starting from ₹249) are delivered through <strong>Classplus</strong>. These include:</p>
        <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
          <li>GS Foundation Concept Mastery modules</li>
          <li>Editorial &amp; Current Affairs Analytical Linkage sessions</li>
          <li>Ethics &amp; Essay Companion handholding programs</li>
          <li>1:1 ex-aspirant mentor evaluation and companionship access</li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mt-10 mb-4 font-display">3. Refund Eligibility</h2>
        <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl">
          <h3 className="text-base font-bold text-emerald-900 mb-3">✅ You ARE eligible for a refund if:</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm text-emerald-800">
            <li>You request a refund within <strong>7 days</strong> of purchasing a trial cohort and have not completed more than 30% of the module content.</li>
            <li>The cohort/module was not launched or delivered within the promised timeline.</li>
            <li>Technical issues on our end prevented you from accessing the purchased content, and we were unable to resolve them within 48 hours of your complaint.</li>
            <li>You were double-charged or charged incorrectly due to a payment processing error.</li>
          </ul>
        </div>

        <div className="bg-red-50 border border-red-200 p-5 rounded-xl mt-4">
          <h3 className="text-base font-bold text-red-900 mb-3">❌ Refund is NOT applicable if:</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm text-red-800">
            <li>More than 7 days have passed since the purchase date.</li>
            <li>You have completed more than 30% of the module/cohort content.</li>
            <li>The request is based on a change of mind after accessing substantial course material.</li>
            <li>You have downloaded or screen-recorded study materials provided as part of the cohort.</li>
          </ul>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mt-10 mb-4 font-display">4. Pre-Registration (₹0 Reservations)</h2>
        <p>
          Pre-registrations for upcoming cohorts are <strong className="text-navy-950">completely free</strong> (₹0). No payment is collected at the time of pre-registration. You will only be asked to pay when the cohort officially launches, and you are under no obligation to proceed. Therefore, no refund applies for pre-registrations.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mt-10 mb-4 font-display">5. How to Request a Refund</h2>
        <p>To initiate a refund request:</p>
        <ol className="list-decimal pl-6 space-y-2 text-sm sm:text-base">
          <li>Email us at <strong className="text-navy-950">cockroachiasinfo@gmail.com</strong> with the subject line: <em>"Refund Request — [Your Name]"</em></li>
          <li>Include your registered name, email, phone number, and the course/cohort name.</li>
          <li>Briefly describe the reason for your refund request.</li>
          <li>Our team will review your request and respond within <strong>3–5 business days</strong>.</li>
        </ol>

        <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mt-10 mb-4 font-display">6. Refund Processing</h2>
        <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
          <li>Approved refunds will be processed within <strong>7–10 business days</strong> from the date of approval.</li>
          <li>Refunds will be credited back to the original payment method used during purchase.</li>
          <li>Payment gateway processing fees (if any) are non-refundable.</li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mt-10 mb-4 font-display">7. Cancellation of Services</h2>
        <p>
          You may cancel your enrolment in any paid cohort at any time by contacting us. If the cancellation falls within the refund eligibility window (7 days, less than 30% completion), a full refund will be processed. After the eligibility window, cancellation will stop further access but no refund will be issued.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mt-10 mb-4 font-display">8. Our Companion Promise</h2>
        <div className="bg-navy-50 border-l-4 border-brand-red p-5 rounded-r-xl">
          <p className="text-navy-900 font-serif italic text-sm sm:text-base leading-relaxed">
            "If this platform resolves your conceptual gridlocks, we will guide you forward with absolute fairness. If you are unsatisfied, your hand-holding fees are returned with a thank you note. We believe in earning your trust, not locking you in."
          </p>
          <p className="text-xs text-slate-500 text-right mt-2 font-medium">— CockroachIAS Founding Manifesto</p>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mt-10 mb-4 font-display">9. Changes to This Policy</h2>
        <p>
          We reserve the right to modify this Refund &amp; Cancellation Policy at any time. Changes will be posted on this page with an updated revision date. Continued use of our paid services after changes constitutes acceptance of the revised policy.
        </p>

        <div className="pt-8 mt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-sm text-slate-500 font-mono uppercase tracking-widest">
            Last updated: July 2025
          </p>
          <p className="text-sm text-slate-500">
            Contact: cockroachiasinfo@gmail.com
          </p>
        </div>
      </div>
    </motion.div>
  );
}
