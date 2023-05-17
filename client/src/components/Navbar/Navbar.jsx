import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Navbar.module.css";
import logo from "../../media/image1.PNG";
import { useState,useEffect} from "react";
import audioURL from '../../media/audio.mp3'
import videoURL from '../../media/fire9.gif'


const audio = new Audio(audioURL);
const NavBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!isPlaying) {
      audio.play();
      document.body.style.background = `url(${videoURL})`;
      

    } else {
      audio.pause();
      audio.load();
      document.body.style.background = "black";
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      document.body.style.background = "black";
    });
  }, []);

  
  
  return (
    <div className={style.container_nav}>
      <div>
       <img onClick={togglePlay} src={logo} alt="logoApp" className={style.logo} />
    </div>
     
      
      <div className={style.container_link}>
        <NavLink to="/create_game" className={style.create_link}>
         Create Custom Game
        </NavLink>
      </div>
      <SearchBar />
    </div>
  );
};

export default NavBar;
