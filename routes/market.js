const { Router, res } = require('express')
const router = Router()


router.use((req, res, next) => {
    if(req.session.user) next() //if user exists
    else res.send(401)
})
const storeList = [
    {
        store: 'Ceci',
        miles: 2
    },
    {
        store: 'NAO',
        miles: 0.8
    },
    {
        store: 'Shoprite',
        miles: 2.3
    },
]

router.get('/', (req, res) => {
    const { miles } = req.query
    const parsedMiles = parseInt(miles)

    if (!isNaN(parsedMiles)) {
        const filteredStores = storeList.filter((s) => s.miles <= parsedMiles)
        res.send(filteredStores)
    }else res.send(storeList)
})


module.exports = router