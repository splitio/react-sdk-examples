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

  const treatment = useTreatments([feature_1]);

  const FeatureOne = (
    <div className="App-section">
      <h4>{`Split: ${feature_1}`}</h4>
      <p>{`Treatment value: ${treatment[feature_1].treatment}`}</p>
    </div>
  );

  const client = useClient('other_user');
  const { isReady, isTimedout } = useContext(SplitContext);

  const treatments = client.getTreatmentsWithConfig([feature_2, feature_3]);
  const OtherFeatures = (
    isReady ? (
      <div className="App-section">{
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
