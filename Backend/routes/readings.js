const router = require('express').Router();

const mongoose = require('mongoose');
const ReadingsModel = require('../models/readings_db');


router.route('/:username/:bookId/add-comment').post((req, res) => {
    const username = req.params.username;
    const bookId = req.params.bookId;
    const { comment, rating } = req.body;
  
    ReadingsModel.findOne({ username: username })
      .then((readings) => {
        if (!readings) {
          return res.status(404).json("Readings entry not found");
        }
  
        const bookToUpdate = readings.books.find(book => book._id.toString() === bookId);
  
        if (!bookToUpdate) {
          return res.status(404).json("Book not found");
        }
  
        bookToUpdate.comment = comment;
        bookToUpdate.rating = rating;
  
        readings
          .save()
          .then(() => res.json('Comment and rating added successfully!'))
          .catch((err) => res.status(400).json("Error adding comment and rating: " + err));
      })
      .catch((err) => res.status(500).json("Error fetching Readings data: " + err));
  });

router.route('/:username/add-books').post((req, res) => {
    const username = req.params.username;
    const newBooks = req.body.books;
    

 ReadingsModel.findOne({ username: username })
      .then((readings) => {
        if (!readings) {
          // If no Readings entry exists for the given username, create a new entry
          readings = new ReadingsModel({ username: username, books: newBooks});
        } else {
          // If Readings entry exists, add the new book to the books array
          readings.books.push(...newBooks);
        }
  
        // Save the updated Readings entry
        readings
          .save()
          .then(() => res.json('Books added to Readings successfully!'))
          .catch((err) => res.status(400).json("Error adding book to Readings: " + err));
      })
      .catch((err) => res.status(500).json("Error fetching Readings data: " + err));
  });

router.route('/:username').get((req,res)=>{
    const username = req.params.username;
    console.log("In get route, username:", username);

 ReadingsModel.findOne({ username: username })
    .then((readings) => {
    
      if (!readings) {
        // If no Readings entry exists for the given username, return an empty response
        return res.json({ books: [] });
      }
     
      // If Readings entry exists, return the books array
      return res.json({ books: readings.books });
    })
    .catch((err) => res.status(500).json("Error fetching Readings data: " + err));
})

module.exports = router;