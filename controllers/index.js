const mongodb = require('../db/connect');

const getContacts = async (req, res) => {
    //swagger.tags = ['Users']
    const result = await mongodb.getDb().db('cse341').collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    }); 
};


module.exports = {
    getContacts,
};