import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const PANEL_URL = process.env.PANEL_URL || 'https://gp.nikacloud.in';
  const API_KEY = process.env.PANEL_API_KEY || 'ptla_IoPnRywiup4TOqKlugmFv22IhSrbNOqOgT9E2OrQTY3';

  try {
    const response = await fetch(`${PANEL_URL}/api/application/users`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    res.json({ status: response.status, data });
  } catch (error) {
    res.status(500).json({ error: "Failed to connect to panel API" });
  }
}
