import { motion } from 'motion/react';
import { ChevronRight, Cpu, Globe, Shield, Zap, Server, Gamepad2, HardDrive, Clock, Disc as Discord, CheckCircle2, Gift, Database, ArrowRight, Terminal, Activity } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden bg-brand-darker">
      {/* Technical Grid Background */}
      <div className="fixed inset-0 technical-grid opacity-20 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 px-3 py-1 border border-brand-border bg-brand-card mb-8">
              <div className="w-2 h-2 bg-brand-accent animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand-accent">System Status: Optimal</span>
            </div>
            
            <motion.h1 
              className="text-6xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.85] text-white"
            >
              HIGH <span className="text-brand-accent">VELOCITY</span> <br />
              INFRASTRUCTURE
            </motion.h1>
            
            <motion.p 
              className="text-lg text-slate-500 mb-10 max-w-xl font-mono uppercase tracking-widest leading-relaxed"
            >
              Enterprise-grade hardware nodes. Zero-latency backbone. Professional-tier deployment for critical workloads.
            </motion.p>

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/claim-free-server" className="px-8 py-4 bg-brand-accent text-brand-darker font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-colors flex items-center gap-3">
                <Terminal className="w-4 h-4" />
                Get Free Server
              </Link>
              <a href="#plans" className="px-8 py-4 border border-brand-border text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-brand-border transition-colors">
                View Plans
              </a>
            </div>
          </motion.div>

          {/* Technical Hero Element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:block relative"
          >
            <div className="bg-brand-card border border-brand-border p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-brand-accent/30" />
              
              <div className="flex justify-between items-start mb-12">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-brand-accent uppercase tracking-widest">Node Identifier</div>
                  <div className="text-xl font-bold text-white">NIKA-CORE-01</div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 border border-brand-accent/20 text-brand-accent text-[10px] font-mono uppercase">
                  <Activity className="w-3 h-3 animate-pulse" />
                  Live Stream
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider">
                    <span className="text-slate-500">Compute Load</span>
                    <span className="text-white">42.8%</span>
                  </div>
                  <div className="h-1 w-full bg-brand-border overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "42.8%" }}
                      className="h-full bg-brand-accent" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider">
                    <span className="text-slate-500">Memory Allocation</span>
                    <span className="text-white">12.4 GB / 32 GB</span>
                  </div>
                  <div className="h-1 w-full bg-brand-border overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "38.7%" }}
                      className="h-full bg-brand-accent" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-brand-border">
                  <div className="space-y-1">
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Uptime</div>
                    <div className="text-xs font-mono text-white">99.998%</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Latency</div>
                    <div className="text-xs font-mono text-white">0.42ms</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative z-10 border-y border-brand-border bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-px bg-brand-border border border-brand-border">
            {[
              { icon: Zap, title: "MAXIMUM VELOCITY", desc: "Powered by enterprise NVMe arrays and high-frequency compute nodes for zero-latency execution." },
              { icon: Shield, title: "HARDENED SECURITY", desc: "Multi-layer DDoS mitigation protocols active at the edge. Automated threat neutralization." },
              { icon: Globe, title: "GLOBAL BACKBONE", desc: "Tier-1 network topology ensuring deterministic routing and minimal hop counts worldwide." }
            ].map((feature, i) => (
              <div key={i} className="bg-brand-card p-10 group hover:bg-brand-darker transition-colors">
                <feature.icon className="w-8 h-8 text-brand-accent mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm font-mono font-bold mb-4 text-white uppercase tracking-[0.2em]">{feature.title}</h3>
                <p className="text-xs font-mono text-slate-500 leading-relaxed uppercase tracking-wider">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Sections */}
      <section id="plans" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Minecraft Plans */}
          <div id="minecraft" className="mb-32">
            <div className="flex flex-col mb-16">
              <div className="text-[10px] font-mono text-brand-accent uppercase tracking-[0.4em] mb-4">Service Category: 01</div>
              <h2 className="text-4xl font-bold text-white tracking-tighter">GAME HOSTING <span className="text-brand-accent">NODES</span></h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-brand-border border border-brand-border">
              {[
                { name: "Plan 1", price: "₹99", ram: "2 GB", ssd: "8 GB", cpu: "50%" },
                { name: "Plan 2", price: "₹199", ram: "4 GB", ssd: "15 GB", cpu: "100%" },
                { name: "Plan 3", price: "₹299", ram: "6 GB", ssd: "25 GB", cpu: "150%" },
                { name: "Plan 4", price: "₹399", ram: "8 GB", ssd: "45 GB", cpu: "200%" },
                { name: "Plan 5", price: "₹499", ram: "10 GB", ssd: "60 GB", cpu: "300%" },
                { name: "Plan 6", price: "₹599", ram: "12 GB", ssd: "80 GB", cpu: "400%" },
                { name: "Plan 7", price: "₹699", ram: "16 GB", ssd: "100 GB", cpu: "600%" },
                { name: "Plan 8", price: "₹799", ram: "24 GB", ssd: "150 GB", cpu: "850%" },
                { name: "Plan 9", price: "₹899", ram: "32 GB", ssd: "200 GB", cpu: "1000%" },
                { name: "Plan 10", price: "₹999", ram: "64 GB", ssd: "400 GB", cpu: "2000%", popular: true }
              ].map((plan, i) => (
                <div key={i} className="bg-brand-card p-8 relative group">
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-brand-accent text-brand-darker text-[8px] font-bold uppercase tracking-widest px-3 py-1">
                      High Demand
                    </div>
                  )}
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Node {plan.name}</div>
                  <div className="text-2xl font-bold text-white mb-6 tracking-tight">{plan.price}<span className="text-xs text-slate-500 font-normal">/mo</span></div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-slate-500">RAM</span>
                      <span className="text-brand-accent">{plan.ram}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-slate-500">SSD</span>
                      <span className="text-brand-accent">{plan.ssd}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-slate-500">CPU</span>
                      <span className="text-brand-accent">{plan.cpu}</span>
                    </div>
                  </div>
                  
                  <Link to="/billing" className="block w-full py-3 border border-brand-border text-center text-[10px] font-bold uppercase tracking-widest text-white hover:bg-brand-accent hover:text-brand-darker hover:border-brand-accent transition-all">
                    Buy Now
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* VPS Plans */}
          <div id="vps">
            <div className="flex flex-col mb-16">
              <div className="text-[10px] font-mono text-brand-accent uppercase tracking-[0.4em] mb-4">Service Category: 02</div>
              <h2 className="text-4xl font-bold text-white tracking-tighter">VIRTUAL <span className="text-brand-accent">PRIVATE</span> SERVERS</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-brand-border border border-brand-border">
              {[
                { name: "VPS 1", price: "₹699", cores: "2 vCore", ram: "8 GB", storage: "48 GB" },
                { name: "VPS 2", price: "₹1,399", cores: "4 vCore", ram: "16 GB", storage: "96 GB" },
                { name: "VPS 3", price: "₹2,199", cores: "6 vCore", ram: "24 GB", storage: "112 GB" },
                { name: "VPS 4", price: "₹2,999", cores: "8 vCore", ram: "32 GB", storage: "128 GB" },
                { name: "VPS 5", price: "₹4,699", cores: "16 vCore", ram: "64 GB", storage: "256 GB", popular: true }
              ].map((plan, i) => (
                <div key={i} className="bg-brand-card p-10 relative group">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">{plan.name}</div>
                  <div className="text-3xl font-bold text-white mb-8 tracking-tight">{plan.price}<span className="text-xs text-slate-500 font-normal">/mo</span></div>
                  
                  <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-300">
                      <Cpu className="w-4 h-4 text-brand-accent" /> {plan.cores}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-brand-accent" /> {plan.ram} RAM
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-300">
                      <HardDrive className="w-4 h-4 text-brand-accent" /> {plan.storage} NVMe
                    </div>
                  </div>
                  
                  <Link to="/billing" className="block w-full py-4 bg-brand-dark border border-brand-border text-center text-[10px] font-bold uppercase tracking-widest text-white hover:border-brand-accent transition-all">
                    Buy Now
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10 bg-brand-dark border-t border-brand-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 px-3 py-1 border border-brand-border bg-brand-card mb-8">
            <Discord className="w-4 h-4 text-brand-accent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand-accent">Community Access</span>
          </div>
          <h2 className="text-5xl font-bold mb-8 text-white tracking-tighter">JOIN THE <span className="text-brand-accent">NETWORK</span></h2>
          <p className="text-slate-500 mb-12 max-w-2xl mx-auto font-mono text-xs uppercase tracking-[0.2em] leading-relaxed">
            Connect with our engineering team and community. Access exclusive deployment protocols and real-time support.
          </p>
          <a href="https://discord.gg/nikacloud" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 px-12 py-5 bg-white text-brand-darker font-bold text-xs uppercase tracking-[0.3em] hover:bg-brand-accent transition-colors">
            Authorize Discord Connection
          </a>
        </div>
      </section>
    </div>
  );
}
