const { Router } = require('express');
const router = Router();
const { getPokemonHandler, getPokemonIdHandler, postPokemonHandler } = require('../handlers/pokemonHandler')

router.get("/", getPokemonHandler);
router.get("/:id", getPokemonIdHandler);
router.post("/", postPokemonHandler);

module.exports = router;

