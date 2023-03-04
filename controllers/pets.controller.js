const Pet = require('../models/pets.model')
const mongoose = require('mongoose')

module.exports.list = ((req, res, next) => {

  const criteria = {};

  if (req.query.name) {
    criteria.name = new RegExp(req.query.name)
  }

  if (req.query.class) {
    criteria.class = new RegExp(req.query.class)
  }

  if (req.query.sex) {
    criteria.sex = req.query.sex
  }

  if (req.query.breed) {
    criteria.breed = req.query.breed
  }

  // if (req.query.location) {
  //   criteria.protSociety = {location: req.query.location}
  // }

  Pet.find(criteria)
    .populate('protSociety')
    .then((pets) => {
      res.render('pets/petsList', { pets })
    })
    .catch(next)
})

module.exports.detail = ((req, res, next) => {
  Pet.findById(req.params.id)
    .populate('protSociety')
    .then((pet) => {
      res.render('pets/petsDetail', { pet })
    })
    .catch(next)
})

module.exports.create = ((req, res, next) => {
  res.render('pets/newPet')
})

module.exports.doCreate = ((req, res, next) => {
  // req.body.protSociety = req.protSociety.id
  Pet.create(req.body)
    .then((pet) => {
      res.redirect(`/pets/${pet.id}`)
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('pets/newPet', { errors: error.errors, pet: req.body })
      } else {
        next(error)
      }
    })
})

module.exports.update = ((req, res, next) => {
  Pet.findById(req.params.id)
    .then((pet) => {
      res.render('pets/updatePet', { pet })
    })
})

module.exports.doUpdate = ((req, res, next) => {
  Pet.findByIdAndUpdate(req.params.id, req.body)
    .then((pet) => {
      res.redirect(`/pets/${pet.id}`)
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('pets/updatePet', { errors: error.errors, pet: req.body })
      } else {
        next(error)
      }
    })
})