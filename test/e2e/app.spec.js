/* eslint-disable */
const express = require("express");
//const expect = require("chai").expect;
const chai = require("chai")
const expect = chai.expect;
const should = chai.should();
const path = require("path");
const Nightmare = require("nightmare");

const app = express();

app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "../../dist")));

const url = "http://localhost:8888";

const nightmare = new Nightmare();

describe("End to End Tests", () => {
  let httpServer = null;
  let pageObject = null;

  before(done => {
    httpServer = app.listen(8888);
    done();
  });

  beforeEach(() => {
    pageObject = nightmare.goto(url);
  });

  after(done => {
    httpServer.close();
    done();
  });

  // This is where your code is going to go
  it("should contain a <h1> element for the page title", function() {
    this.timeout(3000)
    return pageObject
      .evaluate(() => document.querySelector("h1").innerText)
      .then(headerText => {
        expect(headerText).to.not.be.null;
        expect(headerText).to.equal("Mortgage Calculator");
      });
  });

  it("should have 3 input elements", function() {
    return pageObject
      .evaluate(() => document.querySelectorAll('input').length)
      .then(length => {
        expect(length).to.equal(3)
      });
  });

  it("should contain an input element named 'principal'", function() {
    return pageObject
      .evaluate(() => document.getElementsByName("principal").item(0))
      .then(principal => {
        should.exist(principal)
      });
  });

  it("should contain an input element named 'interestRate'", function() {
    return pageObject
      .evaluate(() => document.getElementsByName("interestRate").item(0))
      .then(ir => {
        should.exist(ir)
      });
  });

  it("should contain an input element named 'loanTerm'", function() {
    return pageObject
      .evaluate(() => document.getElementsByName("loanTerm").item(0))
      .then(lt => {
        should.exist(lt)
      });
  });

  it("should contain an input element named 'period'", function() {
    return pageObject
      .evaluate(() => document.getElementsByName("period").item(0))
      .then(period => {
        should.exist(period)
      });
  });

  it("should have a button with an id of 'calculate'", function() {
    return pageObject
      .evaluate(() => document.getElementById("calculate"))
      .then((btn) => {
        should.exist(btn)
      });
  });

  it("should correctly calculate mortgage", () =>
    pageObject
      .wait()
      .type("input[name=principal]", 300000)
      .type("input[name=interestRate]", 3.75)
      .type("input[name=loanTerm]", 30)
      .select("select[name=period]", 12)
      .click("button#calculate")
      .wait("#output")
      .evaluate(() => document.querySelector("#output").innerText)
      .then(outputText => {
        expect(outputText).to.equal("$1389");
      })).timeout(6500);
});
