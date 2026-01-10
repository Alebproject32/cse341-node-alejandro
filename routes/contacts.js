const express = require('express');
const router = express.Router();
const contactsController = require('../controllers');

router.get('/', contactsController.getContacts);

router.get('/:id', contactsController.getSingle);

module.exports = router;