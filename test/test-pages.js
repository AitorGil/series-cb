/*
  Test API calls
*/
var expect = require("chai").expect;
var chai = require("chai");
var chaiHttp = require("chai-http");

chai.use(chaiHttp);

let server;

const BASE_URL = "http://localhost:5000";

const requestBody = {
  user: {
    email: "prueba@codebreakers.com",
    password: "prueba123"
  }
};

describe("Sign Up Users", () => {
  let userToken;

  // Start server before test
  before(() => {
    server = require("../index");
  });

  // Stop server after test
  after(done => {
    process.kill(process.pid, "SIGTERM");
    done();
  });

  it("Sign Up User", done => {
    chai
      .request(server)
      .post("/api/users")
      .send(requestBody)
      .end((err, res) => {
        // There should be no errors
        expect(err).to.be.null;

        // There should be a 201 status code
        expect(res).to.have.status(201);

        // There should be an user object in response body
        expect(res.body).to.include.keys("user");

        // The user object must have at least "_id", "email" and "token"
        expect(res.body.user).to.include.keys("_id", "email", "token");

        done();
      });
  });

  it("Sign In User", done => {
    chai
      .request(server)
      .post("/api/users/login")
      .send(requestBody)
      .end((err, res) => {
        // There should be no errors
        expect(err).to.be.null;

        // There should be a 201 status code
        expect(res).to.have.status(200);

        // There should be an user object in response body
        expect(res.body).to.include.keys("user");

        // The user object must have at least "_id", "email" and "token"
        expect(res.body.user).to.include.keys("_id", "email", "token");

        userToken = res.body.user.token;

        done();
      });
  });

  it("Sign In User", done => {
    chai
      .request(server)
      .get("/api/users/me")
      .set("Authorization", `Token ${userToken}`)
      .end((err, res) => {
        // There should be no errors
        expect(err).to.be.null;

        // There should be a 201 status code
        expect(res).to.have.status(200);

        // There should be an user object in response body
        expect(res.body).to.include.keys("user");

        // The user object must have at least "_id", "email" and "token"
        expect(res.body.user).to.include.keys("_id", "email", "token");

        userToken = res.body.user.token;

        done();
      });
  });
});
