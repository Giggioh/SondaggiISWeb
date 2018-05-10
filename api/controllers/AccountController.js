/**
 * AccountController
 *
 * @description :: Server-side logic for managing accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  login: function(req,res,next) {

    //verifico se ho già inserito dei dati
    var username=req.param("username");
    var password=req.param("password");

    if (username!=null && password!=null) {
      //tento il login
      Account.login(username,password,function(err,jwt) {
        if (err) return res.badRequest("Username/password errati.");
        return res.json(jwt);
      });
    } else return res.badRequest("Username o password mancante.");
  },

  changePass: function(req,res,next) {
    var acc = req.token;
    var username=acc.username;
    var password=req.param("pvecchia");
    var passwordNuova=req.param("pnuova");

    if (username!=null && password!=null) {
      Account.login(username,password,function(err,jwt) {
        if (err) return res.badRequest("Password errata.");
        Account.changePass(jwt.account,passwordNuova,function(err,jwt) {
          if (err) return res.serverError();
          return res.json(jwt);
        });
      });
    } else return res.badRequest("Password mancante.");
  }

};

