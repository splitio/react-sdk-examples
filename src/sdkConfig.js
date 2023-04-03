// Your SDK settings for browser.
// Replace authorizationKey with your client-side API key.
const config = {
  core: {
    authorizationKey: '<your-api-key>',
    key: '<customer-key>'
  }
};

export default config;

// Replace the following with the name of your splits
export const feature_1 = 'test_split';
export const feature_2 = 'test_another_split';
export const feature_3 = 'test_something_else';
