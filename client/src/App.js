import React from "react";
import {Route} from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import GameForm from "./components/GameForm/GameForm";
import Detail from "./components/Detail/Detail";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";





function App() {
 
  return (
    <div>
      
      
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/videogame/:id" component={Detail} />
      <Route exact path="/create_game" component={GameForm} />
      <Route path="/" component={Footer}/>
      <Route exact path='/' component={Navbar} />
     

    </div>
  
  );
};

export default App;