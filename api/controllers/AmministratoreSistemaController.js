/**
 * AmministratoreSistemaController
 *
 * @description :: Server-side logic for managing Amministratoresistemas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  register: function(req,res,next) {
    //TODO: qui ci si può arrivare solo se si è amministratori di sistema!
    //dati login
    var username=req.param("account").username;
    var password=req.param("account").password;
    var hash=Account.computeHash(username,password);

    sails.getDatastore().transaction(function(db,proceed) {
      Account.create({username: username, hash: hash}).usingConnection(db).exec(function(err,account) {
        if (err) return proceed(err);

        AmministratoreSistema.create({account: account.id}).usingConnection(db).exec(function(err2,amministratoreSistema) {
          if (err2) return proceed(err2);

          return proceed();
        });
      });
    }).exec(function(err) {
      if (err) res.badRequest();

      res.ok();
    });
  }

};

