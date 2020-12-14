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


    static async remove(id){
        const card = await Card.fetch()

        const idx = card.products.findIndex(el => el.id === id)
        const course = card.products[idx]

        if (course.count === 1){
            //удаляем
            card.products = card.products.filter(c => c.id !== id)
        } else {
            //уменьшаем
            card.products[idx].count--
        }
        card.price -= course.price

        return new Promise((res, rej) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err){
                    rej(err)
                }
                else {
                    res(card)
                }
            })
        })
    }
}

module.exports = Card