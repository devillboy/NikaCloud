import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X, Database, Download } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const BackupReminder = () => {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [expiringServers, setExpiringServers] = useState<any[]>([]);

  useEffect(() => {
    const checkServers = async () => {
      if (!user) return;
      try {
        const res = await fetch(`/api/user/servers?userId=${user.uid}`);
        const data = await res.json();
        if (!Array.isArray(data)) {
          console.error("Expected array of servers, got:", data);
          return;
        }
        const expiring = data.filter((s: any) => {
          const daysLeft = Math.ceil((new Date(s.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          return daysLeft <= 7;
        });
        if (expiring.length > 0) {
          setExpiringServers(expiring);
          setShow(true);
        }
      } catch (err) {
        console.error("Error checking servers for backup reminder:", err);
      }
    };
    
    checkServers();
    const interval = setInterval(checkServers, 300000); // Check every 5 mins
    return () => clearInterval(interval);
  }, [user]);

  if (!show || expiringServers.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        className="fixed bottom-8 right-8 z-[100] w-full max-w-sm"
      >
        <div className="bg-brand-card border border-yellow-500/30 p-6 rounded-3xl shadow-2xl shadow-yellow-500/10 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500" />
          
          <button 
            onClick={() => setShow(false)}
            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center border border-yellow-500/20">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Backup Required!</h3>
              <p className="text-sm text-slate-400">Your server is expiring soon.</p>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {expiringServers.map(server => (
              <div key={server.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                <div className="flex items-center gap-3">
                  <Database className="w-4 h-4 text-brand-accent" />
                  <span className="text-xs font-medium text-white truncate max-w-[150px]">{server.name}</span>
                </div>
                <span className="text-[10px] font-bold text-yellow-500 uppercase">7D Grace</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => window.location.href = '/plans'}
              className="w-full bg-brand-accent hover:bg-brand-accent-bright text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Take Backup Now
            </button>
            <p className="text-[10px] text-center text-slate-500 italic">
              Servers are deleted 7 days after expiry. Please download your files!
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BackupReminder;
