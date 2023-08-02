// mongodb+srv://awanikhodwe:vlPRKNWhgPn4SqxF@cluster0.pyjeoaq.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://awanikhodwe:<password>@cluster0.pyjeoaq.mongodb.net/

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true});

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully.");
})

const usersRouter = require("./routes/users");
const tbrRouter = require("./routes/tbr");

app.use("/users", usersRouter);
app.use("/tbr", tbrRouter);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});