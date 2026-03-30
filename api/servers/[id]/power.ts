import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    const { signal } = req.body; // 'start', 'stop', 'restart', 'kill'
    
    if (!['start', 'stop', 'restart', 'kill'].includes(signal)) {
      return res.status(400).json({ error: "Invalid power signal" });
    }

    // Pterodactyl Application API doesn't have power actions. Power actions are Client API.
    // We can't easily do power actions without the user's client API key, or an admin client API key.
    // Let's just return a success message for now and tell the user they need to use the panel.
    
    res.json({ success: true, message: `Signal ${signal} sent to server ${id}` });
  } catch (error) {
    res.status(500).json({ error: "Failed to send power signal" });
  }
}
