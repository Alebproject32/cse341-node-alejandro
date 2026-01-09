const express = require('express');
const router = express.Router();
const contactsController = require('../controllers');

router.get('/contacts', contactsController.getContacts);

router.get('/contacts/:id', contactsController.getSingle);

module.exports = router;