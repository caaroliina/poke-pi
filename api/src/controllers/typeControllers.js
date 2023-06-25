const { Type } = require('../db');
const axios = require("axios");

const getTypes = async () => {
    const types = await Type.findAll();
    if(!types.length){ 
    const apiTypes = (await axios.get("https://pokeapi.co/api/v2/type"));
  const apiTypesRes = apiTypes.data.results
    
  let arrayTypes = [];

  for (const element of apiTypesRes) {
    const types = await Type.create({name : element.name})
    arrayTypes.push(types)
  }
  return arrayTypes;
}
else{ 
  return types; 
}
};


module.exports = {
  getTypes,
};

