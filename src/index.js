import React from 'react';
import ReactDOM from 'react-dom';
import { SplitFactory } from '@splitsoftware/splitio-react';
import './index.css';
import App from './App';
import sdkConfig from './sdkConfig';

ReactDOM.render(
  /* SplitFactory component inits the SDK with the given config object.
   * App component and all it's descendants will have access to the SDK functionality. */
  <SplitFactory config={sdkConfig}>
    <App />
  </SplitFactory>,
  document.getElementById('root')
);