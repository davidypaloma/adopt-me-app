const Pet = require('../models/pets.model')

module.exports.list = ((req, res, next) => {
  Pet.find()
    .then((pets) => {
      res.render('pets/petsList', { pets })
    })
    .catch(next)
})

module.exports.detail = ((req, res, next) => {
  Pet.findById(req.params.id)
    .then((pet) => {
      res.render('pets/petsDetail', { pet })
    })
    .catch(next)
})