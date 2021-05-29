const chai = require('chai')
const expect = chai.expect

const validator = require('../app_server/controllers/lessons.js')

describe("validator isNumValid()", () => {
  it("should return something something", () => {
    expect(validator.isNumValid(39)).to.be.true
  })

})
