var request = require('supertest'),
    app = require('../app')

describe('comment routes', function () {

    it('get comment by id', function(done) {
        request(app)
            .get('/api/getcomment')  
            .query({id:1})
            . expect(200);
        done();
    });

    it('create comment', function(done) {
        request(app)
            .post('/api/postcomment')
            .send({
                recipeid : 1,
                rating : 3,
                review : 'review test'
            })
            .expect(200);
        done();
    });
});