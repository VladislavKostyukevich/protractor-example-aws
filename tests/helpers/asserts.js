const { expect } = require('chai');

const assertObjectsEquals = (exp, act) => {
    return new Promise((resolve, reject) => {
        if (expect(exp).to.deep.equal(act)) {
            resolve(`Actual value: ${act} equals expected: ${exp}`);
        } else {
            reject(`Actual value: does not ${act} equal expected: ${exp}`);
        }
    });
};

const assertEquals = async (exp, act) => {
    await assertObjectsEquals(exp, act);
};

module.exports = {
    assertEquals,
};
