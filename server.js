require('dotenv').config()
const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express')
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const errorMiddleware = require('./middlewares/errorMiddleware')
const app = express()

// import routes ...
const authRoute = require('./routes/auth-route')
const productRoute = require('./routes/product-route')
const orderRoute = require('./routes/order-route')
const measureRoute = require('./routes/measure-route')

// import Middlewares ...
app.use(morgan(':method :url :status :res[content-length] - :response-time ms')) // check logging request
app.use(helmet()) // security for app
app.use(cors()) // allows connection

// route connect ...
app.use(express.json())

app.use('/auth', authRoute)
app.use('/products', productRoute)
app.use('/orders', orderRoute)
app.use('/measure', measureRoute)

// notFound - send 404
app.use( notFound )

// error check - send err code or 500.
app.use( errorMiddleware )

// run server on port
const port = process.env.PORT || 8000
app.listen(port, ()=> console.log('Server on ',port) )
