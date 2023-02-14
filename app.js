//Frameworks
const express = require('express');
const logger = require('morgan')

require('dotenv/config')
require('./config/hbs.config')

const app = express();

//Middleware
app.use(logger('dev'))

const router = require('./config/routes.config')
app.use('/', router)

app.set('views', `${__dirname}/views`)

app.set('view engine', 'hbs')

//Port acces
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The dog is barking at port ${port} 🐶 guau!`));