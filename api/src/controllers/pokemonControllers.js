const { Pokemon, Type } = require('../db');
const axios = require("axios");
function process(poke) {

  return {
    id: poke.data.id,
    name:  poke.data.name.charAt(0).toUpperCase() + poke.data.name.slice(1).toLowerCase(),
    
    image: poke.data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] || poke.data.sprites.front_default,
    height: poke.data.height,
    weight: poke.data.weight,
    hp: poke.data.stats.find((element) => element.stat.name === "hp").base_stat,
    attack: poke.data.stats.find((element) => element.stat.name === "attack")
      .base_stat,
    defense: poke.data.stats.find((element) => element.stat.name === "defense")
      .base_stat,
    speed: poke.data.stats.find((element) => element.stat.name === "speed")
      .base_stat,
    types: poke.data.types.map((types) => types.type.name),
  };
}

function typeFilter(obj) {
  let array = [];
  for (const typeName of obj.types) {
    let nueva = typeName.name;
    array.push(nueva);
  }
  return array;
}
function pokeTypeFromObjToStr(poke) {

  return {
    id: poke.id,
    name: poke.name.charAt(0).toUpperCase() + poke.name.slice(1),
    image: poke.sprites,
    height: poke.height,
    weight: poke.weight,
    hp: poke.hp,
    attack: poke.attack,
    defense: poke.defense,
    speed: poke.speed,
    types: typeFilter(poke),
  };
}

const getPokemons = async () => {

  const dbPokemonsNofilter = await Pokemon.findAll({
    include: [{ model: Type, attributes: ["name"] }],
  }); 

  const dbPokemons = [];
  for (const pokemon of dbPokemonsNofilter) {
    dbPokemons.push(pokeTypeFromObjToStr(pokemon));
  }


  const apiPokemons = (
    await axios.get("https://pokeapi.co/api/v2/pokemon?limit=649")
  ).data.results;
  const apiPokemonsUrl = await Promise.all(
    apiPokemons.map(async (element) => {
      const response = await axios.get(element.url);
      return process(response);
    })
  );

  return [...dbPokemons, ...apiPokemonsUrl];
};

const getPokemonsByName = async (PokeName) => {
  let PokemonByName = await Pokemon.findOne({
    where: { name: PokeName },
    include: [{ model: Type, attributes: ["name"] }],
  });
  if (PokemonByName) {
    return pokeTypeFromObjToStr(PokemonByName);
  } else {
    PokemonByName = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${PokeName}`
    );
    return process(PokemonByName);
  }
};

const getPokemonId = async (PokeId) => {
  let PokemonByID = 0;
  if (PokeId.length < 6) {
    PokemonByID = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${PokeId}`
    );
    return process(PokemonByID);
  } else {
    PokemonByID = await Pokemon.findOne({
      where: { id: PokeId },
      include: [{ model: Type, attributes: ["name"] }],
    });
    return pokeTypeFromObjToStr(PokemonByID);
  }
};

const postPokemon = async ({
  name,
  sprites,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  types,
}) => {
  console.log(name);
  let objPokemon = {
    name,
    sprites,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    types,
  };
  let allTypes = [];
  for (const typeName of types) {

    const newType = await Type.findOne({ where: { name: typeName } }); 
    allTypes.push(newType); 
  }
  const newPokemon = await Pokemon.create(objPokemon); 
  await newPokemon.addTypes(allTypes); 
  return newPokemon;
};

module.exports = {
  getPokemonsByName,
  getPokemons,
  getPokemonId,
  postPokemon,
};

