const { Router } = require('express');
const router = Router();
const { getTypeHandler } = require('../handlers/typeHandler')

router.get("/", getTypeHandler);

module.exports = router;