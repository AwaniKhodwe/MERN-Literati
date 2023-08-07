import React from 'react';
import { useNavigate } from 'react-router-dom';



function Header() {

  const navigate = useNavigate();
  const navigateToRead = () =>{
    navigate('/read');
  }
  const navigateToTbr = () =>{
    navigate('/tbr');
  }
  const navigateToSearch = () =>{
    navigate('/search');
  }

  const navigateToLanding = () =>{
    navigate('/landingPage')
  } 

  return (

    <div className='flex bg-pebblegray h-12 font-montserrat'>
        
      <div onClick={navigateToLanding} className='ml-4 my-auto mx-auto' style={{marginRight: "1000px"}}>
        <p className='text-4xl text-rose-50 font-cursive'>Literati</p>
      </div>
    
      <div className='flex text-xl items-center text-rose-50' >
        <div onClick={navigateToTbr} className='px-8 py-2 hover:bg-rose-100/25'>
            <p>TBR</p>
        </div>
        <div onClick={navigateToRead} className='px-8 py-2 hover:bg-rose-100/25'>
            <p>Read</p>
        </div>
        <div onClick={navigateToSearch} className='px-8 py-2 hover:bg-rose-100/25'>
            <p>Search</p>
        </div>
      </div>
    </div>
    
    
  );
}

export default Header;
