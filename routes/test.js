const Router = require('express')
const router = Router()
// const Product = require('../models/product')

router.get('/', async (req, res) => {
    // const products = await Product.getAll();
    res.render('test')
})

module.exports = router
