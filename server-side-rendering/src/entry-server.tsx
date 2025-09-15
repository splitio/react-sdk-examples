import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

export function render(_url: string, sdkConfig: SplitIO.IBrowserSettings) {
  const html = renderToString(
    <App config={sdkConfig} />
  )
  return {
    html,
    html_sdk_config: `<script>window.SDK_CONFIG = ${JSON.stringify(sdkConfig).replace(/</g, '\\u003c')}</script>`
  }
}
