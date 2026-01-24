// // This is my native driver or Old version of route to connect with Mongodb
// const dotenv = require("dotenv");
// dotenv.config();
// const MongoClient = require("mongodb").MongoClient;

// let _db;

// const initDb = (callback) => {
//   if (_db) {
//     console.log("Database is already initialized!");
//     return callback(null, _db);
//   }
//   MongoClient.connect(process.env.MONGODB_URI)
//     .then((client) => {
//       _db = client.db();
//       callback(null, _db);
//     })
//     .catch((err) => {
//       callback(err);
//     });
// };

// const getDb = () => {
//   if (!_db) {
//     throw Error("Database not initialized");
//   }
//   return _db;
// };

// module.exports = {
//   initDb,
//   getDb,
// };

// Now this is my new version to work with Mongoose
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); //Stop the App if it´s faile the conecction
  }
};

module.exports = {
  connectDB,
};
