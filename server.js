const express = require('express');
const app = express();
const mongodb = require('./db/connect');  //Import our connections
const port = process.env.PORT || 8080;
const cors = require('cors');

// Middlewares first
app.use(cors());
app.use(express.json()); // this will help me that my API could read JSON files.

// Routes
app.use('/', require('./routes',));


//Initialize DataBase
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database connected and server is listening in port ${port}`);
        });
    }
});