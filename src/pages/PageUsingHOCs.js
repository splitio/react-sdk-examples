import React from 'react';
import { withSplitClient, withSplitTreatments } from '@splitsoftware/splitio-react';
import { feature_flag_1, feature_flag_2, feature_flag_3 } from '../sdkConfig';

/* This example shows withSplitClient and withSplitTreatments HOCs */

function Loading({ splitKey }) {
  return <div>Loading SDK {splitKey ? `for split key "${splitKey}"` : ''}</div>
};

function Timedout({ splitKey }) {
  return <div>SDK timed out {splitKey ? `for split key "${splitKey}"` : ''} (check your SDK key)</div>
};

/* `withSplitTreatments` is a HOC for wrapping render functions inside an SplitTreatments.
 * As `SplitTreatments`, it passes down to a child function a `treatments` prop, which contains feature flag evaluations.
 * It also passes down the SDK status (`isReady`, `isTimedout`, `lastUpdate`) as props. You can use `isReady`
 * to conditionally render your component, for example, by showing a Loading label until the SDK is ready.
 * While the SDK is not ready, treatments values are `control`. */
const FeatureOne = withSplitTreatments([feature_flag_1])(
  ({ treatments, isReady }) => {
    return isReady ? (
      <div className='App-section'>
        <h4>{`Feature flag: ${feature_flag_1}`}</h4>
        <p>{`Treatment value: ${treatments[feature_flag_1].treatment}`}</p>
      </div>
    ) : <Loading />
  }
);

/* `withSplitClient` is a HOC for `SplitClient`. It changes the SDK client at the context, given a key and a
 * optional traffic type. Thus, the inner `SplitTreatments` components will evaluate feature flags for a different key */
const OtherFeatures = withSplitClient('other_user')(
  /* In the following piece of UI, we use the `isReady` prop as condition for
   * rendering a `Loading` component until the client with key `other_user` is ready */
  withSplitTreatments([feature_flag_2, feature_flag_3])(
    ({ treatments, isReady, isTimedout }) => {
      return isReady ? (
        <div className='App-section'>{
          Object.entries(treatments).map(([featureFlagName, treatment]) =>
            <div key={featureFlagName} >
              <h4>{`Feature flag: ${featureFlagName}`}</h4>
              <p>{`Treatment value: ${treatment.treatment}`}</p>
            </div>
          )
        }</div>
      ) :
        isTimedout ? <Timedout splitKey='other_user' /> : <Loading splitKey='other_user' />
    }
  ), false, true // updateOnSdkUpdate: false, updateOnSdkTimedout: true, updateOnSdkReady: true (default)
);

export default function PageUsingHOCs() {
  return (
    <main>
      <FeatureOne />
      <OtherFeatures />
    </main>
  );
};
