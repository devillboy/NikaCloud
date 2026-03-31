import { motion } from 'motion/react';
import { ChevronRight, Cpu, Globe, Shield, Zap, Server, Gamepad2, HardDrive, Clock, CheckCircle2, Gift, Database, ArrowRight, Terminal, Activity } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Discord } from '../components/Icons';
import { getApiBase } from '../lib/api';

export default function Home() {
  const [features, setFeatures] = React.useState<any[]>([]);
  const [botPlans, setBotPlans] = React.useState<any[]>([]);
  const [minecraftPlans, setMinecraftPlans] = React.useState<any[]>([]);
  const [vpsPlans, setVpsPlans] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBase = getApiBase();
        const featuresRes = await fetch(`${apiBase}/api/features`);
        const featuresData = await featuresRes.json();
        setFeatures(featuresData);
        
        const plansRes = await fetch(`${apiBase}/api/plans`);
        const plansData = await plansRes.json();
        
        setBotPlans(plansData.filter((p: any) => p.type === 'bot'));
        setMinecraftPlans(plansData.filter((p: any) => p.type === 'minecraft'));
        setVpsPlans(plansData.filter((p: any) => p.type === 'vps'));
      } catch (error) {
        console.error("Error fetching infrastructure data:", error);
        setFeatures([]);
        setBotPlans([]);
        setMinecraftPlans([]);
        setVpsPlans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return <Cpu className="w-8 h-8 text-orange-500" />;
      case 'Shield': return <Shield className="w-8 h-8 text-orange-500" />;
      case 'Globe': return <Globe className="w-8 h-8 text-orange-500" />;
      case 'Zap': return <Zap className="w-8 h-8 text-orange-500" />;
      default: return <Server className="w-8 h-8 text-orange-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Activity className="w-10 h-10 text-orange-500 animate-pulse" />
          <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500">Syncing Infrastructure...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-bold tracking-widest mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              ENTERPRISE-GRADE INFRASTRUCTURE
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-[0.9]"
            >
              Next-Gen <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                Cloud Hosting
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed"
            >
              Experience the pinnacle of performance. Enterprise-grade hardware, 
              zero-lag infrastructure, and professional-grade support.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full font-semibold text-white hover:shadow-lg hover:shadow-orange-500/25 transition-all flex items-center gap-2 group"
              >
                <Zap className="w-5 h-5 fill-current" />
                Claim Free Server
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#plans"
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-semibold text-white hover:bg-white/10 transition-all"
              >
                Explore Plans
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Free Tier Callout */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-orange-900/40 to-black border border-orange-500/20"
          >
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-xl">
                <div className="inline-block px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-[10px] font-bold uppercase tracking-wider mb-6">
                  LIMITED TIME OFFER
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Get a Free Minecraft Server</h2>
                <p className="text-gray-400 text-lg mb-8">
                  Start your community today with our powerful free tier. No credit card required. Instant automated setup.
                </p>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-orange-500" />
                    </div>
                    100% CPU
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <Database className="w-4 h-4 text-orange-500" />
                    </div>
                    5GB RAM
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <Server className="w-4 h-4 text-orange-500" />
                    </div>
                    10GB NVMe
                  </div>
                </div>
              </div>
              <Link
                to="/dashboard"
                className="px-10 py-5 bg-white text-black rounded-2xl font-bold text-lg hover:bg-orange-50 transition-all flex items-center gap-3 group"
              >
                Claim Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose NikaCloud?</h2>
            <p className="text-gray-400 text-lg">
              We provide an enterprise-grade ecosystem designed for ultimate performance, reliability, and scale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all group"
              >
                <div className="mb-8 group-hover:scale-110 transition-transform duration-500">
                  {getIcon(feature.icon)}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Sections */}
      <section id="plans" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          
          {/* Bot Host Plans */}
          <div id="bot" className="mb-32">
            <div className="flex flex-col mb-16">
              <div className="inline-flex items-center gap-2 text-orange-500 text-[10px] font-bold tracking-[0.4em] mb-4">
                <Discord className="w-4 h-4" />
                BOT HOSTING PLANS
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">High Performance <span className="text-orange-500">Bot Nodes</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {botPlans.map((plan, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`p-8 rounded-[2rem] bg-white/5 border transition-all group relative ${plan.popular ? 'border-orange-500/50 ring-1 ring-orange-500/20' : 'border-white/10 hover:border-orange-500/30'}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="text-sm font-bold text-gray-400 mb-2">{plan.name}</div>
                  <div className="text-3xl font-bold text-white mb-6">{plan.price}<span className="text-sm text-gray-500 font-normal">/mo</span></div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">RAM</span>
                      <span className="text-white font-semibold">{plan.ram}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">NVMe SSD</span>
                      <span className="text-white font-semibold">{plan.ssd}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">CPU</span>
                      <span className="text-white font-semibold">{plan.cpu}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Ports</span>
                      <span className="text-white font-semibold">{plan.ports}</span>
                    </div>
                  </div>
                  
                  <Link to="/billing" className="block w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-center text-sm font-bold text-white hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all">
                    Buy Now
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Minecraft Plans */}
          <div id="minecraft" className="mb-32">
            <div className="flex flex-col mb-16">
              <div className="text-orange-500 text-[10px] font-bold tracking-[0.4em] mb-4 uppercase">Service Category: Minecraft</div>
              <h2 className="text-4xl md:text-5xl font-bold">Game Hosting <span className="text-orange-500">Nodes</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {minecraftPlans.map((plan, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`p-8 rounded-[2rem] bg-white/5 border transition-all group relative ${plan.popular ? 'border-orange-500/50 ring-1 ring-orange-500/20' : 'border-white/10 hover:border-orange-500/30'}`}
                >
                  <div className="text-sm font-bold text-gray-400 mb-2">Node {plan.name}</div>
                  <div className="text-3xl font-bold text-white mb-6">{plan.price}<span className="text-sm text-gray-500 font-normal">/mo</span></div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">RAM</span>
                      <span className="text-white font-semibold">{plan.ram}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">SSD</span>
                      <span className="text-white font-semibold">{plan.ssd}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">CPU</span>
                      <span className="text-white font-semibold">{plan.cpu}</span>
                    </div>
                  </div>
                  
                  <Link to="/billing" className="block w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-center text-sm font-bold text-white hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all">
                    Buy Now
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* VPS Plans */}
          <div id="vps">
            <div className="flex flex-col mb-16">
              <div className="text-orange-500 text-[10px] font-bold tracking-[0.4em] mb-4 uppercase">Service Category: VPS</div>
              <h2 className="text-4xl md:text-5xl font-bold">Virtual <span className="text-orange-500">Private</span> Servers</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vpsPlans.map((plan, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-10 rounded-[2.5rem] bg-white/5 border transition-all group relative ${plan.popular ? 'border-orange-500/50 ring-1 ring-orange-500/20' : 'border-white/10 hover:border-orange-500/30'}`}
                >
                  <div className="text-sm font-bold text-gray-400 mb-2">{plan.name}</div>
                  <div className="text-4xl font-bold text-white mb-8 tracking-tight">{plan.price}<span className="text-sm text-gray-500 font-normal">/mo</span></div>
                  
                  <div className="space-y-5 mb-10">
                    <div className="flex items-center gap-4 text-gray-300">
                      <Cpu className="w-5 h-5 text-orange-500" /> {plan.cores}
                    </div>
                    <div className="flex items-center gap-4 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-orange-500" /> {plan.ram} RAM
                    </div>
                    <div className="flex items-center gap-4 text-gray-300">
                      <HardDrive className="w-5 h-5 text-orange-500" /> {plan.storage} NVMe
                    </div>
                  </div>
                  
                  <Link to="/billing" className="block w-full py-5 rounded-3xl bg-white/5 border border-white/10 text-center text-sm font-bold text-white hover:bg-orange-500 hover:border-orange-500 transition-all">
                    Buy Now
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto p-16 rounded-[3rem] bg-gradient-to-b from-white/5 to-transparent border border-white/10"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-bold uppercase tracking-widest mb-8">
              <Discord className="w-4 h-4" />
              Community Access
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Join the <span className="text-orange-500">Network</span></h2>
            <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
              Connect with our engineering team and community. Access exclusive deployment protocols and real-time support.
            </p>
            <a href="https://discord.gg/nikacloud" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 px-12 py-5 bg-white text-black rounded-2xl font-bold text-lg hover:bg-orange-500 hover:text-white transition-all">
              Authorize Discord Connection
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
