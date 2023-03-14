const ProtSociety = require('../models/protSociety.model')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

module.exports.create = (req, res, next) => {
  res.render('protSociety/newProtSociety')
}

module.exports.doCreate = (req, res, next) => {
  const protSocietyData = {
    name: req.body.name,
    image: req.body.image,
    location: req.body.location,
    email: req.body.email,
    phone: req.body.phone,
    website: req.body.website,
    password: req.body.password,
  }
  function renderWithErrors(errors) {
    res.render('protSociety/newProtSociety', { errors, protSociety: protSocietyData })
  }

  ProtSociety.findOne({ email: req.body.email })
    .then(protSociety => {
      if (protSociety) {
        renderWithErrors({ email: 'email ya registrado' })
      } else {
        return ProtSociety.create(protSocietyData)
          .then(() => {
            res.redirect('/login')
          })
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        renderWithErrors(error.errors)
      } else {
        next(error)
      }
    })
}

module.exports.login = (req, res, next) => {
  if (req.protSociety) {
    res.redirect('/pets')
  } else {
    res.render('protSociety/login')
  }
}

const sessions = {}

module.exports.doLogin = (req, res, next) => {
  const protSocietyData = {
    email: req.body.email,
    password: req.body.password,
  }
  ProtSociety.findOne({ email: req.body.email })
    .then((protSociety) => {
      return bcrypt.compare(req.body.password, protSociety.password)
        .then(ok => {
          if (ok) {
            req.session.protSocietyId = protSociety.id
            res.set('Set-Cookie', `sessionid=${req.session.protSocietyId}`)
            res.redirect('/pets')
          }
        })
    })
    .catch(next)
}

module.exports.profile = (req, res, next) => {
  ProtSociety.findById(req.protSociety.id)
    .then((protSociety) => {
      res.render('protSociety/profile', { protSociety })
    })
    .catch(next)
}

module.exports.edit = (req, res, next) => {
  ProtSociety.findById(req.protSociety.id)
    .then((protSociety) => {
      res.render('protSociety/editProfile', { protSociety })
    })
    .catch(next)
}

module.exports.doEdit = (req, res, next) => {
  const protSocietyData = {
    name: req.body.name,
    image: req.body.image,
    location: req.body.location,
    email: req.body.email,
    phone: req.body.phone,
    website: req.body.website,
    password: req.body.password,
  }

  if (!req.body.password) {
    delete protSocietyData.password
  }
  if (!req.body.name) {
    delete protSocietyData.name
  }

  Object.assign(req.protSociety, protSocietyData)

  req.protSociety.save()
    .then((protSociety) => {
      res.redirect(`/profile`)
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('protSociety/editProfile', { errors: error.errors, protSociety: protSocietyData })
      } else {
        next(error)
      }
    })
}

module.exports.logout = (req, res, next) => {
  req.session.destroy(function (err) {
    req.session = null;
    res.clearCookie('connect.sid')
    res.clearCookie('sessionid')
    res.redirect('/login');
  });
}