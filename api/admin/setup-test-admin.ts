import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const PANEL_URL = process.env.PANEL_URL || 'https://gp.nikacloud.in';
  const API_KEY = process.env.PANEL_API_KEY || 'ptla_IoPnRywiup4TOqKlugmFv22IhSrbNOqOgT9E2OrQTY3';

  try {
    const response = await fetch(`${PANEL_URL}/api/application/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: "testing@nikacloud.in",
        username: "testing_admin",
        first_name: "Testing",
        last_name: "For Website",
        password: "NikaCloud@Testing#2026",
        root_admin: true
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: "Panel API Error", 
        details: data.errors?.[0]?.detail || "Unknown error" 
      });
    }

    res.json({
      success: true,
      message: "Real Admin ID created on panel",
      credentials: {
        panelUrl: PANEL_URL,
        username: "testing_admin",
        email: "testing@nikacloud.in",
        password: "NikaCloud@Testing#2026"
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to connect to panel API" });
  }
}
