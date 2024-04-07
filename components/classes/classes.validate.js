const Joi = require('joi');
const validateCheck = require("./../../utils/validateCheck");

const paramsValidate = async function (req, res, next) {
    req.validateSchema = Joi.object({
        id: Joi.number().required(),
    });
    await validateCheck.paramValidate(req, res, next)
}

module.exports = {
    paramsValidate
}