const mongodb = require("../db/connect");
const { ObjectId } = require("mongodb");

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
const getContacts = async (req, res) => {
  const filterColor = req.query.favoriteColor;
  let query = {};
  if (filterColor) {
    query = { favoriteColor: filterColor };
  }

  try {
    const result = await mongodb.getDb().collection("contacts").find(query);
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    // 1. Usamos getDb() y especificamos la base de datos 'cse341'
    const result = await mongodb
      .getDb()
      .collection("contacts")
      .find({ _id: contactId });

    // 2. Convertimos el cursor a Array
    const lists = await result.toArray();

    // 3. Verificamos si hay resultados
    if (lists.length > 0) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || "Some error occurred" });
  }
};

const getProfessionalData = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection("professional").find();

    result.toArray().then((lists) => {
      if (lists.length > 0) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists[0]);
      } else {
        res.status(404).json({ message: "Not Professional data found" });
      }
    });
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Error occurred while retrieving dataSome error occurred",
    });
  }
};

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDb()
    .collection("contacts")
    .insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the contact.",
      );
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };
    const response = await mongodb
      .getDb()
      .collection("contacts")
      .replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the contact.",
        );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .collection("contacts")
      .deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while deleting the contact.",
        );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getContacts,
  getSingle,
  getProfessionalData, // New function that connect with frontend
  createContact,
  updateContact,
  deleteContact,
};
