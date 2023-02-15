require('../config/db.config')

// const { mongo, default: mongoose } = require('mongoose') ??? Esto lo hemos puesto aposta?
const mongoose = require('mongoose')
const ProtSociety = require('../models/protSociety.model')

const protSocieties = [
  {
    name: 'Noa-Llutxent',
    image: 'https://scontent-mad1-2.xx.fbcdn.net/v/t1.18169-9/18056706_2256704837888679_2638329434592159193_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=V4Q3SSu0uFMAX8fq70A&tn=O121nQHpLMqQyntp&_nc_ht=scontent-mad1-2.xx&oh=00_AfB6sGbB9nNw4V8mL6bLBgNajp0RKeDR4J0wbWF_4XANxw&oe=64137378',
    location: 'Llutxent',
    email: 'associacio_noa@hotmail.com',
    website: 'https://www.facebook.com/Novaoportunitatanimal/?locale=es_ES',
    password: '123456789'
  }
]

ProtSociety.create(protSocieties)
  .then((protSocieties) => console.log(protSocieties))
  .catch((err) => console.error(`An error has occurred ${err}`))
  .finally(() => mongoose.connection.close())

