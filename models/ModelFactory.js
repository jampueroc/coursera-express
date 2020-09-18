const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports.createModel = function(name, fields){
    console.log(fields);
    const schema = new Schema(fields);
    schema.statics.createInstance = function(data){
        return new this(data);
    };

    schema.statics.allElements = function(){
        return this.find({}).exec();
    };
    schema.statics.add = function(element){
        return this.create(element);
    };

    schema.statics.findByCode = function(code){
        return this.findOne({code}).exec();
    };
    schema.statics.removeByCode = function(code){
        return this.deleteOne({code: code}).exec();
    };

    schema.methods.toString = function (){
        throw new Error('Implement this');
    };
    return mongoose.model(name, schema);
}
