import {
    GET_POKEMONS,
    GET_POKEMON_ID,
    GET_TYPES,
    POST_POKEMON
  } from "./action-type";
  
  const initialState = {
    pokemons: [],
    detail: {},
    types: []
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_POKEMONS:
        return { ...state, pokemons: action.payload };
      case GET_POKEMON_ID:
        return { ...state, detail: action.payload };
      case GET_TYPES:
        return { ...state, types: action.payload };
      case POST_POKEMON:
        return { ...state, pokemons: action.payload };
      default:
        return { ...state };
    }
  };
  export default reducer;
  