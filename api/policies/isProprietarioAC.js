module.exports = function(req, res, next) {
  var currentUser = req.token.amministratoreContenuti;

  var id=req.param('id');
  if (!id) return next(); //se non sto accedendo ad un sondaggio, non posso verificarne la proprietà

  Sondaggio.findPop({amministratoreContenuti: currentUser[0].id}, function (err, list) {
    if (list == null) return next(err);

    var proprietario = false;
    for (var s of list) {
      if (s.id==id) {
        return next();
      }
    }
    Sondaggio.findOne({id:id}).exec(function(err,sond) { //ho verificato che l'account che ha effettuato la richiesta non è proprietario del sondaggio con questo id, ma se il sondaggio non esistesse?
      if (err || !sond) return next();
      return res.forbidden();
    });
  });
};
