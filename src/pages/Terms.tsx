import React from 'react';
import { motion } from 'motion/react';

export default function Terms() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 px-4 max-w-4xl mx-auto text-white"
    >
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold mb-8">Terms of Service</motion.h1>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6 text-slate-400 text-lg leading-relaxed">
        <p>By using NikaCloud services, you agree to these terms:</p>
        <h2 className="text-xl font-bold text-white">1. Service Usage</h2>
        <p>You are responsible for all activity on your server. Any illegal content, DDoS attacks, or abuse will result in immediate termination without refund.</p>
        <h2 className="text-xl font-bold text-white">2. Uptime & Maintenance</h2>
        <p>We strive for 99.9% uptime. Scheduled maintenance will be announced in our Discord server.</p>
        <h2 className="text-xl font-bold text-white">3. Billing & Refunds</h2>
        <p>All payments are final. Refunds are only offered in exceptional circumstances at our discretion.</p>
      </motion.div>
    </motion.div>
  );
}
