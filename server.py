#!/usr/bin/env python3
import os
import json
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlparse
import re

# Load environment variables from .claude/.env
def load_env():
    env_file = Path('.claude/.env')
    env = {}
    if env_file.exists():
        with open(env_file, 'r') as f:
            for line in f:
                line = line.strip()
                if line and '=' in line and not line.startswith('#'):
                    key, value = line.split('=', 1)
                    env[key.strip()] = value.strip()
    return env

ENV = load_env()
SUPABASE_URL = "https://djvohbsyeoolbkhiwigz.supabase.co"
SUPABASE_ACCESS_TOKEN = ENV.get('SUPABASE_ACCESS_TOKEN', '')

class MyHTTPRequestHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Serve API endpoints
        if self.path == '/api/config':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            config = {
                'supabaseUrl': SUPABASE_URL,
                'supabaseToken': SUPABASE_ACCESS_TOKEN
            }
            self.wfile.write(json.dumps(config).encode())
            return

        # Default: serve files normally
        super().do_GET()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

if __name__ == '__main__':
    PORT = 8888
    server = HTTPServer(('localhost', PORT), MyHTTPRequestHandler)
    print(f"Server running at http://localhost:{PORT}")
    print(f"Serving mindmap at http://localhost:{PORT}/mindmap.html")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
