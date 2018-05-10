/**
 * Risposta_data.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    domanda:{
      model:'Domanda',
      required: true
    },

    risposta:{
      model:'Risposta',
      required:true
    },

    utente:{
      model:'Utente',
      required:true
    },

    vincolo_unique:{
      type:'string',
      unique:true
    },

    dataCompilazione:{
      type:'ref', //date non è supportato da sails 1.0
      columnType:'datetime', //quindi type diventa string e columnType diventa date e si ottiene lo stesso risultato
      required:true
    },
  },

  beforeCreate:function(values,cb) {
    if (Number.isInteger(values.domanda) && Number.isInteger(values.utente))
      values.vincolo_unique=values.domanda+"_"+values.utente;
    else
      values.vincolo_unique=values.domanda.id+"_"+values.utente.id;
    cb();
  },

  findPop: function(query,cb) {
    RispostaData.find(query).populateAll().exec(async function (err, risposteDate) {
      if (risposteDate == null) cb(err, null);

      var risposteDateNuove = [];
      for (let rd of risposteDate) {
        risposteDateNuove.push(await RispostaData.populateOne(rd));
      }

      cb(null,risposteDateNuove);
    });
  },

  populateOne: async function(rd) {

    rd.domanda.argomento=await Argomento.findOne({id: rd.domanda.argomento}).populateAll();

    return rd;
    /*var argNuovi = [];
    for (let arg of rd.argomenti) {
      arg.domande = await Domanda.find({argomento: arg.id}).populateAll();
      argNuovi.push(arg);
    }
    sond.argomenti = argNuovi;

    sond.amministratoreContenuti.account=await Account.findOne({id: sond.amministratoreContenuti.account}).populateAll();

    return sond;*/
  }

};

