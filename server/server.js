require("./config/config.js")
const { response } = require("express");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const path = require('path')
const crypto = require('crypto')//to generate file name
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const tools = require("./config/tools");

console.log(mongoose.version);
let cors = require('cors');



// Then use it before your routes are set up:
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Global routes config
app.use(require("./routes/index"));

mongoose.connect("mongodb+srv://user:123@metadatacluster.na1tn.mongodb.net/metadata?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
    console.log(error);
});

db.on("open", (error) => {
    console.log("Connection to Db has been made, it seems that nothing has exploded... yet");
})

app.listen(process.env.PORT, () => {
    console.log("Listening on port:", process.env.PORT); /* 3000 */
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let conn = mongoose.connection
let gfs
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('imageUpload')
})
 
var cron = require('node-cron');

cron.schedule('05 3 * * *', () => {

  tools.checkExpired();
});
