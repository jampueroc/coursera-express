const DbConnector = require("../../utils/db-connector");

const Bike = require('../../models/bike');

describe('using mongo', function (){
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    beforeEach(function () {
        return DbConnector.default.connectTest();
    });
    afterEach(function () {
        return Bike.deleteMany({}).then( ()=> {
            console.log('cleaning db completed');
            return DbConnector.default.disconnect();
        }).then( () => {
            console.log('Disconnected');
        });
    })
    it('check model', function () {
        const bike = Bike.createInstance({code: 1, color: 'red', model: 'normal', location: [0,0]});
        expect(bike.code).toBe(1);
        expect(bike.color).toBe('red');
        expect(bike.model).toBe('normal');
        expect(bike.location).toEqual([0,0]);
        expect(bike.toString()).toBe('id: 1 | color: red');
    });
    it('check empty list', function () {
        return Bike.allElements().then(list => {
            expect(list).toEqual([]);
        });
    });
    it('check add', function () {
        const bike = Bike.createInstance({code: 1, color: 'red', model: 'normal', location: [0,0]});
        return Bike.add(bike).then( ()=> {
           return Bike.allElements()
        }).then( list => {
            expect(list.length).toBe(1);
            const bike = list[0];
            expect(bike.code).toBe(1);
            expect(bike.color).toBe('red');
            expect(bike.model).toBe('normal');
            expect(bike.location).toEqual([0,0]);
            expect(bike.toString()).toBe('id: 1 | color: red');

        });
    })

    it('check findByCode and remove', function () {
        return Bike.allElements().then( list => {
            expect(list).toEqual([]);

            const bike1 = Bike.createInstance({code: 1, color: 'red', model: 'normal', location: [0,0]});
            const bike2 = Bike.createInstance({code: 2, color: 'red', model: 'normal', location: [0,0]});
            return Promise.all([Bike.add(bike1), Bike.add(bike2)]);
        }).then( ()=> {
            return Bike.allElements().then( list => {
                expect(list.length).toBe(2);

                return Bike.findByCode(2);
            })
        }).then(bike => {
            expect(bike.code).toBe(2);
            expect(bike.color).toBe('red');
            expect(bike.model).toBe('normal');
            expect(bike.location).toEqual([0,0]);
            expect(bike.toString()).toBe('id: 2 | color: red');
            return Bike.removeByCode(2)
        }).then(()=> {
            return Bike.allElements().then( list => {
                expect(list.length).toBe(1);

                return Bike.findByCode(2).then( bike => {
                    expect(bike).nothing();
                });
            })
        });
    })
})


/*describe('initial check of bike model', function (){
    it('check model', function () {
        const bike = new Bike('1', 'red','normal', [0,0]);
        expect(bike.id).toBe('1');
        expect(bike.color).toBe('red');
        expect(bike.model).toBe('normal');
        expect(bike.location).toEqual([0,0])
        expect(bike.toString()).toBe('id: 1 | color: red');
    });
});
describe('check single instance', function (){
    beforeEach(function () {
        Bike.allBikes = [];

    });
    it('exists with empty array', function (){
        expect(Bike.allBikes).toEqual([]);
    });
    it('add bike', function () {
        Bike.add(new Bike('0','rojo','pistera',[-33.436566, -70.635590]));
        expect(Bike.allBikes.length).toBe(1);
    });
    it('getById bike', function (){
        expect(Bike.getById('fakeId')).toEqual(undefined);
        Bike.add(new Bike('fakeId','rojo','pistera',[-33.436566, -70.635590]));
        expect(Bike.getById('fakeId')).toBeDefined();
    });
    it('remove bike', function (){
        Bike.add(new Bike('idToDelete','rojo','pistera',[-33.436566, -70.635590]));
        expect(Bike.getById('idToDelete')).toBeDefined();
        Bike.remove('idToDelete');
        expect(Bike.getById('idToDelete')).toEqual(undefined);
    });
    it('all bikes', function (){
        const initialLength = Bike.allBikes.length;
        Bike.add(new Bike('id1','rojo','pistera',[-33.436566, -70.635590]));
        Bike.add(new Bike('id2','rojo','pistera',[-33.436566, -70.635590]));
        Bike.add(new Bike('id3','rojo','pistera',[-33.436566, -70.635590]));
        Bike.add(new Bike('id4','rojo','pistera',[-33.436566, -70.635590]));
        Bike.add(new Bike('id5','rojo','pistera',[-33.436566, -70.635590]));
        expect(Bike.allBikes.length).toBe(initialLength + 5);
    });

})*/
