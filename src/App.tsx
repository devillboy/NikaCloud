/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';
import { Discord } from './components/Icons';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login';
import ClaimFreeServer from './pages/ClaimFreeServer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Billing from './pages/Billing';
import PaymentResult from './pages/PaymentResult';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import { useFCM } from './hooks/useFCM';

export default function App() {
  useFCM();
  
  // Set this to true to lock the site
  const isLocked = true;

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-brand-darker selection:bg-brand-accent/30 relative">
        {isLocked && (
          <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 overflow-hidden">
            {/* Watermark Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex flex-wrap gap-20 rotate-[-25deg] scale-150">
              {Array.from({ length: 100 }).map((_, i) => (
                <span key={i} className="text-white font-bold text-2xl whitespace-nowrap">PAYMENT DUE</span>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl w-full bg-white/5 border border-white/10 p-12 rounded-[3rem] text-center relative z-10 shadow-2xl shadow-orange-500/10"
            >
              <div className="w-24 h-24 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <AlertCircle className="w-12 h-12 text-orange-500" />
              </div>
              
              <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">Payment Is Due</h1>
              
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  This infrastructure terminal has been restricted due to an outstanding balance. 
                  Please complete your payment to restore full access to your nodes and services.
                </p>
                
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-white font-semibold">
                  Contact <span className="text-orange-500">Soham</span> on Discord to verify your payment and remove this watermark.
                </div>

                <p className="text-sm uppercase tracking-[0.2em] font-bold text-orange-500/50">
                  Please Send the payment immediately
                </p>
              </div>

              <div className="mt-10">
                <a 
                  href="https://discord.gg/nikacloud" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-white text-black rounded-2xl font-bold hover:bg-orange-500 hover:text-white transition-all shadow-lg"
                >
                  <Discord className="w-5 h-5" />
                  Contact Support Terminal
                </a>
              </div>
            </motion.div>
          </div>
        )}

        <Navbar />
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/payment-result" element={<PaymentResult />} />
            <Route path="/login" element={<Login />} />
            <Route path="/claim-free-server" element={<ClaimFreeServer />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
