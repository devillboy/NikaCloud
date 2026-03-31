import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { motion } from "motion/react";
import { Upload, CheckCircle2, QrCode as QrIcon, ShieldCheck } from "lucide-react";

interface PaymentFormProps {
  plan: { id: string; name: string; price: string };
  onPaymentSubmitted: (screenshotBase64: string) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ plan, onPaymentSubmitted }) => {
  const [qrCode, setQrCode] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const generateQR = async () => {
      // Parse numeric value from string like "₹99"
      const numericPrice = plan.price.replace(/[^0-9]/g, "");
      const url = `upi://pay?pa=nikacloud@nyes&pn=NikaCloud&am=${numericPrice}&cu=INR`;
      try {
        const dataUrl = await QRCode.toDataURL(url, {
          width: 300,
          margin: 2,
          color: {
            dark: '#ffffff',
            light: '#0f172a'
          }
        });
        setQrCode(dataUrl);
      } catch (err) {
        console.error("QR Generation Error:", err);
      }
    };
    generateQR();
  }, [plan.price]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const [upiId, setUpiId] = useState("");
  const [utrId, setUtrId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !upiId || !utrId) return;

    setIsSubmitting(true);
    if (preview) {
      onPaymentSubmitted(preview, upiId, utrId);
    }
    setIsSubmitting(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center">
          <QrIcon className="w-6 h-6 text-brand-blue" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Complete Your Payment</h2>
          <p className="text-slate-400 text-sm">Scan the QR code below to pay for {plan.name}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="flex flex-col items-center justify-center p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
          {qrCode ? (
            <div className="relative group">
              <img src={qrCode} alt="UPI QR Code" className="w-full max-w-[200px] rounded-xl shadow-lg" />
              <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
            </div>
          ) : (
            <div className="w-[200px] h-[200px] bg-slate-800 animate-pulse rounded-xl" />
          )}
          <div className="mt-4 text-center">
            <div className="text-2xl font-bold text-white">{plan.price}</div>
            <div className="text-xs text-slate-500 font-mono mt-1">UPI ID: nikacloud@nyes</div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-500" /> Payment Instructions
            </h3>
            <ul className="text-xs text-slate-400 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-[10px]">1</span>
                Scan QR with any UPI app (GPay, PhonePe, etc.)
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-[10px]">2</span>
                Pay the exact amount: <span className="text-white font-medium">{plan.price}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-[10px]">3</span>
                Take a screenshot of the success screen
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-[10px]">4</span>
                Enter your UPI ID and UTR ID (Transaction ID) below
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Your UPI ID</label>
                <input 
                  type="text" 
                  placeholder="e.g. user@okaxis" 
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-3 text-white text-sm focus:border-brand-blue transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">UTR / Transaction ID</label>
                <input 
                  type="text" 
                  placeholder="12-digit UTR number" 
                  value={utrId}
                  onChange={(e) => setUtrId(e.target.value)}
                  required
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-3 text-white text-sm focus:border-brand-blue transition-colors"
                />
              </div>
            </div>

            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="screenshot-upload"
                required
              />
              <label 
                htmlFor="screenshot-upload"
                className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                  preview ? 'border-brand-blue bg-brand-blue/5' : 'border-slate-800 hover:border-slate-700 bg-slate-900/30'
                }`}
              >
                {preview ? (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-medium">Change Image</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-slate-500 mb-2" />
                    <span className="text-sm font-medium text-slate-400">Upload Screenshot</span>
                    <span className="text-[10px] text-slate-600 mt-1">PNG, JPG up to 5MB</span>
                  </>
                )}
              </label>
            </div>

            <button 
              type="submit" 
              disabled={!file || !upiId || !utrId || isSubmitting}
              className="w-full py-4 rounded-2xl bg-fiery-gradient text-white font-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl shadow-brand-accent/20"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Submit for Verification
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="text-center">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
          Secured by NikaCloud AI Fraud Detection
        </p>
      </div>
    </motion.div>
  );
};
