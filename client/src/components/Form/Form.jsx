import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import validate from "./Validate";
import { getTypes, createPokemon, getPokemons } from "../../redux/action";
import { useNavigate } from "react-router-dom";
import style from './Form.module.css';

const Form = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // global state
    const types = useSelector((state) => state.types);

    //locals states
    const [isFormValid, setIsFormValid] = useState(false);
    const [form, setForm] = useState({
        name: "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: [],
    });

    const [errors, setErrors] = useState({});

    const [availableTypes2, setAvailableTypes2] = useState([]);

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);
    
    const changeHandler = (event) => {
        const { name, value } = event.target;
        setErrors(validate({
            ...form,
            [name]: value,
        }));

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    useEffect(() => {
        const hasErrors = Object.values(errors).some(error => error !== '');
        setIsFormValid(!hasErrors);
    }, [errors]);

    const selectHandler = (event) => {
        if (event.target.name === "type 1") {
            const type1 = event.target.value;
            let type2 = form.types[1];

            if (type2 === type1) {
                type2 = "";
            }

            setForm((prevForm) => ({
                ...prevForm,
                types: [type1, type2],
            }));
            const availableTypes = types.filter((type) => type.name !== type1);
            setAvailableTypes2(availableTypes);
        }
        
        if (event.target.name === "type 2") {
            const type2 = event.target.value;
            setForm((prevForm) => ({
                ...prevForm,
                types: [prevForm.types[0] || "", type2],
            }));
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (!isFormValid) {
            alert('Please complete the form');
            return;
        }

        const NewPoke = {
            name: form.name.toLowerCase(),
            sprites: form.image,
            hp: Number(form.hp),
            attack: Number(form.attack),
            defense: Number(form.defense),
            speed: Number(form.speed),
            height: Number(form.height),
            weight: Number(form.weight),
            types: form.types,
        };

        try {
            dispatch(createPokemon(NewPoke));
            dispatch(getPokemons());
            alert(`Wild ${form.name} appeared`);
            navigate("/home");
        } catch (error) {
            alert('Error while creating the pokemon');
        }
    };

    return (
        <div className={style.container}>
            <h2 className={style.title}>Create a Pokemon</h2>
            <form onSubmit={submitHandler}>
                <div className={style.form}>
                    <div className={style.data}>
                        <div className={style.label}>
                            <label>Name</label>
                        </div>
                        <div className={style.setError}>
                            <input
                                className={style.input}
                                type="text"
                                value={form.name}
                                onChange={changeHandler}
                                name="name"
                            />
                            <div className={style.error}>
                                {errors.name && <p>{errors.name}</p>}
                            </div>
                        </div>
                    </div>
                    <div className={style.data}>
                        <div className={style.label}>
                            <label>HP</label>
                        </div>
                        <div className={style.setError}>
                            <input
                                className={style.input}
                                type="text"
                                value={form.hp}
                                onChange={changeHandler}
                                name="hp"
                            />
                            <div className={style.error}>
                                {errors.hp && <p>{errors.hp}</p>}
                            </div>
                        </div>
                    </div>
                    <div className={style.data}>
                        <div className={style.label}>
                            <label>Attack</label>
                        </div>
                        <div className={style.setError}>
                            <input
                                className={style.input}
                                type="text"
                                value={form.attack}
                                onChange={changeHandler}
                                name="attack"
                            />
                            <div className={style.error}>
                                {errors.attack && <p>{errors.attack}</p>}
                            </div>
                        </div>
                    </div>
                    <div className={style.data}>
                        <div className={style.label}>
                            <label>Defense</label>
                        </div>
                        <div className={style.setError}>
                            <input
                                className={style.input}
                                type="text"
                                value={form.defense}
                                onChange={changeHandler}
                                name="defense"
                            />
                            <div className={style.error}>
                                {errors.defense && <p>{errors.defense}</p>}
                            </div>
                        </div>
                    </div>
                    <div className={style.data}>
                        <div className={style.label}>
                            <label>Speed</label>
                        </div>
                        <div className={style.setError}>
                            <input
                                className={style.input}
                                type="text"
                                value={form.speed}
                                onChange={changeHandler}
                                name="speed"
                            />
                            <div className={style.error}>
                                {errors.speed && <p>{errors.speed}</p>}
                            </div>
                        </div>
                    </div>
                    <div className={style.data}>
                        <div className={style.label}>
                            <label>Weight</label>
                        </div>
                        <div className={style.setError}>
                            <input
                                className={style.input}
                                type="text"
                                value={form.weight}
                                onChange={changeHandler}
                                name="weight"
                            />
                            <div className={style.error}>
                                {errors.weight && <p>{errors.weight}</p>}
                            </div>
                        </div>
                    </div>
                    <div className={style.data}>
                        <div className={style.label}>
                            <label>Height</label>
                        </div>
                        <div className={style.setError}>
                            <input
                                className={style.input}
                                type="text"
                                value={form.height}
                                onChange={changeHandler}
                                name="height"
                            />
                            <div className={style.error}>
                                {errors.height && <p>{errors.height}</p>}
                            </div>
                        </div>
                    </div>
                    <div className={style.data}>
                        <div className={style.label}>
                            <label>Image</label>
                        </div>
                        <div className={style.setError}>
                            <input
                                className={style.input}
                                type="text"
                                value={form.image}
                                onChange={changeHandler}
                                name="image"
                            />
                            <div className={style.error}>
                                {errors.image && <p>{errors.image}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div  className={style.data}>
                    <div className={style.select}>
                        <label>Select Type</label>
                    </div>
                    <div>
                        <select className={style.input} name="type 1" onChange={(select) => selectHandler(select)}>
                            {types?.map((type) => (
                                <option value={type.name} key={type.name}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                
                {form.types.length > 0 ?  (
                    <div className={style.data}>
                        <label className={style.select}>Select Type 2</label>
                        
                        <select className={style.input} name="type 2" onChange={(select) => selectHandler(select)}>
                            {availableTypes2?.map((type) => (
                                <option value={type.name} key={type.name}>
                                    {type.name}
                                </option>
                            ))}
                            </select>
                    </div>
                    ) : (
                    <div></div>
                )}
                <div className={style.renderTypes}>
                    {form.types.length > 0 && 
                    form.types.map((type) => (
                        <div className={style.type}>
                            {type}
                        </div>)
                    )}
                </div>
                <div className={style.buttonContainer}>
                    <button type="submit" className={style.button} disabled={!isFormValid}>SUBMIT</button>
                </div>
            </form>
        </div>
    )
}

export default Form;