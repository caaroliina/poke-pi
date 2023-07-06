import {
    GET_POKEMONS,
    DELETE_POKEMON,
    GET_POKEMON_BYNAME,
    GET_POKEMON_ID,
    GET_TYPES,
    POST_POKEMON,
    SET_PAGE,
    SET_TOTAL_PAGES,
  } from "./action-type";
  
  const initialState = {
    pokemons: [],
    detail: {},
    types: [],
    pagination: {
      thisPage: 1,
      totalPages: 0,
      totalItems: 0,
      itemsPerPage: 12,
      currentPageItems: [],
    },
  };
  
  const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
      case GET_POKEMONS:
        return { ...state, pokemons: payload };
      case DELETE_POKEMON:
        return {...state, pokemons: payload};
      case GET_POKEMON_ID:
        return { ...state, detail: payload };
      case GET_POKEMON_BYNAME:
        return { ...state, pokemons: payload };
      case GET_TYPES:
        return { ...state, types: payload };
      case POST_POKEMON:
        return { ...state, pokemons: payload };
      case SET_PAGE:
        return {
          ...state,
          pagination: { ...state.pagination, thisPage: payload },
        };
      case SET_TOTAL_PAGES:
        return {
          ...state,
          pagination: { ...state.pagination, totalPages: payload },
        };
      default:
        return { ...state };
    }
  };
  export default reducer;
  