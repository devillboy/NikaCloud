import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  CreditCard, 
  LayoutDashboard, 
  ShieldCheck, 
  Shield,
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  Zap,
  Server,
  Cpu,
  Database,
  HardDrive,
  ArrowRight,
  Bitcoin
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { GoogleGenAI } from "@google/genai";
import { Discord } from "../components/Icons";
import { getApiBase } from "../lib/api";

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

const handleFirestoreError = (error: any, operationType: OperationType, path: string) => {
  const errInfo = {
    error: error.message || String(error),
    operationType,
    path,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    }
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(error.message || "Missing or insufficient permissions.");
};

export default function Billing() {
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'minecraft' | 'bot' | 'vps'>('minecraft');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'crypto'>('upi');
  const [duration, setDuration] = useState(1); // in months
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // UPI Form State
  const [upiId, setUpiId] = useState("");
  const [utrId, setUtrId] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const apiBase = getApiBase();
        const res = await fetch(`${apiBase}/api/plans`);
        if (!res.ok) throw new Error(`Infrastructure API Error: ${res.status}`);
        const data = await res.json();
        setPlans(data);
      } catch (err: any) {
        console.error("Error fetching plans:", err);
        setError(`Failed to load plans. Please try again.`);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const filteredPlans = plans.filter(p => p.type === selectedCategory);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaymentSubmitted = async () => {
    if (!auth.currentUser) {
      setError("Authorization required. Please log in to your terminal.");
      return;
    }

    if (paymentMethod === 'upi' && (!screenshot || !upiId || !utrId)) {
      setError("Please fill all UPI payment details.");
      return;
    }

    setVerifying(true);
    setError(null);

    try {
      const basePrice = typeof selectedPlan.price === 'string' 
        ? parseInt(selectedPlan.price.replace(/[^0-9]/g, '')) 
        : selectedPlan.price;
      const totalPrice = duration >= 12 
        ? Math.floor(basePrice * duration * 0.8) 
        : basePrice * duration;

      const apiBase = getApiBase();

      // Call Backend API
      const response = await fetch(`${apiBase}/api/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: auth.currentUser.uid,
          userEmail: auth.currentUser.email,
          planId: selectedPlan.id,
          planName: selectedPlan.name,
          amount: totalPrice,
          duration,
          upiId: upiId || 'N/A',
          utrId: utrId || 'N/A',
          method: paymentMethod,
          screenshot: screenshot || '',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment processing failed.");
      }

      if (data.status === "rejected") {
        navigate("/payment-result", { state: { status: 'failed', plan: selectedPlan, reason: data.reason } });
      } else if (data.status === "success") {
        navigate("/payment-result", { state: { status: 'success', plan: selectedPlan } });
      }

    } catch (err: any) {
      console.error("Verification Error:", err);
      setError(err.message || "Payment processing error. Please contact support on Discord.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Left Column: Selection */}
            <div className="flex-1">
              <div className="mb-10">
                <h1 className="text-4xl font-bold mb-4">Configure Your <span className="text-orange-500">Node</span></h1>
                <p className="text-gray-400">Select your service category and plan to begin deployment.</p>
              </div>

              {/* Security & Automation Info */}
              <div className="mb-10">
                <div className="glass-panel p-6 rounded-3xl border border-orange-500/20 bg-orange-500/5 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-wider">Secure AI Automation</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      AI-powered payment verification & instant server provisioning. 100% secure infrastructure.
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider">
                      AI Verified
                    </div>
                    <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                      Auto-Deploy
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Category Selection */}
              <div className="flex flex-wrap gap-3 mb-10">
                {[
                  { id: 'minecraft', name: 'Minecraft', icon: <Zap className="w-4 h-4" /> },
                  { id: 'bot', name: 'Bot Hosting', icon: <Discord className="w-4 h-4" /> },
                  { id: 'vps', name: 'VPS', icon: <Server className="w-4 h-4" /> },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id as any);
                      setSelectedPlan(null);
                    }}
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all ${
                      selectedCategory === cat.id 
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                        : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {cat.icon}
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Plan Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-32 bg-white/5 animate-pulse rounded-3xl" />
                  ))
                ) : (
                  filteredPlans.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className={`p-6 rounded-3xl border text-left transition-all ${
                        selectedPlan?.id === plan.id
                          ? 'bg-orange-500/10 border-orange-500 shadow-lg shadow-orange-500/10'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="text-sm font-bold text-gray-400 mb-1">{plan.name}</div>
                      <div className="text-2xl font-bold mb-4">{plan.price}<span className="text-xs text-gray-500 font-normal">/mo</span></div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[10px] px-2 py-1 bg-white/5 rounded-lg text-gray-300 uppercase tracking-wider">{plan.ram} RAM</span>
                        <span className="text-[10px] px-2 py-1 bg-white/5 rounded-lg text-gray-300 uppercase tracking-wider">{plan.cpu || plan.cores} CPU</span>
                      </div>
                    </button>
                  ))
                )}
              </div>

              {/* Payment Method */}
              {selectedPlan && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <h3 className="text-xl font-bold mb-6">Payment Method</h3>
                  <div className="grid grid-cols-3 gap-4 mb-12">
                    {[
                      { id: 'upi', name: 'UPI / QR', icon: <Zap className="w-5 h-5" /> },
                      { id: 'card', name: 'Card', icon: <CreditCard className="w-5 h-5" /> },
                      { id: 'crypto', name: 'Crypto', icon: <Bitcoin className="w-5 h-5" /> },
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`flex flex-col items-center gap-3 p-6 rounded-3xl border transition-all ${
                          paymentMethod === method.id
                            ? 'bg-orange-500/10 border-orange-500'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className={`${paymentMethod === method.id ? 'text-orange-500' : 'text-gray-400'}`}>
                          {method.icon}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest">{method.name}</span>
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Scan to Pay</div>
                          <div className="text-xl font-bold">nikacloud@nyes</div>
                        </div>
                        <div className="w-24 h-24 bg-white p-2 rounded-xl">
                          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=nikacloud@nyes" alt="QR" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Your UPI ID"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full px-6 py-4 bg-black border border-white/10 rounded-2xl focus:border-orange-500 outline-none transition-all"
                        />
                        <input
                          type="text"
                          placeholder="Transaction UTR ID"
                          value={utrId}
                          onChange={(e) => setUtrId(e.target.value)}
                          className="w-full px-6 py-4 bg-black border border-white/10 rounded-2xl focus:border-orange-500 outline-none transition-all"
                        />
                      </div>

                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="screenshot-upload"
                        />
                        <label
                          htmlFor="screenshot-upload"
                          className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-white/10 rounded-3xl cursor-pointer hover:border-orange-500/50 transition-all"
                        >
                          {screenshot ? (
                            <img src={screenshot} alt="Preview" className="h-32 rounded-xl" />
                          ) : (
                            <>
                              <ShieldCheck className="w-8 h-8 text-gray-500" />
                              <span className="text-sm text-gray-400">Upload Payment Screenshot</span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                  )}

                  {paymentMethod !== 'upi' && (
                    <div className="p-12 rounded-[2rem] bg-white/5 border border-white/10 text-center">
                      <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                      <h4 className="text-xl font-bold mb-2">Automated Gateway Offline</h4>
                      <p className="text-gray-400 text-sm mb-6">Card and Crypto payments are currently processed manually via Discord.</p>
                      <a href="https://discord.gg/nikacloud" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-orange-500 hover:text-white transition-all">
                        Contact Support
                      </a>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Right Column: Summary */}
            <div className="w-full md:w-96">
              <div className="sticky top-32 p-8 rounded-[2.5rem] bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold mb-8">Order Summary</h3>
                
                {selectedPlan ? (
                  <div className="space-y-6">
                    <div className="pb-6 border-b border-white/10">
                      <div className="text-sm text-gray-400 mb-1">{selectedCategory.toUpperCase()} NODE</div>
                      <div className="text-2xl font-bold">{selectedPlan.name}</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Billing Cycle</span>
                        <span className="text-white">Monthly</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Payment Method</span>
                        <span className="text-white uppercase">{paymentMethod}</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <div className="flex justify-between items-end mb-8">
                        <span className="text-gray-400">Total Due</span>
                        <span className="text-3xl font-bold text-orange-500">{selectedPlan.price}</span>
                      </div>
                      
                      <button
                        onClick={handlePaymentSubmitted}
                        disabled={verifying || (paymentMethod === 'upi' && !screenshot)}
                        className="w-full py-5 bg-orange-500 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {verifying ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          <>
                            Complete Order
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-20 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                      <Zap className="w-8 h-8 text-gray-600" />
                    </div>
                    <p className="text-gray-500 font-medium">Select a plan to continue</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Verification Overlay */}
      <AnimatePresence>
        {verifying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
          >
            <div className="text-center max-w-md">
              <div className="w-24 h-24 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-8" />
              <h2 className="text-3xl font-bold mb-4">AI Verification in Progress</h2>
              <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
                Analyzing transaction screenshot and cross-referencing UTR ID...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] w-full max-w-md px-6">
          <div className="p-4 bg-red-500 text-white rounded-2xl shadow-2xl flex items-center gap-4">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <p className="text-sm font-bold">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto text-white/50 hover:text-white">
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
