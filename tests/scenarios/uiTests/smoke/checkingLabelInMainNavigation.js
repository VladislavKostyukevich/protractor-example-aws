const pageHelpers = require('../../../helpers/pageHelpers');
const settings = require('../../../../settings');
const asserts = require('../../../helpers/asserts');
const homePage = require('../../../components/homePage');
const homePageConstants = require('../../../constants/homePageConstants');

describe('Smoke Tests', () => {
    it('Checking label in main navigation panel ', async () => {
        await pageHelpers.navigateToPage(settings.frontendLink);
        await asserts.assertEquals(await homePage.getTextOfKitchenPricing(), homePageConstants.MAIN_NAVIGATION.KITCHEN_PRICING);
    });
});

