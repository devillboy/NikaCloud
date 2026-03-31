import React, { useState, useEffect } from "react";
import { PlanCard } from "../components/PlanCard";
import { PaymentForm } from "../components/PaymentForm";
import { ServerAnimation } from "../components/ServerAnimation";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, CreditCard, LayoutDashboard, ShieldCheck, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { GoogleGenAI } from "@google/genai";

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
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [duration, setDuration] = useState(1); // in months
  const [serverCreating, setServerCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'Genuine' | 'Fake' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        console.log("Fetching plans from /api/plans...");
        const res = await fetch("/api/plans");
        console.log("Plans response status:", res.status);
        if (!res.ok) {
          const text = await res.text();
          console.error("Plans response error body:", text);
          throw new Error(`Infrastructure API Error: ${res.status}. Protocol synchronization failed.`);
        }
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

  const handlePaymentSubmitted = async (screenshotBase64: string, upiId: string, utrId: string) => {
    if (!auth.currentUser) {
      setError("Authorization required. Please log in to your terminal.");
      return;
    }

    setVerifying(true);
    setError(null);

    try {
      // Calculate expiry date
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + duration);

      // Calculate final price
      const basePrice = typeof selectedPlan.price === 'string' 
        ? parseInt(selectedPlan.price.replace(/[^0-9]/g, '')) 
        : selectedPlan.price;
      const totalPrice = duration >= 12 
        ? Math.floor(basePrice * duration * 0.8) 
        : basePrice * duration;

      // 1. Save initial payment record to Firestore
      let paymentRef;
      try {
        paymentRef = await addDoc(collection(db, "payments"), {
          userId: auth.currentUser.uid,
          userEmail: auth.currentUser.email,
          planId: selectedPlan.id,
          planName: selectedPlan.name,
          amount: totalPrice,
          duration,
          expiryDate: expiryDate.toISOString(),
          upiId,
          utrId,
          specs: {
            ram: selectedPlan.ram,
            cpu: selectedPlan.cpu,
            ssd: selectedPlan.ssd || selectedPlan.storage
          },
          screenshotUrl: screenshotBase64,
          status: "Pending",
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, "payments");
      }

      // 2. Trigger AI Fraud Detection (Gemini)
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            inlineData: {
              mimeType: "image/png",
              data: screenshotBase64.split(',')[1] || screenshotBase64,
            },
          },
          {
            text: `Analyze this payment screenshot for NikaCloud infrastructure. 
            The user claims to have paid ${selectedPlan.price} for ${selectedPlan.name} Node.
            User UPI ID: ${upiId}
            Transaction UTR ID: ${utrId}
            Is it a genuine payment to nikacloud@nyes? 
            Check if the UTR ID ${utrId} and amount ${selectedPlan.price} are visible and correct in the screenshot.
            Return ONLY 'Genuine' or 'Fake'.`,
          },
        ],
      });

      const result = response.text?.trim();
      console.log("AI Verification Result:", result);

      if (result === "Genuine") {
        setVerificationResult("Genuine");
        
        // 3. Update payment status
        try {
          await updateDoc(doc(db, "payments", paymentRef.id), {
            status: "Approved",
            verifiedAt: serverTimestamp(),
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.UPDATE, `payments/${paymentRef.id}`);
        }

        // 4. Create the real server record
        try {
          const expiryDate = new Date();
          expiryDate.setMonth(expiryDate.getMonth() + duration);

          await addDoc(collection(db, "servers"), {
            name: `${selectedPlan.name} Node`,
            type: selectedPlan.type === 'minecraft' ? "Minecraft" : "VPS",
            status: "Starting",
            ip: `144.217.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}:25565`,
            userId: auth.currentUser.uid,
            planId: selectedPlan.id,
            panelId: Math.floor(Math.random() * 10000).toString(),
            specs: {
              ram: selectedPlan.ram,
              cpu: selectedPlan.cpu,
              ssd: selectedPlan.ssd || selectedPlan.storage
            },
            duration,
            expiresAt: expiryDate.toISOString(),
            renewalWindowEndsAt: new Date(expiryDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days window
            createdAt: serverTimestamp(),
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, "servers");
        }

        setVerifying(false);
        navigate("/payment-result", { state: { status: 'success', plan: selectedPlan } });

      } else {
        setVerificationResult("Fake");
        await updateDoc(doc(db, "payments", paymentRef.id), {
          status: "Rejected",
          reason: "AI detected potential fraud or incorrect payment details.",
          verifiedAt: serverTimestamp(),
        });
        setVerifying(false);
        navigate("/payment-result", { state: { status: 'failed', plan: selectedPlan } });
      }

    } catch (err) {
      console.error("Verification Error:", err);
      setVerifying(false);
      setError("Protocol synchronization error during verification. Please contact infrastructure support on Discord.");
    }
  };

  const handlePlanSelect = (plan: any) => {
    if (plan.type === 'vps' || plan.id.startsWith('vps-')) {
      window.open("https://discord.gg/nikacloud", "_blank");
      return;
    }
    setSelectedPlan(plan);
  };

  if (serverCreating) return <ServerAnimation />;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 border border-brand-border bg-brand-card mb-4"
        >
          <div className="w-2 h-2 bg-brand-accent animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand-accent">Billing System</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter"
        >
          BUY YOUR <span className="text-brand-accent">SERVER</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 max-w-2xl mx-auto font-mono text-xs uppercase tracking-widest"
        >
          Select your plan. Get 20% OFF on Yearly plans!
        </motion.p>
      </div>

      {!selectedPlan && (
        <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="text-sm font-mono text-slate-400 uppercase tracking-widest">Select Duration:</div>
          <div className="flex bg-brand-card border border-brand-border p-1 rounded-xl">
            {[
              { label: '1 Month', value: 1 },
              { label: '1 Year (20% OFF)', value: 12 },
              { label: '2 Years (20% OFF)', value: 24 }
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDuration(opt.value)}
                className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                  duration === opt.value 
                    ? 'bg-brand-accent text-brand-darker' 
                    : 'text-slate-500 hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto mb-12 p-6 border border-red-500/30 bg-red-500/5 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-3 text-red-400">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-xs font-mono uppercase tracking-wider">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 border border-red-500/50 text-red-400 text-[10px] font-mono uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {verifying && (
        <div className="fixed inset-0 z-[110] bg-brand-darker/95 backdrop-blur-sm flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brand-card border border-brand-border p-10 max-w-md w-full text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent animate-[loading_2s_linear_infinite]" />
            <div className="w-20 h-20 border border-brand-accent/20 flex items-center justify-center mx-auto mb-8 relative">
              <div className="absolute inset-0 border border-brand-accent animate-ping opacity-20" />
              <ShieldCheck className="w-10 h-10 text-brand-accent" />
            </div>
            <h3 className="text-sm font-mono text-brand-accent uppercase tracking-[0.3em] mb-4">Checking Payment</h3>
            <p className="text-slate-500 text-xs font-mono mb-8 leading-relaxed">AI IS CHECKING YOUR PAYMENT. PLEASE WAIT WHILE WE VERIFY YOUR TRANSACTION.</p>
            <div className="flex items-center justify-center gap-3 text-white font-mono text-[10px] uppercase tracking-widest">
              <Loader2 className="w-4 h-4 animate-spin text-brand-accent" />
              Verifying...
            </div>
          </motion.div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!selectedPlan ? (
          <motion.div 
            key="plan-selection"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-brand-border border border-brand-border"
          >
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-96 bg-brand-card animate-pulse" />
              ))
            ) : (
              plans.map((plan: any) => {
                const basePrice = typeof plan.price === 'string' 
                  ? parseInt(plan.price.replace(/[^0-9]/g, '')) 
                  : plan.price;
                const displayPrice = duration >= 12 
                  ? Math.floor(basePrice * duration * 0.8) 
                  : basePrice * duration;
                
                return (
                  <PlanCard 
                    key={plan.id} 
                    plan={{...plan, price: `₹${displayPrice}`, originalPrice: basePrice}} 
                    onSelect={handlePlanSelect} 
                    duration={duration}
                  />
                );
              })
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="payment-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <button 
              onClick={() => setSelectedPlan(null)}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Plans
            </button>
            <PaymentForm 
              plan={selectedPlan} 
              onPaymentSubmitted={(base64, upi, utr) => handlePaymentSubmitted(base64, upi, utr)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-20 flex flex-col items-center gap-6">
        <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="text-slate-400 hover:text-white flex items-center gap-2 text-sm transition-colors">
            <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
          </Link>
          <a href="https://discord.gg/nikacloud" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white flex items-center gap-2 text-sm transition-colors">
            Need Help? Join Discord
          </a>
        </div>
      </div>
    </div>
  );
}
