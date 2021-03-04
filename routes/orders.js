const Router = require('express')
const router = Router()
// const Product = require('../models/product')
const auth = require('../middleware/auth')
const Order = require('../models/order')

router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find({
            'user.userId': req.user._id
        }).populate('user.userId')
        res.render('orders', {
            isOrder: true,
            title: 'My Orders',
            orders: orders.map(el => {
                return {
                    ...el._doc,
                    price: el.products.reduce((total, prod) => {
                        return total += prod.count * prod.product.price
                    }, 0)
                }
            })
        })
    } catch (err) {
        console.log(err)
    }
})


router.post('/', auth, async (req, res) => {
    try {

        const user = await req.user
            .populate('cart.items.productId')
            .execPopulate()

        const products = user.cart.items.map(el => ({
            count: el.count,
            product: {...el.productId._doc}
        }))

        const orders = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            products: products
        })

        await orders.save()
        await req.user.clearCart()
        res.redirect('/orders')

    } catch (err) {
        console.log(err)
    }
})

module.exports = router
