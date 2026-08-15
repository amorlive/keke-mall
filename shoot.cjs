// shoot-all.cjs — 启动静态服务 + 截图 + 关闭
const http = require('http')
const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer-core')

const DIST = path.resolve(__dirname, 'dist')
const SHOTS = path.resolve(__dirname, 'screenshots')
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const PORT = 5173

if (!fs.existsSync(SHOTS)) fs.mkdirSync(SHOTS, { recursive: true })

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
  ['01-home',          '/#/'],
  ['02-category',      '/#/category'],
  ['03-goods-list',    '/#/goods/list'],
  ['04-goods-detail',  '/#/goods/1'],
  ['05-cart',          '/#/cart'],
  ['06-user',          '/#/user'],
  ['07-group-list',    '/#/group/list'],
  ['08-group-detail',  '/#/group/detail/g1'],
  ['09-jielong-list',  '/#/jielong/list'],
  ['10-jielong-detail','/#/jielong/detail/j1'],
  ['11-jielong-create','/#/jielong/create'],
  ['12-user-orders',   '/#/user/orders'],
  ['13-user-vip',      '/#/user/vip'],
  ['14-distribution',  '/#/user/distribution'],
  ['15-dist-poster',   '/#/user/distribution/poster'],
  ['16-login',         '/#/login']
]

async function shootOne(browser, name, url) {
  const page = await browser.newPage()
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
  let errMsg = ''
  page.on('pageerror', e => { errMsg += '[pageerror] ' + e.message + ' ' })
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 })
    // 等待 app 内容出现
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
    const size = fs.statSync(out).size
    console.log('  OK', name, size + 'b', errMsg ? '[' + errMsg + ']' : '')
  } catch (e) {
    console.log('  FAIL', name, e.message)
  }
  await page.close()
}

;(async () => {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r))
  console.log('server up on', PORT)
  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--disable-dev-shm-usage']
  })
  for (const [name, p] of pages) {
    const url = 'http://127.0.0.1:' + PORT + p
    console.log('>>>', name, url)
    await shootOne(browser, name, url)
  }
  await browser.close()
  server.close()
  console.log('done')
})().catch(e => { console.error(e); process.exit(1) })
