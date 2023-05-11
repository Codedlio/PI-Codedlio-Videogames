
import React from "react";
import Navbar from "../Navbar/Navbar";
import AllGames from "../AllGames/AllGames";



const Home = () => {
    
    return (
        <div className="Home">
            
            <div>
                <Navbar />
            </div>
            <div>
                <AllGames/>
            </div>
        </div>
    )
};


export default Home;