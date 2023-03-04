const ProtSociety = require('../models/protSociety.model')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

module.exports.create = (req, res, next) => {
  res.render('protSociety/newProtSociety')
}

module.exports.doCreate = (req, res, next) => {
  ProtSociety.create(req.body)
    .then(() => {
      res.redirect('/login')
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        console.error(error.errors, req.body)
        res.render('protSociety/newProtSociety', { errors: error.errors, protSociety: req.body })
      } else {
        next(error)
      }
    })
}

module.exports.login = (req, res, next) => {
  res.render('protSociety/login')
}

const sessions = {}

module.exports.doLogin = (req, res, next) => {
  ProtSociety.findOne({ email: req.body.email })
    .then((protSociety) => {
      bcrypt.compare(req.body.password, protSociety.password)
        .then(ok => {
          if (ok) {
            //Esto irá con una librería de express-session
            req.session.protSocietyId = protSociety.id
            // sessions[sessionId] = protSociety.id

            ///

            res.set('Set-Cookie', `sessionid=${req.session.protSocietyId}`)
            res.redirect('/pets')
          }
        })
        .catch(next)
    })
    .catch(next)
  //error => {
  //   if (error instanceof mongoose.Error.ValidationError) {
  //     res.render('protSociety/newProtSociety', { errors: error.errors, protSociety: req.body })
  //   } else {
  //     next(error)
  //   }
  // }
}

module.exports.profile = (req, res, next) => {
  ProtSociety.findById(req.params.id)
    .then((protSociety) => {
      res.render('protSociety/profile', { protSociety })
    })
    .catch(next)
}

module.exports.edit = (req, res, next) => {
  ProtSociety.findById(req.params.id)
    .then((protSociety) => {
      res.render('protSociety/editProfile', { protSociety })
    })
    .catch(next)
}

module.exports.doEdit = (req, res, next) => {
  ProtSociety.findByIdAndUpdate(req.params.id, req.body)
    .then((protSociety) => {
      res.redirect(`/profile/${protSociety.id}`)
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('protSociety/editProfile', { errors: error.errors, protSociety: req.body })
      } else {
        next(error)
      }
    })
}