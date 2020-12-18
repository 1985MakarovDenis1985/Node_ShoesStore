const {Router} = require('express')
const router = Router()
// const Card = require('../models/card')
const Product = require('../models/product')

function mapCartItems(cart) {
    return cart.items.map(el => ({
        ...el.productId._doc, count: el.count
    }))
}

function computePrice(products) {
    return products.reduce((total, product) => {
        return total += product.price * product.count
    }, 0)
}

router.post('/add', async (req, res) => {
    const prod = await Product.findById(req.body.id)
    await req.user.addToCart(prod)
    console.log(prod)
    res.redirect('/cart')
})

router.get('/', async (req, res) => {
    const user = await req.user
        .populate('cart.items.productId')
        .execPopulate()

    const products = mapCartItems(user.cart)
    res.render('cart', {
        title: "Cart",
        isCard: true,
        products: products,
        price: computePrice(products)
    })
})

router.delete('/remove/:id', async (req, res) => {
    const prod = await Card.remove(req.params.id)
    res.status(200).json(prod)
})


module.exports = router