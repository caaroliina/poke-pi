import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setPage, getTypes } from '../../redux/action';
import Pagination from '../Paginado/Paginado';
import Card from '../Card/Card'
import style from './CardContainer.module.css'

const CardContainer = () => {
    const pokemons = useSelector((state) => state.pokemons);
    const types = useSelector((state) => state.types)

    const pagination = useSelector((state) => state.pagination);
    const [selectedType, setSelectedType] = useState("");
    const [pokemonType, setPokemonType] = useState("");
    const [order, setOrder] = useState("");

    const dispatch = useDispatch();
    const { thisPage, itemsPerPage } = pagination;

    const { pathname } = useLocation();
    useEffect(() => {
        dispatch(getTypes());
      }, [dispatch]);
    
      useEffect(() => {
        dispatch(setPage(1));
      }, [selectedType, pokemonType, dispatch]);
    
      let pokeCopy = pokemons instanceof Array ? [...pokemons] : [];
    
      switch (pokemonType) {
        case "API":
          pokeCopy = pokeCopy.filter((poke) => typeof poke.id === "number");
          break;
        case "DB":
          pokeCopy = pokeCopy.filter((poke) => typeof poke.id === "string");
          break;
        default:
          break;
      }
    
      const filteredPokemons = selectedType
        ? pokeCopy.filter((poke) => poke.types.includes(selectedType))
        : pokeCopy;
    
      const orderedPokemons = filteredPokemons.slice().sort((a, b) => {
        switch (order) {
          case "asc":
            return a.name.localeCompare(b.name);
          case "desc":
            return b.name.localeCompare(a.name);
          case "maxAttack":
            return b.attack - a.attack;
          case "minAttack":
            return a.attack - b.attack;
          default:
            return 0;
        }
      });
    
      const totalPages = Math.ceil(orderedPokemons.length / itemsPerPage);
    
      const startIndex = (thisPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
    
      const thisPagePokemons = orderedPokemons.slice(startIndex, endIndex);
    
      const handlePageChange = (page) => {
        dispatch(setPage(page));
      };
    
      const handleChange = (event) => {
        setPokemonType(event.target.value);
      };
    
      const handleChangeType = (event) => {
        setSelectedType(event.target.value);
      };
    
      const handleOrderChange = (event) => {
        const selectedOrder = event.target.value;
    
        switch (selectedOrder) {
          case "A":
            setOrder("asc");
            break;
          case "Z":
            setOrder("desc");
            break;
          case "MAX":
            setOrder("maxAttack");
            break;
          case "MIN":
            setOrder("minAttack");
            break;
          default:
            setOrder("");
            break;
        }
      };
    
    return (
        <div className={style.container}>
            <div className={style.filters}>
                <select className={style.select} onChange={handleOrderChange}>
                    <option value="default">Default</option>
                    <option value="A">A-Z</option>
                    <option value="Z">Z-A</option>
                    <option value="MAX">Max-Min Attack</option>
                    <option value="MIN">Min-Max Attack</option>
                </select>

                <select className={style.select} value={pokemonType} onChange={handleChange}>
                    <option value="ALL">All</option>
                    <option value="API">Pokedex</option>
                    <option value="DB">Created</option>
                </select>

                {types && types.length > 0 && (
                    <select className={style.select} value={selectedType} onChange={handleChangeType} >
                        <option value="">All Types</option>
                        {types.map((type) => (
                          <option value={type.name} key={type.name}>
                              {type.name}
                          </option>
                        ))}
                    </select>
                )}
            </div>
            <div className={style.background}>
              <div className={style.cardsContainer}>
                {thisPagePokemons && thisPagePokemons.length > 0 ? (
                    thisPagePokemons.map((pokemon) => { 
                      return (
                        <Card
                            key={pokemon.id}
                            id={pokemon.id}
                            name={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase()}
                            image={pokemon.image}
                            height={pokemon.height}
                            weight={pokemon.weight}
                            hp={pokemon.hp}
                            attack={pokemon.attack}
                            defense={pokemon.defense}
                            speed={pokemon.speed}
                            types={pokemon.types}
                        />
                    );
                    })
                ) : 
                (pokemons &&
                (<div className={style.load}> 
                  <h1>Loading Pokemons</h1>
                  <h2>enjoy the dance</h2>
                  <img src="https://i.pinimg.com/originals/fc/97/aa/fc97aa05928cd575d7ac43dcc76e2cbd.gif" alt="eve bailando" />
                </div>)) 
                }
              </div>
            </div>
            

            {
                !pathname.includes("detail") && (
                    <div className={style.pagination}>
                        <Pagination
                            thisPage={thisPage}
                            totalPages={totalPages}
                            pageChange={handlePageChange}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default CardContainer;