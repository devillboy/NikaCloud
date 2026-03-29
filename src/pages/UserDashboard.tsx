import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Server, Cpu, HardDrive, MemoryStick, Play, Square, RotateCcw, ExternalLink, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

interface ServerData {
  id: string;
  name: string;
  type: string;
  status: string;
  ip?: string;
  planId: string;
  panelId?: string;
}

export default function UserDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [servers, setServers] = useState<ServerData[]>([]);
  const [fetching, setFetching] = useState(true);
  const [realServerData, setRealServerData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'servers'), where('userId', '==', user.uid));
    
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const serverList: ServerData[] = [];
      snapshot.forEach((doc) => {
        serverList.push({ id: doc.id, ...doc.data() } as ServerData);
      });
      setServers(serverList);
      setFetching(false);

      // Fetch real details from panel for each server
      serverList.forEach(async (server) => {
        if (server.panelId) {
          try {
            const res = await fetch(`/api/servers/${server.panelId}`);
            if (res.ok) {
              const data = await res.json();
              setRealServerData(prev => ({ ...prev, [server.panelId!]: data }));
            }
          } catch (err) {
            console.error("Failed to fetch real server data", err);
          }
        }
      });
    }, (error) => {
      console.error("Error fetching servers:", error);
      setFetching(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading || fetching) {
    return (
      <div className="flex-1 bg-brand-darker flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-brand-darker pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
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
            <button 
              onClick={() => navigate('/claim-free-server')}
              className="px-6 py-3 bg-brand-blue hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
            >
              Claim Free Server
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {servers.map((server, index) => {
              const realData = server.panelId ? realServerData[server.panelId] : null;
              const displayStatus = realData?.status || server.status;
              const displayIp = realData?.ip || server.ip || 'Pending Allocation...';
              const displayRam = realData?.ram || '5GB';
              const displayCpu = realData?.cpu || '100%';
              const displayDisk = realData?.disk || '10GB';

              return (
              <motion.div
                key={server.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel rounded-2xl overflow-hidden border border-white/5 flex flex-col"
              >
                {/* Server Header */}
                <div className="p-6 border-b border-white/5 bg-slate-900/50">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-blue/20 flex items-center justify-center border border-brand-blue/30">
                        <Server className="w-5 h-5 text-brand-blue" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{server.name}</h3>
                        <p className="text-sm text-slate-400">{server.type}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5
                      ${displayStatus === 'Online' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                        displayStatus === 'Starting' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                        'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${displayStatus === 'Online' ? 'bg-green-400' : displayStatus === 'Starting' ? 'bg-yellow-400' : 'bg-red-400'}`}></span>
                      {displayStatus}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-300 bg-slate-950/50 px-3 py-2 rounded-lg border border-white/5">
                    <Activity className="w-4 h-4 text-brand-blue" />
                    <span className="font-mono">{displayIp}</span>
                  </div>
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
                  <a 
                    href={`https://gp.nikacloud.in/server/${server.panelId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue rounded-xl font-medium transition-colors border border-brand-blue/20"
                  >
                    <ExternalLink className="w-4 h-4" /> Manage Server
                  </a>
                </div>
              </motion.div>
            )})}
          </div>
        )}
      </div>
    </div>
  );
}
