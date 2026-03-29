import { motion, useMotionValue, useTransform } from 'motion/react';
import { ChevronRight, Cpu, Globe, Shield, Zap, Server, Gamepad2, HardDrive, Clock, Disc as Discord } from 'lucide-react';
import React from 'react';

// 3D Tilt Card Component
const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 ${className}`}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="preserve-3d w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-blue/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-brand-purple/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-cyan-500/10 blur-[100px]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-brand-blue animate-pulse" />
              <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Next-Gen Cloud Infrastructure</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-display font-bold tracking-tight mb-6 leading-tight">
              Unleash Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-cyan-400 to-brand-purple glow-text">
                Digital World
              </span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
              Premium Minecraft and VPS hosting powered by enterprise hardware. Experience zero lag, instant setup, and 24/7 expert support.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#plans" className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple text-white font-semibold hover:shadow-[0_0_30px_-5px_rgba(14,165,233,0.5)] transition-all flex items-center gap-2 group">
                View Plans
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="https://discord.gg/nikacloud" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl glass-panel text-white font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
                <Discord className="w-5 h-5" />
                Join Discord
              </a>
            </div>
          </motion.div>

          {/* 3D Hero Element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block h-[500px]"
          >
            <TiltCard className="w-full h-full flex items-center justify-center">
              <div className="relative w-80 h-96 glass-panel rounded-2xl border border-white/20 p-6 flex flex-col justify-between overflow-hidden group">
                {/* Inner glowing orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-blue/30 rounded-full blur-3xl group-hover:bg-brand-purple/40 transition-colors duration-700" />
                
                <div className="translate-z-30 flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/20 flex items-center justify-center border border-brand-blue/30">
                    <Server className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium">
                    Online
                  </div>
                </div>
                
                <div className="translate-z-20 space-y-4">
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-brand-blue to-cyan-400" 
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>CPU Usage</span>
                      <span>75%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "45%" }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                        className="h-full bg-gradient-to-r from-brand-purple to-pink-400" 
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>RAM Usage</span>
                      <span>14.2 GB / 32 GB</span>
                    </div>
                  </div>
                </div>

                <div className="translate-z-30 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-brand-card border-2 border-brand-darker flex items-center justify-center text-xs font-medium">
                        U{i}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">248 Players</span>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative z-10 bg-brand-darker/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Why Choose NikaCloud?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">We don't just provide servers; we provide an ecosystem designed for ultimate performance and reliability.</p>
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
                className="glass-panel p-8 rounded-2xl hover:bg-white/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
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
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold">Minecraft Hosting</h2>
                <p className="text-gray-400">High-performance servers for your community.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Dirt Tier", price: "$4.99", ram: "4GB", slots: "Unlimited", cpu: "Shared" },
                { name: "Iron Tier", price: "$9.99", ram: "8GB", slots: "Unlimited", cpu: "Dedicated Threads", popular: true },
                { name: "Diamond Tier", price: "$19.99", ram: "16GB", slots: "Unlimited", cpu: "Dedicated Core" }
              ].map((plan, i) => (
                <div key={i}>
                  <TiltCard>
                    <div className={`relative h-full glass-panel p-8 rounded-3xl border ${plan.popular ? 'border-brand-blue' : 'border-white/10'} flex flex-col`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple text-xs font-bold uppercase tracking-wider">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-2xl font-bold mb-2 translate-z-20">{plan.name}</h3>
                    <div className="mb-6 translate-z-20">
                      <span className="text-4xl font-display font-bold">{plan.price}</span>
                      <span className="text-gray-400">/mo</span>
                    </div>
                    
                    <ul className="space-y-4 mb-8 flex-grow translate-z-10">
                      <li className="flex items-center gap-3 text-gray-300">
                        <Cpu className="w-5 h-5 text-brand-blue" /> {plan.ram} DDR4 RAM
                      </li>
                      <li className="flex items-center gap-3 text-gray-300">
                        <HardDrive className="w-5 h-5 text-brand-blue" /> 50GB NVMe SSD
                      </li>
                      <li className="flex items-center gap-3 text-gray-300">
                        <Server className="w-5 h-5 text-brand-blue" /> {plan.cpu}
                      </li>
                      <li className="flex items-center gap-3 text-gray-300">
                        <Shield className="w-5 h-5 text-brand-blue" /> DDoS Protection
                      </li>
                    </ul>
                    
                    <button className={`w-full py-4 rounded-xl font-bold transition-all translate-z-20 ${plan.popular ? 'bg-brand-blue hover:bg-brand-blue/90 text-white' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}>
                      Order Now
                    </button>
                  </div>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>

          {/* VPS Plans */}
          <div id="vps">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-xl bg-brand-purple/20 flex items-center justify-center">
                <Server className="w-6 h-6 text-brand-purple" />
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold">VPS Hosting</h2>
                <p className="text-gray-400">Scalable virtual machines for any workload.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Starter VM", price: "$5.00", cores: "2 vCores", ram: "2GB", storage: "40GB NVMe" },
                { name: "Pro VM", price: "$12.00", cores: "4 vCores", ram: "8GB", storage: "100GB NVMe", popular: true },
                { name: "Ultra VM", price: "$24.00", cores: "8 vCores", ram: "16GB", storage: "250GB NVMe" }
              ].map((plan, i) => (
                <div key={i}>
                  <TiltCard>
                    <div className={`relative h-full glass-panel p-8 rounded-3xl border ${plan.popular ? 'border-brand-purple' : 'border-white/10'} flex flex-col`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-purple to-pink-500 text-xs font-bold uppercase tracking-wider">
                        Best Value
                      </div>
                    )}
                    <h3 className="text-2xl font-bold mb-2 translate-z-20">{plan.name}</h3>
                    <div className="mb-6 translate-z-20">
                      <span className="text-4xl font-display font-bold">{plan.price}</span>
                      <span className="text-gray-400">/mo</span>
                    </div>
                    
                    <ul className="space-y-4 mb-8 flex-grow translate-z-10">
                      <li className="flex items-center gap-3 text-gray-300">
                        <Cpu className="w-5 h-5 text-brand-purple" /> {plan.cores}
                      </li>
                      <li className="flex items-center gap-3 text-gray-300">
                        <HardDrive className="w-5 h-5 text-brand-purple" /> {plan.ram} RAM
                      </li>
                      <li className="flex items-center gap-3 text-gray-300">
                        <Server className="w-5 h-5 text-brand-purple" /> {plan.storage}
                      </li>
                      <li className="flex items-center gap-3 text-gray-300">
                        <Globe className="w-5 h-5 text-brand-purple" /> 1Gbps Port
                      </li>
                    </ul>
                    
                    <button className={`w-full py-4 rounded-xl font-bold transition-all translate-z-20 ${plan.popular ? 'bg-brand-purple hover:bg-brand-purple/90 text-white' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}>
                      Deploy Server
                    </button>
                  </div>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden glass-panel border border-brand-blue/30 p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 opacity-50" />
            <div className="relative z-10">
              <h2 className="text-4xl font-display font-bold mb-6">Ready to start your journey?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join our Discord community to get exclusive discounts, participate in giveaways, and chat with our support team.
              </p>
              <a href="https://discord.gg/nikacloud" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-lg transition-colors shadow-lg shadow-[#5865F2]/20">
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
