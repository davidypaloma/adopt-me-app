const session = require('express-session')
const MongoStore = require('connect-mongo')
const ProtSociety = require('../models/protSociety.model')
const { findById } = require('../models/protSociety.model')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/adoptme'

module.exports.session = session({
  secret: process.env.SESSION_SECRET || 'super secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.SESSION_SECURE === 'true'
  },
  store: MongoStore.create({
    mongoUrl: MONGODB_URI,
    ttl: 14 * 24 * 60 * 60 //14 días
  })
})

module.exports.loadSessionProtSociety = (req, res, next) => {
  const { protSocietyId } = req.session
  if (protSocietyId) {
    ProtSociety.findById(protSocietyId)
      .then(protSociety => {
        req.protSociety = protSociety
        res.locals.currentProtSociety = protSociety;
        next()
      })
      .catch(next)
  } else {
    next()
  }
}