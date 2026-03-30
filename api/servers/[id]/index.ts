import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    const PANEL_URL = process.env.PANEL_URL || 'https://gp.nikacloud.in';
    const API_KEY = process.env.PANEL_API_KEY || 'ptla_IoPnRywiup4TOqKlugmFv22IhSrbNOqOgT9E2OrQTY3';

    const serverRes = await fetch(`${PANEL_URL}/api/application/servers?filter[uuidShort]=${id}&include=allocations`, {
      headers: { 
        'Authorization': `Bearer ${API_KEY}`, 
        'Accept': 'application/json' 
      }
    });
    
    const serverData = await serverRes.json();
    
    if (!serverRes.ok || !serverData.data || serverData.data.length === 0) {
      return res.status(404).json({ error: "Server not found on panel" });
    }

    const server = serverData.data[0].attributes;
    const allocations = server.relationships?.allocations?.data || [];
    const primaryAllocation = allocations[0]?.attributes;
    
    let ip = "Pending Allocation...";
    if (primaryAllocation) {
      ip = `${primaryAllocation.alias || primaryAllocation.ip}:${primaryAllocation.port}`;
    }

    let status = "Starting";
    if (server.suspended) {
      status = "Suspended";
    } else if (server.container?.installed === 1) {
      status = "Online";
    }

    res.json({
      ip,
      status,
      ram: `${Math.round(server.limits.memory / 1024)}GB`,
      cpu: `${server.limits.cpu}%`,
      disk: `${Math.round(server.limits.disk / 1024)}GB`
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch server details" });
  }
}
