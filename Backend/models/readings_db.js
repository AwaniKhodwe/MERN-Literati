const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const readingsSchema = new Schema({
    
    username: {type: String, required: true},
    books: [{
        title: {
            type: String,
            required: true,
        },
        author: String,
        coverImage: String,
        comment: String,
        rating: Number,
    }],
    
})

const ReadingsModel = mongoose.model('Readings', readingsSchema);

module.exports = ReadingsModel;