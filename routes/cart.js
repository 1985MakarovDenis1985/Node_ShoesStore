const {Router} = require('express')
const router = Router()
// const Card = require('../models/card')
const auth = require('../middleware/auth')
const Product = require('../models/product')


function mapCartItems(cart) {
    return cart.items.map(el => ({
        ...el.productId._doc,
        id: el.productId.id,
        count: el.count
    }))
}

function computePrice(products) {
    return products.reduce((total, product) => {
        return total += product.price * product.count
    }, 0)
}

router.post('/add', auth, async (req, res) => {
    const prod = await Product.findById(req.body.id)
    await req.user.addToCart(prod)
    res.redirect('/cart')
})

router.get('/', auth, async (req, res) => {
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

    // console.log(products)
})

router.delete('/remove/:id', auth, async (req, res) => {
    await req.user.removeFromCart(req.params.id)
    const user = await req.user.populate('cart.items.productId').execPopulate()
    const products = mapCartItems(user.cart)
    const cart = {
        products,
        price: computePrice(products)
    }
    res.status(200).json(cart)
})

router.get('/sum', async (req, res) => {
    if (req.user){
        const user = await req.user
            .populate('cart.items.productId')
            .execPopulate()
        const products = mapCartItems(user.cart)
        const sum = computePrice(products)
        res.status(200).json(sum)
    } else {
        return res.status(200).json(0)
    }
})

// router.delete('/product/:id', auth, async (req, res) => {
//     await req.user.removeFromCart(req.params.id)
//     const user = await req.user.populate('cart.items.courseId').execPopulate()
//     const products = mapCartItems(user.cart)
//     const cart = {
//         products,
//         price: computePrice(products)
//     }
//     res.status(200).json(cart)
// })


module.exports = router