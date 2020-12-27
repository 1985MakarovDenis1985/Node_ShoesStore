const Router = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const User = require('../models/users')

router.get('/login', async (req, res) => {
    res.render('auth/loginPage', {
        title: 'Login page',
        isLogin: true,
        registrationError: req.flash('registrationError'),
        loginError: req.flash('loginError'),
        passwordError: req.flash('passwordError')
    })
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login')
    })
})


router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const candidate = await User.findOne({email})

        if (candidate) {
            const isSame = await bcrypt.compare(password, candidate.password)
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
                req.flash('loginError', 'Wrong password')
                res.redirect('/auth/login#login')
            }
        } else {
            req.flash('passwordError', 'User has not found')
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
        const hashPassword = await bcrypt.hash(password, 11)

        if (candidate) {
            req.flash('registrationError', 'User has already exist')
            res.redirect('/auth/login')
        } else {
            const user = new User({
                name,
                email,
                password: hashPassword,
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