const Router = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const User = require('../models/users')
const keys = require('../keys')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const {validationResult} = require('express-validator')
const {registrationValidator} = require('../utils/validators')
const sendgrid = require('nodemailer-sendgrid-transport')
const regEmail = require('../emails/regemail')
const resetPass = require('../emails/resetPass')

const transporter = nodemailer.createTransport(sendgrid({
    auth: {api_key: keys.SENDGRID_API_KEY}
}))


router.get('/login', async (req, res) => {
    res.render('auth/loginPage', {
        title: 'Login page',
        isLogin: true,
        registrationError: req.flash('registrationError'),
        loginError: req.flash('loginError'),
        passwordError: req.flash('passwordError'),
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
            } else {
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

router.post('/registration', registrationValidator,  async (req, res) => {
    try {
        const {name, email, password} = req.body
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            req.flash('registrationError', errors.array()[0].msg)
            return res.status(422).redirect('/auth/login#registration' )
        }

            const hashPassword = await bcrypt.hash(password, 11)
            const user = new User({
                name,
                email,
                password: hashPassword,
                cart: {items: []}
            })
            await user.save()
            res.redirect('/auth/login')
            await transporter.sendMail(regEmail(email, name))

    } catch (err) {
        console.log(err)
    }
})

router.get('/reset', (req, res) => {
    res.render('auth/reset', {
        title: 'Forgot the password',
        error: req.flash('error')
    })
})

router.get('/password/:token', async (req, res) => {
    if (!req.params.token) {
        return res.redirect('/auth/login')
    }

    try {
        const user = await User.findOne({
            resetToken: req.params.token,
            resetTokenExp: {$gt: Date.now()}
        })

        if (!user) {
            return res.redirect('/auth/login')
        } else {
            res.render('auth/password', {
                title: 'Recover access',
                error: req.flash('error'),
                userId: user._id.toString(),
                token: req.params.token
            })
        }

    } catch (err) {
        console.log(err)
    }
})

router.post('/reset', (req, res) => {
    try {
        crypto.randomBytes(32, async (err, buffer) => {
            if (err) {
                req.flash('error', 'Something wrong, try later')
                res.redirect('/auth/reset')
            }

            const token = buffer.toString('hex')
            const candidate = await User.findOne({email: req.body.email})

            if (candidate) {
                candidate.resetToken = token
                candidate.resetTokenExp = Date.now() + 60 * 60 * 1000
                await candidate.save()
                await transporter.sendMail(resetPass(candidate.email, token))
                res.redirect('/auth/login')

            } else {
                req.flash('error', 'There is no user with this email')
                res.redirect('auth/reset')
            }

        })

    } catch (err) {
        console.log(err)
    }
})

router.post('/password', async (req, res) => {
   try {
       const user = await User.findOne({
           _id: req.body.userId,
           resetToken: req.body.token,
           resetTokenExp: {$gt: Date.now()}
       })

       if (user){
           user.password = await bcrypt.hash(req.body.password, 11)
           user.resetToken = undefined
           user.resetTokenExp = undefined
           await user.save()
           res.redirect('/auth/login')
       }else {
           req.flash('loginError', 'time of token is up')
           res.redirect('/auth/login')
       }
   }catch (err){
       console.log(err)
   }
})

module.exports = router