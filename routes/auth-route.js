const express = require('express')
const authRoute = express.Router()
const { register, login, getMe, address, updateAddress, updateUser, getAllUserData } = require('../controllers/auth-controller')
const authenticate = require('../middlewares/authenticate')

authRoute.post('/register', register)
authRoute.post('/login', login)
authRoute.get('/address', authenticate, address)
authRoute.put('/address/update', authenticate, updateAddress)
authRoute.put('/user/update', authenticate, updateUser)
authRoute.get('/alluser', authenticate, getAllUserData)
authRoute.get('/me', authenticate, getMe)

module.exports = authRoute