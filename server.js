if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const methodOverride = require("method-override")

const bodyParser = require('body-parser')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use('/', indexRouter)

app.use('/authors', authorRouter)

app.use('/books', bookRouter)


app.listen(process.env.PORT || 3000)

const mongoose = require('mongoose')
const db = mongoose.connection

db.on('error', (err) => console.error(err))
db.once('open', (err) => console.log("Connected to Mongoose"))


mongoose.connect(process.env.DATABASE_URL)