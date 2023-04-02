const { Router } = require('express')
const router = Router()
const User = require('../database/schemas/user')

router.post('/login', (req, res) => {
    const { username, password } = req.body
    if(username && password) {
        if (req.session.user){
            res.send(req.session.user)
        } else {
            req.session.user = {
                username,
            }
            res.send(req.session)
        }
    }else res.send(401)
})

router.post('/register', async (req, res) => {
    const { email, password } = req.body

    const searchUser = await User.findOne( {email} )
    if(searchUser){
        res.status(400).send( {msg : 'User already exists'} )
    }else{
        const newUser = User.create( {email, password} )
        res.sendStatus(201)
    }
})


module.exports = router