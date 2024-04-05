const authRepository = require('./auth.repository')
const jwt = require("jsonwebtoken");

const login = async (req, res) => {

    const result = await authRepository.getUserByEmailAndPassword(req.body)
    if(!result){
        return res.error("Invalid email or password")
    } else{
        const access_token = jwt.sign(result.rows[0], process.env.privateKey, {expiresIn: '1d'})
        return res.success({access_token: access_token, ...result.rows[0]})
    }
}



module.exports = {
    login
}