import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Server, CheckCircle2, Loader2, ArrowRight, Copy, ExternalLink, ShieldAlert } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc, collection, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const EGGS = [
  { id: 1, name: 'Vanilla Minecraft', description: 'Standard Minecraft server' },
  { id: 2, name: 'Paper', description: 'High performance, plugin support' },
  { id: 4, name: 'Forge', description: 'Modded Minecraft support' },
  { id: 15, name: 'Node.js', description: 'Host Discord bots & web apps' },
  { id: 16, name: 'Python', description: 'Host Python scripts & bots' }
];

export default function ClaimFreeServer() {
  const { user, hasClaimedFreeServer, loading } = useAuth();
  const navigate = useNavigate();
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [selectedEgg, setSelectedEgg] = useState(EGGS[1].id); // Default to Paper
  const [serverName, setServerName] = useState('');
  const [credentials, setCredentials] = useState<{username: string, password: string, panelUrl: string} | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    } else if (!loading && user && hasClaimedFreeServer && !success) {
      navigate('/dashboard');
    } else if (user && !serverName) {
      setServerName(`${user.displayName || user.email?.split('@')[0]}'s Server`);
    }
  }, [user, hasClaimedFreeServer, loading, navigate, success]);

  const handleClaim = async () => {
    if (!user) return;
    if (!serverName.trim()) {
      setError("Please enter a server name");
      return;
    }
    
    setClaiming(true);
    setError(null);

    try {
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
        throw new Error(data.error || 'Failed to create server');
      }

      // Update user document to mark free server as claimed
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        hasClaimedFreeServer: true
      });

      // Create server document in Firestore
      const serverRef = doc(collection(db, 'servers'));
      await setDoc(serverRef, {
        name: 'Free Minecraft Server',
        type: EGGS.find(e => e.id === selectedEgg)?.name || 'Minecraft',
        status: 'Starting',
        ip: 'Pending Allocation...',
        userId: user.uid,
        planId: 'free-tier',
        panelId: data.serverDetails.id,
        createdAt: serverTimestamp()
      });

      setCredentials(data.credentials);
      setSuccess(true);
      
    } catch (err) {
      console.error("Error claiming server:", err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setClaiming(false);
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
    return <div className="flex-1 bg-brand-darker flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 relative overflow-hidden bg-brand-darker py-12">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      
      <div className="w-full max-w-2xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 rounded-3xl shadow-2xl border border-brand-blue/30"
        >
          {success && credentials ? (
            <div className="text-center py-4">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Server Created Successfully!</h2>
              <p className="text-slate-300 mb-8">
                Your free server has been provisioned. Please save your panel credentials below.
              </p>

              <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6 mb-8 text-left relative">
                <button 
                  onClick={copyCredentials}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm bg-slate-800 px-3 py-1.5 rounded-lg"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-yellow-500" />
                  Save These Credentials
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Panel URL</div>
                    <div className="font-mono text-brand-blue">{credentials.panelUrl}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Username / Email</div>
                    <div className="font-mono text-white">{credentials.username}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Password</div>
                    <div className="font-mono text-white bg-slate-950 px-3 py-2 rounded-lg inline-block border border-slate-800">
                      {credentials.password}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <a 
                  href={credentials.panelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center gap-2"
                >
                  Open Panel <ExternalLink className="w-4 h-4" />
                </a>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-brand-blue hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center gap-2"
                >
                  Go to Dashboard <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-brand-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-brand-blue/30">
                  <Server className="w-8 h-8 text-brand-blue" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Claim Your Free Server</h1>
                <p className="text-slate-400">Get started with a high-performance Minecraft server instantly.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
                  <h3 className="text-lg font-semibold text-white mb-4">Server Details</h3>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-400 mb-2">
                      Server Name
                    </label>
                    <input
                      type="text"
                      value={serverName}
                      onChange={(e) => setServerName(e.target.value)}
                      placeholder="My Awesome Server"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      maxLength={30}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-4">Specifications</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue" /> 
                      <span className="font-medium text-white">5GB</span> DDR4 RAM
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue" /> 
                      <span className="font-medium text-white">10GB</span> NVMe Storage
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue" /> 
                      <span className="font-medium text-white">100%</span> CPU Allocation
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue" /> 
                      <span className="font-medium text-white">1</span> Database & Backup
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
                  <h3 className="text-lg font-semibold text-white mb-4">Select Server Type</h3>
                  <div className="space-y-3">
                    {EGGS.map(egg => (
                      <label 
                        key={egg.id} 
                        className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer border transition-all ${
                          selectedEgg === egg.id 
                            ? 'bg-brand-blue/10 border-brand-blue' 
                            : 'bg-slate-800/50 border-transparent hover:bg-slate-800'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="eggType" 
                          value={egg.id} 
                          checked={selectedEgg === egg.id}
                          onChange={() => setSelectedEgg(egg.id)}
                          className="mt-1 text-brand-blue focus:ring-brand-blue bg-slate-900 border-slate-700"
                        />
                        <div>
                          <div className={`font-medium ${selectedEgg === egg.id ? 'text-brand-blue' : 'text-white'}`}>
                            {egg.name}
                          </div>
                          <div className="text-xs text-slate-400">{egg.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm">
                  {error}
                </div>
              )}

              <button 
                onClick={handleClaim}
                disabled={claiming}
                className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-blue/20"
              >
                {claiming ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Provisioning Server & User...
                  </>
                ) : (
                  <>
                    Create My Server Now
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
