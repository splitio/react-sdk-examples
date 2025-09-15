# Split React SDK: Server-Side Rendering Example

This is a basic server-side rendering example that demonstrate the use of [Split SDK for React](https://github.com/splitio/react-client).

This project was bootstrapped with [Vite](https://vite.dev/).

## Running the example

Follow these steps to run the example app:

- Install dependencies

```bash
npm install
```

- Update the `SERVER_SIDE_SDK_KEY` and `CLIENT_SIDE_SDK_KEY` constants in `server.js` file to use yours. SDK keys are available on the Harness FME user interface, in your *Admin Settings* page, under the *API keys* tab and the *SDK API keys* sub-tab. Choose one of type `client-side` and `server-side` for the same environment.
The [`client-side` key is for the React SDK](https://developer.harness.io/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/react-sdk#2-instantiate-the-sdk-and-create-a-new-sdk-factory-client) that will run on the browser, and the [`server-side` key is for the Node.js SDK](https://developer.harness.io/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/react-sdk#2-instantiate-the-sdk-and-create-a-new-sdk-factory-client) used to retrieve the rollout plan that bootstraps the React SDK instance.

- Update the value of `FEATURE_FLAG_NAME` constant in `src/App.tsx` with the name of your feature flag.

- Start the app by running:

```bash
npm run dev
```

- Validate opening `http://localhost:5173/ssr?trafficKey=anonymous` in your web browser. This will show the feature flag value for the `anonymous` traffic key.
