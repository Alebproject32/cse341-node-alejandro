const express = require('express');
const router = express.Router();
const contactsController = require('../controllers');

router.get('/contacts', contactsController.getContacts);

module.exports = router;