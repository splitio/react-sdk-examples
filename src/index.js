import React from 'react';
import ReactDOM from 'react-dom';
import { SplitFactoryProvider } from '@splitsoftware/splitio-react';
import './index.css';
import App from './App';
import sdkConfig from './sdkConfig';

ReactDOM.render(
  /* `SplitFactoryProvider` component inits the SDK with the given config object.
   * The child component and all it's descendants will have access to the SDK functionality.
   * When passing a function as a child, it receives the SDK factory and its status as props. */
  <SplitFactoryProvider config={sdkConfig} >
    <App />
  </SplitFactoryProvider>,
  document.getElementById('root')
);