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
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

// product.method('toClient', function (){
//     const product = this.toObject()
//     product.id = product._id
//     delete product._id
//     return product
// })


// экспортируем модель: 1параметр - название модели, 2параметр - сама модель
module.exports = model('Product', product)