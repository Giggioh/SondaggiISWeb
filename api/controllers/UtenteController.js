/**
 * UtenteController
 *
 * @description :: Server-side logic for managing utentes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  register: function(req,res,next) {
    //TODO: ci si può arrivare solo se non si è loggati
    //dati login
    var username=req.param("account").username;
    var password=req.param("account").password;
    var hash=Account.computeHash(username,password);

    //dati utente
    var nome=req.param("utente").nome;
    var cognome=req.param("utente").cognome;
    var data_nascita=req.param("utente").data_nascita;
	console.log('1');

    sails.getDatastore().transaction(function(db,proceed) {
      Account.create({username: username, hash: hash}).usingConnection(db).exec(function(err,account) {
        if (err) return proceed(err);
		console.log('2');

        Utente.create({nome: nome, cognome: cognome,data_nascita:new Date(data_nascita), account: account.id}).usingConnection(db).exec(function(err2,utente) {
          if (err2) return proceed(err2);
			console.log('3');

          return proceed();
        });
      });
    }).exec(function(err) {
      if (err) return res.badRequest(err);

      return res.ok();
    });
  }

};

