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
app.use(session)
app.use(loadSessionProtSociety)

const router = require('./config/routes.config')
app.use('/', router)

app.use((err, req, res, next) => {
  console.error(err)
})


//Port access
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The dog is barking at port ${port} 🐶 guau!`));