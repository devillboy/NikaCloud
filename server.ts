import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Placeholder for plans
  app.get("/api/plans", (req, res) => {
    res.json([
      { id: "p1", name: "Plan 1", price: "₹99", ram: "2 GB", ssd: "8 GB", cpu: "50%" },
      { id: "p2", name: "Plan 2", price: "₹199", ram: "4 GB", ssd: "15 GB", cpu: "100%" },
      { id: "p3", name: "Plan 3", price: "₹299", ram: "6 GB", ssd: "25 GB", cpu: "150%" },
      { id: "p4", name: "Plan 4", price: "₹399", ram: "8 GB", ssd: "45 GB", cpu: "200%" },
      { id: "p5", name: "Plan 5", price: "₹499", ram: "10 GB", ssd: "60 GB", cpu: "300%" },
      { id: "p6", name: "Plan 6", price: "₹599", ram: "12 GB", ssd: "80 GB", cpu: "400%" },
      { id: "p7", name: "Plan 7", price: "₹699", ram: "16 GB", ssd: "100 GB", cpu: "600%" },
      { id: "p8", name: "Plan 8", price: "₹799", ram: "24 GB", ssd: "150 GB", cpu: "850%" },
      { id: "p9", name: "Plan 9", price: "₹899", ram: "32 GB", ssd: "200 GB", cpu: "1000%" },
      { id: "p10", name: "Plan 10", price: "₹999", ram: "64 GB", ssd: "400 GB", cpu: "2000%" },
    ]);
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
