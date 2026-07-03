import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 font-sans">
      <h1 className="text-4xl font-bold text-navy-950 mb-8 tracking-tight">Privacy Policy</h1>
      
      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
        <p className="text-lg">
          At Cockroach IAS, your privacy is a priority. We are committed to protecting your personal information and being transparent about what we do with it. We understand the trust you place in us as an aspirant.
        </p>
        
        <h2 className="text-2xl font-bold text-navy-950 mt-10 mb-4">1. Information We Collect</h2>
        <p>
          We collect information to provide better services to our users. This includes basic account information (like name and email), analytics on how you use our interactive tools (like the Constitution Explorer or Metro Map), and communication records if you contact our mentors.
        </p>
        
        <h2 className="text-2xl font-bold text-navy-950 mt-10 mb-4">2. How We Use Information</h2>
        <p>
          Your information is used solely to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Personalize your learning experience and track your progress.</li>
          <li>Communicate with you regarding updates, trial cohorts, or support.</li>
          <li>Improve the platform's features based on aggregated usage patterns.</li>
        </ul>
        <p>
          We <strong>do not</strong> and will never sell your personal information to third-party advertisers or external agencies.
        </p>

        <h2 className="text-2xl font-bold text-navy-950 mt-10 mb-4">3. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal data. We restrict access to personal information to our employees, contractors, and agents who need to know that information in order to process it for us.
        </p>
        
        <h2 className="text-2xl font-bold text-navy-950 mt-10 mb-4">4. Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal information at any time. If you wish to delete your account or have questions about how your data is handled, please reach out to us via our Contact page.
        </p>
        
        <div className="pt-12 mt-12 border-t border-slate-200">
          <p className="text-sm text-slate-500 font-mono uppercase tracking-widest">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
