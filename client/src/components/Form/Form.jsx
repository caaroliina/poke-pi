import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import validate from "./Validate";
import { getTypes, createPokemon, getPokemons } from "../../redux/action";
import { useNavigate } from "react-router-dom";

const Form = () => {
    const types = useSelector((state) => state.types);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

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

    const changeHandler = (event) => {
    setForm({
        ...form,
        [event.target.name]: event.target.value,
    });
    setErrors(
        validate({
            ...form,
            [event.target.name]: event.target.value,
        })
    );
    };

    const selectHandler = (event) => {
        if (event.target.name === "type 1") {
            setForm((prevForm) => ({
            ...prevForm,
            types: [event.target.value, prevForm.types[1] || ""],
        }));
        }

        if (event.target.name === "type 2") {
            setForm((prevForm) => ({
                ...prevForm,
                types: [prevForm.types[0] || "", event.target.value],
            }));
        }
    };

const submitHandler = (event) => {
    event.preventDefault();
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
        alert(`A Wild ${form.name} has Appeared`);
        dispatch(createPokemon(NewPoke));
        dispatch(getPokemons());
        navigate("/home");
    };

    return (
        <div>
            <h1>Form</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label>name: </label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={changeHandler}
                        name="name"
                    />
                </div>
                {errors.name && <p>{errors.name}</p>}
                <div>
                    <label>hp: </label>
                    <input
                        type="text"
                        value={form.hp}
                        onChange={changeHandler}
                        name="hp"
                    />
                </div>
                {errors.hp && <p>{errors.hp}</p>}
                <div>
                    <label>attack: </label>
                    <input
                        type="text"
                        value={form.attack}
                        onChange={changeHandler}
                        name="attack"
                    />
                </div>
                {errors.attack && <p>{errors.attack}</p>}
                <div>
                    <label>defense: </label>
                    <input
                        type="text"
                        value={form.defense}
                        onChange={changeHandler}
                        name="defense"
                    />
                </div>
                {errors.defense && <p>{errors.defense}</p>}
                <div>
                    <label>speed: </label>
                    <input
                        type="text"
                        value={form.speed}
                        onChange={changeHandler}
                        name="speed"
                    />
                </div>
                {errors.speed && <p>{errors.speed}</p>}
                <div>
                    <label>weight: </label>
                    <input
                        type="text"
                        value={form.weight}
                        onChange={changeHandler}
                        name="weight"
                    />
                </div>
                {errors.weight && <p>{errors.weight}</p>}
                <div>
                    <label>height: </label>
                    <input
                        type="text"
                        value={form.height}
                        onChange={changeHandler}
                        name="height"
                    />
                </div>
                {errors.height && <p>{errors.height}</p>}
                <div>
                    <label>image: </label>
                    <input
                        type="text"
                        value={form.image}
                        onChange={changeHandler}
                        name="image"
                    />
                </div>
                {errors.image && <p>{errors.image}</p>}
                <div>
                    <label>type 1: </label>
                    <select name="type 1" onChange={(select) => selectHandler(select)}>
                        {types?.map((type) => (
                        <option value={type.name} key={type.name}>
                            {type.name}
                        </option>
                        ))}
                    </select>
                </div>
                {form.types.length > 0 ? (
                <div>
                    <label>type 2: </label>
                    <select name="type 2" onChange={(select) => selectHandler(select)}>
                    {types.map((type) => (
                        <option value={type.name} key={type.name}>
                        {type.name}
                        </option>
                    ))}
                    </select>
                </div>
                ) : (
                <div></div>
                )}
                <button type="submit">SUBMIT</button>
            </form>
        </div>
    )
}

export default Form;