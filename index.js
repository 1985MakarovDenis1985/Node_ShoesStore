const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

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
app.listen(PORT, () => {
    console.log(`server on port:${3000} has been started...`)
})

