const express = require('express')
const orderRoute = express.Router()
const authenticate = require('../middlewares/authenticate')
const { getAllOrder, UserAllOrder, createOrder, updateOrderStatus } = require('../controllers/order-controller')

orderRoute.get('/', authenticate, getAllOrder)
orderRoute.get('/myorder', authenticate, UserAllOrder)
orderRoute.post('/makeorder', authenticate, createOrder)
orderRoute.put('/statusupdate', authenticate, updateOrderStatus);

module.exports = orderRoute