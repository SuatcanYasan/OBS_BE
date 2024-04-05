const {pool} = require('../../utils/init')
const md5 = require("md5");

const getUserByEmailAndPassword = async (body) => {
    try {
        return await pool.query(
            `select id,
                email,
                first_name,
                last_name
             from admin_users
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