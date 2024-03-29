import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

const PAYPAL_CLIENT_ID = "AeMEN4EJJO1DLTLZSirnMstvlXu4tM7ft0aCr5C2uoPoJMkvyX_s2-C_pSy1dngUB41qjrmkOE7JMbHy"

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/', (req, res) => {
  res.send('API is running....')
})

app.use(notFound)
app.use(errorHandler)

const PORT = 5000

app.listen(
  PORT,
  console.log(
    `Server running in on port ${PORT}`.yellow.bold
  )
)
