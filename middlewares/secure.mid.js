module.exports.isAuthenticated = (req, res, next) => {
  if (req.protSociety) {
    next()
  } else {
    res.redirect('/login')
  }
}