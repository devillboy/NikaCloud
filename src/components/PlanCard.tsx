import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, Cpu, HardDrive, Zap } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: string;
  ram: string;
  ssd: string;
  cpu: string;
}

interface PlanCardProps {
  plan: Plan;
  onSelect: (plan: Plan) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col h-full"
    >
      <h3 className="text-xl font-bold mb-2 text-white uppercase tracking-wider">{plan.name}</h3>
      <div className="mb-6">
        <span className="text-3xl font-bold text-white">{plan.price}</span>
        <span className="text-slate-400 text-sm">/mo</span>
      </div>
      
      <ul className="space-y-3 mb-8 flex-grow text-sm">
        <li className="flex items-center gap-2 text-slate-300">
          <Zap className="w-4 h-4 text-brand-accent" /> {plan.ram} RAM
        </li>
        <li className="flex items-center gap-2 text-slate-300">
          <HardDrive className="w-4 h-4 text-brand-accent" /> {plan.ssd} NVMe SSD
        </li>
        <li className="flex items-center gap-2 text-slate-300">
          <Cpu className="w-4 h-4 text-brand-accent" /> {plan.cpu} CPU
        </li>
        <li className="flex items-center gap-2 text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-brand-accent" /> Instant Setup
        </li>
      </ul>
      
      <button
        onClick={() => onSelect(plan)}
        className="w-full py-3 rounded-xl bg-fiery-gradient hover:opacity-90 text-white font-bold transition-all shadow-lg shadow-brand-accent/20"
      >
        Select Plan
      </button>
    </motion.div>
  );
};
