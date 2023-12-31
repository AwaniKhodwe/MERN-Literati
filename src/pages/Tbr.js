import React, { useState, useEffect } from "react";
import Header from "../components/Header"
import Bookshelf from "../images/library-book-bookshelf-read.jpg"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import axios from 'axios';
import { useAsyncError } from "react-router";

function Tbr()
{
    const [searchItem, setItem] = useState();
    const [searchResults, setSearchResults] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [username, setUsername] = useState(localStorage.getItem("uname") || "");
    const [existingBooks, setExistingBooks] = useState([]);
    const [checkedBooks, setCheckedBooks] = useState([]);

    const handleCheckboxChange = (index) => {
      setCheckedBooks((prevCheckedBooks) => {
        if (prevCheckedBooks.includes(index)) {
          return prevCheckedBooks.filter((item) => item !== index);
        } else {
          return [...prevCheckedBooks, index];
        }
      });
    };
    

    useEffect(()=>{
        if(username){
            axios.get('http://localhost:5000/tbr/'+username)
                .then((response)=>{
                    setExistingBooks(response.data.books);
                })
                .catch((error)=>{
                    console.error("Error fetching existing books:", error);
                })
        }
    }, [username]);


    const itemChange = (event) =>{
        setItem(event.target.value);
    }

    const handleSearch = () => {
        // Make the API request to the Google Books API
        const apiKey = "AIzaSyA1gjFZSeZUs6XAjzJt3TP3GRRFaHsgzSs"; // Replace with your actual API key
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
        const newBook = {
            
            username: username,
            books: selectedBooks,
          };

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
      
        const tbrData = {
          books: booksData,
        };
      
        const selectedReadings = checkedBooks.map((index) => existingBooks[index]);
      
        const readingsData = {
          books: selectedReadings,
        };
      
        const removeBooksData = checkedBooks.map((index) => existingBooks[index].title); // Extract titles
      
        axios.post("http://localhost:5000/tbr/" + username + "/add-books", tbrData)
          .then((response) => {
            console.log("TBR list saved successfully:", response.data);
            setExistingBooks((prevExistingBooks) => [...prevExistingBooks, ...selectedBooks]);
            setSelectedBooks([]); // Clear the selectedBooks state
          })
          .catch((error) => {
            console.log("Error saving TBR:", error);
          });
      
        axios.post("http://localhost:5000/readings/" + username + "/add-books", readingsData)
          .then((response) => {
            console.log("CheckedBooks added to Readings successfully:", response.data);
          })
          .catch((error) => {
            console.log("Error adding books to Readings: ", error);
          });
      
        axios.post("http://localhost:5000/tbr/" + username + "/remove-books", { bookTitles: removeBooksData }) // Send as an object with the correct property name
          .then((response) => {
            console.log("Books removed from TBR successfully", response.data);
            setCheckedBooks([]);
          })
          .catch((error) => {
            console.log("Error removing books from TBR: ", error);
          });

          window.location.reload();
      };
      

    return(
        <>
            <Header />
            <div className="pt-12 w-full min-h-screen font-montserrat" style={{backgroundImage: `url(${Bookshelf})`}}>
                <div className="pt-8 h-24 bg-pebblegray mx-auto border-2 rounded-2xl border-lavendargray/50" style={{width:"80%"}}>
                    <h1 className="text-3xl text-lavendargray text-center">Your TBR</h1>
                    {console.log(username)}
                </div>
                <div className="flex flex-wrap mt-4 h-auto p-4 pt-2 bg-pebblegray mx-auto border-2 rounded-2xl border-lavendargray/50" style={{width:"80%"}}>
                    <div className="flex text-lavendargray mt-2 mx-auto">
                        <div className="mx-4  font-bold">
                            <AddRoundedIcon onClick={handleSearch} style={{ fontSize: 36 }}/>
                            <span>Add</span>
                            {console.log(searchItem)}
                        </div>
                        
                        <div>
                            <input value={searchItem} onChange={itemChange} type="text" className="p-2 pl-4 h-10 rounded-3xl bg-lavendargray text-pebblegray font-bold" style={{width: "900px"}}></input>
                        </div>
                        <div className="mx-4  font-bold">
                            <AutoStoriesIcon onClick={handleSave} style={{ fontSize: 36 }}/>
                            <span className="ml-2">Save TBR</span>
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
        {existingBooks.length > 0 && (
      <div className="flex flex-wrap flex-col mt-4 text-lavendargray font-montserrat text-xl">
        {/* Display existing books */}
        {existingBooks.map((book, index) => (
          <div key={index} className="flex m-2">
            <input onChange={() => handleCheckboxChange(index)} type="checkbox" checked={checkedBooks.includes(index)} className="h-4 w-4 my-auto"  />
            {console.log(checkedBooks)}
            <span>
              <img src={book.coverImage} alt="Book Cover" className="w-10 h-14 mx-4" />
            </span>
            <span className="my-auto">{book.title}</span>
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
                </div>
            </div>
        </>
    )

};

export default Tbr;