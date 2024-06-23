import React from "react";
// import TbrImg from "../images/library-book-bookshelf-read.jpg"
import { Element } from "react-scroll";
import Bookshelf2 from "../images/bookshelf2.jpg"
import { useNavigate } from 'react-router-dom';

function TbrComp()
{
    const navigate = useNavigate();

    const navigateToTbr = () =>{
      navigate('/tbr');
    }
    return (
        <Element name="fadeInDiv" className="relative h-96">
        {/* This is the div you want to animate */}

            <div className="flex w-full h-96 bg-deeprust " >
                <div className="w-1/3 pt-24 ml-20 text-center">
                    <h1 className="font-montserrat font-bold text-lavendargray text-5xl text-center">Create your TBR</h1>
                    <p className="italic mt-8 text-2xl font-montserrat text-center text-orange-100 font-bold">For the books that just can't be on your bookshelf yet</p>
                    <button onClick={navigateToTbr} className="mt-8 w-48 h-12 bg-pebblegray hover:bg-lavendargray/50 text-orange-100 font-semibold font-montserrat py-2 px-4 rounded-full">Create TBR</button>
                </div>
                <div className="w-2/3 ">
                    <img className="pl-20 w-full h-full " src={Bookshelf2}></img>
                </div>
            </div>

        </Element>
        
        
    )
}

export default TbrComp;
