const https = require('https');
const fs = require('fs');
const path = require('path');

let token = process.env.VERCEL_TOKEN;
if (!token) {
  const authPath = path.join(process.env.APPDATA, 'com.vercel.cli', 'Data', 'auth.json');
  if (fs.existsSync(authPath)) {
    const auth = JSON.parse(fs.readFileSync(authPath, 'utf8'));
    token = auth.token;
  }
}

if (!token) {
  console.error('No Vercel token found');
  process.exit(1);
}

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(typeof data === 'string' ? data : JSON.stringify(data));
    req.end();
  });
}

async function run() {
  console.log('Triggering Vercel deployment from GitHub master (commit 9cd5120)...');
  const deployPayload = {
    name: 'alquileres-residencias-la-arena',
    project: 'alquileres-residencias-la-arena',
    target: 'production',
    gitSource: {
      type: 'github',
      ref: 'master',
      repoId: 1467965027
    }
  };

  const deployRes = await request({
    hostname: 'api.vercel.com',
    path: '/v13/deployments',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }, deployPayload);

  console.log('Deployment status:', deployRes.status);
  const dep = deployRes.data;
  console.log('Deployment ID:', dep.id, 'URL:', dep.url, 'ReadyState:', dep.readyState || dep.status);

  // Poll until READY
  let ready = false;
  let attempts = 0;
  while (!ready && attempts < 20) {
    await new Promise(r => setTimeout(r, 3000));
    attempts++;
    const checkRes = await request({
      hostname: 'api.vercel.com',
      path: `/v13/deployments/${dep.id}`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const state = checkRes.data.readyState || checkRes.data.status;
    console.log(`Polling status [${attempts}]:`, state);
    if (state === 'READY') {
      ready = true;
      break;
    }
    if (state === 'ERROR' || state === 'CANCELED') {
      console.error('Deployment failed with state:', state, checkRes.data.errorMessage);
      break;
    }
  }

  // Alias / promote to alquileres-residencias-la-arena.vercel.app
  if (ready) {
    console.log('Aliasing to production domain...');
    const aliasRes = await request({
      hostname: 'api.vercel.com',
      path: `/v2/deployments/${dep.id}/aliases`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }, { alias: 'alquileres-residencias-la-arena.vercel.app' });
    console.log('Alias result:', aliasRes.status, aliasRes.data);
  }
}

run().catch(console.error);
