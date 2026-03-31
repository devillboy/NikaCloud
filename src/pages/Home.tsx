import { motion } from 'motion/react';
import { ChevronRight, Cpu, Globe, Shield, Zap, Server, Gamepad2, HardDrive, Clock, Disc as Discord, CheckCircle2, Gift, Database, ArrowRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Professional Grid Background */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 mb-6 text-brand-accent">
              <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider">Enterprise-Grade Infrastructure</span>
            </div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] text-white"
            >
              Next-Gen <br />
              <span className="text-fiery-gradient">
                Cloud Hosting
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl text-slate-400 mb-10 max-w-xl leading-relaxed"
            >
              Experience the pinnacle of performance. Enterprise-grade hardware, zero-lag infrastructure, and professional-grade support.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-6"
            >
              <Link to="/claim-free-server" className="px-10 py-5 rounded-full bg-fiery-gradient text-white font-bold hover:opacity-90 transition-all flex items-center gap-3 group shadow-2xl shadow-brand-accent/30">
                <Gift className="w-5 h-5" />
                Claim Free Server
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#plans" className="px-10 py-5 rounded-full glass-panel text-white font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                Explore Plans
              </a>
            </motion.div>
          </motion.div>

          {/* Professional Hero Element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block h-[500px]"
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative w-full max-w-md glass-panel rounded-2xl p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center border border-brand-accent/20">
                    <Server className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                    System Operational
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-400">
                      <span className="font-medium text-slate-300">CPU Usage</span>
                      <span>45%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "45%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-fiery-gradient" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-400">
                      <span className="font-medium text-slate-300">RAM Usage</span>
                      <span>14.2 GB / 32 GB</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "44%" }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                        className="h-full bg-fiery-gradient" 
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-brand-accent" />
                    <span className="text-sm text-slate-300">DDoS Protection Active</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">NIKA-US-EAST-1</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Free Server Banner */}
      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-brand-accent/20 to-brand-accent-light/20 border border-brand-accent/30 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/20 blur-[100px] rounded-full" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/20 text-brand-accent text-sm font-bold uppercase tracking-wider mb-4">
                <Gift className="w-4 h-4" /> Limited Time Offer
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get a Free Minecraft Server</h2>
              <p className="text-slate-300 max-w-xl text-lg mb-6">
                Start your community today with our powerful free tier. No credit card required. Instant automated setup.
              </p>
              <div className="flex flex-wrap gap-4 mb-0">
                <div className="flex items-center gap-2 text-sm text-slate-300 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800">
                  <Cpu className="w-4 h-4 text-brand-accent" /> 100% CPU
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800">
                  <HardDrive className="w-4 h-4 text-brand-accent" /> 5GB RAM
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800">
                  <Database className="w-4 h-4 text-brand-accent" /> 10GB NVMe
                </div>
              </div>
            </div>
            <div className="relative z-10 shrink-0">
              <Link to="/claim-free-server" className="bg-white text-brand-accent hover:bg-slate-100 font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-xl shadow-white/10 flex items-center gap-2">
                Claim Now <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative z-10 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Choose NikaCloud?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">We provide an enterprise-grade ecosystem designed for ultimate performance, reliability, and scale.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Powered by the latest NVMe SSDs and high-clock CPUs for zero-lag performance." },
              { icon: Shield, title: "DDoS Protection", desc: "Enterprise-grade mitigation to keep your servers online 24/7, automatically." },
              { icon: Globe, title: "Global Network", desc: "Premium tier-1 blend network ensuring low latency across the globe." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-8 rounded-2xl hover:bg-slate-800/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-brand-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Sections */}
      <section id="plans" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Minecraft Plans */}
          <div id="minecraft" className="mb-32">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Game Host Plans</h2>
                <p className="text-slate-400">High-performance servers for your community.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                { name: "Plan 1", price: "₹99", ram: "2 GB", ssd: "8 GB", cpu: "50%", ports: "1", subdomains: "1", backups: "1 Backup" },
                { name: "Plan 2", price: "₹199", ram: "4 GB", ssd: "15 GB", cpu: "100%", ports: "2", subdomains: "1", backups: "1 Backup" },
                { name: "Plan 3", price: "₹299", ram: "6 GB", ssd: "25 GB", cpu: "150%", ports: "2", subdomains: "2", backups: "Backups" },
                { name: "Plan 4", price: "₹399", ram: "8 GB", ssd: "45 GB", cpu: "200%", ports: "3", subdomains: "3", backups: "Backups" },
                { name: "Plan 5", price: "₹499", ram: "10 GB", ssd: "60 GB", cpu: "300%", ports: "4", subdomains: "4", backups: "Backups" },
                { name: "Plan 6", price: "₹599", ram: "12 GB", ssd: "80 GB", cpu: "400%", ports: "6", subdomains: "5", backups: "Backups" },
                { name: "Plan 7", price: "₹699", ram: "16 GB", ssd: "100 GB", cpu: "600%", ports: "8", subdomains: "6", backups: "Backups" },
                { name: "Plan 8", price: "₹799", ram: "24 GB", ssd: "150 GB", cpu: "850%", ports: "10", subdomains: "10", backups: "Backups", extra: "1 Discord Bot Hosting" },
                { name: "Plan 9", price: "₹899", ram: "32 GB", ssd: "200 GB", cpu: "1000%", ports: "12", subdomains: "12", backups: "Backups", extra: "2 Discord Bot Hosting" },
                { name: "Plan 10", price: "₹999", ram: "64 GB", ssd: "400 GB", cpu: "2000%", ports: "24", subdomains: "24", backups: "Backups", extra: "4 Discord Bot Hosting", popular: true }
              ].map((plan, i) => (
                <div key={i} className={`relative h-full glass-panel p-6 rounded-3xl border ${plan.popular ? 'border-brand-blue shadow-lg shadow-brand-blue/10' : 'border-slate-800'} flex flex-col`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-accent text-white text-[10px] font-bold uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-1 text-white uppercase tracking-wider">Game Host {plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400 text-sm">/mo</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-grow text-sm">
                    <li className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-brand-accent" /> {plan.ram} RAM
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-brand-accent" /> {plan.ssd} NVMe SSD
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-brand-accent" /> {plan.cpu} CPU
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-brand-accent" /> {plan.ports} Ports • {plan.subdomains} Subdomain
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-brand-accent" /> {plan.backups}
                    </li>
                    {plan.extra && (
                      <li className="flex items-center gap-2 text-brand-accent font-medium mt-2">
                        <Gift className="w-4 h-4" /> {plan.extra}
                      </li>
                    )}
                  </ul>
                  
                  <Link to="/billing" className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all text-center ${plan.popular ? 'bg-fiery-gradient hover:opacity-90 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'}`}>
                    Order Now
                  </Link>
                  <p className="text-xs text-slate-500 mt-3 text-center">Instant automated setup after payment.</p>
                </div>
              ))}
            </div>
          </div>

          {/* VPS Plans */}
          <div id="vps">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Server className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">VPS Hosting</h2>
                <p className="text-slate-400">Scalable virtual machines for any workload.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "VPS HOST PLAN 1", price: "₹699", cores: "2 vCore", ram: "8 GB", storage: "48 GB NVMe" },
                { name: "VPS HOST PLAN 2", price: "₹1,399", cores: "4 vCore", ram: "16 GB", storage: "96 GB NVMe" },
                { name: "VPS HOST PLAN 3", price: "₹2,199", cores: "6 vCore", ram: "24 GB", storage: "112 GB NVMe" },
                { name: "VPS HOST PLAN 4", price: "₹2,999", cores: "8 vCore", ram: "32 GB", storage: "128 GB NVMe" },
                { name: "VPS HOST PLAN 5", price: "₹4,699", cores: "16 vCore", ram: "64 GB", storage: "256 GB NVMe", popular: true }
              ].map((plan, i) => (
                <div key={i} className={`relative h-full glass-panel p-8 rounded-3xl border ${plan.popular ? 'border-purple-500 shadow-lg shadow-purple-500/10' : 'border-slate-800'} flex flex-col`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-500 text-white text-xs font-bold uppercase tracking-wider">
                      Best Value
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400">/mo</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-center gap-3 text-slate-300">
                      <Cpu className="w-5 h-5 text-purple-500" /> {plan.cores}
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-purple-500" /> {plan.ram} RAM
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                      <HardDrive className="w-5 h-5 text-purple-500" /> {plan.storage}
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                      <Globe className="w-5 h-5 text-purple-500" /> 1Gbps Port
                    </li>
                  </ul>
                  
                  <Link to="/billing" className={`w-full py-3 rounded-xl font-semibold transition-all text-center ${plan.popular ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'}`}>
                    Order Now
                  </Link>
                  <p className="text-xs text-slate-500 mt-3 text-center">Instant automated setup after payment.</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-fiery-gradient p-12 text-center">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6 text-white">Ready to start your journey?</h2>
              <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                Join our Discord community to get exclusive discounts, participate in giveaways, and chat with our support team.
              </p>
              <a href="https://discord.gg/nikacloud" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-brand-accent font-bold text-lg transition-colors">
                <Discord className="w-6 h-6" />
                Join NikaCloud Discord
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
