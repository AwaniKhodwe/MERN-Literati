const router = require('express').Router();

const BooksAPI = process.env.BooksAPI;

const axios = require('axios');

router.route('/').get((req, res) => {

        const searchTerm = req.query.s;
        const apiKey = BooksAPI;
        const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`;
        axios
              .get(url)
              .then((response) => {
                // setSearchResults(response.data.items);
                res.json(response.data.items || []);
              })
              .catch((error) => {
                console.error("Error fetching data from Google Books API:", error);
              });
      
            });

module.exports = router;