//Frameworks
const express = require('express');
const logger = require('morgan')

require('dotenv/config')
require('./config/hbs.config')
require('./config/db.config')

const { session, loadSessionProtSociety } = require('./config/session.config')

const app = express();

app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

//Middleware
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))
app.use(express.static(`${__dirname}/public`))

app.use(session)
app.use(loadSessionProtSociety)


app.use((req, res, next) => {
  res.locals.currentPath = req.path
  next()
})

const router = require('./config/routes.config')
app.use('/', router)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500)
  res.send('Ops, ha sucedido un error')
})


//Port access
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The dog is barking at port ${port} 🐶 guau!`));