import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        seedDatabase() {
          // Run your Node.js code
          // e.g., edit a file here
          // this code is triggered from within your tests
          // but it runs outside of the browser
        }
      })
    },
  },
});
