import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import style from "./Detail.module.css";
import backApp from "../../media/image9.png"
import { getVideogameDetail } from "../../redux/actions"; 
const Detail = () => {
  // const { id } = match.params;
  const gameDetail = useSelector((state) => state.videogameDetail);
  const errors = useSelector((state) => state.error);
  // const dispatch=useDispatch();

  // ( () =>{ 
  //   dispatch(getVideogameDetail(id));
  // },[]);

  if (Object.keys(errors).length) {
    return (
      <div>
        <h1>Has ocurred an error</h1>
      </div>
    );
  }
  return (
    <div className={style.mayor}>
      
      <div className={style.container_creategame}>
        <div className={style.container_main_image}>
          <img
            src={gameDetail.image}
            alt="imagen3"
            className={style.main_image}
          />
        </div>
        <div className={style.data_container}>
          <div>
            <h1 className={style.title}>{gameDetail.name}</h1>
          </div>
          <div className={style.description_container}>
            
            <p className={style.sentence}>{gameDetail.description}</p>
          </div>
          <div className={style.all_genres}>
            <p className={style.subtitle}>Genres</p>
            <div className={style.list}>
              {gameDetail.genres?.map((game, index) => {
                if (game.hasOwnProperty("name")) {
                  return (
                    <p key={index} className={style.unit}>
                      {game.name}
                    </p>
                  );
                }
                return (
                  <p key={index} className={style.unit}>
                    {game}
                  </p>
                );
              })}
            </div>
          </div>
          <div>
            <p className={style.subtitle}>Platforms:</p>
            <div className={style.list}>
              {gameDetail.platforms?.map((platform, index) => (
                <p key={index} className={style.unit}>
                  {platform}
                </p>
              ))}
            </div>
          </div>
          <div className={style.back_tohome}>
            <NavLink to="/home" className={style.link}>
              <img src={backApp} alt="logoApp" className={style.logo} />
            </NavLink>
          </div>
          
        </div>
        
        <div className={style.rating_container}>
          <p className={style.rating}>{gameDetail.released}</p>
          <p className={style.rating}>{gameDetail.rating}🟊</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
