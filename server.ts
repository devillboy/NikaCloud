import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import cors from "cors";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

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

  // Placeholder for payment submission
  app.post("/api/payments", upload.single("screenshot"), (req, res) => {
    // In a real app, you'd store the screenshot in Firebase Storage
    // and the payment record in Firestore.
    res.json({ status: "submitted" });
  });

  // Placeholder for server creation
  app.post("/api/servers", (req, res) => {
    // In a real app, you'd trigger server creation here.
    res.json({ status: "created" });
  });

  // Create free server
  app.post("/api/servers/create-free", (req, res) => {
    const { userId, email, eggId, serverName } = req.body;
    console.log(`Creating free server for ${email} (Egg: ${eggId})`);
    
    // Mock response from Pterodactyl panel
    res.json({
      status: "success",
      serverDetails: {
        id: Math.floor(Math.random() * 10000).toString(),
        identifier: Math.random().toString(36).substring(7),
      },
      credentials: {
        username: email.split('@')[0],
        password: Math.random().toString(36).substring(2, 10),
        panelUrl: "https://gp.nikacloud.in"
      }
    });
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
