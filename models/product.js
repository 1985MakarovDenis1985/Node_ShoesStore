const {Schema, model} = require('mongoose')

const product = new Schema({
    title: {
        type: String,
        // required: true // говорит о том, что поле обязательно для модели
    },
    price: {
        type: Number,
        // required: true
    },
    imgUrl: {
        type: String,
    },
    startPrice: {
        type: Number,
    },
    boxSale: {
        type: Number,
    },
    sex: {
        type: String,
        // required: true
    },
    desc: {
        type: String,
        // required: true
    },
    size: {
        type: Array,
        // required: true
    }
})


// экспортируем модель: 1параметр - название модели, 2параметр - сама модель
module.exports = model('Product', product)