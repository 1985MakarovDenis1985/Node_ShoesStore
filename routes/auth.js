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
    try {
        const {email, password} = req.body
        const candidate = await User.findOne({email})

        if (candidate) {
            const isSame = password === candidate.password
            if (isSame) {
                req.session.user = candidate
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if (err) {
                        throw err
                    } else {
                        res.redirect('/')
                    }
                })
            }else {
                res.redirect('/auth/login#login')
            }
        } else {
            res.redirect('/auth/login#login')
        }


    } catch (err) {
        console.log(err)
    }


})

router.post('/registration', async (req, res) => {
    try {
        const {name, email, password, repeat} = req.body
        const candidate = await User.findOne({email})

        if (candidate) {
            res.redirect('/auth/registration')
        } else {
            const user = new User({
                name,
                email,
                password,
                cart: {items: []}
            })
            await user.save()
            res.redirect('/auth/login')
        }

    } catch (err) {
        console.log(err)
    }
})

module.exports = router