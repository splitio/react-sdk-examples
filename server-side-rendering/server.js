import fs from 'node:fs/promises'
import express from 'express'
import { SplitFactory } from '@splitsoftware/splitio';

// Replace with your SDK keys
export const SERVER_SIDE_SDK_KEY = '<your-server-side-sdk-key>';
export const CLIENT_SIDE_SDK_KEY = '<your-client-side-sdk-key>';

export const factory = SplitFactory({
  core: {
    authorizationKey: SERVER_SIDE_SDK_KEY,
  },
  debug: true,
});

const client = factory.client();
await client.ready();

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''

// Create http server
const app = express()

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

// Serve HTML
app.use('/ssr', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')


    /** @type {string} */
    let template
    /** @type {import('./src/entry-server.ts').render} */
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render
    }

    const trafficKey = req.query.trafficKey || 'anonymous';
    const SDK_CONFIG = {
      core: {
        key: trafficKey,
        authorizationKey: CLIENT_SIDE_SDK_KEY
      },
      initialRolloutPlan: factory.getRolloutPlan({ keys: [trafficKey] })
    };
    const rendered = await render(url, SDK_CONFIG)

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')
      .replace(`<!--sdk-config-->`, rendered.html_sdk_config ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
