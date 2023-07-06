import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
import style from './SearchBar.module.css';
import {useDispatch} from 'react-redux';
import { getPokemonName, getPokemons } from '../../redux/action'

const SearchBar = () => {
    const [pokemonName, setPokemonName] = useState("");
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    // const searchPokemon = async () => {
    //     try {
    //         const response = await axios.get(
    //             `http://localhost:3001/pokemon?name=${pokemonName}`
    //         );
    //         const pokemon = response.data;
    //         const id = pokemon.id;
    //         navigate(`/detail/${id}`);
    //     } catch (error) {
    //         console.log("Error occurred while searching for the pokemon:", error);
    //     }
    // };

    const handleChange = (event) => {
        setPokemonName(event.target.value);
            event.target.value.length 
            ? dispatch(getPokemonName(event.target.value))
            : dispatch(getPokemons())
    };

    return(
        <div className={style.container}>
            <input
                placeholder="Search Pokemon"
                type="search"
                value={pokemonName}
                onChange={handleChange}
                className={style.input}
            />
            {/* <button type="button" onClick={searchPokemon} className={style.button}>
                Search
            </button> */}
        </div>
    )
}

export default SearchBar;