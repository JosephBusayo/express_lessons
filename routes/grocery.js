const {Router} = require('express')
const router = Router()


router.use((req, res, next) => {
    if(req.session.user) next() //if user exists
    else res.send(401)
})
const groceryList = [
    {
        item: 'milk',
        quantity: 2
    }, {
        item: 'apple',
        quantity: 5
    }, {
        item: 'cereal',
        quantity: 1
    },
]


router.get('/', (req, res) => {
    res.cookie('visited', true, {maxAge: 10000})
    res.send(groceryList)
})

router.get('/:item', (req, res) => {
    console.log(req.headers.cookie)
    const {item} = req.params
    const groceryItem = groceryList.find((grocery) => grocery.item === item)
    res.send(groceryItem)

})
router.post('/', (req, res) => {
    const newGrocery = req.body
    groceryList.push(newGrocery)

    res.send(groceryList)
})
router.get('/shopping/cart', (req, res) => {
    const { cart } = req.session
    if (!cart){
        res.send("Your cart is empty")
    }else{
        res.send(cart)
    }
})

// the moment session(data attached to it) is modified, its stored as a cookie
router.post('/shopping/cart/item', (req, res) => {
    const {item, quantity} = req.body
    const cartItem = {
        item,
        quantity
    }
    const {cart} = req.session
    if (cart) {
        req.session.cart.items.push(cartItem)
    } else {
        req.session.cart = {
            items: [cartItem]
        }
    }
    res.send(201)
})

module.exports = router
