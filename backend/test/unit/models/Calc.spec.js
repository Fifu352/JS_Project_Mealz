const {expect} = require('chai')

describe('calcu', () => {
    beforeEach(() => {

            calc = require('../../../calc')
    })



    it('calcs correctly', () => {
        var result = calc(10, 10, 10)
        expect(result).to.equal(11)
    })

  it('calcs with 0', () => {
    var result = calc(10, 10, 0)
    expect(result).to.equal(10)
  })


})
