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
      whileHover={{ y: -2 }}
      className="bg-brand-card border border-brand-border p-6 flex flex-col h-full relative overflow-hidden group"
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-accent/20 group-hover:border-brand-accent transition-colors" />
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xs font-mono text-brand-accent uppercase tracking-[0.2em] mb-1">System Node</h3>
          <h2 className="text-xl font-bold text-white tracking-tight">{plan.name}</h2>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-white">{plan.price}</div>
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Per Cycle</div>
        </div>
      </div>
      
      <div className="space-y-4 mb-8 flex-grow">
        <div className="p-3 bg-brand-dark border border-brand-border rounded-lg">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-500 uppercase">Memory Allocation</span>
            <span className="text-brand-accent">{plan.ram}</span>
          </div>
          <div className="h-1 bg-brand-border rounded-full overflow-hidden">
            <div className="h-full bg-brand-accent w-3/4" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-brand-dark border border-brand-border rounded-lg">
            <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Storage</div>
            <div className="text-sm font-mono text-white">{plan.ssd}</div>
          </div>
          <div className="p-3 bg-brand-dark border border-brand-border rounded-lg">
            <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Compute</div>
            <div className="text-sm font-mono text-white">{plan.cpu}</div>
          </div>
        </div>

        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
            <div className="w-1 h-1 bg-brand-accent rounded-full" />
            DDoS PROTECTION ACTIVE
          </li>
          <li className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
            <div className="w-1 h-1 bg-brand-accent rounded-full" />
            INSTANT PROVISIONING
          </li>
        </ul>
      </div>
      
      <button
        onClick={() => onSelect(plan)}
        className="w-full py-3 bg-brand-accent text-brand-darker text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
      >
        Initialize Node
      </button>
    </motion.div>
  );
};
