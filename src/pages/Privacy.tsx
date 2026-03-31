import React from "react";
import { motion } from "motion/react";

export default function Privacy() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-10 rounded-3xl border border-slate-800"
      >
        <h1 className="text-4xl font-bold text-white mb-8 tracking-tight">Privacy <span className="text-fiery-gradient">Policy</span></h1>
        
        <div className="space-y-8 text-slate-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Information Collection</h2>
            <p>We collect personal information such as your name, email address, and payment details when you register and use our services. This information is necessary for account management and service delivery.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Use of Information</h2>
            <p>Your information is used to provide and improve our services, process payments, and communicate with you about your account and our offerings.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Data Security</h2>
            <p>We implement advanced security measures to protect your personal data from unauthorized access, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Third-Party Services</h2>
            <p>We may use third-party services for payment processing and analytics. These services have their own privacy policies and we are not responsible for their data practices.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Cookies</h2>
            <p>We use cookies to enhance your browsing experience and analyze website traffic. You can manage your cookie preferences through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Changes to Policy</h2>
            <p>We reserve the right to update this Privacy Policy at any time. We will notify you of any significant changes through our website or email.</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
