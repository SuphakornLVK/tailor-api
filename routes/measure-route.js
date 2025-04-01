const express = require('express')
const measureRoute = express.Router()
const authenticate = require('../middlewares/authenticate')
const { getUserMeasure, updateUserMeasure } = require('../controllers/measure-controller')

measureRoute.put('/updatemeasure/:userId', authenticate, updateUserMeasure)
measureRoute.get('/:userId', authenticate, getUserMeasure)

module.exports = measureRoute
