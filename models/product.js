const {v4: uuidv4} = require('uuid'); // библиотека для генерации ID
const fs = require('fs')
const path = require('path')

class Product {
    constructor(title, price, priceDown, boxSale, sex, imgEl, desc, size=[]) {
        this.title = title,
            this.price = price,
            this.priceDown = priceDown,
            this.boxSale = boxSale,
            this.sex = sex,
            this.imgUrl = imgEl,
            this.desc = desc,
            this.size = size,
            this.id = uuidv4()
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            priceDown: this.priceDown,
            boxSale: this.boxSale,
            sex: this.sex,
            imgUrl: this.imgUrl,
            desc: this.desc,
            size: [this.size],
            id: this.id
        }
    }

    async save() {
        const products = await Product.getAll()
        products.push(this.toJSON())
        return new Promise((res, rej) => {
            fs.writeFile(
                path.join(__dirname, '..', 'db', 'products.json'),
                JSON.stringify(products),
                (err) => {
                    if (err) rej(err)
                    else {
                        res()
                    }
                }
            )
        })
    }

    static getAll() {
        return new Promise((res, rej) => {
            fs.readFile(
                path.join(__dirname, '..', 'db', 'products.json'),
                'utf-8',
                (err, content) => {
                    if (err) rej(err)
                    else {
                        res(JSON.parse(content))
                    }
                }
            )
        })
    }

    static async getById(id){
        const products = await Product.getAll()
        return products.find(el => el.id === id)
    }
}

module.exports = Product