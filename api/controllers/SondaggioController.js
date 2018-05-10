/**
 * SondaggioController
 *
 * @description :: Server-side logic for managing sondaggios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  listaUtente: function (req, res, next) {
    var acc = req.token; //pesco account dal token
    //TODO: possibilità di filtrarli tramite parametri
    //TODO: filtra solo quelli per cui è eligible
    RispostaData.findPop({utente: acc.utente[0].id}, function (err, risposteUtente) {
      var listaSondaggiCompletati = [];
      for (let ru of risposteUtente) {
        if (!listaSondaggiCompletati.includes(ru.domanda.argomento.sondaggio.id))
          listaSondaggiCompletati.push(ru.domanda.argomento.sondaggio.id);
      }

      Sondaggio.findPop({bozza: false, id: {'!=': listaSondaggiCompletati}, chiuso: false}, function (err, sondaggi) {
        if (sondaggi == null) next(err);
        res.json(sondaggi);
      });
    });
  },

  listaAC: function (req, res, next) {
    var acc = req.token;
    //TODO: possibilità di filtrarli tramite parametri
    Sondaggio.findPop({amministratoreContenuti: acc.amministratoreContenuti[0].id}, function (err, list) { //TODO: filtra via le bozze
      if (list == null) next(err);
      res.json(list);
    });
  },

  get: function (req, res, next) {
    Sondaggio.findOnePop({id: req.param('id')}, function (err, sond) {
      if (err) return res.serverError();
      return res.json(sond);
    });
  },

  compila: function (req, res, next) {
    var acc = req.token;

    Sondaggio.findOnePop({id: req.param('id')}, function (err, sond) {
      if (err) next(err);
      var risposte = req.param('risposte');

      //per sicurezza verifico che i dati ricevuti dal client siano accettabili
      for(var pair in risposte) {
        var rispostaValida=false;
        for(var a=0;a<sond.argomenti.length;a++) {
          for(var d=0;d<sond.argomenti[a].domande.length;d++) {
            if (sond.argomenti[a].domande[d].id==parseInt(pair)) {
              for(var r=0;r<sond.argomenti[a].domande[d].risposte.length;r++) {
                if (sond.argomenti[a].domande[d].risposte[r].id == parseInt(risposte[pair])) rispostaValida = true;
              }
            }
          }
        }
        if (!rispostaValida) return res.badRequest("Risposte non valide.");
      }

      sails.getDatastore().transaction(async function (db, proceed) {
        for (var rr in risposte) {
          try {
            await RispostaData.create({
              domanda: parseInt(rr),
              risposta: parseInt(risposte[rr]),
              utente: acc.utente[0].id,
              dataCompilazione: new Date(),
            }).usingConnection(db);
          } catch (err) {
            return proceed(err);
          }
        }
        return proceed();
      }).exec(function (err) {
        if (err) next(err);
        return res.ok();
      });
    });
  },

  pubblica: function (req, res, next) {
    Sondaggio.update({id: req.param('id')}).set({
      bozza: false,
      dataPubblicazione: new Date()
    }).exec(function (err, sond) {
      if (err) return res.serverError();
      return res.ok();
    });
  },

  chiudi: function (req, res, next) {
    Sondaggio.update({id: req.param('id')}).set({
      chiuso: true
    }).exec(function (err, sond) {
      if (err) return res.serverError();
      return res.ok();
    });
  },

  store: function (req, res, next) {
    var data=req.allParams();
    if (data.nome == null) return res.badRequest('Nome sondaggio non specificato.');

    var acc = req.token;
    var sondaggioCreato={};
    sails.getDatastore().transaction(async function(db,proceed) {
      try {
        if (data.id) {
          if (!await Sondaggio.emptyData(data.id))
            return proceed(new Error('Non è possibile alterare un sondaggio già pubblicato!'));//questo si occupa anche di verificare che il nostro sondaggio da modificare non sia pubblicato
          await Sondaggio.update(data.id).set({
            nome: data.nome,
            bozza: data.bozza, //TODO: evitare che si possa revertire a true (già fatto con emptyData?)
            dataPubblicazione: data.bozza ? null : new Date()
          }).usingConnection(db);
          sondaggioCreato = await Sondaggio.findOnePopSync(data.id); //non pulitissimo, ma funziona
        } else {
          var sData = {
            nome: data.nome,
            bozza: data.bozza,
            amministratoreContenuti: acc.amministratoreContenuti[0].id
          };
          if (!sData.bozza) sData.dataPubblicazione = new Date();
          sondaggioCreato = await Sondaggio.create(sData).usingConnection(db);
        }
        for (let arg of data.argomenti) {
          var argCreato = await Argomento.create({
            nome: arg.nome,
            sondaggio: sondaggioCreato.id
          }).usingConnection(db);
          for (let dom of arg.domande) {
            var domCreata = await Domanda.create({
              testo: dom.testo,
              argomento: argCreato.id
            }).usingConnection(db);
            for (let risp of dom.risposte) {
              await Risposta.create({
                testo: risp.testo,
                domanda: domCreata.id
              }).usingConnection(db);
            }
          }
        }

        return proceed();
      } catch(err) { return proceed(err); }
    }).exec(function (err) {
      if (err) return res.serverError(err);
      return res.json({id:sondaggioCreato.id});
    });
  },

  getStats: function(req,res,next){
    Sondaggio.getStats(req.param('id'),function(err,stats) {
      if (err) return res.serverError(err);
      return res.json(stats);
    });
  },

  calcStats: function(req,res,next){
    Sondaggio.calcStats(req.param('id'),function(err,stats) {
      if (err) return res.serverError(err);
      return res.json(stats);
    });
  },

};

