const router = require('express').Router()
const ClassesService = require('./classes.service')
const middleware = require("../../middlewares/middleware");
const ClassesValidate = require("./classes.validate");
router.get('/', middleware,ClassesService.getAllClasses)
router.get('/status', middleware, ClassesService.getClassStatus)
router.get('/:id', middleware,ClassesValidate.paramsValidate, ClassesService.getClassesByID)
router.get('/:id/current', middleware,ClassesValidate.paramsValidate, ClassesService.getCurrentClasses)
router.put('/:id/current/:classes_id',middleware,ClassesService.completeClasses)

module.exports = router