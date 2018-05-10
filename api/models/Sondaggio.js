/**
 * Sondaggio.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
1
module.exports = {

  attributes: {

    nome:{
      type:'string',
      required: true,
    },

    dataPubblicazione:{ //data pubblicazione non può essere required, siccome apprena creato il sondaggio è privato e non pubblicato
      type:'ref', //date non è più supportato in sails 1.0
      columnType:'timestamp', //si usa string con columnType invece
    },

    argomenti:{
      collection:'Argomento',
      via:'sondaggio'
    },

    chiuso:{
      type:'boolean',
      //required: true
    },

    bozza:{
      type:'boolean',
    },

    cancellato:{
      type:'boolean',
      //default:false TODO
    },

    amministratoreContenuti:{
      model:'AmministratoreContenuti',
    },
  },

  findPop: function(query,cb) {
    Sondaggio.find(query).populateAll().exec(async function (err, sondaggi) {
      if (sondaggi == null) cb(err, null);

      var sondNuovi = [];
      for (let sond of sondaggi) {
        sondNuovi.push(await Sondaggio.populateOne(sond));
      }

      cb(null,sondNuovi);
    });
  },

  findOnePop: function(query,cb) {
    Sondaggio.findOne(query).populateAll().exec(async function (err, sond) {
      if (sond == null) cb(err,null);

      sond=await Sondaggio.populateOne(sond);
      cb(null,sond);
    });
  },

  findOnePopSync: async function(query) {
    var sond=await Sondaggio.findOne(query).populateAll();
    if (sond == null) return null;

    var sond2=await Sondaggio.populateOne(sond);
    return sond2;
  },

  populateOne: async function(sond) {
    var argNuovi = [];
    for (let arg of sond.argomenti) {
      arg.domande = await Domanda.find({argomento: arg.id}).populateAll();
      argNuovi.push(arg);
    }
    sond.argomenti = argNuovi;

    sond.amministratoreContenuti.account=await Account.findOne({id: sond.amministratoreContenuti.account}).populateAll();

    return sond;
  },
  populateRisposte: async function(sond) {
    for (let arg of sond.argomenti) {
      for (let dom of arg.domande) {
        for (let risp of dom.risposte) {
          risp.risposteDate=await RispostaData.find({risposta:risp.id}).populateAll();
        }
      }
    }
    return sond;
  },
  populateStatistiche: async function(sond) {
    for (let arg of sond.argomenti) {
      for (let dom of arg.domande) {
        for (let risp of dom.risposte) {
          risp.statistiche=await Statistica.find({risposta:risp.id}).populateAll();
        }
      }
    }
    return sond;
  },

  emptyData: async function(id) {
    var sond=await Sondaggio.findOnePopSync({id:id});
    if (!sond.bozza) throw new Error("Impossibile modificare un sondaggio pubblicato.");

    var res=await sails.getDatastore().transaction(async function(db,proceed) {
      var idArgomenti=[];
      for (var arg of sond.argomenti) {
        idArgomenti.push(arg.id);

        var idDomande=[];
        for (var dom of arg.domande) {
          idDomande.push(dom.id);

          var idRisposte=[];
          for (var risp of dom.risposte) {
            idRisposte.push(risp.id);
          }
          await Risposta.destroy({id:idRisposte}).usingConnection(db);
        }
        await Domanda.destroy({id:idDomande}).usingConnection(db);
      }
      await Argomento.destroy({id:idArgomenti}).usingConnection(db);
      proceed(undefined,true);
    });
    return res;
  },

  calcStats:function(id,cb) {
    Sondaggio.findOnePop({id:id},async function(err,sond) {
      if (err) return cb(err);
      sond=await Sondaggio.populateRisposte(sond);

      var now_ms=new Date().getTime();
      var year_ms=1000*60*60*24*365;

      for (let arg of sond.argomenti) {
        for (let dom of arg.domande) {
          for (let risp of dom.risposte) {

            //qui vengono calcolate le statistiche per ogni risposta
            var stats = {
              totali:{tipo: 'risposte totali', count: risp.risposteDate.length},
              maggiorenni:{tipo: 'risposte utenti maggiorenni', count: 0},
            };

            for (let rd of risp.risposteDate) {
              var data_nascita_ms=new Date(rd.utente.data_nascita).getTime();
              if ((now_ms-data_nascita_ms)/year_ms>=18) stats.maggiorenni.count++;
            }

            for (let st in stats) {
              await Statistica.createOrUpdate({risposta: risp.id, tipo: stats[st].tipo, count: stats[st].count});
            }

          }
        }
      }
      return Sondaggio.getStats(id,cb);

    });
  },

  getStats:function(id,cb) {
    Sondaggio.findOnePop({id:id},async function(err,sond) {
      if (err) return cb(err);
      sond=await Sondaggio.populateStatistiche(sond);
      return cb(null,sond);
    });
  }

};

