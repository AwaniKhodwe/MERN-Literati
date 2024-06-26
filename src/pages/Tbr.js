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
            axios.get('https://mern-literati-server.vercel.app/tbr/'+username)
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

        const searchTerm = searchItem;
        const url = `https://mern-literati-server.vercel.app/search?s=${searchTerm}`;
        console.log("hello")
        axios
          .get(url)
          .then((response) => {
            console.log(response.data);
            setSearchResults(response.data);
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

      const handleSave = async () => {
  try {
    // Add to TBR
    const booksData = selectedBooks.map((book) => ({
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "N/A",
      coverImage: book.volumeInfo.imageLinks?.thumbnail,
    }));

    const tbrData = { books: booksData };
    await axios.post(`https://mern-literati-server.vercel.app/tbr/${username}/add-books`, tbrData);
    
    // Move to Readings
    const selectedReadings = checkedBooks.map((index) => existingBooks[index]);
    const readingsData = { books: selectedReadings };
    await axios.post(`https://mern-literati-server.vercel.app/readings/${username}/add-books`, readingsData);
    
    // Remove from TBR
    const removeBooksData = checkedBooks.map((index) => existingBooks[index].title);
    await axios.post(`https://mern-literati-server.vercel.app/tbr/${username}/remove-books`, { bookTitles: removeBooksData });

    // Update local state
    setExistingBooks((prevBooks) => prevBooks.filter((_, index) => !checkedBooks.includes(index)));
    setSelectedBooks([]);
    setCheckedBooks([]);

    // Optionally reload the page
    window.location.reload();
  } catch (error) {
    console.error("Error in handleSave:", error);
    // Handle the error appropriately (e.g., show an error message to the user)
  }
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
                            <button className="hover:bg-rose-100/25"><AddRoundedIcon onClick={handleSearch} style={{ fontSize: 36 }}/></button>
                            <span className="">Add</span>
                            {console.log(searchItem)}
                        </div>
                        
                        <div>
                            <input value={searchItem} onChange={itemChange} type="text" className="p-2 pl-4 h-10 rounded-3xl bg-lavendargray text-pebblegray font-bold" style={{width: "900px"}}></input>
                        </div>
                        <div className="mx-4  font-bold">
                            <button className="hover:bg-rose-100/25"><AutoStoriesIcon onClick={handleSave} style={{ fontSize: 36 }}/></button>
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
