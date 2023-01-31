/**
 * If you're looking for how to test with Split SDK, you can use the localhost (offline) mode of the SDK (see https://help.split.io/hc/en-us/articles/360038825091-React-SDK#localhost-mode)
 * which is what we're doing here.
 *
 * It is not recommended to use the default (online) mode of the SDK in your tests because that will slow them down and increase their flakiness due to network latencies.
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { SplitFactory, SplitTreatments } from '@splitsoftware/splitio-react';

const config = {
  core: {
    authorizationKey: 'localhost',
    key: 'default',
  },
  features: {
    'test-feature-on': 'on', // example with just a string value for the treatment
    'test-feature-off': { treatment: 'off', config: '{ "color": "blue" }' }, //example of a defined config
  }
};

const ExampleSplitComponent = ({ splits }) => {
  return splits.map((split, index) => {
    return (
      <div key={index}>
        <SplitTreatments names={[split]}>
          {({ isReady, treatments }) => {
            return <div>{isReady ? 'SDK ready.' : 'SDK not ready.'} Split {split} is {treatments[split].treatment}</div>
          }}
        </SplitTreatments>
      </div>
    );
  });
};

describe('ExampleSplitComponent', () => {
  test('renders the correct treatment', async () => {
    const { getByText, findByText } = render(
      <SplitFactory config={config}>
        <ExampleSplitComponent splits={['test-feature-on', 'test-feature-off']} />
      </SplitFactory>
    );

    // On the initial rendered output, the SDK is not ready. So treatment values are control.
    expect(getByText('SDK not ready. Split test-feature-on is control')).toBeTruthy();
    expect(getByText('SDK not ready. Split test-feature-off is control')).toBeTruthy();

    // In localhost mode, the SDK is ready and the component re-rendered with the mocked treatment on next event-loop tick.
    // So we use `findByText` to wait for the component to update.
    expect(await findByText('SDK ready. Split test-feature-on is on')).toBeTruthy();
    expect(await findByText('SDK ready. Split test-feature-off is off')).toBeTruthy();

    // `waitFor` (https://testing-library.com/docs/dom-testing-library/api-async/#waitfor) can also be used:
    const [featureOn, featureOff] = await waitFor(
      () => [
        getByText('SDK ready. Split test-feature-on is on'),
        getByText('SDK ready. Split test-feature-off is off'),
      ]
    );
    expect(featureOn).toBeTruthy();
    expect(featureOff).toBeTruthy();
  });
});
