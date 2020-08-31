const express = require('express');
const controller = require('../controllers/bike');

const router = express.Router();

router.get('/', controller.bikeList);
router.get('/create', controller.bikeCreateGet);
router.post('/create', controller.bikeCreatePost);
router.get('/:id/update', controller.bikeUpdateGet);
router.post('/:id/update', controller.bikeUpdatePost);
router.post('/:id/delete', controller.bikeDelete);

module.exports = router;
