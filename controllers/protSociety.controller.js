const ProtSociety = require('../models/protSociety.model')

module.exports.login = (req, res, next) => {
    res.render('protSociety/login')
}

module.exports.profile = (req, res, next) => {
    ProtSociety.findById(req.params.id)
    .then((protsociety) => {
    res.locals = protsociety.id
        console.log(protsociety)
          res.render('protSociety/profile', { protsociety })
    })
    .catch(next)
}
