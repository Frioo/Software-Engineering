const functions = require('./TestFunctions');
test('Object assignment', () => {
    expect(functions.isExpressDefined()).toBeDefined();
    expect(functions.isPrismaDefined()).toBeDefined();
})