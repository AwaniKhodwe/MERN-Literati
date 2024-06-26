import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Bookshelf from "../images/library-book-bookshelf-read.jpg";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import axios from 'axios';

function Readings() {
  const [searchItem, setItem] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem("uname") || "");
  const [existingBooks, setExistingBooks] = useState([]);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const [newComment, setNewComment] = useState(false);
  const [newRating, setNewRating] = useState(false);
  const [newCommentIndex, setNewCommentIndex] = useState(-1);
  const [newRatingIndex, setNewRatingIndex] = useState(-1);

  useEffect(() => {
    if (username) {
      axios.get('https://mern-literati-server.vercel.app/readings/' + username)
        .then((response) => {
          setExistingBooks(response.data.books);
        })
        .catch((error) => {
          console.error("Error fetching existing books:", error);
        });
    }
  }, [username]);

  const itemChange = (event) => {
    setItem(event.target.value);
  };

  const handleSearch = () => {
    // Make the API request to the Google Books API
    const apiKey = "AIzaSyA1gjFZSeZUs6XAjzJt3TP3GRRFaHsgzSs";
    const searchTerm = searchItem;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`;

    axios
      .get(url)
      .then((response) => {
        setSearchResults(response.data.items);
      })
      .catch((error) => {
        console.error("Error fetching data from Google Books API:", error);
      });
  };

  const handleAddBook = (book) => {
    setSelectedBooks((prevSelectedBooks) => [...prevSelectedBooks, book]);
    // Clear the search results and search input after adding the book
    setSearchResults([]);
    setItem("");
  };

  const handleSave = () => {
    const booksData = selectedBooks.map((book) => {
      return {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "N/A",
        coverImage: book.volumeInfo.imageLinks?.thumbnail,
      };
    });

    const readingsData = {
      books: booksData,
    };

    axios.post("https://mern-literati-server.vercel.app/readings/" + username + "/add-books", readingsData)
      .then((response) => {
        console.log("Readings list saved successfully:", response.data);
        setExistingBooks((prevExistingBooks) => [...prevExistingBooks, ...selectedBooks]);
        setSelectedBooks([]); // Clear the selectedBooks state
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error saving Readings:", error);
      });
  };

  const handleCommentChange = (index, event) => {
    const newBooks = [...existingBooks];
    newBooks[index].comment = event.target.value;
    setExistingBooks(newBooks);
    setNewComment(true);
  };

  const handleRatingChange = (index, event) => {
    const newBooks = [...existingBooks];
    newBooks[index].rating = parseInt(event.target.value);
    setExistingBooks(newBooks);
    setNewRating(true);
  };

  const handleCommentSubmit = (index) => {
    const book = existingBooks[index];
    const commentData = {
      comment: book.comment,
      rating: book.rating,
    };

    setSubmitButtonClicked(true);

    axios
      .post(`https://mern-literati-server.vercel.app/readings/` + username + `/` + book._id + `/add-comment`, commentData)
      .then((response) => {
        console.log("Comment and rating added successfully:", response.data);
      })
      .catch((error) => {
        console.log("Error adding comment and rating:", error);
      });
  };

  return (
    <>
      <Header />
      <div className="pt-12 w-full min-h-screen font-montserrat" style={{ backgroundImage: `url(${Bookshelf})` }}>
        <div className="pt-8 h-24 bg-pebblegray mx-auto border-2 rounded-2xl border-lavendargray/50" style={{ width: "80%" }}>
          <h1 className="text-3xl text-lavendargray text-center">Your Readings</h1>
        </div>
        <div className="flex flex-wrap mt-4 h-auto p-4 pt-2 bg-pebblegray mx-auto border-2 rounded-2xl border-lavendargray/50" style={{ width: "80%" }}>
          <div className="flex text-lavendargray mt-2 mx-auto">
            <div className="mx-4 font-bold">
              <AddRoundedIcon onClick={handleSearch} style={{ fontSize: 36 }} />
              <span>Add</span>
            </div>

            <div>
              <input value={searchItem} onChange={itemChange} type="text" className="p-2 pl-4 h-10 rounded-3xl bg-lavendargray text-pebblegray font-bold" style={{ width: "900px" }}></input>
            </div>
            <div className="mx-4 font-bold">
              <AutoStoriesIcon onClick={handleSave} style={{ fontSize: 36 }} />
              <span className="ml-2">Save</span>
            </div>
          </div>
          {searchResults.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4 p-4 bg-pebblegray mx-auto border-2 rounded-2xl border-lavendargray/50" style={{ width: "80%" }}>
              {/* Display search results as an extension */}
              {searchResults.map((book) => (
                <div key={book.id} className="bg-white p-2 rounded-md shadow-md w-64">
                  <h3 className="text-lg font-semibold">{book.volumeInfo.title}</h3>
                  <img src={book.volumeInfo.imageLinks?.thumbnail} alt="Book Cover" className="w-10 h-14 mx-4" />
                  <p>Authors: {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "N/A"}</p>
                  <button onClick={() => handleAddBook(book)}>Add</button>
                </div>
              ))}
            </div>
          )}
          {selectedBooks.length > 0 && (
            <div className="flex flex-wrap flex-col mt-4 ml-8 text-lavendargray font-montserrat text-xl">
              {/* Display newly selected books */}
              <h1>Add these books:</h1>
              {selectedBooks.map((book, index) => (
                <div key={book.id} className="flex mt-2">
                  <span>
                    <img src={book.volumeInfo.imageLinks?.thumbnail} alt="Book Cover" className="w-10 h-14 mx-4" />
                  </span>
                  <span className="my-auto">{book.volumeInfo.title}</span>
                </div>
              ))}
            </div>
          )}
          {existingBooks.length > 0 && (
            <div className="flex flex-wrap w-full mt-4 text-pebblegray font-montserrat text-xl">
              {/* Display existing books */}
              {existingBooks.map((book, index) => {
                const doesExist = book.comment !== undefined && book.rating !== undefined;
                const isCommentEditing = newComment && index === newCommentIndex;
                const isRatingEditing = newRating && index === newRatingIndex;
                const isSubmitted = book.isSubmitted;

                return (
                  <div
                    key={index}
                    className="flex h-48 h-24 m-2 p-10 pl-2 pt-2 border-2 border-lavendargray/50 rounded-2xl bg-dustyrose"
                    style={{ width: "377px" }}
                  >
                    {/* <input  type="checkbox" className="h-4 w-4 my-auto"  /> */}
                    <div className=" mx-4 my-4 h-full">
                      <img src={book.coverImage} alt="Book Cover" className="w-auto h-full" />
                    </div>
                    <div className="mt-4 font-bold text-black">
                      <div>
                        <span className="">{book.title}</span>
                        <p className="text-base">{book.author}</p>
                      </div>

                      {(doesExist && !isCommentEditing && !isRatingEditing) || isSubmitted || submitButtonClicked ? (
                        <div className="text-base text-deeprust">
                          <p>Comment: {book.comment}</p>
                          <p>Rating: {book.rating}/5</p>
                        </div>
                      ) : (
                        <div className="text-base text-deeprust">
                          <input
                            type="text"
                            placeholder="Add a comment"
                            value={book.comment || ""}
                            onChange={(event) => handleCommentChange(index, event)}
                            onFocus={() => setNewCommentIndex(index)}
                          />
                          <select
                            value={book.rating || ""}
                            onChange={(event) => handleRatingChange(index, event)}
                            onFocus={() => setNewRatingIndex(index)}
                          >
                            <option value="" disabled>
                              Select Rating
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                          <button onClick={() => handleCommentSubmit(index)}>Submit</button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Readings;
