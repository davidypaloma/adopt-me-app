//Frameworks
const express = require('express');
const logger = require('morgan')

require('dotenv/config')

const app = express();

//Middleware
app.use(logger('dev'))

//Port acces
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The dog is barking at port ${port} 🐶 guau!`));