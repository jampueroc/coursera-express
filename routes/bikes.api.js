const express = require('express');
const controller = require('../api/bike.controller');

const router = express.Router();

router.get('/', controller.bikeList);
router.post('/create', controller.bikeCreate);
router.delete('/delete', controller.bikeDelete);

module.exports = router;
