import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import api from './api'
const bodyParser = require('body-parser')
const session = require('express-session')
const app = express()

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
app.set('port', port)

// Body parser, to access req.body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Sessions to create req.session
app.use(session({
  secret: 'nuxtexpress',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))

const mongoose = require('mongoose')
const myconfig = require('./config')
mongoose.connect(myconfig.db)

// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
