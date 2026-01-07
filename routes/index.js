const router = require('express').Router();
const baseController = require('../controllers/index');

router.get('/', baseController.mainfunction);

module.exports = router;