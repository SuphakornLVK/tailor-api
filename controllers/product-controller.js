const prisma = require('../models')

const createError = require('../utils/createError')
const tryCatch = require('../utils/tryCatch')

module.exports.getAllType = tryCatch( async(req, res, next) => {

    const services = await prisma.product.findMany()

    res.json(services)
})

module.exports.getAllService = tryCatch( async(req, res, next) => {

    const services = await prisma.product.findMany({
        where: {
            type: 'SERVICE'
        },
    })

    res.json(services)
})

module.exports.getAllProduct = tryCatch( async(req, res, next) => {

    const product = await prisma.product.findMany({
        where: {
            type: 'PRODUCT'
        },
    })

    if (!product) {
        createError(404, 'Product not found')
    }

    res.json(product)
})

module.exports.getAllTypeID = tryCatch( async(req, res, next) => {
    const productId = parseInt(req.params.id)

    const product = await prisma.product.findUnique({
        where: {id: productId},
    })

    if (!product) {
        createError(404, 'Product not found')
    }

    res.json(product)
})
