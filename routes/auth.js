const Router = require('express')
const router = Router()
const User = require('../models/users')

router.get('/login', async (req, res) => {
    res.render('auth/loginPage', {
        title: 'Login page',
        isLogin: true
    })
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login')
    })
})


router.post('/login', async (req, res) => {
    const user = await User.findById('5fdcde4c1e0c4103a7568e4f')
    req.session.user = user
    req.session.isAuthenticated = true
    req.session.save(err => {
        if (err){
            throw err
        } else {
            res.redirect('/')
        }
    })
})

module.exports = router