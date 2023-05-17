import style from "./AllGames.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getGenres } from "../../redux/actions";
import GameCard from "../GameCard/GameCard";
import Pagination from "../Pagination/Pagination";
import Filters from "../Filters/Filters";
import Loading from "../Loading/Loading";
import NotFound from "../NotFound/NotFound"
const AllGames = () => {
    const [page, setPage] = useState(1);
    const [input, setInput] = useState(1);
    const byPage = 15;
    
    
    const dispatch = useDispatch();
    const {  videogamesFiltered, error } = useSelector(
      (state) => state
    );
  
    let filters = videogamesFiltered;
  
    useEffect(() => {
      
      dispatch(getVideogames());
      dispatch(getGenres());
      
    }, [dispatch]);
  
  
    const max = Math.ceil(filters.length / byPage);
  
    if (filters.length) {
        return (
          <div> 
            <div className={style.main_container}>
            <Filters filters={filters} setPage={setPage} setInput={setInput} />
              <div className={style.supreme_container}>
               
              </div>
              <div>
                <div className={style.gamecards_container}>
                  {filters
                    ?.slice((page - 1) * byPage, (page - 1) * byPage + byPage)
                    .map((vg,index) => (
                      <GameCard
                        key={index}
                        id={vg.id}
                        name={vg.name}
                        released={vg.released}
                        image={vg.image}
                        rating={vg.rating}
                        genres={vg.genres}
                        platforms={vg.platforms}
                      />
                    ))}
                </div>
              </div>
            </div>
            <div className={style.content_container}>
              <Pagination
                page={page}
                setPage={setPage}
                max={max}
                input={input}
                setInput={setInput}
              />
            </div>
          </div>
        );
      }
      if (Object.keys(error).length) {
        return (
          <div>
            <Filters filters={filters} setPage={setPage} setInput={setInput} />
            <NotFound/>
          </div>
        );
      } else {
        return (
          <div>
            
            <Loading/>
          </div>
        );
      }
    };
    
    export default AllGames;
    
  