import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Loader2, Server, LayoutDashboard, ArrowRight, ShieldCheck } from 'lucide-react';
import { ServerAnimation } from '../components/ServerAnimation';

export default function PaymentResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);
  const { status, plan } = location.state || { status: 'failed', plan: null };

  useEffect(() => {
    if (!location.state) {
      navigate('/billing');
    }
  }, [location.state, navigate]);

  const handleStartServer = () => {
    setShowAnimation(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 18000);
  };

  if (showAnimation) return <ServerAnimation />;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-panel p-8 rounded-3xl border border-slate-800 text-center shadow-2xl"
      >
        {status === 'success' ? (
          <>
            <div className="w-20 h-20 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-brand-accent" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Payment Verified!</h1>
            <p className="text-slate-400 mb-8">
              Your payment for <span className="text-white font-bold">{plan?.name}</span> has been confirmed by our AI. Your server is ready to be provisioned.
            </p>
            
            <div className="bg-slate-900/50 rounded-2xl p-4 mb-8 border border-slate-800 text-left">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-4 h-4 text-brand-accent" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Server Specs</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">RAM</div>
                  <div className="text-sm text-white font-bold">{plan?.ram}</div>
                </div>
                <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">CPU</div>
                  <div className="text-sm text-white font-bold">{plan?.cpu}</div>
                </div>
                <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">SSD</div>
                  <div className="text-sm text-white font-bold">{plan?.ssd}</div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleStartServer}
              className="w-full py-4 rounded-2xl bg-fiery-gradient text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-xl shadow-brand-accent/20"
            >
              <Server className="w-5 h-5" />
              Provision My Server Now
            </button>
          </>
        ) : (
          <>
            <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Payment Rejected</h1>
            <p className="text-slate-400 mb-8">
              Our AI could not verify your payment. This could be due to an incorrect screenshot, wrong amount, or invalid transaction details.
            </p>
            
            <div className="space-y-3">
              <Link 
                to="/billing"
                className="w-full py-4 rounded-2xl bg-slate-800 text-white font-bold flex items-center justify-center gap-2 hover:bg-slate-700 transition-all"
              >
                Try Again
              </Link>
              <a 
                href="https://discord.gg/nikacloud" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl border border-slate-800 text-slate-400 font-bold flex items-center justify-center gap-2 hover:text-white hover:border-slate-700 transition-all"
              >
                Appeal on Discord
              </a>
            </div>
          </>
        )}

        <div className="mt-8 pt-8 border-t border-slate-800/50">
          <Link to="/dashboard" className="text-slate-500 hover:text-slate-300 text-sm flex items-center justify-center gap-2 transition-colors">
            <LayoutDashboard className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
