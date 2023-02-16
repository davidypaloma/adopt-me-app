const express = require('express')

const commonController = require('../controllers/common.controller')
const protSocietyController = require('../controllers/protSociety.controller')
const petsController = require('../controllers/pets.controller')

const router = express.Router()

router.get('/', commonController.home)

router.get('/login', protSocietyController.login)
router.get('/profile/:id', protSocietyController.profile)

router.get('/pets', petsController.list)
router.get('/pets/:name/:id', petsController.detail)
router.get('/pets/new', petsController.create)
router.post('/pets', petsController.doCreate)


module.exports = router