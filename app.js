//Frameworks
const express = require('express');
const logger = require('morgan')

require('dotenv/config')
require('./config/hbs.config')
require('./config/db.config')

const app = express();

//Middleware
app.use(express.urlencoded({extended: false}))
app.use(logger('dev'))

const router = require('./config/routes.config')
app.use('/', router)

app.use((err, req, res, next) => {
  console.error(err)
})

app.set('views', `${__dirname}/views`)

app.set('view engine', 'hbs')

//Port access
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The dog is barking at port ${port} 🐶 guau!`));