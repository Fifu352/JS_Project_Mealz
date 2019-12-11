const { expect } = require('chai')

class Calc {
  constructor(mem) {
    this.mem = mem || 0
  }

  sum(a, b) {
    this.mem += a + b

    return this.mem
  }

  flush() {
    this.mem = 0

    return this.mem
  }
}

describe('Calc class', () => {
  context('mem / acc', () => {
    it('has a mem getter', () => {
      var calc = new Calc
      expect(calc.mem).to.equal(0)
    })

    it('can set initial value of mem', () => {
      var calc = new Calc(5)
      expect(calc.mem).to.equal(5)
    })

    context('has a memory feature', () => {
      it('has a sum function', () => {
        var calc = new Calc
        expect(calc.sum(2, 3)).to.equal(5)
        expect(calc.sum(2, 3)).to.equal(10)
      })

      it('has a flush function', () => {
        var calc = new Calc
        expect(calc.sum(2, 3)).to.equal(5)
        expect(calc.sum(2, 3)).to.equal(10)
        expect(calc.mem).to.equal(10)
        expect(calc.flush()).to.equal(0)
        expect(calc.mem).to.equal(0)
        expect(calc.sum(2, 3)).to.equal(5)
      })
    })
  })

  it('has a sum function', () => {
    var calc = new Calc
    expect(calc.sum(2, 3)).to.equal(5)
  })
})
