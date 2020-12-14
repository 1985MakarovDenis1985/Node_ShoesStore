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
        isCard: true,
        products: card.products,
        price: card.price
    })
})

router.delete('/remove/:id', async (req, res) => {
    const prod = await Card.remove(req.params.id)
    res.status(200).json(prod)
})


module.exports = router