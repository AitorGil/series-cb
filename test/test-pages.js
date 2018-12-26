/*
  Test API calls
*/
var expect = require("chai").expect;
var request = require("request");
var fetch = require("node-fetch");
var server = require("../index");

const BASE_URL = "http://localhost:5000";

const testUser = {
  email: "prueba@codebreakers.com",
  password: "prueba123"
};

describe("Sign Up Users", () => {
  // Stop server after test
  after(done => server.close(done));

  it("Sign Up without user email and password", done => {
    const requestData = {
      headers: {
        "content-type": "application/json"
      },
      body: {
        user: testUser
      },
      method: "POST"
    };

    fetch(`${BASE_URL}/api/users`, requestData)
      .then(data => {
        return data.json();
      })
      .then(res => {
        expect(res.statusCode).to.equal(400);
        done();
      })
      .catch(err => {
        done();
      });

    // request.post(
    //   `${BASE_URL}/api/users`,
    //   { user: {} },
    //   (error, response, body) => {
    //     expect(response.statusCode).to.equal(422);
    //     //expect(body).to.equal("Hello World");
    //     done();
    //   }
    // );
  });

  /*it("Main page status", done => {
    request(`${BASE_URL}/api/users`, (error, response, body) => {
      expect(response.statusCode).to.equal(422);
      done();
    });
  });*/
});
