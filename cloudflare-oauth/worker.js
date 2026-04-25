/**
 * Cloudflare Worker — GitHub OAuth proxy for Decap CMS
 *
 * Required secrets (set with wrangler):
 *   wrangler secret put CLIENT_ID
 *   wrangler secret put CLIENT_SECRET
 *
 * GitHub OAuth App settings:
 *   Authorization callback URL: https://<your-worker-url>/callback
 */

const GITHUB_AUTH_URL     = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN_URL    = 'https://github.com/login/oauth/access_token';
const ALLOWED_ORIGIN      = 'https://practi.city';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(ALLOWED_ORIGIN) });
    }

    if (url.pathname === '/auth') {
      return handleAuth(url, env);
    }

    if (url.pathname === '/callback') {
      return handleCallback(url, env);
    }

    return new Response('Not found', { status: 404 });
  }
};

function handleAuth(url, env) {
  const params = new URLSearchParams({
    client_id: env.CLIENT_ID,
    scope:     'repo,user',
  });
  return Response.redirect(`${GITHUB_AUTH_URL}?${params}`, 302);
}

async function handleCallback(url, env) {
  const code = url.searchParams.get('code');
  if (!code) {
    return errorPage('Missing code parameter from GitHub.');
  }

  let token;
  try {
    const resp = await fetch(GITHUB_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept':       'application/json',
      },
      body: JSON.stringify({
        client_id:     env.CLIENT_ID,
        client_secret: env.CLIENT_SECRET,
        code,
      }),
    });

    const data = await resp.json();
    if (data.error) {
      return errorPage(`GitHub error: ${data.error_description || data.error}`);
    }
    token = data.access_token;
  } catch (err) {
    return errorPage(`Token exchange failed: ${err.message}`);
  }

  // Send token back to Decap CMS via postMessage
  const payload = JSON.stringify({ token, provider: 'github' });
  // JSON.stringify again to get a JS-safe string literal (handles inner quotes)
  const payloadLiteral = JSON.stringify('authorization:github:success:' + payload);
  const html = `<!DOCTYPE html><html><body><script>
(function () {
  function receiveMessage(e) {
    window.opener.postMessage(${payloadLiteral}, e.origin);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

function errorPage(message) {
  const html = `<!DOCTYPE html><html><body><script>
window.opener.postMessage('authorization:github:error:${JSON.stringify(message)}', '*');
</script><p>${message}</p></body></html>`;
  return new Response(html, {
    status: 400,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin':  origin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
