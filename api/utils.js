const requireUser = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(409);
        next();
    }
};

module.exports = {
    requireUser
};