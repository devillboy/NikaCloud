import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Server, CheckCircle2, Loader2, ArrowRight, Copy, ExternalLink, ShieldAlert, Terminal, Cpu, HardDrive, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc, collection, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function ClaimFreeServer() {
  const { user, hasClaimedFreeServer, loading } = useAuth();
  const navigate = useNavigate();
  const [claiming, setClaiming] = useState(false);
  const [claimStatus, setClaimStatus] = useState<'idle' | 'provisioning' | 'installing' | 'finalizing'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [eggs, setEggs] = useState<any[]>([]);
  const [loadingEggs, setLoadingEggs] = useState(true);
  const [selectedEgg, setSelectedEgg] = useState<number | null>(null);
  const [serverName, setServerName] = useState('');
  const [credentials, setCredentials] = useState<{username: string, password: string, panelUrl: string} | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchEggs = async () => {
      try {
        const response = await fetch('/api/eggs');
        const data = await response.json();
        setEggs(data);
        if (data.length > 0) {
          setSelectedEgg(data[1]?.id || data[0].id); // Default to Paper or first available
        }
      } catch (err) {
        console.error("Error fetching eggs:", err);
      } finally {
        setLoadingEggs(false);
      }
    };

    fetchEggs();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    } else if (!loading && user && hasClaimedFreeServer && !success) {
      navigate('/dashboard');
    } else if (user && !serverName) {
      setServerName(`${user.displayName || user.email?.split('@')[0]}'s Node`);
    }
  }, [user, hasClaimedFreeServer, loading, navigate, success]);

  const handleClaim = async () => {
    if (!user) return;
    if (!serverName.trim()) {
      setError("Protocol Error: Node identifier required.");
      return;
    }
    
    setClaiming(true);
    setClaimStatus('provisioning');
    setError(null);

    try {
      // Step 1: Provisioning
      const response = await fetch('/api/servers/create-free', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          email: user.email,
          eggId: selectedEgg,
          serverName: serverName.trim()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Infrastructure allocation failed.');
      }

      // Step 2: Installing (Simulated brief delay for realism, but much shorter)
      setClaimStatus('installing');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Step 3: Finalizing
      setClaimStatus('finalizing');
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mark as success and show credentials
      setCredentials(data.credentials);
      setSuccess(true);
      setClaiming(false);
      setClaimStatus('idle');
      
    } catch (err) {
      console.error("Error claiming server:", err);
      setError(err instanceof Error ? err.message : 'An unexpected protocol error occurred');
      setClaiming(false);
      setClaimStatus('idle');
    }
  };

  const copyCredentials = () => {
    if (!credentials) return;
    const text = `Panel URL: ${credentials.panelUrl}\nUsername: ${credentials.username}\nPassword: ${credentials.password}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-brand-darker flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-brand-accent animate-spin" />
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Initializing Terminal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-brand-darker py-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10" />
      
      <div className="w-full max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-dark border border-brand-border p-8 md:p-12"
        >
          {success && credentials ? (
            <div className="text-center">
              <div className="w-20 h-20 bg-brand-accent/20 flex items-center justify-center mx-auto mb-8 border border-brand-accent/30">
                <CheckCircle2 className="w-10 h-10 text-brand-accent" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4 uppercase tracking-tighter">Node Provisioned</h2>
              <p className="text-slate-400 mb-12 font-mono text-sm">
                Your infrastructure has been successfully allocated. Save your access credentials immediately.
              </p>

              <div className="bg-brand-darker border border-brand-border p-8 mb-12 text-left relative group">
                <button 
                  onClick={copyCredentials}
                  className="absolute top-4 right-4 text-slate-500 hover:text-brand-accent transition-colors flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest border border-brand-border px-4 py-2 hover:border-brand-accent"
                >
                  {copied ? <CheckCircle2 className="w-3 h-3 text-brand-accent" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied' : 'Copy Data'}
                </button>
                
                <h3 className="text-sm font-bold text-white mb-8 flex items-center gap-3 uppercase tracking-widest">
                  <ShieldAlert className="w-5 h-5 text-brand-accent" />
                  Access Credentials
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-2 font-mono">Endpoint</div>
                    <div className="font-mono text-brand-accent text-xs break-all">{credentials.panelUrl}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-2 font-mono">Identifier</div>
                    <div className="font-mono text-white text-xs break-all">{credentials.username}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-2 font-mono">Access Key</div>
                    <div className="font-mono text-white bg-brand-dark p-3 border border-brand-border text-xs break-all">
                      {credentials.password}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={credentials.panelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border border-brand-accent text-brand-accent font-mono font-bold py-4 px-8 uppercase tracking-widest text-[10px] hover:bg-brand-accent hover:text-brand-darker transition-all flex items-center justify-center gap-2"
                >
                  Access Panel <ExternalLink className="w-3 h-3" />
                </a>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-brand-accent text-brand-darker font-mono font-bold py-4 px-8 uppercase tracking-widest text-[10px] hover:bg-white transition-all flex items-center justify-center gap-2"
                >
                  Open Terminal <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-brand-accent animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-accent">Infrastructure Claim</span>
                </div>
                <h1 className="text-5xl font-bold text-white tracking-tighter uppercase mb-4">Initialize <span className="text-brand-accent">Free Node</span></h1>
                <p className="text-slate-400 font-mono text-sm">Configure your complimentary high-performance compute node.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-brand-accent" />
                      Configuration
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-3">
                          Node Identifier
                        </label>
                        <input
                          type="text"
                          value={serverName}
                          onChange={(e) => setServerName(e.target.value)}
                          placeholder="ALPHA-NODE-01"
                          className="w-full bg-brand-darker border border-brand-border px-6 py-4 text-white font-mono text-sm placeholder-slate-700 focus:outline-none focus:border-brand-accent transition-colors"
                          maxLength={30}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-brand-accent" />
                      Allocated Resources
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-brand-darker border border-brand-border p-4">
                        <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500 mb-1">Memory</div>
                        <div className="text-white font-bold text-sm">5GB DDR4</div>
                      </div>
                      <div className="bg-brand-darker border border-brand-border p-4">
                        <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500 mb-1">Compute</div>
                        <div className="text-white font-bold text-sm">100% CPU</div>
                      </div>
                      <div className="bg-brand-darker border border-brand-border p-4">
                        <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500 mb-1">Storage</div>
                        <div className="text-white font-bold text-sm">10GB NVMe</div>
                      </div>
                      <div className="bg-brand-darker border border-brand-border p-4">
                        <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500 mb-1">Network</div>
                        <div className="text-white font-bold text-sm">1 Gbps</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-brand-accent" />
                    Environment Selection
                  </h3>
                  <div className="space-y-3">
                    {loadingEggs ? (
                      <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px]">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        SYNCING ENVIRONMENTS...
                      </div>
                    ) : (
                      eggs.map(egg => (
                        <label 
                          key={egg.id} 
                          className={`flex items-center gap-4 p-4 cursor-pointer border transition-all duration-300 ${
                            selectedEgg === egg.id 
                              ? 'bg-brand-accent/5 border-brand-accent' 
                              : 'bg-brand-darker border-brand-border hover:border-slate-700'
                          }`}
                        >
                          <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedEgg === egg.id ? 'border-brand-accent bg-brand-accent' : 'border-slate-700'}`}>
                            {selectedEgg === egg.id && <CheckCircle2 className="w-3 h-3 text-brand-darker" />}
                          </div>
                          <input 
                            type="radio" 
                            name="eggType" 
                            value={egg.id} 
                            checked={selectedEgg === egg.id}
                            onChange={() => setSelectedEgg(egg.id)}
                            className="hidden"
                          />
                          <div>
                            <div className={`text-xs font-bold uppercase tracking-widest ${selectedEgg === egg.id ? 'text-brand-accent' : 'text-white'}`}>
                              {egg.name}
                            </div>
                            <div className="text-[10px] font-mono text-slate-500 uppercase mt-1">{egg.description}</div>
                          </div>
                        </label>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 p-6 mb-8">
                  <div className="flex items-center gap-3 text-red-500 mb-2">
                    <ShieldAlert className="w-4 h-4" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Protocol Error</span>
                  </div>
                  <p className="text-red-400 font-mono text-xs leading-relaxed">
                    {error}
                    <br />
                    <span className="opacity-70 mt-2 block italic">If issue persists, contact infrastructure support on Discord.</span>
                  </p>
                </div>
              )}

              <button 
                onClick={handleClaim}
                disabled={claiming}
                className="w-full bg-brand-accent text-brand-darker font-mono font-bold py-5 uppercase tracking-[0.2em] text-xs hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {claiming ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{claimStatus} in progress...</span>
                  </>
                ) : (
                  <>
                    Initialize Node Deployment
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
