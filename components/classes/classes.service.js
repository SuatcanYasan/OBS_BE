const classesRepository = require('./classes.repository')

const getAllClasses = async (req, res) => {
    const {body,user} = req
    const result = await classesRepository.getAllClasses(body,user)
    res.success(result.rows)
}

const getClassesByID = async (req, res) => {
    const {body,user} = req
    req.body.id = req.params.id;
    const result = await classesRepository.getAllClassesByID(body,user)
    if(result.rows.length > 0){
        return res.success(result.rows[0])
    }else{
        return res.error("Ders bulunamadı")
    }
}

const getCurrentClasses = async (req, res) => {
    const {body,user} = req
    req.body.id = req.params.id;
    const result = await classesRepository.getCurrentClasses(body,user)
    if(result.rows.length > 0){
        return res.success(result.rows[0])
    }else{
        return res.error("Ders bulunamadı")
    }
}

const getClassStatus = async (req, res) => {
    const {body,user} = req
    const result = await classesRepository.getClassesStatus(body,user)
    res.success(result.rows[0])
}

module.exports = {
    getAllClasses,
    getClassesByID,
    getCurrentClasses,
    getClassStatus
}