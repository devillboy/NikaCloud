import React from 'react';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 px-4 max-w-4xl mx-auto text-white"
    >
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold mb-8">Contact Us</motion.h1>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6 text-slate-400 text-lg leading-relaxed">
        <p>Need assistance? Our support team is here to help you around the clock.</p>
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h2 className="text-xl font-bold text-white mb-2">Discord Support Tickets</h2>
          <p>The fastest way to get help is by opening a support ticket in our Discord server. Our team monitors tickets 24/7 to ensure your issues are resolved promptly.</p>
          <a href="https://discord.gg/nikacloud" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-brand-accent text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-accent-bright transition-colors">Join Discord & Open Ticket</a>
        </div>
        <p>For non-urgent inquiries, you can also reach us at <a href="mailto:support@nikacloud.in" className="text-brand-accent hover:underline">support@nikacloud.in</a>.</p>
      </motion.div>
    </motion.div>
  );
}
