const {message} = require("./standartResponse");
const bodyValidate = async function (req, res, next) {
    try {
        await req.validateSchema.validateAsync(req.body);
        next()
    } catch (error) {
        res.send(error.details[0].message)
    }
}
const paramValidate = async function (req, res, next) {
    try {
        await req.validateSchema.validateAsync(req.params);
        next()
    } catch (error) {
        res.send(error.details[0].message)
    }
}

module.exports = {
    bodyValidate,
    paramValidate
}