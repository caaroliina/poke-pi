import { useSelector } from "react-redux";
import Card from '../Card/Card'
import style from './CardContainer.module.css'

const CardContainer = () => {
    const pokemons = useSelector((state) => state.pokemons);
    return (
        <div className={style.container}>
            <div className={style.filters}>
                <select className={style.select}>
                    <option value="default">Default</option>
                    <option value="A">A-Z Abc</option>
                    <option value="Z">Z-A Abc</option>
                    <option value="MAX">Max to Min Attack</option>
                    <option value="MIN">Min to Max Attack</option>
                </select>

                <select className={style.select}>
                    <option value="ALL">All</option>
                    <option value="API">Vanilla</option>
                    <option value="DB">User created</option>
                </select>
            </div>
            <div className={style.cardsContainer}>
                {
                    pokemons.map((pokemon) => (
                        <Card
                            key={pokemon.id}
                            id={pokemon.id}
                            name={pokemon.name}
                            image={pokemon.image}
                            height={pokemon.height}
                            weight={pokemon.weight}
                            hp={pokemon.hp}
                            attack={pokemon.attack}
                            defense={pokemon.defense}
                            speed={pokemon.speed}
                            types={pokemon.types}
                        />
                    ))
                }
            </div>
            
        </div>
    )
}

export default CardContainer;