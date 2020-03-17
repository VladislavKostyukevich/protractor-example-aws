/* eslint-disable no-undef */
const settings = require('./settings');
const suiteSetting = require('./suiteSettings');
const AqualityReporter = require('@aquality-automation/aquality-tracking-reporter-jasmine');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'jasmine',
    multiCapabilities: [
        {
            'shardTestFiles': true,
            'enableVNC':true,
            'browserName': settings.browser,
            'moz:firefoxOptions': {
                args: ['--headless'],
            },
            'goog:chromeOptions': {
                args: [
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
    localSeleniumStandaloneOpts: {
        loopback: true
    },
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
        const aqualityReporter = new AqualityReporter({
            token: browser.params.token,
            api_url: 'http://46.243.183.199:8888/api',
            project_id: 2,
            testrun_id: browser.params.testrun_id
        })
        jasmine.getEnv().addReporter(aqualityReporter);
    },
    afterEach: async () => {
        await browser.driver.close();
        await browser.driver.close();
    },
};
