import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Navbar.module.css";
import logo from "../../media/image1.PNG";

const NavBar = () => {
  return (
    <div className={style.container_nav}>
      <img src={logo} alt="logoApp" className={style.logo} />
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
