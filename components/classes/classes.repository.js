const {pool} = require('../../utils/init')

const getAllClasses = async (data,user) => {
    try {
        return await pool.query(
            `SELECT ac.id,
                    ac.name,
                    CAST(COUNT(DISTINCT exams.id) AS INT)     AS exams_count,
                    CAST(COUNT(DISTINCT cc.id) AS INT)        AS classes_count,
                    CAST(COUNT(DISTINCT cc_contents.id) AS INT) AS contents_count,
                    CAST(COUNT(DISTINCT homeworks.id) AS INT) AS homeworks_count
             FROM all_classes ac
                      LEFT JOIN exams ON ac.id = exams.classes_id
                      LEFT JOIN current_classes cc ON ac.id = cc.classes_id AND cc.type = 1
                      LEFT JOIN current_classes cc_contents ON ac.id = cc_contents.classes_id AND cc_contents.type = 0
                      LEFT JOIN homeworks ON ac.id = homeworks.classes_id
             WHERE ac.faculty_id = $1
               AND ac.class = $2
             GROUP BY ac.id;`,
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
            `select id,
                    title,
                    type,
                    url,
                    start_date,
                    week
             from current_classes
             where faculty_id = $1
               and classes_id = $2`,
            [user.faculty, data.id]

        )
    } catch (e) {
        throw e
    }
}

const getClassesStatus = async (data,user) => {
    try {
        return await pool.query(
            `SELECT (SELECT COUNT(1) FROM exams)                                      AS total_exam,
                    (SELECT COUNT(1) FROM homeworks)                                  AS total_homework,
                    (SELECT COUNT(1) FROM current_classes where type = 0)            AS total_content,
                    (SELECT COUNT(1) FROM current_classes where type = 1)             AS total_classes,
                    (SELECT COUNT(1) FROM exams WHERE $1 = ANY (completed_users))     AS completed_exams,
                    (SELECT COUNT(1) FROM homeworks WHERE $1 = ANY (completed_users)) AS completed_homework,
                    (SELECT COUNT(1)
                     FROM current_classes
                     WHERE $1 = ANY (completed_users)
                       and type = 0)                                                  AS completed_contents,
                    (SELECT COUNT(1)
                     FROM current_classes
                     WHERE $1 = ANY (completed_users)
                       and type = 1)                                                  AS completed_classes;`,
            [user.id]
        );
    } catch (e) {
        throw e
    }
}

const completeClasses = async (data, user) => {
    try {
        return await pool.query(
            `UPDATE current_classes
             SET completed_users = array_append(completed_users, $1)
             WHERE faculty_id = $2
               AND classes_id = $3
               AND id = $4
               AND NOT ($1 = ANY(completed_users))`,
            [user.id, user.faculty, data.id, data.classes_id]
        );
    } catch (e) {
        throw e;
    }
}

module.exports = {
    getAllClasses,
    getAllClassesByID,
    getCurrentClasses,
    getClassesStatus,
    completeClasses
}