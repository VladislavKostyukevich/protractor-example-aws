const pageHelpers = require('../helpers/pageHelpers');

const selectors = {
    kitchenPricing: '#nav-kitchen-pricing',
};

const getTextOfKitchenPricing = async () => {
    return pageHelpers.getElementText(selectors.kitchenPricing);
};

module.exports = {
    getTextOfKitchenPricing,
};

