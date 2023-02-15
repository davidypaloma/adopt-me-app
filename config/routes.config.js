const express = require('express')

const commonController = require('../controllers/common.controller')
const protSocietyController = require('../controllers/protSociety.controller')
const petsController = require('../controllers/pets.controller')

const router = express.Router()

router.get('/', commonController.home)

router.get('/login', protSocietyController.login)
router.get('/profile', protSocietyController.profile)

router.get('/pets', petsController.list)
router.get('/pets/:id', petsController.detail)


module.exports = router