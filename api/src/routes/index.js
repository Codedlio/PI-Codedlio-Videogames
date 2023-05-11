const { Router } = require('express');
const genresRoute= require('./genresRoute')
const videogamesRoute = require('./videogamesRoute')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use("/videosgames",genresRoute)
router.use("/videogames",videogamesRoute)
router.use("/genres",genresRoute)


module.exports = router;
