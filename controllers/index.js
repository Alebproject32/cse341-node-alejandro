//const mongodb = require("../db/connect"); //Old Database
const Contact = require("../models/contact");
//const { ObjectId } = require("mongodb"); //Old Database with Mongodb

//first test with function "getContacts"
//const getContacts = async (req, res) => {
//swagger.tags = ['Users']
//const result = await mongodb.getDb().collection('contacts').find();
//result.toArray().then((lists) => {
//res.setHeader('Content-Type', 'application/json');
//res.status(200).json(lists);
//});
//};

//second test with function "getContacts"
// This is my Old Driver with
//const getContacts = async (req, res) => {
//  const filterColor = req.query.favoriteColor;
//  let query = {};
//  if (filterColor) {
//    query = { favoriteColor: filterColor };
//  }
//
//  try {
//    const result = await mongodb.getDb().collection("contacts").find(query);
//    result.toArray().then((lists) => {
//      res.setHeader("Content-Type", "application/json");
//      res.status(200).json(lists);
//    });
//  } catch (err) {
//    res.status(500).json({ message: err.message });
//  }
//};

//New function getContacts that working with Mongoose
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Old Database Mongodb
//const getSingle = async (req, res) => {
//  try {
//    const contactId = new ObjectId(req.params.id);
//
//    // 1. Usamos getDb() y especificamos la base de datos 'cse341'
//    const result = await mongodb
//      .getDb()
//      .collection("contacts")
//      .find({ _id: contactId });
//
//    // 2. Convertimos el cursor a Array
//   const lists = await result.toArray();
//
//    // 3. Verificamos si hay resultados
//    if (lists.length > 0) {
//      res.setHeader("Content-Type", "application/json");
//      res.status(200).json(lists[0]);
//    } else {
//      res.status(404).json({ message: "Contact not found" });
//    }
//  } catch (err) {
//    res.status(500).json({ message: err.message || "Some error occurred" });
//  }
//};

//New Driver with Mongoose
const getSingle = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (err) {
    // Error 400 si el ID tiene formato inválido, 500 para otros errores
    const status = err.name === "CastError" ? 400 : 500;
    res.status(status).json({ message: "Invalid ID format or server error" });
  }
};

//Old Database Mongodb
//const getProfessionalData = async (req, res) => {
//  try {
//    const result = await mongodb.getDb().collection("professional").find();
//
//    result.toArray().then((lists) => {
//     if (lists.length > 0) {//
//        res.setHeader("Content-Type", "application/json");
//        res.status(200).json(lists[0]);
//      } else {//
//        res.status(404).json({ message: "Not Professional data found" });
//      }
//    });
//  } catch (err) {//
//    res.status(500).json({
//      message:
//        err.message ||
//        "Error occurred while retrieving dataSome error occurred",
//    });
//  }
//};

//

//This is my Old function createContact with MongoDB
//const createContact = async (req, res) => {
//  const contact = {
//    firstName: req.body.firstName,
//    lastName: req.body.lastName,
//    email: req.body.email,
//    favoriteColor: req.body.favoriteColor,
//    birthday: req.body.birthday,
//  };
//  const response = await mongodb
//    .getDb()
//    .collection("contacts")
//    .insertOne(contact);
//  if (response.acknowledged) {
//    res.status(201).json(response);
//  } else {
//    res
//      .status(500)
//      .json(
//        response.error || "Some error occurred while creating the contact.",
//      );
//  }
//};

//My new function with Mongoose
const createContact = async (req, res) => {
  /* #swagger.tags = ['Contacts']
    #swagger.description = 'Creates a new contact'
    #swagger.parameters['body'] = {
          in: 'body',
          description: 'Contact information',
          schema: { $ref: '#/definitions/Contact' }
    }
  */
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Old Dababase Mongodb
//const updateContact = async (req, res) => {
//  try {
//    const contactId = new ObjectId(req.params.id);
//    const contact = {
//      firstName: req.body.firstName,
//      lastName: req.body.lastName,
//      email: req.body.email,
//      favoriteColor: req.body.favoriteColor,
//      birthday: req.body.birthday,
//    };
//    const response = await mongodb
//      .getDb()
//      .collection("contacts")
//      .replaceOne({ _id: contactId }, contact);
//
//    if (response.modifiedCount > 0) {
//      res.status(204).send();
//    } else {
//      res
//        .status(500)
//        .json(
//          response.error || "Some error occurred while updating the contact.",
//        );
//    }
//  } catch (err) {
//    res.status(500).json({ message: err.message });
//  }
//};

//New Database Mongoose
const updateContact = async (req, res) => {
  try {
    const result = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Old Database Mongodb
//const deleteContact = async (req, res) => {
//  try {
//    const contactId = new ObjectId(req.params.id);
//    const response = await mongodb
//     .getDb()
//      .collection("contacts")
//      .deleteOne({ _id: contactId });
//
//    if (response.deletedCount > 0) {
//      res.status(204).send();
//    } else {
//      res
//        .status(500)
//        .json(
//          response.error || "Some error occurred while deleting the contact.",
//        );
//    }
//  } catch (err) {
//    res.status(500).json({ message: err.message });
//  }
//};

//New Database with Mongoose
const deleteContact = async (req, res) => {
  try {
    const result = await Contact.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getContacts,
  getSingle,
  //getProfessionalData, // Old// function that connect with frontend
  createContact,
  updateContact,
  deleteContact,
};
