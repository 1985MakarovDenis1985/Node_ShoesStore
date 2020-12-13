const {Router} = require('express')
const router = Router()
const Card = require('../models/card')
const Product = require('../models/product')


router.post('/add', async (req, res) => {
    const prod = await Product.getById(req.body.id)
    await Card.add(prod)
    res.status(200).redirect('/card')
})

router.get('/', async (req, res) => {
    const card = await Card.fetch()
    res.render('card', {
        title: "Card",
        isCard: true

    })
})


module.exports = router