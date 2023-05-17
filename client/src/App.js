import React, { useEffect } from "react";
import {Route, Switch} from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import GameForm from "./components/GameForm/GameForm";
import Detail from "./components/Detail/Detail";

import Footer from "./components/Footer/Footer";
import { useLocation } from "react-router-dom";




function App() {
 
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
  return ( 
  
    <div>
      
      <ScrollToTop />
     <Switch>
      
       <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/videogame/:id" component={Detail} />
      <Route exact path="/create_game" component={GameForm} />
      
      
      
      </Switch>
      <Route path='/' component={Footer}/>
    </div>
  
  );
};

export default App;