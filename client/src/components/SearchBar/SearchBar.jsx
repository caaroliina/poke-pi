import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from './SearchBar.module.css';

const SearchBar = () => {
    const [pokemonName, setPokemonName] = useState("");
    const navigate = useNavigate();

    const searchPokemon = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3001/pokemon?name=${pokemonName}`
            );
            const pokemon = response.data;
            const id = pokemon.id;
            navigate(`/detail/${id}`);
        } catch (error) {
            console.log("Error occurred while searching for the pokemon:", error);
        }
    };

    const handleChange = (event) => {
        setPokemonName(event.target.value.toLowerCase());
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
            <button type="button" onClick={searchPokemon} className={style.button}>
                Search
            </button>
        </div>
    )
}

export default SearchBar;