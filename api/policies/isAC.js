module.exports = function(req, res, next) {
  var currentUser = req.token.amministratoreContenuti;

  if (!currentUser || !currentUser[0]) {
    return res.forbidden();
  }

  next();
};
