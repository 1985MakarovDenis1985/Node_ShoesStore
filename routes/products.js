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
} )

router.get('/:id', async (req, res) => {
    const product = await Product.getById(req.params.id)
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