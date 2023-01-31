import React, { useContext } from 'react';
import { useClient, useTreatments, SplitContext } from '@splitsoftware/splitio-react';
import { feature_1, feature_2, feature_3 } from '../sdkConfig';

/* This example shows useClient and useTreatments hooks */

function Loading() {
  return <div>Loading SDK...</div>
}

function Timedout() {
  return (<div>SDK timed out (check your API key)</div>);
};

export default function PageUsingHooks() {

  /* `useContext(SplitContext)` lets you access the SDK status (`isReady`, `isTimedout`, `lastUpdate`) when using hooks,
   * to conditionally render your components, for example, showing a Loading label until the SDK is ready. */
  const { isReady, isTimedout } = useContext(SplitContext);

  /* `useTreatments` returns the evaluated treatments of the given list of split names.
   * While the SDK is not ready, treatments values are `control`. */
  const treatment = useTreatments([feature_1]);

  const FeatureOne = isReady ? (
    <div className='App-section'>
      <h4>{`Split: ${feature_1}`}</h4>
      <p>{`Treatment value: ${treatment[feature_1].treatment}`}</p>
    </div>
  ) : <Loading />;

  /* `useClient` returns an SDK client with a given optional user key and traffic type.
   * If key is not provided, it returns the client at SplitContext. */
  const client = useClient('other_user');
  const treatments = client.getTreatmentsWithConfig([feature_2, feature_3]);
  const OtherFeatures = (
    isReady ? (
      <div className='App-section'>{
        Object.entries(treatments).map(([splitName, treatment]) =>
          <div key={splitName} >
            <h4>{`Split: ${splitName}`}</h4>
            <p>{`Treatment value: ${treatment.treatment}`}</p>
          </div>
        )
      }</div>
    ) :
      isTimedout ? <Timedout /> : <Loading />
  );

  return (
    <main>
      {FeatureOne}
      {OtherFeatures}
    </main>
  )
};
