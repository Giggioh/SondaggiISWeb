/**
 * Risposta.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    testo:{
      type:'string',
      required: true
    },

    domanda:{
      model:'Domanda',
      required:true
    },

    statistiche: {
      collection:'Statistica',
      via:'risposta'
    },

    risposteDate:{
      collection:'RispostaData',
      via:'risposta'
    }
  }
};

