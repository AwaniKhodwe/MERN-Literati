import React from "react";
// import TbrImg from "../images/library-book-bookshelf-read.jpg"
import { Element } from "react-scroll";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import MyReadings from "../images/myreadings.jpg"
import { useNavigate } from 'react-router-dom';

function MyReads()
{
    const navigate = useNavigate();

    const navigateToRead = () =>{
      navigate('/read');
    }

    return (
        <Element name="fadeInDiv" className="relative h-96">
        {/* This is the div you want to animate */}
        <Fade>
        <Slide right cascade duration={2500}>
            <div className="flex w-full h-96 bg-deeprust " >
                <div className="w-2/3 ">
                    <img className="pr-20 w-full h-full " src={MyReadings}></img>
                </div>
                <div className="w-1/3 pt-24 mr-20 text-center">
                    <h1 className="font-montserrat font-bold text-lavendargray text-5xl text-center">Your Readings</h1>
                    <p className="italic mt-8 text-2xl font-montserrat text-center text-orange-100 font-thin">Explore, track, and curate your personal library with our virtual bookshelf</p>
                    <button onClick={navigateToRead} className="mt-8 w-48 h-12 bg-pebblegray hover:bg-lavendargray/50 text-orange-100 font-semibold font-montserrat py-2 px-4 rounded-full">My Readings</button>
                </div>
                
            </div>
        </Slide>
        </Fade>
        </Element>
        
        
    )
}

export default MyReads;