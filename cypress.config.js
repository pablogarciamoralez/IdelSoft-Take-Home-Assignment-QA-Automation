const { defineConfig } = require("cypress");
const cypressTerminalReport = require("cypress-terminal-report");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://magento.softwaretestingboard.com",
    viewportHeight: 720,
    viewportWidth: 1280,
    pageLoadTimeout: 60000,
    defaultCommandTimeout: 10000,
    video: true,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 3,
      openMode: 0,
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
      timestamp: "mmddyyyy_HHMMss",
    },
    setupNodeEvents(on, config) {
      require('cypress-terminal-report/src/installLogsPrinter')(on),
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
  },
});
