/* eslint-disable no-undef */
const settings = require('./settings');
const suiteSetting = require('./suiteSettings');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
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
        var AqualityReporter = require('./aqualityReporter');
        jasmine.getEnv().addReporter(new AqualityReporter({ 
            suiteName: 'All Tests',
            execution_environment: 'chrome aws',
            token: '13a3be61-fc6c-49a2-a424-2b53863dc0531569331863981',
            apiURL: 'http://ec2-13-58-66-65.us-east-2.compute.amazonaws.com:8888/api',
            project_id: 2 
        }));
    },
    afterEach: async () => {
        await browser.driver.close();
    },
};
