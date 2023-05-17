import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  sortGamesByName,
  filterByGenres,
  orderByRating,
  getVideogames,
  listOfGenresAction,
 
} from "../../redux/actions";
import style from "./Filters.module.css";

const Filters = ({ filters, setPage, setInput }) => {
  
  
  const dispatch = useDispatch();
  const { videogames, genres, listOfGenresfiltered } = useSelector(
    (state) => state
  );
  const [hasError, setHasError] = useState(false);
  const handleClickSort = (e) => {
  const order = e.target.value;
  console.log(e.target.value);

  const sortedGames = [...filters].sort((vg1, vg2) => {
    const gameName1 = vg1.name;
    const gameName2 = vg2.name;

    return order === "A-Z"
      ? gameName1.localeCompare(gameName2)
      : gameName2.localeCompare(gameName1);
  });

  dispatch(sortGamesByName(sortedGames));
};

  const handleClickFilter = (e) => {
    
    if (e.target.checked) {
      listOfGenresfiltered.push(e.target.value);
      console.log(e.target.value);
      const filteredByGenre = filters.filter((vg) =>
        vg.genres.includes(e.target.value)
      );
  
      if (filteredByGenre.length === 0) {
        setHasError(true);
      } else {
        setHasError(false);
        dispatch(listOfGenresAction(listOfGenresfiltered));
        dispatch(filterByGenres(filteredByGenre));
        setInput(1);
        setPage(1);
      }
    } else {
      const someFilter = listOfGenresfiltered.filter(
        (gen) => gen !== e.target.value
      );
  
      const uncheckValues = videogames.filter((vg) => {
        return someFilter.every((gen) =>
          vg.genres.some((vg2) => vg2 === gen)
        );
      });
  
      dispatch(listOfGenresAction(someFilter));
      dispatch(filterByGenres(uncheckValues));
      setInput(1);
      setPage(1);
    }
  };

  const handlerClickRating = (e) => {
    if (e.target.value === "Minor to Mayor") {
      const orderUpward = filters.sort((vg1, vg2) => {
        return vg1.rating - vg2.rating;
      });
      dispatch(orderByRating(orderUpward));
    }
    if (e.target.value === "Mayor to Minor") {
      const orderFalling = filters.sort((vg1, vg2) => {
        return vg2.rating - vg1.rating;
      });
      dispatch(orderByRating(orderFalling));
    }
  };

  const handleDeleteFilters = (e) => {
    dispatch(getVideogames());
    window.location.reload();
  };
  if(hasError){
   alert("Not found")
   window.location.reload();
  }
  return (
    
    <div className={style.container_filters}>
      <button name="delete" onClick={(e) => handleDeleteFilters(e)}>
        Reset Filters 
      </button>

      <div className={style.unit_select}>
        
        <div className={style.container_filter_by_genre}>
          {genres?.map((g, i) => {
            return (
              <div key={i} className={style.bygenre_container}>
                <input
                  className={style.input_style}
                  key={g.id}
                  type="checkbox"
                  id={`checkbox-${i}`} 
                  value={g.name}
                  name="genres"
                  onClick={(e) => handleClickFilter(e)}
                />
                <label htmlFor={`checkbox-${i}`} className={style.nameGenre}> {g.name}</label>
              </div>
            );
          })}
        </div>
      </div>

      <div className={style.unit_select}>
        <p></p>
        <div className={style.container_filter_by_genre}>
          <div className={style.bygenre_container}>
            <input
              className={style.input_style}
              value="A-Z"
              key="1"
              type="radio"
              id="radioAZ"
              name="Alphabetic_Order"
              onClick={(e) => handleClickSort(e)}
            />
            <label htmlFor="radioAZ" className={style.nameGenre}> Upward A-Z</label>
          </div>
          <div className={style.bygenre_container}>
            <input
              className={style.input_style}
              value="Z-A"
              key="2"
              id="radioZA"
              type="radio"
              name="Alphabetic_Order"
              onClick={(e) => handleClickSort(e)}
            />
            <label htmlFor="radioZA" className={style.nameGenre}> Downward Z-A</label>
          </div>
        </div>
      </div>

      <div className={style.unit_select}>
        <p></p>
        <div className={style.container_filter_by_genre}>
          <div className={style.bygenre_container}>
            <input
              className={style.input_style}
              value="Minor to Mayor"
              key="minTMay"
              id="radioDown"
              type="radio"
              name="Sort_Ranking"
              onClick={(e) => handlerClickRating(e)}
            />
            <label htmlFor="radioDown" className={style.nameGenre}>Worst-Best</label>
          </div>
          <div className={style.bygenre_container}>
            <input
              className={style.input_style}
              value="Mayor to Minor"
              key="MaTmi"
              type="radio"
              id="radioUp"
              name="Sort_Ranking"
              onClick={(e) => handlerClickRating(e)}
            />
            <label htmlFor="radioUp" className={style.nameGenre}>Best-Worst</label>
          </div>
      
        </div>
      </div>
    </div>
  );
};

export default Filters;
