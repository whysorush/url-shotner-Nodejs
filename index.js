const express = require("express");
const app = express();
const port = 3000;
const { connectDb } = require('../connection');

connectDb("mongodb://127.0.0.1:27017/shortUrl").then(() => console.log("Mongo connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.get('/favicon.ico', (req, res) => res.status(204));


app.listen(port, () => console.log('Server started on ', port))