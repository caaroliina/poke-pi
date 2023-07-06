import axios from "axios";
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

export const getPokemons = () => {
  return async function (dispatch, getState) {
    const apiPokemon = await axios.get("http://localhost:3001/pokemon/");
    const pokemon = apiPokemon.data;
    dispatch({ type: GET_POKEMONS, payload: pokemon });
    const totalItems = pokemon.length;
    const itemsPerPage = getState().pagination.itemsPerPage;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    dispatch({ type: SET_TOTAL_PAGES, payload: totalPages });
  };
};

export const deletePokemon = (id) => {
  return function(dispatch) {
    const pokemon = axios.delete(`http://localhost:3001/pokemon/${id}`)
    dispatch({type: DELETE_POKEMON, payload: pokemon})
  }
}

export const getPokemonName = (name) => {
  return function(dispatch) {
    fetch(`http://localhost:3001/pokemon?name=${name}`)
      .then(response => response.json())
      .then(pokemon => {
        dispatch({
          type: GET_POKEMON_BYNAME,
          payload: pokemon,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getPokemonDetail = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/pokemon/${id}`);
    const pokemon = response.data;
    dispatch({ type: GET_POKEMON_ID, payload: pokemon });
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    const response = await axios(`http://localhost:3001/type`);
    const types = response.data;
    dispatch({ type: GET_TYPES, payload: types });
  };
};

export const createPokemon = (form) => {
  return async (dispatch) => {
    const response = await axios.post("http://localhost:3001/pokemon", form);
    const newPokemon = response.data;
    dispatch({ type: POST_POKEMON, payload: newPokemon });
  };
};

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});
