import React from "react";
import Header from "../components/Header";
import bookImg from "../images/book1.jpg"
import bookImg2 from "../images/book2.jpg"
import bookImg3 from "../images/book3.jpg"
import TBR from "../components/TbrComp"
import Readings from "../components/myReadings"
import Search from "../components/SearchComp";




function LandingPage()
{
    return(
        <>
        <div>
           <Header />
        </div>
        <div className="flex min-h-screen w-full bg-pebblegray scroll-smooth">
            <div className="flex px-16 my-auto">
                <div className="mr-4">
                    <img src={bookImg} alt="bookImg" className="transition: transform duration-500  hover:scale-125 rounded-lg"></img>
                </div>

                <div className="mx-4">
                    <img style={{width:"236px", height: "295px"}} src={bookImg2} alt="bookImg2" className="transition: transform duration-500 hover:scale-125 rounded-lg"></img>
                </div>
                <div className="mx-4">
                    <img style={{width:"236px", height: "295px"}} src={bookImg3} alt="bookImg3" className="transition: transform duration-500  hover:scale-125 rounded-lg"></img>
                </div>
                
            </div>
            <div className="w-1/3 my-auto">
                <h1 className="font-montserrat font-bold text-lavendargray text-5xl text-center">Discover, Organize, and Immerse</h1>
                <p className="font-thin italic mt-8 text-2xl font-montserrat text-center text-orange-100">Your Gateway to an Infinite World of Novels</p>
            </div>
        </div>
        <div className="">
            <TBR />
        </div>
        <div>
            <Search />
        </div>
        <div className="">
            <Readings />
        </div>
        
        
        
        </>
    )

};

export default LandingPage;