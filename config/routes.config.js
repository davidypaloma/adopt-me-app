const express = require('express')
const router = express.Router()

const commonController = require('../controllers/common.controller')
const protSocietyController = require('../controllers/protSociety.controller')


router.get('/', commonController.home)
router.get('/toAdopt', commonController.list)

router.get('/login', protSocietyController.login)
router.get('/profile', protSocietyController.profile)

module.exports = router