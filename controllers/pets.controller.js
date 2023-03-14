const Pet = require('../models/pets.model')
const mongoose = require('mongoose');
const ProtSociety = require('../models/protSociety.model');

module.exports.list = async (req, res, next) => {

  const criteria = {};

  if (req.query.name) {
    criteria.name = new RegExp(req.query.name.trim(), "i")
  }

  if (req.query.age) {
    criteria.age = new RegExp(req.query.age.trim(), "i")
  }

  if (req.query.class) {
    criteria.class = new RegExp(req.query.class.trim(), "i")
  }

  if (req.query.sex) {
    criteria.sex = new RegExp(req.query.sex.trim(), "i")
  }

  if (req.query.breed) {
    criteria.breed = new RegExp(req.query.breed.trim(), "i")
  }

  if (req.query.location) {
    const protsocieties = await ProtSociety.find({ location: new RegExp(req.query.location, "i") })
    criteria.protSociety = { $in: protsocieties.map(x => x._id) }
  }
  if (req.protSociety) {
    criteria.protSociety = req.protSociety.id
  }

  Pet.find(criteria)
    .populate('protSociety')
    .then((pets) => {
      res.render('pets/petsList', { pets })
    })
    .catch(next)
}

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
  const petData = {
    name: req.body.name,
    image: req.body.image,
    class: req.body.class,
    age: req.body.age,
    sex: req.body.sex,
    breed: req.body.breed,
    energyLevel: req.body.energyLevel,
    isAdopted: req.body.isAdopted,
    description: req.body.description,
  }
  Pet.create(petData)
    .then((pet) => {
      pet.protSociety = req.protSociety.id
      res.redirect(`/pets/${pet.id}`)
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('pets/newPet', { errors: error.errors, pet: petData })
      } else {
        next(error)
      }
    })
})

module.exports.update = ((req, res, next) => {
  Pet.findById(req.params.id)
    .then((pet) => {
      res.render('pets/updatePet', { pet, petName: pet.name, petId: req.params.id, })
    })
    .catch(next)
})

module.exports.doUpdate = ((req, res, next) => {
  const petData = {
    name: req.body.name,
    image: req.body.image,
    class: req.body.class,
    age: req.body.age,
    sex: req.body.sex,
    breed: req.body.breed,
    energyLevel: req.body.energyLevel,
    isAdopted: req.body.isAdopted,
    description: req.body.description,
  }

  Pet.findById(req.params.id)
    .then((pet) => {
      const petName = pet.name
      Object.assign(pet, petData)
      pet.save()
        .then((pet) => {
          res.redirect(`/pets/${pet.id}`)
        })
        .catch(error => {
          if (error instanceof mongoose.Error.ValidationError) {
            res.render('pets/updatePet', { errors: error.errors, petId: req.params.id, pet: petData, petName })
          } else {
            next(error)
          }
        })
    })
    .catch(next)
})