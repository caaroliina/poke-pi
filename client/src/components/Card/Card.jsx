import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPokemonDetail } from '../../redux/action';
import style from './Card.module.css'

const Card = ({ id, name, types, image }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleDetailClick = () => {
        dispatch(getPokemonDetail(id));
        navigate(`/detail/${id}`);
    };
    return(
        <div onClick={handleDetailClick} className={style.container}>
            <div className={style.imgCont}>
                <img src={image} alt={name} className={style.img}/>
            </div>
            <h1 className={style.title}> {name}({id}) </h1>
            
        </div>
    )
}

export default Card;