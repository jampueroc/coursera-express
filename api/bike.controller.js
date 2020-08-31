const Bike = require('../models/bike');

exports.bikeList = function (req, res) {
    return res.status(200).json(Bike.allBikes);
}
exports.bikeCreate = function (req, res){
    const {id, color, model, lat, lng} = req.body;
    const bike = new Bike(id, color, model, [lat, lng]);
    Bike.add(bike);
    return res.json(bike); // 200 is default status
}
exports.bikeDelete = function (req, res){
    Bike.remove(req.body.id);
    return res.status(204).send();
}
