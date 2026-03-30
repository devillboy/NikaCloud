import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, eggId = 1, serverName } = req.body;
    const email = req.body.email?.toLowerCase();

    if (!userId || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const finalServerName = serverName || `${email.split('@')[0]}'s Free Server`;
    
    const PANEL_URL = process.env.PANEL_URL || 'https://gp.nikacloud.in';
    const API_KEY = process.env.PANEL_API_KEY || 'ptla_IoPnRywiup4TOqKlugmFv22IhSrbNOqOgT9E2OrQTY3';

    if (!API_KEY) {
      return res.status(500).json({ error: "Server configuration error: Missing Panel API Key." });
    }

    // 1. Check if user exists on the panel, or create them
    let panelUserId;
    let generatedPassword = Math.random().toString(36).slice(-10); // Random password
    let panelUsername = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '') + Math.floor(Math.random() * 1000);
    let isNewPanelUser = false;
    let finalPassword = generatedPassword;

    const userRes = await fetch(`${PANEL_URL}/api/application/users?filter[email]=${email}`, {
      headers: { 
        'Authorization': `Bearer ${API_KEY}`, 
        'Accept': 'application/json' 
      }
    });
    
    const userData = await userRes.json();
    
    if (userData.data && userData.data.length > 0) {
      panelUserId = userData.data[0].attributes.id;
      panelUsername = userData.data[0].attributes.username;
      
      // Check if this user already has a server
      const userServersRes = await fetch(`${PANEL_URL}/api/application/users/${panelUserId}?include=servers`, {
        headers: { 
          'Authorization': `Bearer ${API_KEY}`, 
          'Accept': 'application/json' 
        }
      });
      const userServersData = await userServersRes.json();
      const serversCount = userServersData.attributes?.relationships?.servers?.data?.length || 0;
      
      if (serversCount >= 2) {
        return res.status(403).json({ error: "You have already claimed the maximum of 2 free servers." });
      }

      finalPassword = "Use your existing panel password. If forgotten, use the 'Forgot Password' link on the panel.";
    } else {
      isNewPanelUser = true;
      const createUserRes = await fetch(`${PANEL_URL}/api/application/users`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${API_KEY}`, 
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          email: email,
          username: panelUsername.substring(0, 16),
          first_name: "NikaCloud",
          last_name: "User",
          password: generatedPassword
        })
      });
      
      const createUserData = await createUserRes.json();
      if (!createUserRes.ok) {
        throw new Error(`Failed to create panel user: ${JSON.stringify(createUserData.errors?.[0]?.detail || 'Unknown error')}`);
      }
      panelUserId = createUserData.attributes.id;
      finalPassword = generatedPassword;
    }

    // 2. Create the Server on the Panel
    let environment = {};
    let docker_image = "ghcr.io/pterodactyl/yolks:java_21";
    let startup = "";

    if (eggId == 1) { // Vanilla
      environment = { SERVER_JARFILE: "server.jar", VANILLA_VERSION: "latest" };
      startup = "java -Xms128M -XX:MaxRAMPercentage=95.0 -jar {{SERVER_JARFILE}}";
    } else if (eggId == 2) { // Paper
      environment = { MINECRAFT_VERSION: "latest", SERVER_JARFILE: "server.jar", DL_PATH: "", BUILD_NUMBER: "latest" };
      startup = "java -Xms128M -XX:MaxRAMPercentage=95.0 -Dterminal.jline=false -Dterminal.ansi=true -jar {{SERVER_JARFILE}}";
    } else if (eggId == 4) { // Forge
      environment = { SERVER_JARFILE: "server.jar", MC_VERSION: "latest", BUILD_TYPE: "recommended", FORGE_VERSION: "" };
      startup = "java -Xms128M -XX:MaxRAMPercentage=95.0 -Dterminal.jline=false -Dterminal.ansi=true $( [[  ! -f unix_args.txt ]] && printf %s \"-jar {{SERVER_JARFILE}}\" || printf %s \"@unix_args.txt\" )";
    } else if (eggId == 15) { // Node.js
      docker_image = "ghcr.io/parkervcp/yolks:nodejs_21";
      environment = { GIT_ADDRESS: "", BRANCH: "", USER_UPLOAD: "0", AUTO_UPDATE: "0", NODE_PACKAGES: "", USERNAME: "", ACCESS_TOKEN: "", UNNODE_PACKAGES: "", MAIN_FILE: "index.js", NODE_ARGS: "" };
      startup = "if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == \"1\" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; if [[ \"${MAIN_FILE}\" == \"*.js\" ]]; then /usr/local/bin/node \"/home/container/${MAIN_FILE}\" ${NODE_ARGS}; else /usr/local/bin/ts-node --esm \"/home/container/${MAIN_FILE}\" ${NODE_ARGS}; fi";
    } else if (eggId == 16) { // Python
      docker_image = "ghcr.io/ptero-eggs/yolks:python_3.13";
      environment = { GIT_ADDRESS: "", BRANCH: "", USER_UPLOAD: "0", AUTO_UPDATE: "0", PY_FILE: "main.py", PY_PACKAGES: "", USERNAME: "", ACCESS_TOKEN: "", REQUIREMENTS_FILE: "requirements.txt" };
      startup = "if [[ -d .git ]] && [[ \"{{AUTO_UPDATE}}\" == \"1\" ]]; then git pull; fi; if [[ ! -z \"{{PY_PACKAGES}}\" ]]; then pip install -U --prefix .local {{PY_PACKAGES}}; fi; if [[ -f /home/container/${REQUIREMENTS_FILE} ]]; then pip install -U --prefix .local -r ${REQUIREMENTS_FILE}; fi; /usr/local/bin/python /home/container/{{PY_FILE}}";
    } else {
      environment = { SERVER_JARFILE: "server.jar", BUILD_NUMBER: "latest" };
      startup = "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}";
    }

    const serverRes = await fetch(`${PANEL_URL}/api/application/servers`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${API_KEY}`, 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        name: finalServerName,
        user: panelUserId,
        egg: parseInt(eggId),
        docker_image: docker_image,
        startup: startup,
        environment: environment,
        limits: { memory: 5120, swap: 0, disk: 10240, io: 500, cpu: 100 },
        feature_limits: { databases: 1, backups: 1 },
        deploy: { locations: [1], dedicated_ip: false, port_range: [] }
      })
    });
    
    const serverData = await serverRes.json();
    
    if (!serverRes.ok) {
      throw new Error(`Panel API Error: ${JSON.stringify(serverData.errors?.[0]?.detail || 'Unknown error')}`);
    }

    res.json({ 
      success: true, 
      message: "Server created successfully",
      credentials: {
        panelUrl: PANEL_URL,
        username: panelUsername,
        password: finalPassword,
        isNewUser: isNewPanelUser
      },
      serverDetails: {
        id: serverData.attributes.identifier,
        name: serverData.attributes.name,
        ram: "5GB",
        disk: "10GB",
        cpu: "100"
      }
    });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to create server" });
  }
}
