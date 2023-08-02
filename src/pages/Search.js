import React from "react";
import Header from "../components/Header";

function Search()
{
    return(
        <>
            <Header />
            <div className="flex">
                <div className="mx-auto mt-20">
                    <input className="h-12 pl-4 bg-lavendargray rounded-3xl" type="text" style={{width: "950px"}}></input>
                </div>
            </div>
        </>
    )

};

export default Search;