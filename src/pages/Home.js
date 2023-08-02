import React from "react";
import Header from "../components/Header"
import LoginBox from "../components/LoginBox";
import Bookshelf from "../images/bookshelf.jpg"


function Home()
{
    return(
        <div className="w-full h-screen bg-no-repeat bg-cover scroll-smooth" style={{ backgroundImage: `url(${Bookshelf})` }}>
            <Header />
            <LoginBox />
        </div>
    )

};

export default Home;