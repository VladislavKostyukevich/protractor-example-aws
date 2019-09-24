const browser = process.env.DEFAULT_BROWSER ? process.env.DEFAULT_BROWSER : 'chrome';

module.exports = {
    viewPort: browser === 'chrome' ? { width: 1910, height: 897 } : { width: 1920, height: 975 },
    frontendLink: 'https://www.wrenkitchens.com/',
    defaultWaitOptions: 40000,
    jasmineTimeout: 420000,
    browser,
};
