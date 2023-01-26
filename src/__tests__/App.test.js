/**
 * If you're looking for how to test with Split SDK, you can use the localhost (offline) mode of the SDK (see https://help.split.io/hc/en-us/articles/360038825091-React-SDK#localhost-mode)
 * which is what we're doing here.
 *
 * It is not recommended to use the default (online) mode of the SDK in your tests because that will slow them down and increase their flakiness due to network latencies.
 */

import React from "react";
import { render, waitFor, getByText } from "@testing-library/react";
import { SplitFactory, SplitTreatments } from "@splitsoftware/splitio-react";

const config = {
  core: {
    authorizationKey: "localhost",
    key: "default",
  },
  features: {
    "test-feature-on": "on",
    "test-feature-off": "off",
  },
  storage: {
    type: "LOCALSTORAGE",
  }
};

const ExampleSplitComponent = ({ splits }) => {
  return splits.map(split => {
    return (
      <SplitTreatments names={[split]} key={split}>
        {(props) => {
          return props.isReady ?
            <div>SDK ready. Split {split} is {props.treatments[split].treatment}</div> :
            <div>SDK not ready. Split {split} is {props.treatments[split].treatment}</div>;
        }}
      </SplitTreatments>
    );
  });
};

test("renders the correct text and updates the count", async () => {
  const { container } = render(
    <SplitFactory config={config}>
      <ExampleSplitComponent splits={["test-feature-on", "test-feature-off"]} />
    </SplitFactory>
  );

  // On the initial rendered output, the SDK is not ready. So treatment values are control.
  expect(getByText(container, "SDK not ready. Split test-feature-on is control")).toBeTruthy();
  expect(getByText(container, "SDK not ready. Split test-feature-off is control")).toBeTruthy();

  // Since we run the SDK in localhost mode, on next tick the SDK is ready and the component re-rendered with the mocked treatment.
  // We uses waitFor (https://testing-library.com/docs/dom-testing-library/api-async/#waitfor) to wait for the component to update.
  const [featureOn, featureOff] = await waitFor(
    () => [
      getByText(container, "SDK ready. Split test-feature-on is on"),
      getByText(container, "SDK ready. Split test-feature-off is off"),
    ],
    { container }
  );

  expect(featureOn).toBeTruthy();
  expect(featureOff).toBeTruthy();
});
