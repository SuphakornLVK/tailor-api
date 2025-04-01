const express = require('express')
const productRoute = express.Router()
const { getAllTypeID, getAllProduct, getAllService, getAllType } = require('../controllers/product-controller')

console.log("getAllType:", getAllType); // ตรวจสอบว่ามีค่าหรือไม่

productRoute.get('/', getAllType)
productRoute.get('/services', getAllService)
productRoute.get('/products', getAllProduct)
productRoute.get('/:id', getAllTypeID)

module.exports = productRoute