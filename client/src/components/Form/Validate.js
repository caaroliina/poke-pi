export default function validate(form){
    let error = {};

    // name
    if (form.name.length > 0) error.name = "";
    if (!form.name.length) {
        error.name = "The name must not be empty";
    } else if (!/^[a-zA-Z]+$/.test(form.name)) {
        error.name = "There is an error in the name";
    }

    // hp
    const hp = parseInt(form.hp);
    if (hp !== "") error.hp = "";
    if (isNaN(hp) || hp < 1 || hp > 255) error.hp = "HP should be between 1 and 255";

    // attack
    const attack = parseInt(form.attack);
    if (attack !== "") error.attack = "";
    if (isNaN(attack) || attack < 1 || attack > 255) error.attack = "attack should be between 1 and 255";

    // defense
    const defense = parseInt(form.defense);
    if (defense !== "") error.defense = "";
    if (isNaN(defense) || defense < 1 || defense > 255) error.defense = "Defense should be between 1 and 255";

    // speed
    const speed = parseInt(form.speed);
    if (speed !== "") error.speed = "";
    if (isNaN(speed) || speed < 1 || speed > 255) error.speed = "Speed should be between 1 and 255";

    // weight
    const weight = parseInt(form.weight);
    if (weight !== "") error.weight = "";
    if (isNaN(weight) || weight < 1 || weight > 100) error.weight = "Weight should be between 1 and 100";

    // height
    const height = parseInt(form.height);
    if (height !== "") error.height = "";
    if (isNaN(height) || height < 1 || height > 100) error.height = "Height should be between 1 and 100";

    // image
    // const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    // if (urlRegex.test(form.img)) error.img = "";
    // if (!urlRegex.test(form.img)) error.img = "Invalid URL";

    // types
    if (form.types.length < 2) error.types = "Must enter both types";
    if (form.types.length > 0) error.types = "";
    // } else if (!/^[a-zA-Z]+$/.test(form.name)) {
    //     error.types = "There is an error in the type name";
    // }

    return error;
};