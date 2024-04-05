const router = require('express').Router()
const authMainRoute = require('./components/auth/auth.route')

router.use('/auth', authMainRoute)

module.exports = router