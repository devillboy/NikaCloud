import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, HardDrive, Zap, Server, ShieldCheck, Globe, Loader2 } from "lucide-react";

const steps = [
  { icon: Cpu, text: "Allocating CPU Cores...", duration: 3000 },
  { icon: Zap, text: "Provisioning RAM Modules...", duration: 3000 },
  { icon: HardDrive, text: "Initializing NVMe Storage...", duration: 3000 },
  { icon: Globe, text: "Configuring Network & IP...", duration: 3000 },
  { icon: ShieldCheck, text: "Applying DDoS Protection...", duration: 3000 },
  { icon: Server, text: "Finalizing Server Setup...", duration: 3000 },
];

export const ServerAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 18000; // 18 seconds
    const intervalTime = 100;
    const increment = (intervalTime / totalDuration) * 100;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        return next >= 100 ? 100 : next;
      });
    }, intervalTime);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-darker overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-brand-accent/5 blur-[100px] rounded-full" />

      <div className="relative z-10 w-full max-w-2xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 mb-6 text-brand-accent">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-xs font-bold uppercase tracking-widest">Automated Provisioning System</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Creating Your <span className="text-fiery-gradient">Server</span>
          </h2>
          <p className="text-slate-400">Please wait while our AI deploys your enterprise-grade infrastructure.</p>
        </motion.div>

        <div className="glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                {React.createElement(steps[currentStep].icon, { className: "w-5 h-5 text-brand-accent" })}
              </div>
              <div className="text-left">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-white font-bold"
                  >
                    {steps[currentStep].text}
                  </motion.p>
                </AnimatePresence>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Step {currentStep + 1} of 6</p>
              </div>
            </div>
            <span className="text-2xl font-mono font-bold text-brand-accent">{Math.round(progress)}%</span>
          </div>

          <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-fiery-gradient shadow-[0_0_20px_rgba(242,125,38,0.4)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <div className="grid grid-cols-6 gap-2 mt-4">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-colors duration-500 ${
                  i <= currentStep ? 'bg-brand-accent' : 'bg-slate-800'
                }`} 
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 opacity-50">
          <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase font-bold tracking-widest">
            <ShieldCheck className="w-3 h-3" /> DDoS Protected
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase font-bold tracking-widest">
            <Zap className="w-3 h-3" /> NVMe Gen4
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase font-bold tracking-widest">
            <Cpu className="w-3 h-3" /> Ryzen 9 7950X
          </div>
        </div>
      </div>
    </div>
  );
};
