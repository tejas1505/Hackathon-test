var jwt = require('jsonwebtoken');
const JWT_SECRET = 'hackathon'

const middleware = (req, res, next) => {
    // Get the user form jwt token and add id to req object
    const token = req.header('Authorization')
    if (!token) {
        res.status(401).json({ error: "Token is missing" })
    }

    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).json({ error: "Plese authenticate using a valid token" })
    }
}

module.exports = middleware