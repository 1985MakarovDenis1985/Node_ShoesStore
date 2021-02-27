const {Schema, model} = require('mongoose')

const product = new Schema({
    title: {
        type: String,
        // required: true // говорит о том, что поле обязательно для модели
    },
    price: {type: Number},
    imgUrl: {type: String},
    startPrice: {type: Number},
    boxSale: {type: Number, default: null},
    sex: {type: String,},
    desc: {type: String},
    size: {type: Array},
    userId: {type: Schema.Types.ObjectId, ref: 'User'}
})

product.method('toClient', function (){
    const product = this.toObject()
    product.id = product._id
    delete product._id
    return product
})


// экспортируем модель: 1параметр - название модели, 2параметр - сама модель
module.exports = model('Product', product)