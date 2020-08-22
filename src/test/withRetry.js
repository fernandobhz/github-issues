/* eslint-disable no-console */
/* eslint-disable func-names */
import { expect } from "chai";
import { withRetry } from "../helpers/withRetry";

describe("Teste hi order function withRetry", function () {
  this.timeout(10 * 1000);

  let numberOfRoundsBeforePass = 0;
  let currentIteration = 0;

  const emitError = async (name = "World") => {
    currentIteration += 1;
    if (currentIteration === numberOfRoundsBeforePass) return `Hello ${name}`;
    throw new Error("Try again");
  };

  let numberOfRoundsBeforePass2 = 0;
  let currentIteration2 = 0;

  const emitError2 = async (name = "World") => {
    currentIteration2 += 1;
    if (currentIteration2 === numberOfRoundsBeforePass2) return `Hello ${name}`;
    throw new Error("Try again");
  };

  let emitErrorWithRetry;
  let emitErrorWithRetry2;

  it("expect create the new function", function (done) {
    emitErrorWithRetry = withRetry(emitError, undefined, [1, 1, 1]);
    done();
  });

  it("expect create the new function2", function (done) {
    emitErrorWithRetry2 = withRetry(emitError2, undefined, [1, 1, 1]);
    done();
  });

  it("expect success with args - resolving after 1st round", function (done) {
    currentIteration = 0;
    numberOfRoundsBeforePass = 1;
    emitErrorWithRetry("Fernando").then(result => {
      expect(result).to.equal("Hello Fernando");
      done();
    });
  });

  it("expect success without args - resolving after 1st attempt", function (done) {
    currentIteration = 0;
    numberOfRoundsBeforePass = 1;
    emitErrorWithRetry().then(result => {
      expect(result).to.equal("Hello World");
      done();
    });
  });

  it("expect fail without args - resolving after 3rd attempt and rejecting on 5th round", function (done) {
    currentIteration = 0;
    numberOfRoundsBeforePass = 5;
    emitErrorWithRetry()
      .then(() => {
        done(new Error("Expecting promise rejection, but it was resolved"));
      })
      .catch(err => {
        expect(err.message).to.equal("Try again");
        done();
      });
  });

  it("expect success without args - resolving after 3rd attempt - two in parallel", function (done) {
    currentIteration = 0;
    numberOfRoundsBeforePass = 4;

    currentIteration2 = 0;
    numberOfRoundsBeforePass2 = 4;

    Promise.all([emitErrorWithRetry("1st"), emitErrorWithRetry2("2nd")]).then(results => {
      const [result, result2] = results;

      expect(result).to.equal("Hello 1st");
      expect(result2).to.equal("Hello 2nd");
      done();
    });
  });
});
