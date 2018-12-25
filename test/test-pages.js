var expect = require("chai").expect;
var request = require("request");
var server = require("../index");

const BASE_URL = "http://localhost:5000";

describe("Status and content", () => {
  // Stop server after test
  after(done => server.close(done));

  it("Main page content", done => {
    request(BASE_URL, (error, response, body) => {
      expect(body).to.equal("Hello World");
      done();
    });
  });

  it("Main page status", done => {
    request(BASE_URL, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});
