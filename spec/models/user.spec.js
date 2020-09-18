const DbConnector = require("../../utils/db-connector");

const User = require('../../models/user');
const Bike = require('../../models/bike');
const Reservation = require('../../models/reservation');
const moment = require('moment');

describe('using mongo', function (){
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    beforeEach(function () {
        return DbConnector.default.connectTest();
    });
    afterEach(function () {
        return Reservation.deleteMany({})
            .then(() => User.deleteMany({}))
            .then(()=> Bike.deleteMany({}))
            .then( ()=> {
                console.log('cleaning db completed');
                return DbConnector.default.disconnect();
            }).then( () => {
            console.log('Disconnected');
        });
    })
    it('check model', function () {
        const user = new User({name: 'Jhon'});
        const bike = Bike.createInstance({code: 1, color: 'red', model: 'normal', location: [0,0]});
        return user.save().then( ()=> {
            return bike.save();
        }).then( ()=> {
            const today = moment().toDate();
            const tomorrow = moment().add(1, 'days').toDate();
            return user.addReservation(bike.id, today, tomorrow);
        }).then( () => {
            return Reservation.find({}).populate('bike').populate('user').exec();
        }).then(list => {
            expect(list.length).toBe(1);
            const reservation = list[0];
            expect(reservation.daysForReservation()).toBe(2);
            expect(reservation.bike.code).toBe(bike.code);
            expect(reservation.user.name).toBe(user.name);

        });

    });
})
