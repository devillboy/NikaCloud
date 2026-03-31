import React from "react";
import { motion } from "motion/react";
import { Shield } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-brand-darker pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-brand-border p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Shield className="w-64 h-64 text-white" />
          </div>

          <div className="flex items-center gap-2 mb-8">
            <div className="w-2 h-2 bg-brand-accent animate-pulse" />
            <span className="text-[10px] font-mono text-brand-accent uppercase tracking-[0.3em]">Privacy Protocol v1.0</span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-12 tracking-tighter uppercase italic">
            Privacy <span className="text-brand-accent">Policy</span>
          </h1>
          
          <div className="space-y-12">
            <section>
              <h2 className="text-xs font-mono font-bold text-white mb-4 uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="text-brand-accent">01.</span> Data Collection
              </h2>
              <p className="text-slate-500 font-mono text-xs leading-relaxed uppercase tracking-widest">
                We collect essential metadata required for infrastructure management, including identifiers, network logs, and billing information.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-mono font-bold text-white mb-4 uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="text-brand-accent">02.</span> Information Usage
              </h2>
              <p className="text-slate-500 font-mono text-xs leading-relaxed uppercase tracking-widest">
                Collected data is used exclusively to optimize network performance, process resource transactions, and maintain security protocols.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-mono font-bold text-white mb-4 uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="text-brand-accent">03.</span> Encryption Protocols
              </h2>
              <p className="text-slate-500 font-mono text-xs leading-relaxed uppercase tracking-widest">
                All sensitive data is encrypted at rest and in transit. We implement industry-standard security measures to prevent unauthorized access.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-mono font-bold text-white mb-4 uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="text-brand-accent">04.</span> Third-Party Nodes
              </h2>
              <p className="text-slate-500 font-mono text-xs leading-relaxed uppercase tracking-widest">
                We may integrate with verified third-party processors for payment and analytics. These entities adhere to their own strict privacy protocols.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-mono font-bold text-white mb-4 uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="text-brand-accent">05.</span> Session Cookies
              </h2>
              <p className="text-slate-500 font-mono text-xs leading-relaxed uppercase tracking-widest">
                Our platform uses cookies to maintain session state and analyze traffic patterns. You can manage these through your browser's security settings.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-mono font-bold text-white mb-4 uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="text-brand-accent">06.</span> Protocol Updates
              </h2>
              <p className="text-slate-500 font-mono text-xs leading-relaxed uppercase tracking-widest">
                We reserve the right to update this policy. Significant changes will be broadcasted through our official communication channels.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
