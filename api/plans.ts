import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
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
}
