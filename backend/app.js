const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const routes = require("./routes")
const emplRouter = require("./routes/emplRoute")
const connect = require('./config/database')

const mongoose = require('mongoose')
mongoose 
 .connect(process.env.DB_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,  })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

var jsonParser = bodyParser.json()

app.use("/api",jsonParser, emplRouter)
app.use('/',routes)
app.listen(3000);