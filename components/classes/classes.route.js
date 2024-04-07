const router = require('express').Router()
const ClassesService = require('./classes.service')
const middleware = require("../../middlewares/middleware");
const ClassesValidate = require("./classes.validate");
router.get('/', middleware,ClassesService.getAllClasses)
router.get('/:id', middleware,ClassesValidate.paramsValidate, ClassesService.getClassesByID)
router.get('/:id/current', middleware,ClassesValidate.paramsValidate, ClassesService.getCurrentClasses)

module.exports = router