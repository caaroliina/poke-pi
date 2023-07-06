const { Pokemon, Type } = require('../db');
const { Op } = require('sequelize');
const axios = require("axios");

function process(poke) {

  return {
    id: poke.data.id,
    name:  poke.data.name,
    image: poke.data['sprites']['other']['official-artwork']['front_default'] || poke.data.sprites.front_default,
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
    let aux = typeName.name;
    array.push(aux);
  }
  return array;
}
function pokeTypeFromObjToStr(poke) {
  return {
    id: poke.id,
    name: poke.name,
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

  const apiPokemons = (await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100")).data.results;
  
  const apiPokemonsUrl = await Promise.all(
    apiPokemons.map(async (element) => {
      const response = await axios.get(element.url);
      return process(response);
    })
  );

  return [...dbPokemons, ...apiPokemonsUrl];
};

const getPokemonsByName = async (PokeName) => {
  const name = PokeName.toLowerCase();

  let PokemonByNameApi = await (await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100")).data.results;
  let namesPoke = []
  for (pokes of PokemonByNameApi){
    namesPoke.push(pokes.name);
  }
  
  let PokemonByName = await Pokemon.findAll({
    where: { name: {[Op.like]: `%${name}%`}},
    include: [{ model: Type, attributes: ["name"] }],
  });

  let arr = []
  let aux = []
  if (PokemonByName) {
    for (poke of PokemonByName){
      arr.push(poke.dataValues)
    }
    for (obj of arr){
      const types = obj.types.map(type => type.name)
      obj.types = types;
      aux.push(obj);
    }
  } 
  
  let filtered = []
  for (poke of namesPoke) {
    poke.includes(`${name}`) && filtered.push(poke)
  }
  const getPokeApi = await Promise.all(filtered.map(async (name)=>{
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    return process(response)
  }))
  return [...aux, ...getPokeApi]
  
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

