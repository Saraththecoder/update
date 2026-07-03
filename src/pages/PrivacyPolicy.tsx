import React from 'react';
import { ShieldCheck } from "@phosphor-icons/react";
import { motion } from "motion/react";

export default function PrivacyPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 font-sans"
      id="privacy-policy-root"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-navy-50 text-navy-800 p-2.5 rounded-full">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-mono font-bold text-brand-red tracking-widest uppercase block">Legal Document</span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-navy-950 tracking-tight">Privacy Policy</h1>
        </div>
      </div>

      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-8">
        <p className="text-base sm:text-lg text-slate-600 bg-slate-50 p-5 rounded-xl border border-slate-100">
          At <strong className="text-navy-950">CockroachIAS Companion Institute</strong>, your privacy is sacred. We are committed to protecting your personal information and being transparent about what we collect and how we use it. We understand the immense trust you place in us as an aspirant navigating the UPSC journey.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mt-10 mb-4 font-display">1. Information We Collect</h2>
        <p>We collect information to provide better companion services to our users. This includes:</p>
        <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
          <li><strong>Account Information:</strong> Name, email address, phone/WhatsApp number, and CSE target year when you register via our Contact form or pre-register for trial cohorts.</li>
          <li><strong>Platform Usage Data:</strong> Analytics on how you interact with our free interactive tools — including the Constitution Explorer, UPSC Metro Map, Prelims PYQ Analysis Engine, Mains Blueprint tools, Administrative Pioneers module, Mythology &amp; Ethics Case Studies, and the Survivor Resilience Quiz.</li>
          <li><strong>Communication Records:</strong> Messages submitted through our Companion Support Thread (contact form), Emergency SOS interactions, and chatbot conversations.</li>
          <li><strong>Technical Data:</strong> Browser type, device information, IP address, and session data collected automatically for platform security and performance.</li>
          <li><strong>Classplus Integration:</strong> When you click the Login button, you are redirected to Classplus (classplusapp.com). Any data you provide on Classplus is governed by their own privacy policy.</li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mt-10 mb-4 font-display">2. How We Use Your Information</h2>
        <p>Your information is used solely to:</p>
        <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
          <li>Personalize your learning experience across our Prelims Command System, Mains Blueprint Engine, and Administrative Integrity Workspace.</li>
          <li>Connect you with our ex-aspirant mentors and companions for academic coordination, schedule auditing, and emotional support.</li>
          <li>Process pre-registrations and enrolments for our trial companion cohorts (starting from ₹249).</li>
          <li>Communicate updates about new resources, cohort launches, or support responses.</li>
          <li>Improve platform features based on aggregated, anonymized usage patterns.</li>
          <li>Respond to Emergency SOS activations and provide mental health support resources (including referrals to Tele-MANAS).</li>
        </ul>
        <p>
          We <strong className="text-navy-950">do not</strong> and will never sell your personal information to third-party advertisers, coaching aggregators, or external agencies. We do not employ aggressive sales counsellors who pester you.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mt-10 mb-4 font-display">3. Data Sharing &amp; Third Parties</h2>
        <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
          <li><strong>Classplus:</strong> Our course delivery and login is powered by Classplus. When you access our courses via the Login button, your interaction with Classplus is subject to their privacy policy.</li>
          <li><strong>Analytics:</strong> We may use anonymized, aggregated data for platform improvement. No personally identifiable information is shared.</li>
          <li><strong>Legal Requirements:</strong> We may disclose information if required by law, regulation, or legal process.</li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mt-10 mb-4 font-display">4. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal data. All companion support threads are treated as confidential. We restrict access to personal information to authorized team members who need it to provide our services.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mt-10 mb-4 font-display">5. Cookies &amp; Tracking</h2>
        <p>
          Our platform may use cookies and local storage to remember your preferences (such as quiz progress, Constitution Explorer bookmarks, and theme settings). These are functional cookies essential for the user experience and are not used for advertising or cross-site tracking.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mt-10 mb-4 font-display">6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
          <li>Access, update, or delete your personal information at any time.</li>
          <li>Withdraw consent for communications by contacting us.</li>
          <li>Request a copy of the data we hold about you.</li>
          <li>Raise a complaint if you believe your data has been mishandled.</li>
        </ul>
        <p>
          For any privacy-related requests, please reach out to us at <strong className="text-navy-950">infocockroachias@gmail.com</strong> or through our Contact page.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mt-10 mb-4 font-display">7. Children's Privacy</h2>
        <p>
          Our platform is designed for UPSC aspirants and is not intended for children under the age of 16. We do not knowingly collect personal information from children.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mt-10 mb-4 font-display">8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated revision date. We encourage you to review this page periodically.
        </p>

        <div className="pt-8 mt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-sm text-slate-500 font-mono uppercase tracking-widest">
            Last updated: July 2025
          </p>
          <p className="text-sm text-slate-500">
            Contact: infocockroachias@gmail.com
          </p>
        </div>
      </div>
    </motion.div>
  );
}
