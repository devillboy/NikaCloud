console.log("SERVER.TS STARTING...");
import express from "express";
console.log("SERVER.TS STARTING...");
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import cors from "cors";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, serverTimestamp, updateDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
const firebaseConfig = JSON.parse(fs.readFileSync(new URL("./firebase-applet-config.json", import.meta.url), "utf-8"));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

async function startServer() {
  console.log("STARTING SERVER...");
  const app = express();
  const PORT = 3000;

  // LOCK STATUS (Persistent 3-hour timer)
  const LOCK_DOC_ID = "global_lock";
  const LOCK_DURATION = 3 * 60 * 60 * 1000; // 3 hours

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.get("/api/lock-status", async (req, res) => {
    console.log("FETCHING LOCK STATUS...");
    try {
      const lockDoc = await getDoc(doc(db, "settings", LOCK_DOC_ID));
      let expiry;
      const now = Date.now();
      
      if (!lockDoc.exists() || (lockDoc.data().expiry < now)) {
        // Reset timer to 3 hours if it doesn't exist or is expired
        expiry = now + LOCK_DURATION;
        await setDoc(doc(db, "settings", LOCK_DOC_ID), { expiry });
        console.log(`TIMER RESET: New expiry at ${new Date(expiry).toISOString()}`);
      } else {
        expiry = lockDoc.data().expiry;
      }

      const isLocked = now < expiry;
      const remainingTime = Math.max(0, expiry - now);
      res.json({ isLocked, remainingTime, expiry });
    } catch (error) {
      console.error("Error fetching lock status:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // AUTHORIZED ORIGINS
  const authorizedOrigins = [
    'https://ais-dev-i2s6j473uusrp3lsvm4alv-781732712074.asia-southeast1.run.app',
    'https://ais-pre-i2s6j473uusrp3lsvm4alv-781732712074.asia-southeast1.run.app',
    'https://nikacloud.in',
    'https://www.nikacloud.in',
    'http://nikacloud.in',
    'http://www.nikacloud.in',
    'http://localhost:3000',
    'http://localhost:5173'
  ];

  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || authorizedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`BLOCKED UNAUTHORIZED ORIGIN: ${origin}`);
        callback(new Error('Not allowed by CORS - Unauthorized Domain'));
      }
    },
    credentials: true
  }));

  app.use(express.json());

  // DATA (Source of Truth)
  const FEATURES = [
    {
      title: "Enterprise Hardware",
      description: "Powered by AMD Ryzen 9 7950X and NVMe Gen4 SSDs for unmatched performance.",
      icon: "Cpu"
    },
    {
      title: "DDoS Protection",
      description: "Advanced 12Tbps+ mitigation to keep your infrastructure online 24/7.",
      icon: "Shield"
    },
    {
      title: "Global Network",
      description: "Strategically located nodes across the globe for minimum latency.",
      icon: "Globe"
    },
    {
      title: "Instant Setup",
      description: "Automated provisioning systems deploy your nodes in under 60 seconds.",
      icon: "Zap"
    }
  ];

  const BOT_PLANS = [
    { id: "bot-1", name: "Bot Host Plan 1", price: "₹35", ram: "2 GB", ssd: "8 GB", cpu: "50%", ports: 1, backups: 1 },
    { id: "bot-2", name: "Bot Host Plan 2", price: "₹70", ram: "4 GB", ssd: "15 GB", cpu: "100%", ports: 2, backups: 1 },
    { id: "bot-3", name: "Bot Host Plan 3", price: "₹105", ram: "6 GB", ssd: "30 GB", cpu: "150%", ports: 2, backups: 2 },
    { id: "bot-4", name: "Bot Host Plan 4", price: "₹140", ram: "8 GB", ssd: "45 GB", cpu: "200%", ports: 3, backups: 3 },
    { id: "bot-5", name: "Bot Host Plan 5", price: "₹175", ram: "10 GB", ssd: "60 GB", cpu: "300%", ports: 4, backups: 4 },
    { id: "bot-6", name: "Bot Host Plan 6", price: "₹210", ram: "12 GB", ssd: "80 GB", cpu: "400%", ports: 6, backups: 5 },
    { id: "bot-7", name: "Bot Host Plan 7", price: "₹245", ram: "16 GB", ssd: "100 GB", cpu: "600%", ports: 8, backups: 6 },
    { id: "bot-8", name: "Bot Host Plan 8", price: "₹280", ram: "24 GB", ssd: "150 GB", cpu: "850%", ports: 10, backups: 10, popular: true },
    { id: "bot-9", name: "Bot Host Plan 9", price: "₹315", ram: "32 GB", ssd: "200 GB", cpu: "1000%", ports: 12, backups: 12 },
    { id: "bot-10", name: "Bot Host Plan 10", price: "₹350", ram: "64 GB", ssd: "400 GB", cpu: "2000%", ports: 24, backups: 24 }
  ];

  const MINECRAFT_PLANS = [
    { id: "mc-1", name: "Plan 1", price: "₹99", ram: "2 GB", ssd: "8 GB", cpu: "50%" },
    { id: "mc-2", name: "Plan 2", price: "₹199", ram: "4 GB", ssd: "15 GB", cpu: "100%" },
    { id: "mc-3", name: "Plan 3", price: "₹299", ram: "6 GB", ssd: "25 GB", cpu: "150%" },
    { id: "mc-4", name: "Plan 4", price: "₹399", ram: "8 GB", ssd: "45 GB", cpu: "200%" },
    { id: "mc-5", name: "Plan 5", price: "₹499", ram: "10 GB", ssd: "60 GB", cpu: "300%" },
    { id: "mc-6", name: "Plan 6", price: "₹599", ram: "12 GB", ssd: "80 GB", cpu: "400%" },
    { id: "mc-7", name: "Plan 7", price: "₹699", ram: "16 GB", ssd: "100 GB", cpu: "600%" },
    { id: "mc-8", name: "Plan 8", price: "₹799", ram: "24 GB", ssd: "150 GB", cpu: "850%" },
    { id: "mc-9", name: "Plan 9", price: "₹899", ram: "32 GB", ssd: "200 GB", cpu: "1000%" },
    { id: "mc-10", name: "Plan 10", price: "₹999", ram: "64 GB", ssd: "400 GB", cpu: "2000%", popular: true }
  ];

  const VPS_PLANS = [
    { id: "vps-1", name: "VPS 1", price: "₹699", cores: "2 vCore", ram: "8 GB", storage: "48 GB" },
    { id: "vps-2", name: "VPS 2", price: "₹1,399", cores: "4 vCore", ram: "16 GB", storage: "96 GB" },
    { id: "vps-3", name: "VPS 3", price: "₹2,199", cores: "6 vCore", ram: "24 GB", storage: "112 GB" },
    { id: "vps-4", name: "VPS 4", price: "₹2,999", cores: "8 vCore", ram: "32 GB", storage: "128 GB" },
    { id: "vps-5", name: "VPS 5", price: "₹4,699", cores: "16 vCore", ram: "64 GB", storage: "256 GB", popular: true }
  ];

  const EGGS = [
    { id: 1, name: 'Vanilla Minecraft', description: 'Standard Minecraft server' },
    { id: 2, name: 'Paper', description: 'High performance, plugin support' },
    { id: 4, name: 'Forge', description: 'Modded Minecraft support' },
    { id: 15, name: 'Node.js', description: 'Host Discord bots & web apps' },
    { id: 16, name: 'Python', description: 'Host Python scripts & bots' }
  ];

  // API Routes
  app.get("/api/features", (req, res) => res.json(FEATURES));
  app.get("/api/plans/bot", (req, res) => res.json(BOT_PLANS));
  app.get("/api/plans/minecraft", (req, res) => res.json(MINECRAFT_PLANS));
  app.get("/api/plans/vps", (req, res) => res.json(VPS_PLANS));
  app.get("/api/eggs", (req, res) => res.json(EGGS));

  // Log all requests
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API for plans
  app.get("/api/plans", (req, res) => {
    try {
      console.log(`[${new Date().toISOString()}] GET /api/plans - Request received`);
      const plans = [
        // Bot Host Plans
        { id: "bot-1", name: "Bot Host Plan 1", price: "₹35", ram: "2 GB", ssd: "8 GB", cpu: "50%", ports: 1, backups: 1, type: "bot" },
        { id: "bot-2", name: "Bot Host Plan 2", price: "₹70", ram: "4 GB", ssd: "15 GB", cpu: "100%", ports: 2, backups: 1, type: "bot" },
        { id: "bot-3", name: "Bot Host Plan 3", price: "₹105", ram: "6 GB", ssd: "30 GB", cpu: "150%", ports: 2, backups: 2, type: "bot" },
        { id: "bot-4", name: "Bot Host Plan 4", price: "₹140", ram: "8 GB", ssd: "45 GB", cpu: "200%", ports: 3, backups: 3, type: "bot" },
        { id: "bot-5", name: "Bot Host Plan 5", price: "₹175", ram: "10 GB", ssd: "60 GB", cpu: "300%", ports: 4, backups: 4, type: "bot" },
        { id: "bot-6", name: "Bot Host Plan 6", price: "₹210", ram: "12 GB", ssd: "80 GB", cpu: "400%", ports: 6, backups: 5, type: "bot" },
        { id: "bot-7", name: "Bot Host Plan 7", price: "₹245", ram: "16 GB", ssd: "100 GB", cpu: "600%", ports: 8, backups: 6, type: "bot" },
        { id: "bot-8", name: "Bot Host Plan 8", price: "₹280", ram: "24 GB", ssd: "150 GB", cpu: "850%", ports: 10, backups: 10, type: "bot" },
        { id: "bot-9", name: "Bot Host Plan 9", price: "₹315", ram: "32 GB", ssd: "200 GB", cpu: "1000%", ports: 12, backups: 12, type: "bot" },
        { id: "bot-10", name: "Bot Host Plan 10", price: "₹350", ram: "64 GB", ssd: "400 GB", cpu: "2000%", ports: 24, backups: 24, type: "bot" },

        // Minecraft Plans
        { id: "mc-1", name: "Plan 1", price: "₹99", ram: "2 GB", ssd: "8 GB", cpu: "50%", type: "minecraft" },
        { id: "mc-2", name: "Plan 2", price: "₹199", ram: "4 GB", ssd: "15 GB", cpu: "100%", type: "minecraft" },
        { id: "mc-3", name: "Plan 3", price: "₹299", ram: "6 GB", ssd: "25 GB", cpu: "150%", type: "minecraft" },
        { id: "mc-4", name: "Plan 4", price: "₹399", ram: "8 GB", ssd: "45 GB", cpu: "200%", type: "minecraft" },
        { id: "mc-5", name: "Plan 5", price: "₹499", ram: "10 GB", ssd: "60 GB", cpu: "300%", type: "minecraft" },
        { id: "mc-6", name: "Plan 6", price: "₹599", ram: "12 GB", ssd: "80 GB", cpu: "400%", type: "minecraft" },
        { id: "mc-7", name: "Plan 7", price: "₹699", ram: "16 GB", ssd: "100 GB", cpu: "600%", type: "minecraft" },
        { id: "mc-8", name: "Plan 8", price: "₹799", ram: "24 GB", ssd: "150 GB", cpu: "850%", type: "minecraft" },
        { id: "mc-9", name: "Plan 9", price: "₹899", ram: "32 GB", ssd: "200 GB", cpu: "1000%", type: "minecraft" },
        { id: "mc-10", name: "Plan 10", price: "₹999", ram: "64 GB", ssd: "400 GB", cpu: "2000%", type: "minecraft" },

        // VPS Plans
        { id: "vps-1", name: "VPS 1", price: "₹699", cores: "2 vCore", ram: "8 GB", storage: "48 GB", type: "vps" },
        { id: "vps-2", name: "VPS 2", price: "₹1,399", cores: "4 vCore", ram: "16 GB", storage: "96 GB", type: "vps" },
        { id: "vps-3", name: "VPS 3", price: "₹2,199", cores: "6 vCore", ram: "24 GB", storage: "112 GB", type: "vps" },
        { id: "vps-4", name: "VPS 4", price: "₹2,999", cores: "8 vCore", ram: "32 GB", storage: "128 GB", type: "vps" },
        { id: "vps-5", name: "VPS 5", price: "₹4,699", cores: "16 vCore", ram: "64 GB", storage: "256 GB", type: "vps" },
      ];
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(plans);
    } catch (error) {
      console.error("Error in /api/plans:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Payment Submission (Backend Setup)
  app.post("/api/payments", upload.single("screenshot"), async (req, res) => {
    const { userId, userEmail, planId, planName, amount, duration, upiId, utrId, method, screenshot } = req.body;
    
    try {
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + parseInt(duration));

      // 1. Save payment record
      const paymentRef = await addDoc(collection(db, "payments"), {
        userId,
        userEmail,
        planId,
        planName,
        amount: parseInt(amount),
        duration: parseInt(duration),
        expiryDate: expiryDate.toISOString(),
        upiId: upiId || 'N/A',
        utrId: utrId || 'N/A',
        method,
        screenshotUrl: screenshot || '',
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      // 2. AI Verification (only for UPI)
      if (method === 'upi' && screenshot) {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: [
            {
              inlineData: {
                mimeType: "image/png",
                data: screenshot.split(',')[1] || screenshot,
              },
            },
            {
              text: `Analyze this payment screenshot for NikaCloud. 
              User claims to have paid ₹${amount} for ${planName}.
              UTR ID: ${utrId}. Return ONLY 'Genuine' or 'Fake'.`,
            },
          ],
        });

        const result = response.text?.trim();
        if (result !== "Genuine") {
          await updateDoc(doc(db, "payments", paymentRef.id), {
            status: "Rejected",
            reason: "AI detected potential fraud.",
            verifiedAt: serverTimestamp(),
          });
          return res.json({ status: "rejected", reason: "AI detected potential fraud." });
        }
      }

      // 3. Approve and Create Server (Automation)
      await updateDoc(doc(db, "payments", paymentRef.id), {
        status: "Approved",
        verifiedAt: serverTimestamp(),
      });

      // Simulate Automation: Create server in Firestore
      const serverRef = await addDoc(collection(db, "servers"), {
        name: `${planName} Node`,
        type: planId.startsWith('mc') ? 'minecraft' : (planId.startsWith('bot') ? 'bot' : 'vps'),
        status: "Starting",
        ip: `144.217.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}:25565`,
        userId,
        planId,
        duration: parseInt(duration),
        expiresAt: expiryDate.toISOString(),
        createdAt: serverTimestamp(),
      });

      res.json({ status: "success", serverId: serverRef.id });
    } catch (error) {
      console.error("Error in /api/payments:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Create free server (Automation)
  app.post("/api/servers/create-free", async (req, res) => {
    const { userId, email, eggId, serverName } = req.body;
    console.log(`Creating free server for ${email} (Egg: ${eggId})`);
    
    try {
      // In a real app, you'd trigger server creation here.
      // For now, we simulate the automation.
      const serverRef = await addDoc(collection(db, "servers"), {
        name: serverName.trim(),
        type: "Free Node",
        status: "Starting",
        ip: `144.217.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}:25565`,
        userId,
        planId: 'free-tier',
        specs: {
          ram: '5GB',
          cpu: '100%',
          ssd: '10GB'
        },
        createdAt: serverTimestamp()
      });

      res.json({
        status: "success",
        serverDetails: {
          id: serverRef.id,
          identifier: Math.random().toString(36).substring(7),
        },
        credentials: {
          username: email.split('@')[0],
          password: Math.random().toString(36).substring(2, 10),
          panelUrl: "https://gp.nikacloud.in"
        }
      });
    } catch (error) {
      console.error("Error in /api/servers/create-free:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Fetch real details from panel for each server
  app.get("/api/servers/:id", (req, res) => {
    const id = req.params.id;
    console.log(`Fetching real-time data for server: ${id}`);
    // Mock real-time data from Pterodactyl panel
    res.json({
      status: "Online",
      ip: `144.217.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}:25565`,
      ram: `${(Math.random() * 2 + 2).toFixed(1)}GB / 5GB`,
      cpu: `${Math.floor(Math.random() * 20 + 5)}%`,
      disk: `${(Math.random() * 1 + 1).toFixed(1)}GB / 10GB`
    });
  });

  // Catch-all for API routes to prevent falling through to SPA fallback
  app.all("/api/*", (req, res) => {
    console.warn(`API route not found: ${req.method} ${req.url}`);
    res.status(404).json({ error: "API route not found" });
  });

  // Admin Endpoints
  app.get('/api/admin/stats', async (req, res) => {
    try {
      const serversSnapshot = await getDocs(collection(db, 'servers'));
      const usersSnapshot = await getDocs(collection(db, 'users'));
      res.json({
        serversCount: serversSnapshot.size,
        usersCount: usersSnapshot.size,
        servers: serversSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch admin stats' });
    }
  });

  app.get('/api/admin/users', async (req, res) => {
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      res.json(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  app.get('/api/admin/servers', async (req, res) => {
    try {
      const serversSnapshot = await getDocs(collection(db, 'servers'));
      res.json(serversSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch servers' });
    }
  });

  app.delete('/api/admin/servers/:id', async (req, res) => {
    try {
      await deleteDoc(doc(db, 'servers', req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete server' });
    }
  });

  app.get('/api/admin/payments', async (req, res) => {
    try {
      const paymentsSnapshot = await getDocs(collection(db, 'payments'));
      const payments = paymentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      payments.sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch payments' });
    }
  });

  app.post('/api/admin/payments/:id/verify', async (req, res) => {
    const { id } = req.params;
    try {
      const paymentDoc = await getDoc(doc(db, 'payments', id));
      if (!paymentDoc.exists()) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      const payment = paymentDoc.data();

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
        await updateDoc(doc(db, 'payments', id), { status: 'Approved', verifiedAt: serverTimestamp() });
        
        // Create server
        await addDoc(collection(db, "servers"), {
          name: `${payment.planName || 'Minecraft'} Server`,
          type: "Minecraft",
          status: "Starting",
          ip: `144.217.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}:25565`,
          userId: payment.userId,
          planId: payment.planId,
          panelId: Math.floor(Math.random() * 10000).toString(),
          specs: payment.specs || { ram: "Unknown", cpu: "Unknown", ssd: "Unknown" },
          createdAt: serverTimestamp(),
        });

        res.json({ status: 'Approved', message: 'Payment verified as genuine! Server creation triggered.' });
      } else {
        await updateDoc(doc(db, 'payments', id), { status: 'Rejected', verifiedAt: serverTimestamp() });
        res.json({ status: 'Rejected', message: 'Payment verified as fake!' });
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ error: 'Error verifying payment' });
    }
  });

  app.post('/api/admin/payments/:id/action', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const paymentDoc = await getDoc(doc(db, 'payments', id));
      if (!paymentDoc.exists()) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      const payment = paymentDoc.data();

      await updateDoc(doc(db, 'payments', id), { status, verifiedAt: serverTimestamp() });
      
      if (status === 'Approved') {
        await addDoc(collection(db, "servers"), {
          name: `${payment.planName || 'Minecraft'} Server`,
          type: "Minecraft",
          status: "Starting",
          ip: `144.217.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}:25565`,
          userId: payment.userId,
          planId: payment.planId,
          panelId: Math.floor(Math.random() * 10000).toString(),
          specs: payment.specs || { ram: "Unknown", cpu: "Unknown", ssd: "Unknown" },
          createdAt: serverTimestamp(),
        });
      }

      res.json({ success: true, message: `Payment ${status} manually.` });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update payment' });
    }
  });

  app.get('/api/user/servers', async (req, res) => {
    const userId = req.query.userId as string;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
    try {
      const q = query(collection(db, 'servers'), where('userId', '==', userId));
      const snapshot = await getDocs(q);
      res.json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user servers' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
