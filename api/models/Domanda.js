/**
 * Domanda.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    testo:{
      type:'string',
      columnType:'text',
      required:true
    },

    argomento:{
      model:'Argomento',
      required:true
    },

    risposte:{
      collection:'Risposta',
      via:'domanda'
    },

    risposteDate:{
      collection:'RispostaData',
      via:'domanda'
    }
  }
};

