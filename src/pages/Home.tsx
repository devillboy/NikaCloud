import { motion } from 'motion/react';
import { ChevronRight, Cpu, Globe, Shield, Zap, Server, Gamepad2, HardDrive, Clock, Disc as Discord, CheckCircle2 } from 'lucide-react';
import React from 'react';

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 mb-6 text-brand-blue">
              <span className="flex h-2 w-2 rounded-full bg-brand-blue animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider">Enterprise-Grade Infrastructure</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight text-white">
              High-Performance <br />
              <span className="text-brand-blue">
                Cloud Hosting
              </span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
              Premium Minecraft and VPS hosting powered by enterprise hardware. Experience zero lag, instant setup, and 24/7 expert support.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#plans" className="px-8 py-4 rounded-xl bg-brand-blue text-white font-semibold hover:bg-blue-600 transition-all flex items-center gap-2 group">
                View Plans
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="https://discord.gg/nikacloud" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl glass-panel text-white font-semibold hover:bg-slate-800 transition-all flex items-center gap-2">
                <Discord className="w-5 h-5" />
                Join Discord
              </a>
            </div>
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
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center border border-brand-blue/20">
                    <Server className="w-6 h-6 text-brand-blue" />
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
                        className="h-full bg-brand-blue" 
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
                        className="h-full bg-brand-blue" 
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-brand-blue" />
                    <span className="text-sm text-slate-300">DDoS Protection Active</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">NIKA-US-EAST-1</span>
                </div>
              </div>
            </div>
          </motion.div>
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
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-brand-blue" />
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
                <h2 className="text-3xl font-bold text-white">Minecraft Hosting</h2>
                <p className="text-slate-400">High-performance servers for your community.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Dirt Tier", price: "$4.99", ram: "4GB", slots: "Unlimited", cpu: "Shared" },
                { name: "Iron Tier", price: "$9.99", ram: "8GB", slots: "Unlimited", cpu: "Dedicated Threads", popular: true },
                { name: "Diamond Tier", price: "$19.99", ram: "16GB", slots: "Unlimited", cpu: "Dedicated Core" }
              ].map((plan, i) => (
                <div key={i} className={`relative h-full glass-panel p-8 rounded-3xl border ${plan.popular ? 'border-brand-blue shadow-lg shadow-brand-blue/10' : 'border-slate-800'} flex flex-col`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-blue text-white text-xs font-bold uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400">/mo</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue" /> {plan.ram} DDR4 RAM
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue" /> 50GB NVMe SSD
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue" /> {plan.cpu}
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue" /> DDoS Protection
                    </li>
                  </ul>
                  
                  <button className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular ? 'bg-brand-blue hover:bg-blue-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'}`}>
                    Order Now
                  </button>
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
                { name: "Starter VM", price: "$5.00", cores: "2 vCores", ram: "2GB", storage: "40GB NVMe" },
                { name: "Pro VM", price: "$12.00", cores: "4 vCores", ram: "8GB", storage: "100GB NVMe", popular: true },
                { name: "Ultra VM", price: "$24.00", cores: "8 vCores", ram: "16GB", storage: "250GB NVMe" }
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
                      <CheckCircle2 className="w-5 h-5 text-purple-500" /> {plan.cores}
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-purple-500" /> {plan.ram} RAM
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-purple-500" /> {plan.storage}
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-purple-500" /> 1Gbps Port
                    </li>
                  </ul>
                  
                  <button className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'}`}>
                    Deploy Server
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-brand-blue p-12 text-center">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6 text-white">Ready to start your journey?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join our Discord community to get exclusive discounts, participate in giveaways, and chat with our support team.
              </p>
              <a href="https://discord.gg/nikacloud" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-brand-blue font-bold text-lg transition-colors">
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
