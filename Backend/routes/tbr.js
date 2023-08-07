const router = require('express').Router();

const mongoose = require('mongoose');
const TbrModel = require('../models/tbr_db');

router.route('/:username/add-books').post((req, res) => {
    const username = req.params.username;
    const newBooks = req.body.books;

    TbrModel.findOne({ username: username })
      .then((tbr) => {
        if (!tbr) {
          // If no TBR entry exists for the given username, create a new entry
          tbr = new TbrModel({ username: username, books: newBooks });
        } else {
          // If TBR entry exists, add the new book to the books array
          tbr.books.push(...newBooks);
        }
  
        // Save the updated TBR entry
        tbr
          .save()
          .then(() => res.json('Books added to TBR successfully!'))
          .catch((err) => res.status(400).json("Error adding book to TBR: " + err));
      })
      .catch((err) => res.status(500).json("Error fetching TBR data: " + err));
  });

router.route('/:username').get((req,res)=>{
    const username = req.params.username;
    console.log("In get route, username:", username);

    TbrModel.findOne({ username: username })
    .then((tbr) => {
    
      if (!tbr) {
        // If no TBR entry exists for the given username, return an empty response
        return res.json({ books: [] });
      }
     
      // If TBR entry exists, return the books array
      return res.json({ books: tbr.books });
    })
    .catch((err) => res.status(500).json("Error fetching TBR data: " + err));
})

router.route('/:username/remove-books').post((req, res) => {
  const username = req.params.username;
  const bookTitlesToRemove = req.body.bookTitles;
  console.log(bookTitlesToRemove);
  if (!bookTitlesToRemove || bookTitlesToRemove.length === 0) {
    return res.status(400).json("No book titles provided.");
  }

  TbrModel.findOne({ username: username })
  .then((tbr) => {
    if (!tbr) {
      return res.status(404).json("No TBR exists for the current user");
    }

    // Fetch the document again to ensure you have the latest version
    return TbrModel.findById(tbr._id);
  })
  .then((fetchedTbr) => {
    if (!fetchedTbr) {
      return res.status(404).json("No TBR found for the current user");
    }

    // Filter out books with specified titles
    fetchedTbr.books = fetchedTbr.books.filter(book => !bookTitlesToRemove.includes(book.title));

    // Save the updated TBR entry
    return fetchedTbr.save();
  })
  .then(() => {
    res.json('Books removed from TBR by titles successfully!');
  })
  .catch((error) => {
    console.error("Error removing books from TBR by titles:", error);
    res.status(500).json("Internal Server Error: " + error.message);
  });

});




module.exports = router;