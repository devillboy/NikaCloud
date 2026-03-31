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
  const [serverCreating, setServerCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'Genuine' | 'Fake' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/plans");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setPlans(data);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Failed to load plans. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handlePaymentSubmitted = async (screenshotBase64: string, upiId: string, utrId: string) => {
    if (!auth.currentUser) {
      setError("You must be logged in to purchase a plan.");
      return;
    }

    setVerifying(true);
    setError(null);

    try {
      // 1. Save initial payment record to Firestore
      let paymentRef;
      try {
        paymentRef = await addDoc(collection(db, "payments"), {
          userId: auth.currentUser.uid,
          userEmail: auth.currentUser.email,
          planId: selectedPlan.id,
          planName: selectedPlan.name,
          amount: selectedPlan.price,
          upiId,
          utrId,
          specs: {
            ram: selectedPlan.ram,
            cpu: selectedPlan.cpu,
            ssd: selectedPlan.ssd
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
            text: `Analyze this payment screenshot. 
            The user claims to have paid ${selectedPlan.price} for ${selectedPlan.name}.
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
          await addDoc(collection(db, "servers"), {
            name: `${selectedPlan.name} Server`,
            type: "Minecraft",
            status: "Starting",
            ip: `144.217.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}:25565`,
            userId: auth.currentUser.uid,
            planId: selectedPlan.id,
            panelId: Math.floor(Math.random() * 10000).toString(),
            specs: {
              ram: selectedPlan.ram,
              cpu: selectedPlan.cpu,
              ssd: selectedPlan.ssd
            },
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
      setError("An error occurred during payment verification. Please try again or contact support on Discord.");
    }
  };

  if (serverCreating) return <ServerAnimation />;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 mb-4 text-brand-accent"
        >
          <CreditCard className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Billing & Plans</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
        >
          Choose Your <span className="text-fiery-gradient">Power</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 max-w-2xl mx-auto"
        >
          Select a plan that fits your needs. All plans include DDoS protection, NVMe storage, and instant automated setup.
        </motion.p>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </motion.div>
      )}

      {verifying && (
        <div className="fixed inset-0 z-[110] bg-brand-darker/80 backdrop-blur-sm flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-8 rounded-3xl border border-slate-800 max-w-md w-full text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8 text-brand-blue animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">AI Fraud Detection Active</h3>
            <p className="text-slate-400 text-sm mb-6">Our AI is currently analyzing your payment screenshot to verify the transaction. This usually takes 5-10 seconds.</p>
            <div className="flex items-center justify-center gap-3 text-brand-blue font-bold">
              <Loader2 className="w-5 h-5 animate-spin" />
              Verifying Payment...
            </div>
          </motion.div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!selectedPlan ? (
          <motion.div 
            key="plan-selection"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-80 glass-panel rounded-3xl animate-pulse" />
              ))
            ) : (
              plans.map((plan: any) => (
                <PlanCard key={plan.id} plan={plan} onSelect={setSelectedPlan} />
              ))
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
