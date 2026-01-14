const express = require('express');
const router = express.Router();
const contactsController = require('../controllers');

router.get('/', contactsController.getContacts);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createContact);

router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;