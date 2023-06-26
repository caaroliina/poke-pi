export default function validate(form){
    let error = {};

    // name
    if (!form.name.length) {
        error.name = "Enter a name";
    } else if (!/^[a-zA-Z]+$/.test(form.name)) {
        error.name = "There is an error in the name";
    }

    // hp
    const hp = parseInt(form.hp);
    if (isNaN(hp) || hp < 1 || hp > 255) {
        error.hp = "It must be between 1 and 255";
    }

    // attack
    const attack = parseInt(form.attack);
    if (isNaN(attack) || attack < 1 || attack > 255) {
        error.attack = "It must be between 1 and 255";
    }

    // defense
    const defense = parseInt(form.defense);
    if (isNaN(defense) || defense < 1 || defense > 255) {
        error.defense = "It must be between 1 and 255";
    }

    // speed
    const speed = parseInt(form.speed);
    if (isNaN(speed) || speed < 1 || speed > 255) {
        error.speed = "It must be between 1 and 255";
    }

    // weight
    const weight = parseInt(form.weight);
    if (isNaN(weight) || weight < 1 || weight > 100) {
        error.weight = "It must be between 1 and 100";
    }
    // height
    const height = parseInt(form.height);
    if (isNaN(height) || height < 1 || height > 100) {
        error.height = "It must be between 1 and 100";
    }

    // image
    const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    if (!urlRegex.test(form.img)) {
        error.img = "Invalid URL";
    }

    // types
    if (!form.types.length) {
        error.types = "Enter a type name";
    } else if (!/^[a-zA-Z]+$/.test(form.name)) {
        error.types = "There is an error in the type name";
    }

    return error;
};