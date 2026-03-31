import React from "react";
import { motion } from "motion/react";
import { Terminal } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-brand-darker pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-brand-border p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Terminal className="w-64 h-64 text-white" />
          </div>
          
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2 h-2 bg-brand-accent animate-pulse" />
            <span className="text-[10px] font-mono text-brand-accent uppercase tracking-[0.3em]">Legal Protocol v1.0</span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-12 tracking-tighter uppercase italic">
            Terms of <span className="text-brand-accent">Service</span>
          </h1>
          
          <div className="space-y-12">
            <section>
              <h2 className="text-xs font-mono font-bold text-white mb-4 uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="text-brand-accent">01.</span> Acceptance of Protocol
              </h2>
              <p className="text-slate-500 font-mono text-xs leading-relaxed uppercase tracking-widest">
                By accessing and using NikaCloud infrastructure, you agree to be bound by these Terms and Conditions. If you do not agree, you must terminate all active sessions immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-mono font-bold text-white mb-4 uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="text-brand-accent">02.</span> Resource Provisioning
              </h2>
              <p className="text-slate-500 font-mono text-xs leading-relaxed uppercase tracking-widest">
                NikaCloud provides high-performance compute resources. We reserve the right to modify or terminate resource allocation at any time to maintain network integrity.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-mono font-bold text-white mb-4 uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="text-brand-accent">03.</span> User Responsibility
              </h2>
              <p className="text-slate-500 font-mono text-xs leading-relaxed uppercase tracking-widest">
                Users are responsible for all data transmitted through their assigned nodes. Prohibited activities include DDoS attacks, unauthorized scanning, and illegal content hosting.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-mono font-bold text-white mb-4 uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="text-brand-accent">04.</span> Billing and Credits
              </h2>
              <p className="text-slate-500 font-mono text-xs leading-relaxed uppercase tracking-widest">
                All resource allocations are final. Credits are non-refundable and must be used within the specified billing cycle.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-mono font-bold text-white mb-4 uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="text-brand-accent">05.</span> Liability Limits
              </h2>
              <p className="text-slate-500 font-mono text-xs leading-relaxed uppercase tracking-widest">
                NikaCloud is not liable for data loss or service interruptions. Users are advised to maintain redundant backups of all critical data.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-mono font-bold text-white mb-4 uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="text-brand-accent">06.</span> Jurisdiction
              </h2>
              <p className="text-slate-500 font-mono text-xs leading-relaxed uppercase tracking-widest">
                These terms are governed by the laws of India. Any disputes shall be resolved within the legal framework of New Delhi.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
