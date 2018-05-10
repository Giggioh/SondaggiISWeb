module.exports = function(req, res, next) {
  var currentUser = req.token.utente;

  if (!currentUser || !currentUser[0]) {
    return res.forbidden();
  }

  next();
};
