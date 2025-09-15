import './index.css'
import { hydrateRoot } from 'react-dom/client'
import App from './App'

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <App config={window.SDK_CONFIG} />
)
