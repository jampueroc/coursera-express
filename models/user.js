var mongoose = require('mongoose');
var Reserva = require('./reservation');
var Schema = mongoose.Schema;
var {String} = mongoose.SchemaTypes;

var userSchema = new Schema({
    name: String
});

userSchema.methods.addReservation = function (bikeId, from, to) {
    var reservation = new Reserva({
        user: this._id, bike: bikeId, from, to});
    return reservation.save();
}

module.exports = mongoose.model('User', userSchema);
