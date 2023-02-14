const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/adoptme'

mongoose
    .connect(MONGODB_URI)
    .then(() => console.info(`Succesfully connected to the database ${MONGODB_URI}.`))
    .catch((error) => console.error(`An error ocurred trying to connect to the database ${MONGODB_URI}.`,error))