import React from 'react';
import ReactDOM from 'react-dom/client';
import { SplitFactoryProvider } from '@splitsoftware/splitio-react';
import './index.css';
import App from './App';
import sdkConfig from './sdkConfig';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /* `SplitFactoryProvider` component inits the SDK with the given config object.
   * The child component and all it's descendants will have access to the SDK functionality. */
  <SplitFactoryProvider config={sdkConfig} >
    <App />
  </SplitFactoryProvider>,
);
