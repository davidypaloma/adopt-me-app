const ProtSociety = require('../models/protSociety.model')

module.exports.login = (req, res, next) => {
    res.render('protSociety/login')
}

module.exports.profile = (req, res, next) => {
    res.render('protSociety/profile')
}