const { getTypes } = require('../controllers/typeControllers');

const getTypeHandler = async (req, res) => {
  try {
    const types = await getTypes();
    return res.json(types);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports = {
  getTypeHandler
};