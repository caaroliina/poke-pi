import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import style from './Detail.module.css';
import { deletePokemon, getPokemons, getPokemonDetail } from '../../redux/action'

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pokemon = useSelector((state) => state.detail);
    useEffect(() => {
        dispatch(getPokemonDetail(id));
    }, [dispatch, id]);

    const deleteHandler = () => {
        dispatch(deletePokemon(id));
        dispatch(getPokemons());
        navigate("/home");
        alert(`Pokemon has been deleted`);
    }

    return (
        <div className={style.container}>
            { id.length > 6 && <div className={style.delete}><p className={style.deleteButton} onClick={deleteHandler}> delete </p></div> }
            <h1 className={style.name}>{pokemon?.name}</h1>
            <p>id {pokemon?.id}</p>
            <div className={style.detail}>
                <img src={pokemon?.image} alt={pokemon?.name} className={style.img}/>
                <div className={style.data}>
                    <div className={style.statsContainer}>
                        <p className={style.statsName}>height</p>
                        <p className={style.statsNumber}>{pokemon?.height}</p>
                    </div>
                    <div className={style.statsContainer}>
                        <p className={style.statsName}>weight</p>
                        <p className={style.statsNumber}>{pokemon?.weight}</p>
                    </div>
                    <div className={style.statsContainer}>
                        <p className={style.statsName}>hp</p>
                        <p className={style.statsNumber}>{pokemon?.hp}</p>
                    </div>
                    <div className={style.statsContainer}>
                        <p className={style.statsName}>attack</p>
                        <p className={style.statsNumber}>{pokemon?.attack}</p>
                    </div>
                    <div className={style.statsContainer}>
                        <p className={style.statsName}>defense</p>
                        <p className={style.statsNumber}>{pokemon?.defense}</p>
                    </div>
                    <div className={style.statsContainer}>
                        <p className={style.statsName}>speed</p>
                        <p className={style.statsNumber}>{pokemon?.speed}</p>
                    </div>
                </div>

            </div>
                <div className={style.types}>
                    {pokemon?.types &&
                        pokemon.types.map((type, index) => (
                            <span key={index} className={style[type]}>
                                {type}
                            </span>
                        ))
                    }
                </div>
        </div>
    )
}

export default Detail;