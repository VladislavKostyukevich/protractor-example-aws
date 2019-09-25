const pageHelpers = require('../../../helpers/pageHelpers');
const settings = require('../../../../settings');
const asserts = require('../../../helpers/asserts');
const homePage = require('../../../components/homePage');
const homePageConstants = require('../../../constants/homePageConstants');

describe('Suite 8:', () => {
    it('Checking label in main navigation panel', async () => {
        await pageHelpers.navigateToPage(settings.frontendLink);
        await asserts.assertEquals(await homePage.getTextOfKitchenPricing(), homePageConstants.MAIN_NAVIGATION.KITCHEN_PRICING);
    });

    describe('Suite 8.1:', () => {
        it('Checking label in main navigation panel 2', async () => {
            await pageHelpers.navigateToPage(settings.frontendLink);
            await asserts.assertEquals(await homePage.getTextOfKitchenPricing(), homePageConstants.MAIN_NAVIGATION.KITCHEN_PRICING);
        });

        it('Pending Test', () => {
            pending();
        });

        it('Failed Test', () => {
            return asserts.assertEquals('This value', 'That value');
        });

        xit('Excluded', () => {
            asserts.assertEquals('This value', 'This value');
        });
    });
});

