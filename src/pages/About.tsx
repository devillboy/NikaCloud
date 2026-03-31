import React from "react";
import { motion } from "motion/react";
import { Shield, Zap, Globe, Cpu, Terminal, Activity } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-brand-darker pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-brand-accent animate-pulse" />
            <span className="text-[10px] font-mono text-brand-accent uppercase tracking-[0.3em]">System Overview</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter uppercase italic">
            About <span className="text-brand-accent">Infrastructure</span>
          </h1>
          <p className="text-slate-500 font-mono text-sm max-w-3xl leading-relaxed uppercase tracking-wider">
            NikaCloud is a high-performance compute network engineered for low-latency applications. We provide the raw power required for modern gaming, development, and enterprise workloads.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border border-brand-border p-10 relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Terminal className="w-24 h-24 text-white" />
            </div>
            <div className="w-12 h-12 bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-8">
              <Zap className="w-6 h-6 text-brand-accent" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight italic">The Vision</h2>
            <p className="text-slate-500 font-mono text-xs leading-relaxed uppercase tracking-widest">
              To democratize high-performance infrastructure. We eliminate the friction between code and execution, providing a seamless protocol for resource allocation.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border border-brand-border p-10 relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Cpu className="w-24 h-24 text-white" />
            </div>
            <div className="w-12 h-12 bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-8">
              <Shield className="w-6 h-6 text-brand-accent" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight italic">The Commitment</h2>
            <p className="text-slate-500 font-mono text-xs leading-relaxed uppercase tracking-widest">
              Redundancy is built into our DNA. With multi-homed networking and enterprise-grade hardware, we guarantee 99.9% availability for all critical nodes.
            </p>
          </motion.div>
        </div>

        <div className="border-t border-brand-border pt-24">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-3xl font-bold text-white uppercase tracking-tighter italic">Core Specifications</h2>
            <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              <Activity className="w-4 h-4 text-brand-accent" />
              <span>Network Status: Optimal</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Globe, title: "Global Mesh", desc: "Low-latency edge nodes." },
              { icon: Zap, title: "Rapid Provision", desc: "Nodes active in < 60s." },
              { icon: Shield, title: "L7 Mitigation", desc: "Advanced DDoS filtering." },
              { icon: Cpu, title: "NVMe Arrays", desc: "High-IOPS storage tech." }
            ].map((item, i) => (
              <div key={i} className="p-8 border border-brand-border hover:border-brand-accent transition-colors group">
                <item.icon className="w-8 h-8 text-slate-500 group-hover:text-brand-accent mb-6 transition-colors" />
                <h3 className="text-white font-bold mb-3 uppercase tracking-tight italic">{item.title}</h3>
                <p className="text-slate-600 font-mono text-[10px] uppercase tracking-widest leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
