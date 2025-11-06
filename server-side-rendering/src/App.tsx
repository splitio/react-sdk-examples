import './App.css'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { SplitFactoryProvider, useTreatment } from '@splitsoftware/splitio-react'

// Replace with your feature flag name
const FEATURE_FLAG_NAME = 'test_split';

function Loading() {
  return <div>Loading...</div>;
}

function MyComponentWithFlags() {
  const { isReady, isReadyFromCache, treatment, client } = useTreatment({ name: FEATURE_FLAG_NAME });

  return isReady || isReadyFromCache ? (
    <div>
      Treatment for feature flag <strong>{FEATURE_FLAG_NAME}</strong> and traffic key <strong>{(client as any).key}</strong> is <strong>{treatment}</strong>
    </div>
  ) : (
    <Loading />
  );
}

function App({ config }: { config: SplitIO.IBrowserSettings }) {
  const [count, setCount] = useState(0)

  return (
    <SplitFactoryProvider config={config}>
      <MyComponentWithFlags />
      <div>
        <a href='https://vite.dev' target='_blank'>
          <img src='/vite.svg' className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </SplitFactoryProvider>
  )
}

export default App
