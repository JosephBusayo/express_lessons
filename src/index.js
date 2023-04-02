require('dotenv').config()
const express = require('express')
const session = require('express-session')
const DB = require('../database/index')

//routes
const groceryRoute = require('../routes/grocery')
const marketRoute = require('../routes/market')
const cookieParser = require('cookie-parser')
const authRoute = require('../routes/auth')

const app = express()
const PORT = process.env.PORT || 3001

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true })) //for accepting form data
app.use(cookieParser())
app.use(
    session({
        secret : "ADDFERMTYY2",
        resave: false,
        saveUninitialized : false
    })
)


app.use('/grocery', groceryRoute)
app.use('/market', marketRoute)
app.use('/auth', authRoute)


DB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
})