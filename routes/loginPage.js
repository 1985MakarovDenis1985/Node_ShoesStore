const Router = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('loginPage', {
        title: 'Login page',
        isHome: true
    })
})

module.exports = router