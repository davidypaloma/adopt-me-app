const express = require('express')

const commonController = require('../controllers/common.controller')
const protSocietyController = require('../controllers/protSociety.controller')
const petsController = require('../controllers/pets.controller')

const router = express.Router()

router.get('/', commonController.home)

router.get('/login', protSocietyController.login)
router.get('/profile/:id', protSocietyController.profile)
router.get('/profile/:id/edit', protSocietyController.edit)
router.post('/profile/:id', protSocietyController.doEdit)

router.get('/pets', petsController.list)
router.get('/pets/new', petsController.create)
router.post('/pets', petsController.doCreate)
router.get('/pets/:id', petsController.detail)
router.get('/pets/:id/update', petsController.update)
router.post('/pets/:id', petsController.doUpdate)


module.exports = router