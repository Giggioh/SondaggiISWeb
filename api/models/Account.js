/**
 * Account.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    username: {
      type: 'string',
      required: true,
      unique: true
    },

    hash: {
      type: 'string',
      required: true
    },

    utente: {
      collection: "Utente",
      via: "account"
    },

    amministratoreContenuti: {
      collection: "AmministratoreContenuti",
      via: "account"
    },

    amministratoreSistema: {
      collection: "AmministratoreSistema",
      via: "account"
    },
  },

  computeHash: function(user,pass) {
    var shajs=require("sha.js");
    return new shajs.sha256().update(user+":"+pass).digest("hex");
  },

  //metodi per effettuare/verificare login
  login: function(user,pass,callback) {

    //TODO: da togliere finito il testing di base
    if (user=='admin' && pass=='admin') {
      var account={username:'admin',utente:[],amministratoreContenuti:[],amministratoreSistema:[{id:0}]}
      var jwt=jwtAuthService.issueToken(account);
      return callback(null,{account:account, token:jwt});
    }

    var hash=Account.computeHash(user,pass);

    //è importante che sia popolato, perchè quei dati ci servono durante la sessione!
    Account.findOne({username: user, hash: hash}).populate("utente")
                                                 .populate("amministratoreSistema")
                                                 .populate("amministratoreContenuti").exec(function(err,account) {
      if (err) return callback(err);
      if (account==null) return callback(new Error("Utente non valido."));

      delete account.hash; //non lo vogliamo nel payload!
      var jwt=jwtAuthService.issueToken(account);

      return callback(null,{account:account, token:jwt});
    });

  },

  //metodi per effettuare/verificare login
  changePass: function(account,newPass,callback) {

    var hash=Account.computeHash(account.username,newPass);

    //è importante che sia popolato, perchè quei dati ci servono durante la sessione!
    Account.update({id: account.id}).set({hash: hash}).exec(function(err,account) {
      if (err) return callback(err);

      delete account.hash; //non lo vogliamo nel payload!
      var jwt=jwtAuthService.issueToken(account);

      return callback(null,{account:account, token:jwt});
    });

  },
};

