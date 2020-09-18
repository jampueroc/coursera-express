var express = require('express');
var router = express.Router();
var controller = require('../api/user.controller');
/* GET users listing. */
router.get('/', controller.userList);
router.post('/create', controller.createUser);
router.post('/addReservation', controller.addReservationForUser)

module.exports = router;
