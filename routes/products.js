const Router = require('express')
const router = Router()
const auth = require('../middleware/auth')
const Product = require('../models/product')

function isOwner(product, req) {
    return product.userId.toString() === req.user._id.toString()
}

router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
            .populate('userId', 'email name')
            .select('price title img')

        res.render('products', {
            title: 'Products page',
            isProducts: true,
            products
        })
    } catch (err) {
        console.log(err)
    }


})

router.get('/all', async (req, res) => {
    const products = await Product.find();
    res.send(products)
})

router.get('/:id/edit', auth, async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }
    try {
        const product = await Product.findById(req.params.id)
        if (!isOwner) {
            res.redirect('/products')
        }
        res.render('product-edit', {
            title: 'product',
            product
        })
    } catch (err) {
        console.log(err)
    }
})

router.post('/edit', auth, async (req, res) => {
    try {
        const {id} = req.body
        delete req.body.id // убираем идентификатор так как mongo добавляет его автоматом через _id (убираем что бы не создавать лишнее поле id)
        const product = await Product.findById(id)

        if (!isOwner(product, req)) {
            return res.redirect('/products')
        }

        Object.assign(product, req.body)
        if (req.body.startPrice == '') {
            req.body.startPrice = 0
        }
        // await Product.findByIdAndUpdate(id, req.body)
        await product.save()
        res.redirect('/products')
    } catch (err) {
        console.log(err)
    }


})

router.post('/remove', auth, async (req, res) => {
    try {
        await Product.deleteOne({_id: req.body.id})
        res.redirect('/products')
    } catch (err) {
        console.log(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.render('product', {
            // layout: 'empty',
            title: `Prod: ${product.title}`,
            userId: req.user ? req.user._id.toString() : null,
            product
        })
    }catch (err){
        console.log(err)
    }
})

module.exports = router
