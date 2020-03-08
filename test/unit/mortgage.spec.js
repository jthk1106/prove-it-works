/* eslint-disable */
const expect = require("chai").expect;
const Mortgage = require("../../src/js/lib/Mortgage");

describe("Mortgage Calculator", () => {
  let mortgage = null;

  beforeEach(() => {
    mortgage = new Mortgage(500000, 3.5, 30, 12);
  });

  it("should have a monthlyPayment function", () => {
    expect(mortgage.monthlyPayment).to.exist;
  });

  it("should construct with interest passed as 3.5", () => {
    expect(mortgage.interest).to.equal(3.5);
  });

  it("should construct with 500000 as the principal", () => {
    expect(mortgage.principal).to.equal(500000);
  });

  it("should calculate correct monthly mortgage amount", () => {
    expect(mortgage.monthlyPayment()).to.equal(2245);
  });
});
