const express = require('express')
const groceryRoute = require('../routes/grocery')
const marketRoute = require('../routes/market')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const authRoute = require('../routes/auth')

const app = express()
const PORT = 3001

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

app.listen(PORT, ()=> console.log (`Listening on port ${PORT}`))