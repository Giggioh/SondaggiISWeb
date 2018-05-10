module.exports = function(req, res, next) {
  var currentUser = req.token.amministratoreSistema;

  if (!currentUser || !currentUser[0]) {
    return res.forbidden();
  }

  next();
};
