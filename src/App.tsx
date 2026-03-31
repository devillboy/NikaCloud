/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'motion/react';
import { AlertCircle, Clock } from 'lucide-react';
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
  
  const [lockData, setLockData] = useState<{ isLocked: boolean; remainingTime: number } | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const fetchLockStatus = async () => {
      try {
        const healthRes = await fetch('/api/health');
        console.log("HEALTH CHECK:", await healthRes.json());
        
        const response = await fetch('/api/lock-status');
        const data = await response.json();
        setLockData(data);
        setTimeLeft(data.remainingTime);
      } catch (error) {
        console.error("Error fetching lock status:", error);
      }
    };

    fetchLockStatus();
    const interval = setInterval(fetchLockStatus, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1000) {
            setLockData(prevData => prevData ? { ...prevData, isLocked: false } : null);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Set this to true to manually lock the site
  const isLocked = lockData?.isLocked ?? true;

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-brand-darker selection:bg-brand-accent/30 relative">
        {isLocked && (
          <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 overflow-hidden">
            {/* Watermark Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex flex-wrap gap-20 rotate-[-25deg] scale-150">
              {Array.from({ length: 100 }).map((_, i) => (
                <span key={i} className="text-white font-bold text-2xl whitespace-nowrap">
                  PAYMENT DUE
                </span>
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
              
              <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
                Payment Is Due
              </h1>
              
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  This infrastructure terminal has been restricted due to an outstanding balance. Please complete your payment to restore full access.
                </p>
                
                {timeLeft > 0 && (
                  <div className="flex flex-col items-center gap-4 p-8 bg-orange-500/10 border border-orange-500/20 rounded-3xl">
                    <div className="flex items-center gap-3 text-orange-500 font-bold uppercase tracking-widest text-sm">
                      <Clock className="w-5 h-5" />
                      Automatic Unlock In
                    </div>
                    <div className="text-6xl font-mono font-bold text-white tracking-tighter">
                      {formatTime(timeLeft)}
                    </div>
                  </div>
                )}

                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-white font-semibold">
                  Contact <span className="text-orange-500">Soham</span> on Discord to verify your license and remove this restriction.
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
