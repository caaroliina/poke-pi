const { Router } = require('express');
const router = Router();
const { getPokemonHandler, getPokemonIdHandler, postPokemonHandler, deletePokemonHandler } = require('../handlers/pokemonHandler')

router.get("/", getPokemonHandler);
router.get("/:id", getPokemonIdHandler);
router.post("/", postPokemonHandler);
router.delete("/:id", deletePokemonHandler);

module.exports = router;

