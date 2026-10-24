/**
 * నేటి భారతం (Neti Bharatam) — Hostinger Node.js Production Server
 * Upload project files to Hostinger Node.js Web App, run:
 *   npm install
 *   npm run build
 *   node server.js
 */
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = false;
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error handling request:', req.url, err);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  }).listen(port, hostname, () => {
    console.log('> Neti Bharatam Portal ready on http://' + hostname + ':' + port);
  });
});
