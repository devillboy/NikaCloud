import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Server, Cpu, HardDrive, MemoryStick, Shield, Globe, Clock, AlertTriangle, ArrowLeft, ExternalLink, Copy, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ServerData {
  id: string;
  name: string;
  type: string;
  nodeType?: string;
  nodeId?: number;
  status: string;
  ip?: string;
  planId: string;
  expiresAt?: string;
  isPaid?: boolean;
  specs?: {
    ram: string;
    cpu: string;
    ssd: string;
  };
}

export default function ServerDetails() {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [server, setServer] = useState<ServerData | null>(null);
  const [fetching, setFetching] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user || !id) return;

    const fetchServer = async () => {
      try {
        const response = await fetch(`/api/user/servers?userId=${user.uid}`);
        const serverList = await response.json();
        const found = serverList.find((s: any) => s.id === id);
        setServer(found || null);
        setFetching(false);
      } catch (error) {
        console.error("Error fetching server details:", error);
        setFetching(false);
      }
    };

    fetchServer();
  }, [user, id]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysRemaining = (dateString?: string) => {
    if (!dateString) return 0;
    const diff = new Date(dateString).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (loading || fetching) {
    return (
      <div className="flex-1 bg-brand-darker flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  if (!server) {
    return (
      <div className="flex-1 bg-brand-darker pt-32 px-4 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Server Not Found</h1>
        <Link to="/dashboard" className="text-brand-accent hover:underline flex items-center justify-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>
    );
  }

  const daysLeft = getDaysRemaining(server.expiresAt);
  const isExpired = daysLeft <= 0;
  const isGracePeriod = daysLeft <= 0 && daysLeft > -7;

  return (
    <div className="flex-1 bg-brand-darker pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </Link>

        {isGracePeriod && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-red-500/10 border border-red-500/30 rounded-2xl flex flex-col md:flex-row items-center gap-6"
          >
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0 border border-red-500/30">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-bold text-white mb-1">Server Expired - Action Required!</h3>
              <p className="text-slate-400 text-sm">
                Your server is in the 7-day grace period. Please <span className="text-white font-bold">TAKE YOUR BACKUP</span> now. 
                It will be permanently deleted on {formatDate(new Date(new Date(server.expiresAt!).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString())}.
              </p>
            </div>
            <button 
              onClick={() => navigate(`/billing?plan=${server.planId}`)}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-colors whitespace-nowrap"
            >
              Renew Now
            </button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Server Info & Credentials */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-panel rounded-3xl p-8 border border-white/5">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center border border-brand-accent/20">
                  <Server className="w-8 h-8 text-brand-accent" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{server.name}</h1>
                  <div className="flex items-center gap-2 text-slate-400 mt-1">
                    <span className={`w-2 h-2 rounded-full ${server.status === 'Online' ? 'bg-brand-accent' : 'bg-yellow-500'}`} />
                    <span className="text-sm font-medium">{server.status}</span>
                    <span className="mx-2">•</span>
                    <span className="text-sm">{server.nodeType || (server.isPaid ? 'Paid Node' : 'Free Node')}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-brand-accent" /> Connection Credentials
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950/50 rounded-2xl border border-white/5">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Server IP</p>
                    <div className="flex items-center justify-between">
                      <code className="text-brand-accent font-mono">{server.ip?.split(':')[0] || '144.217.x.x'}</code>
                      <button onClick={() => copyToClipboard(server.ip?.split(':')[0] || '', 'ip')} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                        {copied === 'ip' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-500" />}
                      </button>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-950/50 rounded-2xl border border-white/5">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Port</p>
                    <div className="flex items-center justify-between">
                      <code className="text-brand-accent font-mono">{server.ip?.split(':')[1] || '25565'}</code>
                      <button onClick={() => copyToClipboard(server.ip?.split(':')[1] || '', 'port')} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                        {copied === 'port' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-500" />}
                      </button>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-950/50 rounded-2xl border border-white/5">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Username</p>
                    <div className="flex items-center justify-between">
                      <code className="text-brand-accent font-mono">{user?.email?.split('@')[0]}</code>
                      <button onClick={() => copyToClipboard(user?.email?.split('@')[0] || '', 'user')} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                        {copied === 'user' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-500" />}
                      </button>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-950/50 rounded-2xl border border-white/5">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Node ID</p>
                    <div className="flex items-center justify-between">
                      <code className="text-brand-accent font-mono">Node {server.nodeId || '1'}</code>
                      <span className="text-[10px] text-slate-600 font-bold uppercase">Static</span>
                    </div>
                  </div>
                </div>

                <a 
                  href="https://gp.nikacloud.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-brand-accent text-white rounded-2xl font-bold hover:bg-brand-accent-bright transition-all shadow-lg shadow-brand-accent/20"
                >
                  Open Control Panel <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="glass-panel rounded-3xl p-8 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-brand-accent" /> Resource Allocation
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 bg-slate-950/30 rounded-2xl border border-white/5">
                  <MemoryStick className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{server.specs?.ram || '5GB'}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">RAM</p>
                </div>
                <div className="text-center p-4 bg-slate-950/30 rounded-2xl border border-white/5">
                  <Cpu className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{server.specs?.cpu || '100%'}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">CPU</p>
                </div>
                <div className="text-center p-4 bg-slate-950/30 rounded-2xl border border-white/5">
                  <HardDrive className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{server.specs?.ssd || '10GB'}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Disk</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Billing & Renewal */}
          <div className="space-y-8">
            <div className="glass-panel rounded-3xl p-8 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-accent" /> Billing Details
              </h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">Current Plan</p>
                  <div className="p-4 bg-slate-950/50 rounded-2xl border border-white/5">
                    <p className="text-white font-bold">{server.isPaid ? 'Premium Subscription' : 'Free Tier'}</p>
                    <p className="text-xs text-slate-400 mt-1">Billed Monthly</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">Expiration Date</p>
                  <div className={`p-4 rounded-2xl border ${isExpired ? 'bg-red-500/5 border-red-500/20' : 'bg-slate-950/50 border-white/5'}`}>
                    <p className={`font-bold ${isExpired ? 'text-red-500' : 'text-white'}`}>{formatDate(server.expiresAt)}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {isExpired ? 'Expired' : `${daysLeft} days remaining`}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => navigate('/billing')}
                    className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all border border-white/10"
                  >
                    Manage Subscription
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 bg-orange-500/5 border border-orange-500/20 rounded-3xl">
              <h4 className="text-orange-500 font-bold mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Renewal Policy
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Servers are active for 30 days. If not renewed, we provide a <span className="text-white font-bold">7-day grace period</span> before permanent deletion. Always keep backups!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
