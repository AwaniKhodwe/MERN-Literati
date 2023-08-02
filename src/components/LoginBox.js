import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginBox() {
    const navigate = useNavigate();

    const navigateToLandingPage = () => {
        navigate('/landingPage');
    }

    const [errorMessage, setErrorMessage] = useState('');

    const [uname, setUname] = useState('');
    const [pword,  setPword] = useState('');

    const unameChange = (event) =>{
        setUname(event.target.value);
    }
    const pwordChange = (event) =>{
        setPword(event.target.value);
    }


    const onLogin = async (event) => {
        event.preventDefault();
        localStorage.setItem("uname", uname);
        try {
          const response = await axios.post("http://localhost:5000/users/login", {
            uname: uname,
            pword: pword,
          });
          console.log(response.data.message);
          setErrorMessage(""); // Clear any previous error message
          navigateToLandingPage(); // Navigate to the landing page on successful login
        } catch (error) {
          if (error.response) {
            console.log(error.response.data.error);
            setErrorMessage(error.response.data.error);
          } else {
            console.log("Network Error");
            setErrorMessage("Network Error");
          }
        }
      };

    const onSignUp = (event) =>{

        event.preventDefault();
        localStorage.setItem("uname", uname);
        console.log(uname);
        console.log(pword);

        axios.post("http://localhost:5000/users/signup", {
            uname: uname,
            pword: pword
        })
        .then(function (response) {
            console.log(response);
          })

        navigateToLandingPage();
    }


    

    return (
        <div className="font-montserrat font-bold">
            <div className='flex flex-col mt-32 mx-auto w-96 h-96 bg-lavendargray/75 rounded-lg  text-pebblegray'>
                <div className="pt-4 mx-auto font-semibold">
                    <p className="text-3xl">Login</p>
                </div>
                <div className=" mx-4 border-t-2 mt-2 border-pebblegray/50">
                    {/* <p className="text-xl">Username</p>
                    <input type="text" className="mt-2 rounded-lg" style={{ width: "350px", height: "36px" }}></input>
                    <p className="text-xl mt-4">Password</p>
                    <input type="text" className="h-8 w-80 mt-2 rounded-lg" style={{ width: "350px", height: "36px" }}></input> */}
                    <form>
                        <div>
                            
                            <label className="text-xl">Username</label>
                            <input value={uname} onChange={unameChange} type="text" name="username" required className="rounded-lg pl-2" style={{ width: "350px", height: "36px" }}></input>
                            {console.log(uname)}
                        </div>
                        <div className="mt-4 mb-4">
                            <label className="text-xl">Password</label>
                            <input value={pword} onChange={pwordChange} type="password" name="password" required className=" rounded-lg pl-2" style={{ width: "350px", height: "36px" }}></input>
                            {console.log(pword)}
                            
                        </div>
                        <div className="mt-8 mx-auto text-center">
                            
                            <button onClick={onLogin}  className="w-32 bg-pebblegray hover:bg-yellow-800 text-rose-100 font-bold py-2 px-4 rounded-full" type="submit">Log In</button>
                            <p className="text-center m-1">or</p>
                            <button onClick={onSignUp} className="w-32 bg-pebblegray hover:bg-yellow-800 text-rose-100 font-bold py-2 px-4 rounded-full" type="submit">Sign Up</button>
                            {errorMessage && <p className="text-center" style={{color: "red"}}>{errorMessage}</p>}
                        </div>
                    </form>

                </div>
                
            </div>
        </div>
    );
}

export default LoginBox;
