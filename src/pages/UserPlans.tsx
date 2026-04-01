import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Server, Clock, AlertTriangle, RefreshCw, Shield, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const UserPlans = () => {
  const { user } = useAuth();
  const [servers, setServers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserServers = async () => {
      if (!user) return;
      try {
        const res = await fetch(`/api/servers?userId=${user.uid}`);
        const data = await res.json();
        setServers(data);
      } catch (err) {
        console.error("Error fetching user servers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserServers();
  }, [user]);

  const getDaysRemaining = (expiryDate: string) => {
    const diff = new Date(expiryDate).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-brand-darker py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">My Active Plans</h1>
          <p className="text-slate-400">Manage your server subscriptions and renewals.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent"></div>
          </div>
        ) : servers.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800">
            <Server className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">No Active Servers</h2>
            <p className="text-slate-400 mb-8">You don't have any active server plans at the moment.</p>
            <a href="/billing" className="bg-brand-accent hover:bg-brand-accent-bright text-white px-8 py-3 rounded-xl font-bold transition-all">
              Browse Plans
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servers.map((server) => {
              const daysLeft = getDaysRemaining(server.expiresAt);
              const isExpiringSoon = daysLeft <= 7;
              const isExpired = daysLeft <= 0;

              return (
                <motion.div
                  key={server.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-panel p-6 rounded-3xl border border-slate-800 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${server.isPaid ? 'bg-brand-accent/10 text-brand-accent' : 'bg-blue-500/10 text-blue-400'}`}>
                      {server.isPaid ? 'Paid Plan' : 'Free Plan'}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800">
                      <Server className="w-6 h-6 text-brand-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{server.name}</h3>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">{server.type}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400 flex items-center gap-2"><Clock className="w-4 h-4" /> Expires In</span>
                      <span className={`font-bold ${isExpired ? 'text-red-500' : isExpiringSoon ? 'text-yellow-500' : 'text-white'}`}>
                        {isExpired ? 'Expired' : `${daysLeft} Days`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400 flex items-center gap-2"><Shield className="w-4 h-4" /> Node Type</span>
                      <span className="text-white font-medium">{server.nodeType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400 flex items-center gap-2"><Zap className="w-4 h-4" /> Resources</span>
                      <span className="text-white font-medium">{server.specs?.ram} RAM</span>
                    </div>
                  </div>

                  {isExpiringSoon && (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 mb-6 flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-yellow-500 uppercase mb-1">Renewal Required</p>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          Your server will be deleted in {daysLeft + 7} days if not renewed. Please take a backup!
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button 
                      onClick={() => window.location.href = `/billing?renew=${server.id}`}
                      className="flex-1 bg-brand-accent hover:bg-brand-accent-bright text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Renew Now
                    </button>
                    <button 
                      onClick={() => window.location.href = `/server/${server.id}`}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-3 rounded-xl font-bold transition-all"
                    >
                      Manage
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPlans;
