const jwt =  require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = req.headers.token || req.headers.access_token
    if (!token) return res.status(401).send("Invalid Token.")
    try {
        req.user = jwt.verify(token, process.env.privateKey, {ignoreExpiration: false})
        next()
    } catch (exception) {
        res.status(401).send("Invalid Token.")
    }
}

