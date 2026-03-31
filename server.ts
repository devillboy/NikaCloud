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
        { id: "mc-budget-1", name: "Budget Minecraft - 2GB", price: 99, ram: "2 GB", ssd: "10 GB", cpu: "100%", type: "minecraft" },
        { id: "mc-budget-2", name: "Budget Minecraft - 4GB", price: 199, ram: "4 GB", ssd: "20 GB", cpu: "200%", type: "minecraft" },
        { id: "mc-premium-1", name: "Premium Minecraft - 8GB", price: 399, ram: "8 GB", ssd: "40 GB", cpu: "300%", type: "minecraft" },
        { id: "mc-premium-2", name: "Premium Minecraft - 16GB", price: 699, ram: "16 GB", ssd: "80 GB", cpu: "400%", type: "minecraft" },
        { id: "vps-entry", name: "VPS Entry - 4GB", price: 299, ram: "4 GB", ssd: "40 GB", cpu: "2 Cores", type: "vps" },
        { id: "vps-pro", name: "VPS Pro - 8GB", price: 599, ram: "8 GB", ssd: "80 GB", cpu: "4 Cores", type: "vps" },
        { id: "vps-elite", name: "VPS Elite - 16GB", price: 999, ram: "16 GB", ssd: "160 GB", cpu: "8 Cores", type: "vps" },
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
