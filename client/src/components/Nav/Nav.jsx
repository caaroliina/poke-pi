import SearchBar from "../SearchBar/SearchBar";
import { NavLink } from "react-router-dom";
import style from './Nav.module.css'

const Nav = () => {
    return (
        <div className={style.container}>
            <NavLink to='/'> <img src="https://jenessa-reika.ca/wp-content/uploads/2020/04/pokemon3.png" alt="Go Landing Page" className={style.img} /></NavLink>
            <NavLink to="/home" className={style.link} >Home</NavLink>
            <NavLink to="/form" className={style.link} >Create Pokemon</NavLink>
            <SearchBar/>
        </div>
    )
}

export default Nav;