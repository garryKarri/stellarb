// import { defineConfig } from 'cypress';

// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });

import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack'
    }
  },

  e2e: {
    baseUrl: process.env.BASE_URL,
    setupNodeEvents(on, config) {}
  }
});
