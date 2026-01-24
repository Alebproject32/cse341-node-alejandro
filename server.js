const express = require("express");
const app = express();
//This is my Old connection to my Database in Mongodb
//const mongodb = require('./db/connect');  //Import our connections

const connectDB = require("./db/connect"); //My new connection to Mongoose
const port = process.env.PORT || 8080;
const cors = require("cors");

// 1. Middlewares first
app.use(cors());
app.use(express.json()); // this will help me that my API could read JSON files.

// 2. Routes
app.use("/", require("./routes"));

// 3. Initialize DataBase
// Old Database in Mongodb
//mongodb.initDb((err) => {
//  if (err) {
//    console.log(err);
//  } else {
//    app.listen(port, () => {
//      console.log(`Database connected and server is listening in port ${port}`);
//    });
//  }
//});

// New Database in Mongoose
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Server is running on port ${port} and Mongoose is connected`,
      );
    });
  })
  .catch((err) => {
    console.log("Failed to connect to the database", err);
  });
