const { getTrue } = require('../src/funcs')

test('expect true', () => {
    expect(getTrue()).toBe(true)
})