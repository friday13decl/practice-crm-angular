const express = require('express')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const passport = require('passport')

const config = require('./config')
const strategy = require('./middleware/passport.middleware')
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const uploadsRoutes = require('./routes/uploads')

const app = express()
const httpLogger = morgan('dev')

app.use(httpLogger)
app.use(express.json())
app.use(fileUpload({
  abortOnLimit: true,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
}))
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(passport.initialize())
passport.use(strategy)

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/uploads', uploadsRoutes)

module.exports = () => {
  const port = config.port || 3000

  mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(() => {
    console.log('MongoDB is connected')
    app.listen(port, () => {
      console.log(`Server has been started on port ${port}...`)
    })
  }).catch((err) => {
    console.log(err)
  })
}