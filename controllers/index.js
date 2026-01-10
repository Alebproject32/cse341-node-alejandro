const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

//first test with function "getContacts"
//const getContacts = async (req, res) => {
    //swagger.tags = ['Users']
    //const result = await mongodb.getDb().db().collection('contacts').find();
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
        query = { favoriteColor: filterColor};
    }

    try {
        const result = await mongodb.getDb().db('cse341').collection('contacts').find(query);
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
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
      .db('cse341') 
      .collection('contacts')
      .find({ _id: contactId });

    // 2. Convertimos el cursor a Array
    const lists = await result.toArray();

    // 3. Verificamos si hay resultados
    if (lists.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred' });
  }
};

const getProfessionalData = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db('cse341')
      .collection('professional')
      .find();

    result.toArray().then((lists) => {
      if (lists.length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      } else {
        res.status(404).json({ message: 'Not Professional data found' });
      }
    }); 
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error occurred while retrieving dataSome error occurred' });
    }
  };


module.exports = {
    getContacts,
    getSingle,
    getProfessionalData, // New function that connect with frontend
};