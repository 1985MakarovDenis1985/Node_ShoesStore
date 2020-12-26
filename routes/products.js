const Router = require('express')
const router = Router()
const auth = require('../middleware/auth')
const Product = require('../models/product')

router.get('/', async (req, res) => {
    const products = await Product.find();
    res.render('products', {
        title: 'Products page',
        isProducts: true,
        products
    })
})

router.get('/all', async (req, res) => {
    const products = await Product.find();
    res.send(products)
})

router.get('/:id/edit', auth, async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    const product = await Product.findById(req.params.id)
    res.render('product-edit', {
        title: 'product',
        product
    })
})

router.post('/edit', auth, async (req, res) => {
    const {id} = req.body
    delete req.body.id // убираем идентификатор так как mongo добавляет его автоматом через _id (убираем что бы не создавать лишнее поле id)

    await Product.findByIdAndUpdate(id, req.body)
    res.redirect('/products')
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
    const product = await Product.findById(req.params.id)
    res.render('product', {
        // layout: 'empty',
        title: `Prod: ${product.title}`,
        product
    })
})

module.exports = router


// function routerOfSortProd(url, sex = false) {
//     router.get(url, async (req, res) => {
//         const products = await Product.getAll();
//         if (sex) {
//             const sortProd = await products.filter(el => el.sex === sex)
//             res.send(sortProd)
//         } else {
//             res.send(products)
//         }
//     })
// }
// routerOfSortProd('/all',)
// routerOfSortProd('/men', 'man')
// routerOfSortProd('/women', 'woman')
// routerOfSortProd('/children', 'children')