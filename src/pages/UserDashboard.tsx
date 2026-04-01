import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Server, Cpu, HardDrive, MemoryStick, Play, Square, RotateCcw, ExternalLink, Activity, AlertTriangle, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ServerData {
  id: string;
  name: string;
  type: string;
  status: string;
  ip?: string;
  planId: string;
  panelId?: string;
  expiresAt?: string;
  renewalWindowEndsAt?: string;
  duration?: number;
  specs?: {
    ram: string;
    cpu: string;
    ssd: string;
  };
}

export default function UserDashboard() {
  const { user, hasClaimedFreeServer, loading } = useAuth();
  const navigate = useNavigate();
  const [servers, setServers] = useState<ServerData[]>([]);
  const [fetching, setFetching] = useState(true);
  const [realServerData, setRealServerData] = useState<Record<string, any>>({});
  const [showBackupPopup, setShowBackupPopup] = useState<string | null>(null);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysRemaining = (dateString?: string) => {
    if (!dateString) return 0;
    const diff = new Date(dateString).getTime() - new Date().getTime();
    return isNaN(diff) ? 0 : Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchServers = async () => {
      try {
        const response = await fetch(`/api/user/servers?userId=${user.uid}`);
        const serverList = await response.json();
        
        if (!Array.isArray(serverList)) {
          console.error("Expected array of servers, got:", serverList);
          setFetching(false);
          return;
        }

        setServers(serverList);
        setFetching(false);

        // Check for expired servers to show backup popup
        const now = new Date();
        const expiredServer = serverList.find((s: any) => {
          if (!s.expiresAt) return false;
          const expiry = new Date(s.expiresAt);
          const gracePeriodEnd = new Date(expiry.getTime() + 7 * 24 * 60 * 60 * 1000);
          return now > expiry && now < gracePeriodEnd;
        });
        
        if (expiredServer && !showBackupPopup) {
          setShowBackupPopup(expiredServer.id);
        }

        // Fetch real details from panel for each server
        serverList.forEach(async (server: any) => {
          if (server.panelId) {
            try {
              const res = await fetch(`/api/servers/${server.panelId}`);
              if (res.ok) {
                const data = await res.json();
                setRealServerData(prev => ({ ...prev, [server.panelId!]: data }));
              }
            } catch (err) {
              console.error(`Failed to fetch real server data for ${server.panelId}:`, err);
            }
          }
        });
      } catch (error) {
        console.error("Error fetching servers:", error);
        setFetching(false);
      }
    };

    fetchServers();
    // Poll every 30 seconds for updates
    const interval = setInterval(fetchServers, 30000);
    return () => clearInterval(interval);
  }, [user]);

  if (loading || fetching) {
    return (
      <div className="flex-1 bg-brand-darker flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-brand-darker pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Backup Warning Popup */}
        {showBackupPopup && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
          >
            <div className="bg-slate-900 border border-red-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-red-500/10 relative">
              <button 
                onClick={() => setShowBackupPopup(null)}
                className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
              
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">Action Required!</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Your server has expired. It will be <span className="text-red-400 font-bold underline">permanently deleted</span> in 7 days if not renewed. 
                <br /><br />
                Please <span className="text-white font-bold">TAKE YOUR BACKUP</span> immediately from the panel to avoid data loss.
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => navigate('/billing')}
                  className="w-full py-4 bg-brand-accent hover:bg-brand-accent-bright text-white rounded-2xl font-bold transition-all shadow-lg shadow-brand-accent/20"
                >
                  Renew Server Now
                </button>
                <a 
                  href="https://gp.nikacloud.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold text-center transition-all border border-white/10"
                >
                  Go to Panel for Backup
                </a>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Servers</h1>
            <p className="text-slate-400">Manage your hosting services</p>
          </div>
          <a 
            href="https://gp.nikacloud.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
          >
            Open Pterodactyl Panel <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {servers.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-2xl p-12 text-center border border-white/5"
          >
            <Server className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No servers found</h3>
            <p className="text-slate-400 mb-6">You don't have any active servers yet.</p>
            {!hasClaimedFreeServer ? (
              <button 
                onClick={() => navigate('/claim-free')}
                className="px-6 py-3 bg-brand-accent hover:bg-brand-accent-bright text-white rounded-xl font-medium transition-colors"
              >
                Claim Free Server
              </button>
            ) : (
              <div className="inline-block px-6 py-3 bg-slate-800 text-slate-400 rounded-xl font-medium border border-slate-700">
                You have already claimed your free server.
              </div>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {servers.map((server, index) => {
              const realData = server.panelId ? realServerData[server.panelId] : null;
              const displayStatus = realData?.status || server.status;
              const displayIp = realData?.ip || server.ip || 'Pending Allocation...';
              const displayRam = realData?.ram || server.specs?.ram || '5GB';
              const displayCpu = realData?.cpu || server.specs?.cpu || '100%';
              const displayDisk = realData?.disk || server.specs?.ssd || '10GB';
              const daysLeft = getDaysRemaining(server.expiresAt);
              const isExpiringSoon = daysLeft <= 7 && daysLeft > 0;
              const isExpired = daysLeft <= 0;

              return (
              <motion.div
                key={server.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass-panel rounded-2xl overflow-hidden border flex flex-col ${isExpired ? 'border-red-500/30' : isExpiringSoon ? 'border-yellow-500/30' : 'border-white/5'}`}
              >
                {/* Server Header */}
                <div className="p-6 border-b border-white/5 bg-slate-900/50">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-accent/20 flex items-center justify-center border border-brand-accent/30">
                        <Server className="w-5 h-5 text-brand-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{server.name}</h3>
                        <p className="text-sm text-slate-400">
                          {server.nodeType || (server.isPaid ? 'Paid Node' : 'Free Node')} • Node {server.nodeId || '1'}
                        </p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5
                      ${isExpired ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                        displayStatus === 'Online' ? 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20' : 
                        displayStatus === 'Starting' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                        'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isExpired ? 'bg-red-400' : displayStatus === 'Online' ? 'bg-brand-accent' : displayStatus === 'Starting' ? 'bg-yellow-400' : 'bg-red-400'}`}></span>
                      {isExpired ? 'Expired' : displayStatus}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-300 bg-slate-950/50 px-3 py-2 rounded-lg border border-white/5">
                    <Activity className="w-4 h-4 text-brand-accent" />
                    <span className="font-mono">{displayIp}</span>
                  </div>
                </div>

                {/* Expiry Info */}
                <div className="px-6 py-3 bg-slate-950/30 border-b border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-3 h-3 text-slate-500" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Expires: {formatDate(server.expiresAt)}</span>
                  </div>
                  {daysLeft > 0 && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter ${isExpiringSoon ? 'bg-yellow-500/20 text-yellow-500' : 'bg-slate-800 text-slate-400'}`}>
                      {daysLeft} Days Left
                    </span>
                  )}
                  {isExpired && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter bg-red-500/20 text-red-500">
                      Renewal Window Active
                    </span>
                  )}
                </div>

                {/* Server Specs */}
                <div className="p-6 grid grid-cols-3 gap-4 border-b border-white/5">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5 text-slate-400 mb-1">
                      <MemoryStick className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">RAM</span>
                    </div>
                    <p className="text-lg font-semibold text-white">{displayRam}</p>
                  </div>
                  <div className="text-center border-x border-white/5">
                    <div className="flex items-center justify-center gap-1.5 text-slate-400 mb-1">
                      <Cpu className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">CPU</span>
                    </div>
                    <p className="text-lg font-semibold text-white">{displayCpu}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5 text-slate-400 mb-1">
                      <HardDrive className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">Disk</span>
                    </div>
                    <p className="text-lg font-semibold text-white">{displayDisk}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 bg-slate-900/30 mt-auto flex gap-3">
                  <button 
                    onClick={() => navigate(`/server/${server.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-brand-accent/10 hover:bg-brand-accent/20 text-brand-accent rounded-xl font-medium transition-colors border border-brand-accent/20"
                  >
                    <ExternalLink className="w-4 h-4" /> Details
                  </button>
                  {(isExpired || isExpiringSoon) && (
                    <button 
                      onClick={() => navigate('/billing')}
                      className="flex-1 py-2.5 bg-brand-accent hover:bg-brand-accent-bright text-white rounded-xl font-medium transition-colors"
                    >
                      Renew Now
                    </button>
                  )}
                </div>
              </motion.div>
            )})}
          </div>
        )}
      </div>
    </div>
  );
}
