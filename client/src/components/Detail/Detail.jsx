import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonDetail } from "../../redux/action";

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const state = useSelector((state) => state.detail);
    const pokemon = state;
    useEffect(() => {
        dispatch(getPokemonDetail(id));
    }, [dispatch, id]);

    return (
        <div>
            <h1 >{pokemon?.name}</h1>
            <img src={pokemon?.image} alt={pokemon?.name} />
            <div>
                <p>id {pokemon?.id}</p>
                <p>height {pokemon?.height}</p>
                <p>weight {pokemon?.weight}</p>
                <p>hp {pokemon?.hp}</p>
                <p>attack {pokemon?.attack}</p>
                <p>defense {pokemon?.defense}</p>
                <p>speed {pokemon?.speed}</p>

                <div>
                    {pokemon?.types &&
                    pokemon.types.map((type, index) => (
                        <span key={index} >
                        {type}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Detail;