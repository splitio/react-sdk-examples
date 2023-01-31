// Your SDK settings for browser.
// Replace authorizationKey with your api browser key.
const config = {
  core: {
    authorizationKey: 'd4g4sfp0mfp78281ju1cmuitl0udu0oft1bu',
    key: 'splitKey',
  },
  urls: {
    sdk: 'https://sdk.split-stage.io/api',
    events: 'https://events.split-stage.io/api',
    auth: 'https://auth.split-stage.io/api',
  },
};

export default config;

// Replace the following with the name of your splits
export const feature_1 = 'test_split';
export const feature_2 = 'test_another_split';
export const feature_3 = 'test_something_else';
