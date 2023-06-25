const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const typeRouter = require('./TypeRouter');
const pokemonRouter = require('./PokemonRouter');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemon', pokemonRouter);

router.use('/type', typeRouter);

module.exports = router;
