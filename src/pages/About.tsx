import React from "react";
import { motion } from "motion/react";
import { Shield, Users, Zap, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          About <span className="text-fiery-gradient">NikaCloud</span>
        </h1>
        <p className="text-slate-400 max-w-3xl mx-auto text-lg">
          NikaCloud was founded with a single mission: to provide high-performance, reliable, and affordable hosting solutions for gamers and developers worldwide.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 rounded-3xl border border-slate-800"
        >
          <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-6">
            <Zap className="w-6 h-6 text-brand-blue" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
          <p className="text-slate-400 leading-relaxed">
            We envision a world where starting a game server or deploying an application is as simple as a single click. We strive to eliminate the technical barriers that prevent creators from bringing their ideas to life.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 rounded-3xl border border-slate-800"
        >
          <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-6">
            <Shield className="w-6 h-6 text-brand-accent" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Our Commitment</h2>
          <p className="text-slate-400 leading-relaxed">
            Security and uptime are our top priorities. With enterprise-grade DDoS protection and a 99.9% uptime guarantee, we ensure that your community stays online and protected 24/7.
          </p>
        </motion.div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, title: "Community Driven", desc: "Built by gamers, for gamers." },
            { icon: Globe, title: "Global Network", desc: "Low latency nodes worldwide." },
            { icon: Zap, title: "Instant Setup", desc: "Servers ready in seconds." },
            { icon: Shield, title: "DDoS Protection", desc: "Advanced filtering technology." }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <item.icon className="w-8 h-8 text-brand-blue mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
