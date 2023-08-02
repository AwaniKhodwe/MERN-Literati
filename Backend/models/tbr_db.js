const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tbrSchema = new Schema({
    
    username: {type: String, required: true},
    books: [{
        title: {
            type: String,
            required: true,
        },
        author: String,
        coverImage: String,
    }]
})

const TbrModel = mongoose.model('Tbr', tbrSchema);

module.exports = TbrModel;