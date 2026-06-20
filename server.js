const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Load environment variables from .claude/.env
function loadEnv() {
    const envFile = path.join(__dirname, '.claude', '.env');
    const env = {};
    try {
        const content = fs.readFileSync(envFile, 'utf-8');
        content.split('\n').forEach(line => {
            line = line.trim();
            if (line && !line.startsWith('#') && line.includes('=')) {
                const [key, value] = line.split('=', 2);
                env[key.trim()] = value.trim();
            }
        });
    } catch (err) {
        console.error('Failed to load .env file:', err.message);
    }
    return env;
}

const ENV = loadEnv();
const SUPABASE_URL = "https://djvohbsyeoolbkhiwigz.supabase.co";
const SUPABASE_ACCESS_TOKEN = ENV.SUPABASE_ACCESS_TOKEN || '';

console.log('✓ SUPABASE_ACCESS_TOKEN loaded from .claude/.env');

const PORT = 8888;

const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // API endpoint: /api/config
    if (pathname === '/api/config') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            supabaseUrl: SUPABASE_URL,
            supabaseToken: SUPABASE_ACCESS_TOKEN
        }));
        return;
    }

    // Serve static files
    let filePath = path.join(__dirname, pathname === '/' ? 'mindmap.html' : pathname);

    fs.stat(filePath, (err, stats) => {
        if (err) {
            res.writeHead(404);
            res.end('Not Found');
            return;
        }

        if (stats.isDirectory()) {
            filePath = path.join(filePath, 'index.html');
        }

        const ext = path.extname(filePath);
        const contentType = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml'
        }[ext] || 'text/plain';

        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
    });
});

server.listen(PORT, () => {
    console.log(`\n✓ Server running at http://localhost:${PORT}`);
    console.log(`  Open: http://localhost:${PORT}/mindmap.html\n`);
});
