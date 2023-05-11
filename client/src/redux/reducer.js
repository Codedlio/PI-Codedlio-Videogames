import {
  ERROR,
  GET_VIDEOGAMES,
  GET_VIDEOGAME_DETAIL,
  GET_GENRES,
  SEARCH_VIDEOGAME,
  SORT_GAMES_BY_NAME,
  FILTER_BY_GENRES,
  ORDER_BY_RATING,
  LIST_OF_GENRES_FILTERED,
} from "./actions";

const initialState = {
  videogames: [],
  videogamesFiltered: [],
  listOfGenresfiltered: [],
  videogameDetail: {},
  error: {},
  
  orderRating: [],
  genres: [],
  
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ERROR:
      return {
        ...state,
        error: payload,
      };

    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: payload,
        videogamesFiltered: payload,
      };

    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        videogameDetail: payload,
      };

    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      };

    case SEARCH_VIDEOGAME:
      return {
        ...state,
        videogamesFiltered: payload,
      };


    case SORT_GAMES_BY_NAME:
      return {
        ...state,
        videogamesFiltered: [...payload],
      };

    case FILTER_BY_GENRES:
      return {
        ...state,
        videogamesFiltered: [...payload],
      };

    case LIST_OF_GENRES_FILTERED:
      return {
        ...state,
        listOfGenresfiltered: [...payload],
      };

    case ORDER_BY_RATING:
      return {
        ...state,
        videogamesFiltered: [...payload],
      };

    default:
      return { ...state };
  }
}

