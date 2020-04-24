const request = require("supertest");
const db = require("../data/dbConfig");

const authRouter = require("./auth-router");

describe("server", function () {
    describe("POST /", function () {
      it("should return 201 OK", function () {
        // make a GET request to / endpoint on the server
        return request(authRouter) // return the async call to let jest know it should wait
          .get("/")
          .then(res => {
            // assert that the HTTP status code is 200
            expect(res.status).toBe(201);
          });
      });
    });
});