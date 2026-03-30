import React from 'react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 px-4 max-w-4xl mx-auto text-white"
    >
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold mb-8">About NikaCloud</motion.h1>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6 text-slate-400 text-lg leading-relaxed">
        <p>NikaCloud is a premium hosting provider dedicated to delivering high-performance, reliable, and secure cloud solutions. Our mission is to empower communities and businesses with enterprise-grade infrastructure at accessible prices.</p>
        <p>Founded on the principles of transparency and technical excellence, we leverage state-of-the-art Pterodactyl-based infrastructure to provide a seamless hosting experience. Whether you are running a high-traffic Minecraft server, a professional VPS, or a custom application, NikaCloud is built to scale with your needs.</p>
        <p>Our team consists of industry veterans committed to uptime, security, and exceptional customer support. We believe that professional hosting shouldn't be complicated, which is why we've built a platform that balances power with ease of use.</p>
      </motion.div>
    </motion.div>
  );
}
