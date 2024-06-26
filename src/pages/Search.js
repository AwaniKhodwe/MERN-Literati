import React, { useState } from "react";
import Header from "../components/Header";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import axios from 'axios';
import fictionImg from "../images/fiction.jpg";
import nonFiction from "../images/nonfiction.jpg";
import poetry from "../images/poetry.jpg"

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem("uname") || "");

//   const handleSearch = async () => {
//     try {
//       const apiKey = 'AIzaSyA1gjFZSeZUs6XAjzJt3TP3GRRFaHsgzSs'; // Replace with your Google Books API key
//       const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`);
//       setSearchResults(response.data.items || []);
//     } catch (error) {
//       console.error('Error fetching data from Google Books API:', error);
//     }
//   };

  const handleSearch = () => {

    const url = "https://mern-literati-server.vercel.app/search?s=${searchTerm}";
    axios
          .get(url)
          .then((response) => {
            setSearchResults(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data from Google Books API:", error);
          });
  }

  const handleCategorySearch = (category) =>{
    setSearchTerm(category);
    handleSearch();
  }

  const [successMessages, setSuccessMessages] = useState({});
  

  const handleAddToTBR = (book) => {
    const bookData = {
      books: [
        {
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "N/A",
          coverImage: book.volumeInfo.imageLinks?.thumbnail,
        }
      ]
    };
  
    axios.post(`https://mern-literati-server.vercel.app/tbr/`+username+`/add-books`, bookData)
      .then((response) => {
        console.log("Book added to TBR successfully!");
        setSuccessMessages(prevSuccessMessages => ({
            ...prevSuccessMessages,
            [book.id]: "Book added to TBR successfully!"
          }));
      })
      .catch((error) => {
        console.log("Error adding book to TBR:", error);
      });
  };
  

  return (
    <>
      <Header />
      <div className="flex">
        <div className="mx-auto mt-8 w-full">
          <h1 className="text-lavendargray text-center text-5xl mb-4">Search</h1>
          <div className="flex">
            <div className="mx-auto">
            <input
              className="h-12 pl-4 bg-lavendargray rounded-3xl w-96"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for books..."
            />
            <button
              className="h-12 text-lavendargray rounded-3xl"
              onClick={handleSearch}
            >
              <SearchRoundedIcon className="text-lavendargray" style={{ fontSize: 36 }} />
            </button>
            </div>
          </div>
          <div className="flex ml-48">
            
            <div onClick={() => handleCategorySearch("Fiction")} className="text-lavendargray bg-lavendargray rounded-2xl m-4 w-1/4 h-80 transition: transform duration-500  hover:scale-110" style={{backgroundImage: `url(${fictionImg})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat'}}>
                <h1 className="text-5xl text-center font-montserrat font-extrabold mt-36">FICTION</h1>
            </div>
            <div onClick={() => handleCategorySearch("Non Fiction")} className="text-lavendargray bg-lavendargray rounded-2xl m-4 w-1/4 h-80 transition: transform duration-500  hover:scale-110" style={{backgroundImage: `url(${nonFiction})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat'}}>
                <h1 className="text-5xl text-center font-montserrat font-extrabold mt-28 ml-4">NON-FICTION</h1>
            </div>
            <div onClick={() => handleCategorySearch("Poetry")} className="text-lavendargray bg-lavendargray rounded-2xl m-4 w-1/4 h-80 transition: transform duration-500  hover:scale-110" style={{backgroundImage: `url(${poetry})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat'}}>
            <h1 className="text-5xl text-center font-montserrat font-extrabold mt-36">POETRY</h1>
            </div>

          </div>
          <div className="mt-4">
            {searchResults.map((book) => (
            
              <div key={book.id} className="flex mx-12 mb-4 p-4 bg-dustyrose rounded-md shadow-md">
                <div className="w-1/6">
                    <img src={book.volumeInfo.imageLinks?.thumbnail} alt="Book Cover" className="w-auto h-auto mx-4" />
                </div>
                <div className="w-5/6">
                    <h2 className="text-xl font-semibold">{book.volumeInfo.title}</h2>
                    <p className="text-sm">Author: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
                    <p className="text-sm">Genre: {book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'N/A'}</p>
                    <p className="text-sm">Description: {book.volumeInfo.description || 'No description available.'}</p>
                    <button className="mt-2 bg-pebblegray text-lavendargray py-2 px-4 rounded-lg" onClick={() => handleAddToTBR(book)}>Add to TBR</button>
                    {successMessages[book.id] && 
                    <p className="text-green-800 font-bold mt-2">{successMessages[book.id]} </p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
