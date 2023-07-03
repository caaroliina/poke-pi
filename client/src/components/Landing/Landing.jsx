import { NavLink } from "react-router-dom";
import style from './Landing.module.css'

const Landing = () => {
    return (
        <div className={style.container}>
            <h1 className={style.title}>Press in the middle of the pokeball</h1>
            <NavLink to="/home" className={style.link}></NavLink>
        </div>
    )
}

export default Landing;