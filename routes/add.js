const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth')
const Product = require('../models/product')


router.get('/', auth, (req, res, next) => {
    res.render('add', {
        title: "Add new course",
        isAdd: true
    })
})

router.post('/', auth, async (req, res) => {
    const arrOfSize = []
    req.body.size.trim().split(',').map(el => {
        arrOfSize.push(+el)
    });

    // rewrite products.json in to mongodb
    try {
        const product = new Product({
            title: req.body.title,
            price: req.body.price,
            imgUrl: req.body.imgUrl,
            startPrice: (req.body.startPrice) ? req.body.startPrice : 0,
            boxSale: req.body.boxSale,
            sex: req.body.sex,
            desc: req.body.desc,
            size: arrOfSize,
            userId: req.user._id
        })
        await product.save()
        res.redirect('/products')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router

// ---------- rewrite products.json in to mongodb ----------
// const p = require('../db/products.json') // переброс предыдущий массив в новую базу данных  с добавлением уникального ID
// try {
//     for (let i = 0; i < p.length; i++) {
//         const product = new Product({
//             title: p[i].title,
//             price: p[i].price,
//             imgUrl: p[i].imgUrl,
//             startPrice: p[i].priceDown,
//             boxSale: p[i].boxSale,
//             sex: p[i].sex,
//             desc: p[i].desc,
//             size: p[i].size,
//         })
//         await product.save()
//     }
//     // await product.save()
//     res.redirect('/card')
//
// } catch (err) {
//     console.log(err)
// }
///
//---------- lesson with class model ----------------
// router.post('/', async (req, res) => {
//     // // --- переброс предыдущий массив в новую базу данных с добавлением уникального ID
//     // for (let i = 0; i < p.length; i++) {
//     //     let prod = new Product(p[i].title, p[i].price, p[i].priceDown, p[i].boxSale, p[i].sex, p[i].imgEl, p[i].desc, p[i].size)
//     //     await prod.save()
//     //     console.log(prod)
//     // }
//
//     // await console.log(document.getElementById('img'))
//     // // --- добавление нового елимента
//     let prod = new Product(req.body.title, req.body.price, req.body.priceDown, req.body.boxSale, req.body.sex, req.body.imgUrl, req.body.desc, req.body.size)
//     await prod.save()
//     res.redirect('/add')
// })
