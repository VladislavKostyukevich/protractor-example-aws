/* eslint-disable no-undef */
const protractor = require('protractor');
let EC = protractor.ExpectedConditions;
const key = protractor.Key;
const timeoutConstants = require('../constants/timeoutConstants');
const defaultWaitOptions = require('../../settings').defaultWaitOptions;

const getElement = async (selector) => {
    if (selector.includes('//')) {
        return element(by.xpath(`${selector}`));
    } else {
        return $$(`${selector}`).first();
    }
};

const waitForSelector = async (selector, timeout = defaultWaitOptions) => {
    try {
        const element = await getElement(selector);
        await browser.wait(EC.presenceOf(element), timeout);
        await browser.wait(EC.visibilityOf(element), timeout);
    } catch (e) {
        throw new Error(`Timeout error: Element '${selector}' not found during ${timeout} seconds`);
    }
};

const getElements = async (selector) => {
    await waitForSelector(selector);
    return $$(selector);
};

const getElementsByXpath = async (selector) => {
    await waitForSelector(selector);
    return element.all(by.xpath(`${selector}`));
};

const getElementsWithoutWaiting = async (selector) => {
    return $$(selector);
};

const getElementsTextList = async (selector) => {
    await waitForSelector(selector);
    return $$(selector).getText();
};

const getElementsInnerTextList = async (selector) => {
    await waitForSelector(selector);
    return $$(selector).getAttribute('innerText');
};

const waitForSelectorAndClick = async (selector, timeout = defaultWaitOptions) => {
    const element = await getElement(selector);
    await waitForSelector(selector, timeout);
    await browser.wait(EC.elementToBeClickable(element), timeout)
        .then(element.click);
};

const waitForSelectorNotVisible = async (selector, timeout = defaultWaitOptions) => {
    const element = await getElement(selector);
    await browser.wait(EC.invisibilityOf(element), timeout);
};

const waitForSelectorAndType = async (selector, text, timeout = defaultWaitOptions) => {
    const element = await getElement(selector);
    await browser.wait(EC.presenceOf(element), timeout);
    element.sendKeys(text);
};

const waitForSelectorClearAndType = async (selector, text, timeout = defaultWaitOptions) => {
    const element = await getElement(selector);
    await browser.wait(EC.presenceOf(element), timeout);
    element.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'));
    element.sendKeys(key.DELETE);
    await element.sendKeys(text);
};

const isVisible = async (selector) => {
    try {
        const element = await getElement(selector);
        await browser.wait(EC.presenceOf(element), timeoutConstants.TIMEOUTS.MAX);
        await browser.wait(EC.visibilityOf(element), timeoutConstants.TIMEOUTS.MEDIUM);
        return true;
    } catch (e) {
        return false;
    }
};

const isVisibleByWebElement = async (webElement) => {
    try {
        await browser.wait(EC.presenceOf(webElement), timeoutConstants.TIMEOUTS.MAX);
        await browser.wait(EC.visibilityOf(webElement), timeoutConstants.TIMEOUTS.MEDIUM);
        return true;
    } catch (e) {
        return false;
    }
};

const isPresent = async (selector) => {
    try {
        const element = await getElement(selector);
        await browser.wait(EC.presenceOf(element), timeoutConstants.TIMEOUTS.MAX);
        return true;
    } catch (e) {
        return false;
    }
};

const getElementText = async (selector, options = {}) => {
    await waitForSelector(selector, defaultWaitOptions);
    const element = await getElement(selector);
    if (options.innerText) {
        return element.getAttribute('innerText');
    } else if (options.innerHTML) {
        return element.getAttribute('innerHTML');
    }
    return element.getText();
};

const getElementValue = async (selector) => {
    const elem = await getElement(selector);
    return elem.getAttribute('value');
};

const clickViaJS = async (selector) => {
    const elm = await getElement(selector);
    await browser.executeScript('arguments[0].click();', elm.getWebElement());
};

const wait = async (timeout) => {
    return browser.sleep(timeout);
};

const navigateToPage = async (link) => {
    return browser.get(link);
};

const getConsoleLogs = async () => {
    return browser.manage().logs().get('browser');
};

const turnOffAlerts = async () => {
    await browser.executeScript('window.onbeforeunload = ()=>{}');
};

const blur = async (position = { x: 1000, y: 900 }) => {
    const canvasLocator = '#active';
    await browser.wait(EC.visibilityOf($(canvasLocator)), 5000)
        .then(async () => {
            await browser.executeScript(mouseDown, canvasLocator, { point: { x: position.x, y: position.y } });
            await browser.executeScript(mouseUp, { point: { x: position.x, y: position.y } });
            await wait(timeoutConstants.TIMEOUTS.MEDIUM);
        });
};

const reloadPage = async () => {
    return browser.driver.navigate().refresh();
};

const selectOption = (selectLocator,typeName) => {
    $(selectLocator).element(By.cssContainingText('option', typeName)).click();
};

const closePrevTab = async () => {
    await browser.getAllWindowHandles().then(async (handles) => {
        await browser.driver.switchTo().window(handles[0]);
        await browser.driver.close();
    });
    await browser.getAllWindowHandles().then(async (handles) => {
        await browser.driver.switchTo().window(handles[0]);
    });
};

const goToTheNewTab = async () => {
    await browser.getAllWindowHandles().then(async (handles) => {
        let numberOfHandles = handles.length;
        for await (let window of handles) {
            if (window !== handles[numberOfHandles - 1]) {
                await browser.switchTo().window(window);
                await browser.close();
            }
        }
    });
    await browser.getAllWindowHandles().then(async (handles) => {
        await browser.driver.switchTo().window(handles[0]);
    });
};

module.exports = {
    closePrevTab,
    selectOption,
    reloadPage,
    navigateToPage,
    clickViaJS,
    wait,
    waitForSelectorAndClick,
    waitForSelector,
    waitForSelectorAndType,
    isVisible,
    blur,
    getElementText,
    getElementValue,
    waitForSelectorNotVisible,
    getConsoleLogs,
    turnOffAlerts,
    getElementsTextList,
    getElementsInnerTextList,
    getElements,
    isPresent,
    goToTheNewTab,
    getElementsWithoutWaiting,
    waitForSelectorClearAndType,
    getElementsByXpath,
    isVisibleByWebElement,
};
