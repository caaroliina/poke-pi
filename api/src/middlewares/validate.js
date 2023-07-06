const validate = (req, res, next) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({error: "The name must not be empty"});

    next();
}

module.exports = {
    validate
}