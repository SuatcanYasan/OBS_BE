const {pool} = require('../../utils/init')
const md5 = require("md5");

const getUserByEmailAndPassword = async (body) => {
    try {
        return await pool.query(
            `select id,
                name,
                lastname,
                email,
                faculty,
                class,
                email,
                role
             from users
             where email = $1
               and password = $2`,
            [body.email,md5(body.password)]

        )
    } catch (e) {
        throw e
    }
}

module.exports = {
    getUserByEmailAndPassword
}