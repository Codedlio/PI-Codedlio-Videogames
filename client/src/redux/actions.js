import axios from "axios";

export const ERROR = "ERROR";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const GET_GENRES = "GET_GENRES";
export const SEARCH_VIDEOGAME = "SEARCH_VIDEOGAME";

export const SORT_GAMES_BY_NAME = "SORT_GAMES_BY_NAME";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const LIST_OF_GENRES_FILTERED = "LIST_OF_GENRES_FILTERED";


export const getVideogames = (name) => {
  return async function (dispatch) {
    
    try {
      
      if (!name) {
        const storedData = window.sessionStorage.getItem("allGames");
          if (storedData) {
            const data=JSON.parse(storedData)
        return dispatch({
          type: GET_VIDEOGAMES,
          payload: data,
        }); 
        }
        
        const {data} = await axios.get("http://localhost:3001/videogames");
        window.sessionStorage.setItem("allGames", JSON.stringify(data));
        //console.log(videogames)
        return dispatch({
          type: GET_VIDEOGAMES,
          payload: data,
        });
      } else {
        const {data} = await axios.get(
          `http://localhost:3001/videogames?name=${name}`
        );
        
        return dispatch({
          type: SEARCH_VIDEOGAME,
          payload: data,
        });
      }
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const getVideogameDetail = (id) => {
  return async function (dispatch) {
    try {
      const {data} = await axios.get(
        `http://localhost:3001/videogames/${id}`
      );
      
      return dispatch({
        type: GET_VIDEOGAME_DETAIL,
        payload: data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};



export const getGenres = () => {
  return async function(dispatch) {
    try {
      // Verificamos si los géneros están almacenados en sessionStorage
      const storedGenres = window.sessionStorage.getItem("genres");
      if (storedGenres) {
        // Si los géneros están almacenados en sessionStorage, los recuperamos
        const genres = JSON.parse(storedGenres);
        return dispatch({
          type: GET_GENRES,
          payload: genres,
        });
      } else {
        // Si los géneros no están almacenados en sessionStorage, hacemos la petición a la API
        const response = await axios.get("http://localhost:3001/genres");
        const genres = response.data;
        // Guardamos los géneros en sessionStorage
        window.sessionStorage.setItem("genres", JSON.stringify(genres));
        return dispatch({
          type: GET_GENRES,
          payload: genres,
        });
      }
    } catch (error) {
      console.log(error);
      return dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};



export const sortGamesByName = (order) => {
  return async function (dispatch) {
    dispatch({
      type: SORT_GAMES_BY_NAME,
      payload: order,
    });
  };
};

export const filterByGenres = (array) => {
  return async function (dispatch) {
    dispatch({
      type: FILTER_BY_GENRES,
      payload: array,
    });
  };
};

export const listOfGenresAction = (genres) => {
  return async function (dispatch) {
    dispatch({
      type: LIST_OF_GENRES_FILTERED,
      payload: genres,
    });
  };
};

export const orderByRating = (array) => {
  return async function (dispatch) {
    dispatch({
      type: ORDER_BY_RATING,
      payload: array,
    });
  };
};