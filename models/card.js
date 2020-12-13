const path = require('path')
const fs = require('fs')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'db',
    'card.json'
)

class Card {
    static async add(product) {
        const card = await Card.fetch()

        const idx = card.products.findIndex(el => el.id === product.id)
        const candidate = card.products[idx]

        if (candidate) {
            candidate.count++
            card.products[idx] = candidate
        } else {
            product.count = 1
            card.products.push(product)
        }

        card.price += +product.price

        return new Promise((res, rej) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    rej(err)
                } else {
                    res()
                }
            })
        })
    }

    static async fetch() {
        return new Promise((res, rej) => {
            fs.readFile(p, 'utf-8', (err, data) => {
                if (err) {
                    rej(err)
                } else {
                    res(JSON.parse(data))
                }
            })
        })
    }
}

module.exports = Card