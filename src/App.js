import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import splitioFactory from '@splitsoftware/splitio';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSdkReady: false,
      treatmentTestSplit: 'control',
      treatmentTestAnotherSplit: 'control',
      treatmentTestSomethingElse: 'control',
    };
  }

  componentDidMount() {
    // note that we are using for this hello world app the off-the-grid mode
    // on authorizationKey replace with your api key
    // features object is used only for off-the-grid mode
    const config = {
      core: {
        authorizationKey: 'localhost'
      },
      features: {
        'Test_Split': 'on',
        'Test_Another_Split': 'dark',
        'Test_Something_Else': 'off'
      }
    };

    const sdkFactory = splitioFactory(config)
    const sdkClient = sdkFactory.client();

    // we need to wait the sdk to finish loading and then we can retrieve the
    // treatments for each split
    // http://docs.split.io/docs/javascript-sdk-overview#section-how-to-reflect-sdk-updates-in-your-app
    sdkClient.on(sdkClient.SDK_READY, () => {
      this.setState({
        // we set the is ready flag to true
        isSdkReady: true,
        // retr
        treatmentTestSplit: sdkClient.getTreatment('Test_Split'),
        treatmentTestAnotherSplit: sdkClient.getTreatment('Test_Another_Split'),
        treatmentTestSomethingElse: sdkClient.getTreatment('Test_Something_Else'),
      });
    });

    sdkClient.on(sdkClient.SDK_UPDATE, () => {
      // we could evaluate again the sdk if there was any change
    });
  }

  render() {
    const {
      treatmentTestSplit,
      treatmentTestAnotherSplit,
      treatmentTestSomethingElse,
      isSdkReady
    } = this.state;

    // we only want to show something when the sdk is ready to use
    if (!isSdkReady) {
      return null;
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Split JS SDK Hello World!</h2>
        </div>
        <div className="App-section">
          Split <strong>Test_Split</strong> return treatment <strong>{treatmentTestSplit}</strong>
        </div>
        <div className="App-section">
          Split <strong>Test_Another_Split</strong> return treatment <strong>{treatmentTestAnotherSplit}</strong>
        </div>
        <div className="App-section">
          Split <strong>Test_Something_Else</strong> return treatment <strong>{treatmentTestSomethingElse}</strong>
        </div>
      </div>
    );
  }
}

export default App;
