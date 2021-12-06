var request = require('supertest'),
    app = require('../app')

describe('Recipe routes', function () {
    // create recipe
    it('user creates a recipe', function(done) {
        request(app)
            .post('/api/usercreate/postrecipe')
            .send({
                username: 'user1',
                recipename: 'tomato egg',
                description: 'a dish',
                minutes: 40,
                nstep: 3,
                ningredient: 4,
                step: 2,
                ingredient: 'egg'
            })
            .expect(200);
        done();
    });


    it('creates a favorite recipe', function(done) {
        request(app)
            .post('/api/dashboard/postfavorite')
            .send({
                username: 'user2',
                recipeid: 9999
            })
            .expect(200);
        done();
    });

    // get list and one of recipe 
    it('gets all usercreate recipes', function(done) {
        request(app)
            .get('/api/usercreate/listrecipe/')
            .query({user_name:'user1'})
            .expect(200);
        done();
    });

    it('gets all favorite recipes', function(done) {
        const user_name = 'user4';
        request(app)
            .get('/api/dashboard/listfavorite')
            .query({user_name:'user2'})
            .expect(200);
        done();
    });

    // 仍需要空tag的测试
    it('get frontpage recipes', function(done) {
        request(app)
            .get('/api/frontpage')
            .query({tag:'lunch'})
            .expect(200);
        done();
    });

    it('gets a recipe by id', function(done) {
        request(app)
            .get('/api/singlerecipe')
            .query({id:1})
            .expect(200);
        done();
    });

    it('gets a user create recipe by id', function(done) {
        const id = 1;
        request(app)
            .get('/api/usercreate/singlerecipe')
            .query({id:1})
            .expect(200);
        done();
    });
});

