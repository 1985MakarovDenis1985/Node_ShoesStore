const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const mongoose = require('mongoose')

const homeRoutes = require('./routes/home')
const loginRouter = require('./routes/loginPage')
const productsRouter = require('./routes/products')
const addRouter = require('./routes/add')
const aboutRouter = require('./routes/about')
const cardRouter = require('./routes/card')
const testRouter = require('./routes/test')



const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars) // решает проблемы с доступом
})


app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public/')))


app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/products', productsRouter)
app.use('/add', addRouter)
app.use('/card', cardRouter)
app.use('/login', loginRouter)
app.use('/about' ,aboutRouter)
app.use('/test' ,testRouter)



const PORT = process.env.PORT || 3000

async function start (){
    try {
        const url = "mongodb+srv://admin:admin@cluster0.wn2yx.mongodb.net/shop"
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }) // without warnings
        app.listen(PORT, () => {
            console.log(`server on port:${3000} has been started...`)
        })
    }catch (err){
        console.log(err)
    }
}
start()


