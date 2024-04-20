const {pool} = require('../../utils/init')

const getAllClasses = async (data,user) => {
    try {
        return await pool.query(
            `SELECT ac.id,
                    ac.name,
                    COUNT(DISTINCT exams.id)    AS total_exams,
                    COUNT(DISTINCT cc.id)       AS classes_count,
                    COUNT(DISTINCT contents.id) AS contents_count,
                    COUNT(DISTINCT homeworks.id) AS homeworks_count
             FROM all_classes ac
                      LEFT JOIN
                  exams ON ac.id = exams.classes_id
                      LEFT JOIN
                  current_classes cc ON ac.id = cc.classes_id
                      LEFT JOIN
                  contents ON ac.id = contents.classes_id
                      LEFT JOIN
                  homeworks ON ac.id = homeworks.classes_id
             WHERE ac.faculty_id = $1
               AND ac.class = $2
             GROUP BY ac.id;
            `,
            [user.faculty, user.class]

        )
    } catch (e) {
        throw e
    }
}

const getAllClassesByID = async (data,user) => {
    try {
        return await pool.query(
            `select *
             from all_classes
             where faculty_id = $1 and class = $2 and id = $3`,
            [user.faculty, user.class, data.id]

        )
    } catch (e) {
        throw e
    }
}

const getCurrentClasses = async (data,user) => {
    try {
        return await pool.query(
            `select *
             from current_classes
             where faculty_id = $1 and classes_id = $2`,
            [user.faculty, data.id]

        )
    } catch (e) {
        throw e
    }
}

module.exports = {
    getAllClasses,
    getAllClassesByID,
    getCurrentClasses
}