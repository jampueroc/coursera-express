const Bike = require('../models/bike');

exports.bikeList = function(req, res) {
    return res.render('bikes/index', {bikes: Bike.allBikes});
}
exports.bikeCreateGet = function (req, res){
    return res.render('bikes/create');
}
exports.bikeCreatePost = function (req, res){
    const {id, color, model, lat, lng} = req.body;
    const bike = new Bike(id, color, model, [lat, lng]);
    Bike.add(bike);
    return res.redirect('/bikes');
}
exports.bikeUpdateGet = function (req, res){
    const bike = Bike.getById(req.params.id);
    return res.render('bikes/update', {bike});
}
exports.bikeUpdatePost = function (req, res){
    const {id, color, model, lat, lng} = req.body;
    const bike = Bike.getById(req.params.id);
    bike.id = id;
    bike.color = color;
    bike.model = model;
    bike.location = [lat, lng];
    return res.redirect('/bikes');
}
exports.bikeDelete = function (req, res){
    Bike.remove(req.params.id);
    return res.redirect('/bikes');
}
