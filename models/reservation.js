var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;
var {String, Date, ObjectId} = mongoose.SchemaTypes

var reservationSchema = new Schema({
    from: Date,
    to: Date,
    bike: {type: ObjectId, ref: 'Bike'},
    user: {type: ObjectId, ref: 'User'}
})

reservationSchema.methods.daysForReservation = function (){
    return moment(this.to).diff(moment(this.from), 'days') + 1;
}
module.exports = mongoose.model('Reservation', reservationSchema);
