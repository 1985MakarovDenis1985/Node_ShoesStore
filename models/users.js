const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart:{
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                }
             }
        ]
    }
})

userSchema.methods.addToCart = function (product){
    const items = [...this.cart.items]
    const idx = items.findIndex(el => {
        return el.productId.toString() === product._id.toString()
    })

    if (idx >= 0){
        items[idx].count = items[idx].count += 1
    } else {
        items.push({
            productId: product._id,
            count: 1
        })
    }

    this.cart = {items: items}
    return this.save()
}

module.exports = model('User', userSchema)