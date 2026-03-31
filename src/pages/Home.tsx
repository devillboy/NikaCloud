import { motion } from 'motion/react';
import { Cpu, Globe, Shield, Zap, Server, CheckCircle2, ArrowRight, Database, Activity } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Discord } from '../components/Icons';
import { getApiBase } from '../lib/api';

// Hardcoded plan data
const BOT_PLANS = [
  { id: "bot-1", name: "Bot Host Plan 1", price: "₹35", ram: "2 GB", ssd: "8 GB", cpu: "50%", ports: 1, backups: 1 },
  { id: "bot-2", name: "Bot Host Plan 2", price: "₹70", ram: "4 GB", ssd: "15 GB", cpu: "100%", ports: 2, backups: 1 },
  { id: "bot-3", name: "Bot Host Plan 3", price: "₹105", ram: "6 GB", ssd: "30 GB", cpu: "150%", ports: 2, backups: 2 },
  { id: "bot-8", name: "Bot Host Plan 8", price: "₹280", ram: "24 GB", ssd: "150 GB", cpu: "850%", ports: 10, backups: 10, popular: true },
];

const MINECRAFT_PLANS = [
  { id: "mc-1", name: "Plan 1", price: "₹99", ram: "2 GB", ssd: "8 GB", cpu: "50%" },
  { id: "mc-2", name: "Plan 2", price: "₹199", ram: "4 GB", ssd: "15 GB", cpu: "100%" },
  { id: "mc-3", name: "Plan 3", price: "₹299", ram: "6 GB", ssd: "25 GB", cpu: "150%" },
  { id: "mc-10", name: "Plan 10", price: "₹999", ram: "64 GB", ssd: "400 GB", cpu: "2000%", popular: true }
];

const VPS_PLANS = [
  { id: "vps-1", name: "VPS 1", price: "₹699", cores: "2 vCore", ram: "8 GB", storage: "48 GB" },
  { id: "vps-5", name: "VPS 5", price: "₹4,699", cores: "16 vCore", ram: "64 GB", storage: "256 GB", popular: true }
];

const FEATURES = [
  { title: "Enterprise Hardware", description: "Powered by AMD Ryzen 9 7950X and NVMe Gen4 SSDs.", icon: "Cpu" },
  { title: "DDoS Protection", description: "Advanced 12Tbps+ mitigation to keep you online 24/7.", icon: "Shield" },
  { title: "Global Network", description: "Strategically located nodes for minimum latency.", icon: "Globe" },
  { title: "Instant Setup", description: "Automated provisioning in under 60 seconds.", icon: "Zap" }
];

export default function Home() {
  const [loading, setLoading] = React.useState(true);

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

      {/* Pricing Sections */}
      <section id="plans" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          
          {/* Bot Host Plans */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-12 text-center">Bot <span className="text-orange-500">Nodes</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BOT_PLANS.map((plan, i) => (
                <div key={i} className={`p-6 rounded-3xl bg-white/5 border ${plan.popular ? 'border-orange-500' : 'border-white/10'}`}>
                  <div className="text-lg font-bold mb-2">{plan.name}</div>
                  <div className="text-2xl font-bold text-orange-500 mb-4">{plan.price}<span className="text-sm text-gray-500 font-normal">/mo</span></div>
                  <div className="text-sm text-gray-400 mb-6 space-y-1">
                    <div>RAM: {plan.ram}</div>
                    <div>SSD: {plan.ssd}</div>
                    <div>CPU: {plan.cpu}</div>
                  </div>
                  <Link to="/billing" className="block w-full py-3 rounded-xl bg-white/10 text-center font-bold hover:bg-orange-500 transition-all">Buy Now</Link>
                </div>
              ))}
            </div>
          </div>

          {/* Minecraft Plans */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-12 text-center">Minecraft <span className="text-orange-500">Nodes</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MINECRAFT_PLANS.map((plan, i) => (
                <div key={i} className={`p-6 rounded-3xl bg-white/5 border ${plan.popular ? 'border-orange-500' : 'border-white/10'}`}>
                  <div className="text-lg font-bold mb-2">{plan.name}</div>
                  <div className="text-2xl font-bold text-orange-500 mb-4">{plan.price}<span className="text-sm text-gray-500 font-normal">/mo</span></div>
                  <div className="text-sm text-gray-400 mb-6 space-y-1">
                    <div>RAM: {plan.ram}</div>
                    <div>SSD: {plan.ssd}</div>
                    <div>CPU: {plan.cpu}</div>
                  </div>
                  <Link to="/billing" className="block w-full py-3 rounded-xl bg-white/10 text-center font-bold hover:bg-orange-500 transition-all">Buy Now</Link>
                </div>
              ))}
            </div>
          </div>

          {/* VPS Plans */}
          <div>
            <h2 className="text-4xl font-bold mb-12 text-center">VPS <span className="text-orange-500">Servers</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VPS_PLANS.map((plan, i) => (
                <div key={i} className={`p-8 rounded-3xl bg-white/5 border ${plan.popular ? 'border-orange-500' : 'border-white/10'}`}>
                  <div className="text-xl font-bold mb-2">{plan.name}</div>
                  <div className="text-3xl font-bold text-orange-500 mb-6">{plan.price}<span className="text-sm text-gray-500 font-normal">/mo</span></div>
                  <div className="text-sm text-gray-400 mb-8 space-y-2">
                    <div>Cores: {plan.cores}</div>
                    <div>RAM: {plan.ram}</div>
                    <div>Storage: {plan.storage}</div>
                  </div>
                  <Link to="/billing" className="block w-full py-4 rounded-xl bg-white/10 text-center font-bold hover:bg-orange-500 transition-all">Buy Now</Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
