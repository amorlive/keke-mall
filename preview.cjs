// preview-server.cjs — Node 静态服务，把 dist 提供给 puppeteer 截图
const http = require('http')
const fs = require('fs')
const path = require('path')

const DIST = path.resolve(__dirname, 'dist')
const PORT = 5173

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2'
}

const server = http.createServer((req, res) => {
  let url = req.url.split('?')[0]
  if (url === '/') url = '/index.html'
  const file = path.join(DIST, url)
  fs.readFile(file, (err, data) => {
    if (err) {
      // SPA fallback
      fs.readFile(path.join(DIST, 'index.html'), (e2, d2) => {
        if (e2) { res.writeHead(404); res.end('Not Found'); return }
        res.writeHead(200, { 'Content-Type': MIME['.html'] })
        res.end(d2)
      })
      return
    }
    const ext = path.extname(file).toLowerCase()
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
    res.end(data)
  })
})

server.listen(PORT, '0.0.0.0', () => {
  console.log('preview server on http://localhost:' + PORT)
})
