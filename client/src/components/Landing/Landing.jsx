import { NavLink } from "react-router-dom";
import style from './Landing.module.css'

const Landing = () => {
    return (
        <div className={style.container}>
            <NavLink to="/home"> anda a home loco </NavLink>
        </div>
    )
}

export default Landing;