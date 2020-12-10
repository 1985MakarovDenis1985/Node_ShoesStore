const {Router} = require('express')
const router = Router()
// const p = require('../db/tempProduct.json') // переброс предыдущий массив в новую базу данных  с добавлением уникального ID
const Product = require('../models/product')

router.get('/', (req, res, next) => {
    res.render('add', {
        title: "Add new course",
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    // // --- переброс предыдущий массив в новую базу данных с добавлением уникального ID
    // for (let i = 0; i < p.length; i++) {
    //     let prod = new Product(p[i].title, p[i].price, p[i].priceDown, p[i].boxSale, p[i].sex, p[i].imgEl, p[i].desc, p[i].size)
    //     await prod.save()
    //     console.log(prod)
    // }

    // // --- добавление нового елимента
    let prod = new Product(req.body.title, req.body.price, req.body.priceDown, req.body.boxSale, req.body.sex, req.body.imgEl, req.body.desc, req.body.size)
    await prod.save()
    res.redirect('/products')
})

module.exports = router