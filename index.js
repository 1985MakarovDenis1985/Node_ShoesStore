const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const homeRoutes = require('./routes/home')
const loginRouter = require('./routes/loginPage')
const productsRouter = require('./routes/products')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/login', loginRouter)
app.use('/products', productsRouter)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server on port:${3000} has been started...`)
})

