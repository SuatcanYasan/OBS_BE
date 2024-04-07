const router = require('express').Router()
const authMainRoute = require('./components/auth/auth.route')
const classesMainRoute = require('./components/classes/classes.route')
router.use('/auth', authMainRoute)
router.use('/classes', classesMainRoute)

module.exports = router