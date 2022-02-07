const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ msg: "no token provider" })
    }

    jwt.verify(token, "secret", (err, user) => {
        if (err) res.status(403).json({ msg: "no autorizado" });
        next();
    })
}

module.exports = {
    verifyToken
}