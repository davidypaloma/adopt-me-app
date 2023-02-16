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

module.exports.create = ((req, res, next) => {
  res.render('pets/newPet')
})

module.exports.doCreate = ((req, res, next) =>{
  Pet.create(req.body)
    .then((pet) => {
        res.redirect(`/pets/${pet.name}/${pet.id}`)
    })
    .catch(next)
})