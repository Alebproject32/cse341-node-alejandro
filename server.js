const express = require('express');
const app = express();
const mongodb = require('./db/connect');  //Import our connections
const port = process.env.PORT || 3000;

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