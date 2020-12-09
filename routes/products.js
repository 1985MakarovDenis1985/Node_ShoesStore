const Router = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('products', {
        title: 'Products page',
        isProducts: true
    })
})

module.exports = router