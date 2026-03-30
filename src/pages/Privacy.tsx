import React from 'react';
import { motion } from 'motion/react';

export default function Privacy() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 px-4 max-w-4xl mx-auto text-white"
    >
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold mb-8">Privacy Policy</motion.h1>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6 text-slate-400 text-lg leading-relaxed">
        <p>Your privacy is important to us.</p>
        <h2 className="text-xl font-bold text-white">1. Data Collection</h2>
        <p>We collect basic information (email, IP address) necessary to provide our hosting services.</p>
        <h2 className="text-xl font-bold text-white">2. Data Usage</h2>
        <p>Your data is used solely to manage your account and servers. We do not sell your data to third parties.</p>
        <h2 className="text-xl font-bold text-white">3. Security</h2>
        <p>We implement industry-standard security measures to protect your data.</p>
      </motion.div>
    </motion.div>
  );
}
