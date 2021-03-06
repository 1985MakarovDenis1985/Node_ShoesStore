const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth')
const Product = require('../models/product')
const {validationResult} = require('express-validator')
const {newProductValidation} = require('../utils/validators')


router.get('/', auth, (req, res, next) => {
    res.render('add', {
        title: "Add new product",
        isAdd: true
    })
})

router.post('/', auth, newProductValidation, async (req, res) => {
   const errors = validationResult(req)
    // console.log(req.body.size)
    if (!errors.isEmpty()){
        return res.status(422).render('add', {
            title: "Add new product",
            isAdd: true,
            errors: errors.array()[0].msg,
            data: {
                title: req.body.title,
                price: req.body.price,
                img: req.body.imgUrl,
                imgUrl: req.body.imgUrl,
                startPrice: req.body.startPrice,
                sex: req.body.sex,
                desc: req.body.desc,
                size: req.body.size,
            }
        })
    }

    try {
        const product = new Product({
            title: req.body.title,
            price: req.body.price,
            imgUrl: (req.body.imgUrl) ? req.body.imgUrl : '1_shoe_first.png',
            startPrice: (req.body.startPrice) ? req.body.startPrice : 0,
            sex: req.body.sex,
            desc: req.body.desc,
            size: (req.body.size) ? req.body.size : req.body.size = 'absent',
            userId: req.user._id
        })
        await product.save()
        res.redirect('/products')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
