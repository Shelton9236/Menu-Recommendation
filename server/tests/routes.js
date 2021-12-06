var request = require('supertest'),
    app = require('../app')
// cheerio = require('cheerio'),
// assert = require('assert');

describe('Index routes', function () {

    describe('GET app', function () {
        it("renders 200 status code", function (done) {
            request(app)
                .get('/')
                .expect(200);
            done();
        });
    });

    describe('Non-existing page', function () {
        it("renders 404 status code", function (done) {
            request(app)
                .get('/something-else')
                .expect(404);
            done();
        });
    });
});









