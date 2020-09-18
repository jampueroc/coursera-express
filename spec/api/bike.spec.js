/**
const Bike = require('../../models/bike');
const request = require('supertest');
require('../../bin/www');


describe('check single instance', function (){
    beforeEach(function () {
        Bike.allBikes = [];

    });

    it('[GET] api/bikes', function (){
        return request('http://localhost:3000')
            .get('/api/bikes')
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('[POST] api/bikes/create', function (){
        return request('http://localhost:3000')
            .post('/api/bikes/create')
            .send({id: 'id', color: 'red', model: 'pistera', location: [0, 0]})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response).toBeDefined();
                expect(Bike.getById('id')).toBeDefined();
                expect(Bike.allBikes.length).toBe(1);
            })
    })
})**/
