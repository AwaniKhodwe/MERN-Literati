
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors({
    origin: ['https://mern-literati.vercel.app', 'http://localhost:3000'],
    methods: ['POST', 'GET'],
    credentials: true
    
    
}));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true});

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully.");
})

app.get("/", (req, res) => {
    res.json("Literati's Server");
})

const usersRouter = require("./routes/users");
const tbrRouter = require("./routes/tbr");
const readingsRouter = require("./routes/readings")
const searchRouter = require("./routes/search");    

app.use("/users", usersRouter);
app.use("/tbr", tbrRouter);
app.use("/readings", readingsRouter);
app.use("/search", searchRouter);   

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});
