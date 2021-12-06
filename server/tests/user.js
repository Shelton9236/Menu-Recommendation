var request = require('supertest'),
    app = require('../app')

describe('user routes', function () {

    it("get user", function (done) {
        request(app)
            .get('/users')
            .expect('respond with a resource');
        done();
    });


    it('post userinfo', function (done) {
        request(app)
            .post('/api/suggestrecipe')
            .send({
                name: 'testuser' ,
                age: 25,
                height: 1.75,
                weight: 65,
                gender: 'male'
            })
            .expect(500)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    })
});