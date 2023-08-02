import React from "react";
import { Element } from "react-scroll";
import Fade from "react-reveal/Fade";
import Libshelf from "../images/libraryshelf.png";
import { useNavigate } from 'react-router-dom';

function SearchComp() {

  const navigate = useNavigate();

  const navigateToSearch = () =>{
    navigate('/search');
  }

  return (
    <Element name="fadeInDiv" className="relative h-96">
        {/* This is the div you want to animate */}
        <Fade>
    <div className="w-full h-96" style={{ backgroundImage: `url(${Libshelf})`}}>
      <div className="w-1/3 text-center mx-auto pt-20">
          <h1 className="font-montserrat font-bold text-lavendargray text-5xl text-center">Search with Ease!</h1>
          <p className="italic mt-8 text-2xl font-montserrat text-center text-orange-100 font-bold">Discover your favourite books from beloved authors</p>
          <button onClick={navigateToSearch} className="mt-8 w-48 h-12 bg-rusticred hover:bg-rusticred/75 text-orange-100 font-semibold font-montserrat py-2 px-4 rounded-full">Search</button>
      </div>
    </div>
    </Fade>
    </Element>
    


  );
}


export default SearchComp;
