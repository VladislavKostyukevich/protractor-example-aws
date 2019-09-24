/* eslint-disable no-undef */
const settings = require('./settings');
const suiteSetting = require('./suiteSettings');

exports.config = {
    framework: 'jasmine',
    multiCapabilities: [
        {
            'shardTestFiles': true,
            'browserName': settings.browser,
            'moz:firefoxOptions': {
                args: ['--headless'],
            },
            'goog:chromeOptions': {
                args: [
                    '--headless', 
                    '--disable-gpu', 
                    '--no-sandbox', 
                    '--disable-extensions',
                    '--disable-dev-shm-usage', 
                    '--disable-infobars', 
                    '--window-size=1366,768'
                ],
            },
        },
    ],
    suites: [
        suiteSetting.suite,
    ],
    jasmineNodeOpts: {
        defaultTimeoutInterval: settings.jasmineTimeout,
        isVerbose: false,
        includeStackTrace: true,
        realtimeFailure: false,
    },
    onPrepare: async () => {
        await browser.waitForAngularEnabled(false);
        await browser.driver.manage().window().maximize();
    },
    afterEach: async () => {
        await browser.driver.close();
    },
};
