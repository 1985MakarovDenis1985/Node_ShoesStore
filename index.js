const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const varMiddleware = require('./middleware/variables')
const csrf = require('csurf')
const flash = require('connect-flash')
const userMiddleware = require('./middleware/user')
const errorPage = require('./middleware/error')
const keys = require('./keys')

const homeRoutes = require('./routes/home')
const authRouter = require('./routes/auth')
const productsRouter = require('./routes/products')
const addRouter = require('./routes/add')
const aboutRouter = require('./routes/about')
const cardRouter = require('./routes/cart')
const ordersRouter = require('./routes/orders')


const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars), // решает проблемы с доступом
    helpers: require('./utils/hbs-helper')
})
const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGODB_URI
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public/')))


app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(csrf())
app.use(varMiddleware)
app.use(userMiddleware)
app.use(flash())

app.use('/', homeRoutes)
app.use('/products', productsRouter)
app.use('/add', addRouter)
app.use('/cart', cardRouter)
app.use('/auth', authRouter)
app.use('/about' ,aboutRouter)
app.use('/orders' ,ordersRouter)

app.use(errorPage)


const PORT = process.env.PORT || 3000
async function start (){
    try {
        await mongoose.connect(keys.MONGODB_URI, { // without warnings
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        app.listen(PORT, () => {
            console.log(`server on port:${3000} has been started...`)
        })
    }catch (err){
        console.log(err)
    }
}
start()


