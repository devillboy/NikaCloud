import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, LayoutDashboard, MessageSquare } from 'lucide-react';

export default function PaymentResult() {
  const location = useLocation();
  const { status, plan } = location.state || { status: 'failed', plan: null };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full p-12 rounded-[3rem] bg-white/5 border border-white/10 text-center"
      >
        {status === 'success' ? (
          <>
            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-gray-400 mb-10">
              Your {plan?.name} node is being provisioned. This usually takes 30-60 seconds. 
              You can track the progress in your dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/dashboard" 
                className="flex-1 py-4 bg-orange-500 rounded-2xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-5 h-5" />
                Go to Dashboard
              </Link>
              <a 
                href="https://discord.gg/nikacloud" 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Join Discord
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-8">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Payment Failed</h1>
            <p className="text-gray-400 mb-10">
              We couldn't verify your payment. This could be due to an invalid UTR ID or 
              an unclear screenshot. Please try again or contact support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/billing" 
                className="flex-1 py-4 bg-white text-black rounded-2xl font-bold hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
                Try Again
              </Link>
              <a 
                href="https://discord.gg/nikacloud" 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Contact Support
              </a>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
