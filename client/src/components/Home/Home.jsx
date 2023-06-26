import CardContainer from '../CardContainer/CardContainer';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "../../redux/action";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(getPokemons());  
    }, [dispatch]);
    
    return (
        <div>
            <CardContainer/>
        </div>
    )
}

export default Home;