import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { GoogleGenAI } from "@google/genai";
import { ShieldCheck, AlertCircle, CheckCircle2, XCircle, Search, Eye, Loader2 } from 'lucide-react';

export const AdminPayments = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState<string | null>(null);
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const paymentsSnapshot = await getDocs(collection(db, 'payments'));
      const paymentsList = paymentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      // Sort by newest first
      paymentsList.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setPayments(paymentsList);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const createServerForPayment = async (payment: any) => {
    await addDoc(collection(db, "servers"), {
      name: `${payment.planName || 'Minecraft'} Server`,
      type: "Minecraft",
      status: "Starting",
      ip: `144.217.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}:25565`,
      userId: payment.userId,
      planId: payment.planId,
      specs: payment.specs || { ram: "Unknown", cpu: "Unknown", ssd: "Unknown" },
      createdAt: serverTimestamp(),
    });
  };

  const verifyPayment = async (payment: any) => {
    setVerifying(payment.id);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            inlineData: {
              mimeType: "image/png",
              data: payment.screenshotUrl.split(',')[1] || payment.screenshotUrl,
            },
          },
          {
            text: `Analyze this payment screenshot. 
            The user claims to have paid ${payment.amount} for ${payment.planName}.
            User UPI ID: ${payment.upiId || 'Not provided'}
            Transaction UTR ID: ${payment.utrId || 'Not provided'}
            Is it a genuine payment to nikacloud@nyes? 
            Check if the UTR ID and amount match the screenshot.
            Return ONLY 'Genuine' or 'Fake'.`,
          },
        ],
      });
      
      const result = response.text?.trim();
      if (result === 'Genuine') {
        await updateDoc(doc(db, 'payments', payment.id), { status: 'Approved', verifiedAt: serverTimestamp() });
        await createServerForPayment(payment);
        alert("Payment verified as genuine! Server creation triggered.");
      } else {
        await updateDoc(doc(db, 'payments', payment.id), { status: 'Rejected', verifiedAt: serverTimestamp() });
        alert("Payment verified as fake!");
      }
      fetchPayments();
    } catch (error) {
      console.error("Error verifying payment:", error);
      alert("Error verifying payment");
    } finally {
      setVerifying(null);
    }
  };

  const handleManualAction = async (paymentId: string, status: 'Approved' | 'Rejected', payment: any) => {
    try {
      await updateDoc(doc(db, 'payments', paymentId), { status, verifiedAt: serverTimestamp() });
      if (status === 'Approved') {
        await createServerForPayment(payment);
      }
      alert(`Payment ${status} manually.`);
      fetchPayments();
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Payment Verification</h1>
          <p className="text-slate-400">Review and verify user payments using AI Fraud Detection.</p>
        </div>
        <button 
          onClick={fetchPayments}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
        >
          <Loader2 className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User / Email</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Plan / Amount</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">UPI / UTR</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && payments.length === 0 ? (
                <tr><td colSpan={6} className="p-12 text-center text-slate-400">Loading payments...</td></tr>
              ) : payments.length === 0 ? (
                <tr><td colSpan={6} className="p-12 text-center text-slate-400">No payments found.</td></tr>
              ) : payments.map(payment => (
                <tr key={payment.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors group">
                  <td className="p-4">
                    <div className="text-white font-medium">{payment.userId.substring(0, 8)}...</div>
                    <div className="text-xs text-slate-500">{payment.userEmail}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-white font-bold">{payment.planName || 'Minecraft Plan'}</div>
                    <div className="text-xs text-brand-accent font-mono">{payment.amount}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-xs text-slate-300 font-mono">UPI: {payment.upiId || 'N/A'}</div>
                    <div className="text-xs text-slate-500 font-mono">UTR: {payment.utrId || 'N/A'}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      payment.status === 'Approved' ? 'bg-green-500/10 text-green-400' :
                      payment.status === 'Rejected' ? 'bg-red-500/10 text-red-400' :
                      'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {payment.status === 'Approved' && <CheckCircle2 className="w-3 h-3" />}
                      {payment.status === 'Rejected' && <XCircle className="w-3 h-3" />}
                      {payment.status === 'Pending' && <Loader2 className="w-3 h-3 animate-spin" />}
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 text-xs">
                    {payment.createdAt?.toDate ? payment.createdAt.toDate().toLocaleString() : 'Just now'}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setSelectedScreenshot(payment.screenshotUrl)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        title="View Screenshot"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => verifyPayment(payment)}
                        disabled={verifying === payment.id || payment.status !== 'Pending'}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue text-xs font-bold transition-all disabled:opacity-50"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        {verifying === payment.id ? "Analyzing..." : "AI Verify"}
                      </button>
                      {payment.status === 'Pending' && (
                        <>
                          <button 
                            onClick={() => handleManualAction(payment.id, 'Approved', payment)}
                            className="p-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 transition-colors"
                            title="Approve Manually"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleManualAction(payment.id, 'Rejected', payment)}
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                            title="Reject Manually"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Screenshot Modal */}
      {selectedScreenshot && (
        <div 
          className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedScreenshot(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <img 
              src={selectedScreenshot} 
              alt="Payment Screenshot" 
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            <button 
              className="mt-6 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition-all"
              onClick={() => setSelectedScreenshot(null)}
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
