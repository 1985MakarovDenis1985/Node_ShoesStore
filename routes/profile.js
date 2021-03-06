const {Router} = require('express')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', async (req, res) => {
    res.render('profile', {
        title: 'Your profile',
        isProfile: true,
        user: req.user.toObject()
    })
})

router.post('/', async (req, res) => {

})

module.exports = router