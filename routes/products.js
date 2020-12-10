const Router = require('express')
const router = Router()
const Product = require('../models/product')

router.get('/', async (req, res) => {
    const products = await Product.getAll();
     res.render('products', {
        title: 'Products page',
        isProducts: true,
        products
    })
})

router.get('/all', async (req, res) => {
    const products = await Product.getAll();
    res.send(products)
})


module.exports = router