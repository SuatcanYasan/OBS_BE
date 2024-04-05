const router = require('express').Router()
const AuthService = require('./auth.service')
const validate = require('./auth.validate')
const middleware = require("../../middlewares/middleware");

router.post('/login', validate.login, AuthService.login)

module.exports = router