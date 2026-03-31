import React from "react";
import { motion } from "motion/react";

export default function Terms() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-10 rounded-3xl border border-slate-800"
      >
        <h1 className="text-4xl font-bold text-white mb-8 tracking-tight">Terms and <span className="text-fiery-gradient">Conditions</span></h1>
        
        <div className="space-y-8 text-slate-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using NikaCloud's services, you agree to be bound by these Terms and Conditions. If you do not agree, please refrain from using our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Service Provision</h2>
            <p>NikaCloud provides hosting services including Minecraft servers and VPS. We reserve the right to modify or discontinue services at any time without prior notice.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. User Responsibilities</h2>
            <p>Users are responsible for maintaining the security of their accounts and for all activities that occur under their credentials. Prohibited activities include, but are not limited to, illegal content hosting, DDoS attacks, and unauthorized access attempts.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Payments and Refunds</h2>
            <p>All payments are final. Refunds are only issued at the sole discretion of NikaCloud management in cases of service failure or billing errors.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Limitation of Liability</h2>
            <p>NikaCloud shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Governing Law</h2>
            <p>These terms are governed by the laws of India. Any disputes shall be resolved in the courts of New Delhi.</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
