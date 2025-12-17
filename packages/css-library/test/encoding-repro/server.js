#!/usr/bin/env node
/**
 * Encoding Issue Reproduction Server
 * 
 * This demonstrates the UTF-8/Latin-1 encoding issue with CSS content: '\a0'
 * 
 * Run: node server.js
 * Open: http://localhost:3000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } else if (req.url === '/broken.css') {
    // Serve CSS file with LATIN-1 charset header
    // This forces the browser to interpret UTF-8 bytes as Latin-1 → shows "Â"
    const css = fs.readFileSync(path.join(__dirname, 'broken.css'));
    res.writeHead(200, { 'Content-Type': 'text/css; charset=iso-8859-1' });
    res.end(css);
  } else if (req.url === '/fixed.css') {
    // Serve fixed CSS file (also with Latin-1 to show the fix works regardless)
    const css = fs.readFileSync(path.join(__dirname, 'fixed.css'));
    res.writeHead(200, { 'Content-Type': 'text/css; charset=iso-8859-1' });
    res.end(css);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║  CSS Encoding Issue Reproduction                               ║
╠════════════════════════════════════════════════════════════════╣
║  Open in browser: http://localhost:${PORT}                        ║
╚════════════════════════════════════════════════════════════════╝
`);
});
