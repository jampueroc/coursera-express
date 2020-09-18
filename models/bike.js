const mongoose = require('mongoose');
const Factory = require("./ModelFactory");
const {Number, String} = mongoose.SchemaTypes;

const model = Factory.createModel('Bike', {
    code: Number,
    color: String,
    model: String,
    location: {
        type: [Number],
        index: {type: '2dsphere', sparse: true}
    }
});
model.prototype.toString = function () {
    return `id: ${this.code} | color: ${this.color}`;
}
module.exports = model;
