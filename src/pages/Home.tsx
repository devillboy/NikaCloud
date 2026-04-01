import { motion } from 'motion/react';
import { Cpu, Globe, Shield, Zap, Server, CheckCircle2, ArrowRight, Database, Activity } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Discord } from '../components/Icons';
import { getApiBase } from '../lib/api';

// Hardcoded plan data
const BOT_PLANS = [
  { id: "bot-1", name: "Bot Host Plan 1", price: "₹35", ram: "2 GB", ssd: "8 GB", cpu: "50%", ports: 1, backups: 1, popular: true },
  { id: "bot-2", name: "Bot Host Plan 2", price: "₹70", ram: "4 GB", ssd: "15 GB", cpu: "100%", ports: 2, backups: 1, popular: true },
  { id: "bot-3", name: "Bot Host Plan 3", price: "₹105", ram: "6 GB", ssd: "30 GB", cpu: "150%", ports: 2, backups: 2 },
  { id: "bot-4", name: "Bot Host Plan 4", price: "₹140", ram: "8 GB", ssd: "45 GB", cpu: "200%", ports: 3, backups: 3 },
  { id: "bot-5", name: "Bot Host Plan 5", price: "₹175", ram: "10 GB", ssd: "60 GB", cpu: "250%", ports: 4, backups: 4 },
  { id: "bot-8", name: "Bot Host Plan 8", price: "₹280", ram: "24 GB", ssd: "150 GB", cpu: "850%", ports: 10, backups: 10, popular: false },
];

const MINECRAFT_PLANS = [
  { id: "mc-1", name: "Plan 1", price: "₹99", ram: "2 GB", ssd: "8 GB", cpu: "50%", popular: true },
  { id: "mc-2", name: "Plan 2", price: "₹199", ram: "4 GB", ssd: "15 GB", cpu: "100%", popular: true },
  { id: "mc-3", name: "Plan 3", price: "₹299", ram: "6 GB", ssd: "25 GB", cpu: "150%" },
  { id: "mc-4", name: "Plan 4", price: "₹399", ram: "8 GB", ssd: "40 GB", cpu: "200%" },
  { id: "mc-10", name: "Plan 10", price: "₹999", ram: "64 GB", ssd: "400 GB", cpu: "2000%", popular: false }
];

const VPS_PLANS = [
  { id: "vps-1", name: "VPS 1", price: "₹699", cores: "2 vCore", ram: "8 GB", storage: "48 GB", popular: true },
  { id: "vps-2", name: "VPS 2", price: "₹1,299", cores: "4 vCore", ram: "16 GB", storage: "80 GB", popular: true },
  { id: "vps-5", name: "VPS 5", price: "₹4,699", cores: "16 vCore", ram: "64 GB", storage: "256 GB", popular: false }
];

const FEATURES = [
  { title: "Enterprise Hardware", description: "Powered by AMD Ryzen 9 7950X and NVMe Gen4 SSDs.", icon: "Cpu" },
  { title: "DDoS Protection", description: "Advanced 12Tbps+ mitigation to keep you online 24/7.", icon: "Shield" },
  { title: "Global Network", description: "Strategically located nodes for minimum latency.", icon: "Globe" },
  { title: "Instant Setup", description: "Automated provisioning in under 60 seconds.", icon: "Zap" }
];

export default function Home() {
  const [loading, setLoading] = React.useState(true);
  const [showAllPlans, setShowAllPlans] = React.useState(false);

  React.useEffect(() => {
    // Simulate loading for theme consistency
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
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
        <Activity className="w-10 h-10 text-orange-500 animate-pulse" />
      </div>
    );
  }

  const displayedBotPlans = showAllPlans ? BOT_PLANS : BOT_PLANS.filter(p => p.popular);
  const displayedMinecraftPlans = showAllPlans ? MINECRAFT_PLANS : MINECRAFT_PLANS.filter(p => p.popular);
  const displayedVpsPlans = showAllPlans ? VPS_PLANS : VPS_PLANS.filter(p => p.popular);

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
                to="/claim-free"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full font-bold text-white hover:shadow-lg hover:shadow-orange-500/25 transition-all flex items-center gap-2 group"
              >
                <Zap className="w-5 h-5 fill-current" />
                Claim Free Server
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#plans"
                className="px-8 py-4 bg-transparent border border-white/20 rounded-full font-bold text-white hover:bg-white/5 transition-all"
              >
                Explore Plans
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Free Server Banner (Matching Image) */}
      <section className="py-12 container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-orange-900/40 to-black border border-orange-500/20 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-bold tracking-widest mb-6 border border-orange-500/30">
              LIMITED TIME OFFER
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get a Free Minecraft Server</h2>
            <p className="text-gray-400 text-lg mb-8">
              Start your community today with our powerful free tier. No credit card required. Instant automated setup.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium">
                <Cpu className="w-4 h-4 text-orange-500" /> 100% CPU
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium">
                <Database className="w-4 h-4 text-orange-500" /> 5GB RAM
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium">
                <Server className="w-4 h-4 text-orange-500" /> 10GB NVMe
              </div>
            </div>
          </div>
          <Link 
            to="/claim-free"
            className="relative z-10 px-10 py-5 bg-white text-black rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all flex items-center gap-2 shadow-2xl shadow-white/10"
          >
            Claim Now <ArrowRight className="w-5 h-5" />
          </Link>
          
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-orange-500/10 blur-[120px] pointer-events-none" />
        </motion.div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose NikaCloud?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We provide an enterprise-grade ecosystem designed for ultimate performance, reliability, and scale.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Lightning Fast", 
              desc: "Powered by the latest NVMe SSDs and high-clock CPUs for zero-lag performance.", 
              icon: Zap 
            },
            { 
              title: "DDoS Protection", 
              desc: "Enterprise-grade mitigation to keep your servers online 24/7, automatically.", 
              icon: Shield 
            },
            { 
              title: "Global Network", 
              desc: "Premium tier-1 blend network ensuring low latency across the globe.", 
              icon: Globe 
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[2rem] bg-brand-card border border-white/5 hover:border-orange-500/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Sections */}
      <section id="plans" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 uppercase tracking-tighter">Premium <span className="text-orange-500">Infrastructure</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Select the perfect node for your project. All plans include DDoS protection and instant setup.</p>
          </div>

          {/* Bot Host Plans */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">Bot <span className="text-orange-500">Nodes</span></h2>
              {!showAllPlans && (
                <button 
                  onClick={() => setShowAllPlans(true)}
                  className="text-orange-500 font-bold text-sm uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group"
                >
                  Click to see more plans <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedBotPlans.map((plan, i) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={plan.id} 
                  className={`p-6 rounded-3xl bg-white/5 border transition-all hover:bg-white/[0.07] group ${plan.popular ? 'border-orange-500 shadow-lg shadow-orange-500/10' : 'border-white/10'}`}
                >
                  {plan.popular && (
                    <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-4">Most Popular</div>
                  )}
                  <div className="text-lg font-bold mb-2 group-hover:text-orange-500 transition-colors">{plan.name}</div>
                  <div className="text-3xl font-bold text-white mb-4">{plan.price}<span className="text-sm text-gray-500 font-normal">/mo</span></div>
                  <div className="text-sm text-gray-400 mb-8 space-y-3">
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500" /> {plan.ram} RAM</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500" /> {plan.ssd} NVMe SSD</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500" /> {plan.cpu} CPU Core</div>
                  </div>
                  <Link to="/billing" className="block w-full py-4 rounded-2xl bg-white/10 text-center font-bold hover:bg-orange-500 hover:text-white transition-all">Get Started</Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Minecraft Plans */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">Minecraft <span className="text-orange-500">Nodes</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedMinecraftPlans.map((plan, i) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={plan.id} 
                  className={`p-6 rounded-3xl bg-white/5 border transition-all hover:bg-white/[0.07] group ${plan.popular ? 'border-orange-500 shadow-lg shadow-orange-500/10' : 'border-white/10'}`}
                >
                  {plan.popular && (
                    <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-4">Best Value</div>
                  )}
                  <div className="text-lg font-bold mb-2 group-hover:text-orange-500 transition-colors">{plan.name}</div>
                  <div className="text-3xl font-bold text-white mb-4">{plan.price}<span className="text-sm text-gray-500 font-normal">/mo</span></div>
                  <div className="text-sm text-gray-400 mb-8 space-y-3">
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500" /> {plan.ram} RAM</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500" /> {plan.ssd} NVMe SSD</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500" /> {plan.cpu} CPU Core</div>
                  </div>
                  <Link to="/billing" className="block w-full py-4 rounded-2xl bg-white/10 text-center font-bold hover:bg-orange-500 hover:text-white transition-all">Get Started</Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* VPS Plans */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">VPS <span className="text-orange-500">Servers</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedVpsPlans.map((plan, i) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={plan.id} 
                  className={`p-8 rounded-3xl bg-white/5 border transition-all hover:bg-white/[0.07] group ${plan.popular ? 'border-orange-500 shadow-lg shadow-orange-500/10' : 'border-white/10'}`}
                >
                  {plan.popular && (
                    <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-4">Enterprise Choice</div>
                  )}
                  <div className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">{plan.name}</div>
                  <div className="text-4xl font-bold text-white mb-6">{plan.price}<span className="text-sm text-gray-500 font-normal">/mo</span></div>
                  <div className="text-sm text-gray-400 mb-10 space-y-4">
                    <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500" /> {plan.cores} Dedicated</div>
                    <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500" /> {plan.ram} RAM</div>
                    <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500" /> {plan.storage} NVMe</div>
                  </div>
                  <Link to="/billing" className="block w-full py-5 rounded-2xl bg-white/10 text-center font-bold hover:bg-orange-500 hover:text-white transition-all">Get Started</Link>
                </motion.div>
              ))}
            </div>
          </div>

          {showAllPlans && (
            <div className="text-center">
              <button 
                onClick={() => setShowAllPlans(false)}
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-white hover:bg-white/10 transition-all"
              >
                Show Less Plans
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
