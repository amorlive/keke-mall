// shoot-admin.cjs — 截后台管理页面
const http = require('http')
const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer-core')

const DIST = path.resolve(__dirname, 'dist')
const SHOTS = path.resolve(__dirname, 'screenshots')
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const PORT = 5174

if (!fs.existsSync(SHOTS)) fs.mkdirSync(SHOTS, { recursive: true })

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
}

const server = http.createServer((req, res) => {
  let url = req.url.split('?')[0]
  if (url === '/') url = '/index.html'
  const file = path.join(DIST, url)
  fs.readFile(file, (err, data) => {
    if (err) {
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

const pages = [
  ['17-admin-dashboard', '/#/admin/dashboard', 1280, 800],
  ['18-admin-goods',     '/#/admin/goods',     1280, 800],
  ['19-admin-orders',    '/#/admin/orders',    1280, 800],
  ['20-admin-group',     '/#/admin/group',     1280, 800],
  ['21-admin-jielong',   '/#/admin/jielong',   1280, 800],
  ['22-admin-marketing', '/#/admin/marketing', 1280, 800],
  ['23-admin-settings',  '/#/admin/settings',  1280, 800]
]

async function shootOne(browser, name, url, w, h) {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 })
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 })
    try {
      await page.waitForFunction(
        () => {
          const app = document.getElementById('app')
          return app && app.children.length > 0 && !app.querySelector('.app-loading')
        },
        { timeout: 8000 }
      )
    } catch (_) {}
    await new Promise(r => setTimeout(r, 1500))
    const out = path.join(SHOTS, name + '.png')
    await page.screenshot({ path: out, fullPage: false })
    console.log('  OK', name, fs.statSync(out).size + 'b')
  } catch (e) {
    console.log('  FAIL', name, e.message)
  }
  await page.close()
}

;(async () => {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r))
  console.log('admin server up on', PORT)
  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--disable-dev-shm-usage']
  })
  for (const [name, p, w, h] of pages) {
    const url = 'http://127.0.0.1:' + PORT + p
    console.log('>>>', name, url)
    await shootOne(browser, name, url, w, h)
  }
  await browser.close()
  server.close()
  console.log('admin done')
})().catch(e => { console.error(e); process.exit(1) })
