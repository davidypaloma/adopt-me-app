const express = require('express')

const secure = require('../middlewares/secure.mid')

const commonController = require('../controllers/common.controller')
const protSocietyController = require('../controllers/protSociety.controller')
const petsController = require('../controllers/pets.controller')

const router = express.Router()

router.get('/', commonController.home)

router.get('/protSociety/new', protSocietyController.create)
router.post('/protSociety', protSocietyController.doCreate)

router.get('/login', protSocietyController.login)
router.post('/login', protSocietyController.doLogin)

router.get('/profile/:id', secure.isAuthenticated, protSocietyController.profile)
router.get('/profile/:id/edit', secure.isAuthenticated, protSocietyController.edit)
router.post('/profile/:id', secure.isAuthenticated, protSocietyController.doEdit)

router.get('/pets', petsController.list)
router.get('/pets/new', secure.isAuthenticated, petsController.create)
router.post('/pets', secure.isAuthenticated, petsController.doCreate)
router.get('/pets/:id', petsController.detail)
router.get('/pets/:id/update', secure.isAuthenticated, petsController.update)
router.post('/pets/:id', secure.isAuthenticated, petsController.doUpdate)


module.exports = router