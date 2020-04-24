const request = require('supertest');
const server = require("../api/server.js")

describe('server', function() {
    test('runs the tests', function() {
      expect(true).toBe(true);
    })
    describe('GET /', function() {
        it('should return 200 OK', function() {
         return request(server).get('/').then(res => {
           expect(res.status).toBe(200);
         })
        })
        it('should return 200 OK', function() {
            return request(server).get('/').then(res => {
              expect(res.body).toEqual({message: "Server up and running"});
            })
           })
    })
}) 