require("dotenv").config();

const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const db = mongoose.connection;
db.on('error', (error) => {
    console.log(error);
});

db.once('connected', () => {
    console.log("Baza je povezana.")
})




const app = express();
app.use(cors());


app.use(express.json());

const routes = require("./routes/routes");

app.use('/api', routes);



app.listen(3000, () =>{
    console.log("Server radi na portu 3000");
});