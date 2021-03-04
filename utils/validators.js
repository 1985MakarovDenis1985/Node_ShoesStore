const {body} = require('express-validator')
const User = require('../models/users') // --- для динам. валидации --- //

exports.registrationValidator = [
    body('email')
        .isEmail()
        .withMessage('incorrect email')
        .custom(async (value, {req}) => { // --- динамическая валидация --- //
            try {
                const user = await User.findOne({email: value})
                if (user) {
                    return Promise.reject('User has already exist')
                }
            } catch (err) {
                console.log(err)
            }
        })
        .normalizeEmail(), body('email', 'incorrect email').isEmail(),

    body('password', 'incorrect password')
        .isLength({min: 3, max: 20})
        .isAlphanumeric()
        .trim(),

    body('confirm')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('passwords must be the same')
            } else {
                return true
            }
        })
        .trim()
]

exports.newProductValidation = [
    body('title', 'Short title').isLength({min:3}).trim(),
    body('price', 'incorrect price').isNumeric(),
    body('sex', 'choose gender please').isLength({min:3}),
    body('size', 'choose size please').isLength({min:1})
]