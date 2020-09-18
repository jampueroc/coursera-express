const UserController = require('../models/user');

exports.userList = function (req, res) {
    return UserController.find({}).then(users => {
        return res.json({users});
    }).catch(err => res.status(400).send(err.toString()));
};
exports.createUser = function (req, res) {
    const user = new UserController({name: req.body.name});
    return user.save().then( ()=> res.json({user}))
        .catch(err => res.status(400).send(err.toString()));
};
exports.addReservationForUser = function (req, res) {
    return UserController.findById(req.body.id).then(user => {
        const {bikeId, from, to} = req.body;
        return user.addReservation(bikeId, from, to)
    }).then(()=> {
        return res.send();
    }).catch(err => res.status(400).send(err.toString()));
}
