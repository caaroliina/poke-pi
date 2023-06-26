const {
    getPokemonsByName,
    getPokemons,
    getPokemonId,
    postPokemon,
    } = require('../controllers/pokemonControllers');
    const { Type } = require('../db');

const getPokemonHandler = async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const pokemonByName = await getPokemonsByName(name);
            if (pokemonByName) {
                return res.json(pokemonByName);
            } else {
                return res.send(`${name} no fue encontrado`);
            }
        } else {
            const allPokemons = await getPokemons();
            return res.json(allPokemons);
        }
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};

const getPokemonIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const pokemonId = await getPokemonId(id);
        if (pokemonId.length === 0) {
            return res.send('No puede ser 0');
        } else {
            return res.json(pokemonId);
        }
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};

const postPokemonHandler = async (req, res) => {
    const { name, sprites, hp, attack, defense, speed, height, weight, types } =
        req.body;
    try {
        if (
            !name ||
            !sprites ||
            !hp ||
            !attack ||
            !defense ||
            !speed ||
            !height ||
            !weight ||
            !types
        ) {
        
        throw Error('missing data');
        }
        let poketTypes = [];
        for (const typeName of types) {
            let typeDB = await Type.findOne({ where: { name: typeName } });
            poketTypes.push(typeDB);
        }
        if (poketTypes.length) {
            const newPokemon = await postPokemon({
                name,
                sprites,
                hp,
                attack,
                defense,
                speed,
                height, 
                weight,
                types: poketTypes.map(type => type.name),
            });
            return res.status(201).json(newPokemon);
        } else {
            for (const typeName of types) {
                const newType = await Type.create({ name: typeName });
            }
            const newPokemon = await postPokemon({
                name,
                sprites,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
                types: newType.name,
            });
            return res.status(201).json(newPokemon);
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getPokemonHandler,
    getPokemonIdHandler,
    postPokemonHandler,
};
