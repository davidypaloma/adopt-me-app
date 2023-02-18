const ProtSociety = require('../models/protSociety.model')

module.exports.login = (req, res, next) => {
    res.render('protSociety/login')
}

module.exports.profile = (req, res, next) => {
    ProtSociety.findById(req.params.id)
        .then((protSociety) => {
            res.render('protSociety/profile', { protSociety })
        })
        .catch(next)
}

module.exports.edit = (req, res, next) => {
    ProtSociety.findById(req.params.id)
        .then((protSociety) => {
            res.render('protSociety/editProfile', { protSociety })
        })
        .catch(next)
}

module.exports.doEdit = (req, res, next) => {
    ProtSociety.findByIdAndUpdate(req.params.id, req.body)
        .then((protSociety) => {
            res.redirect(`/profile/${protSociety.id}`)
        })
        .catch(next)
}