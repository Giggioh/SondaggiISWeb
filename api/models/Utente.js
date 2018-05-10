/**
 * Utente.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    account: {
      model: "Account",
      required: true,
      unique: true
    },

    nome: {
      type: 'string',
      required: true
    },

    cognome: {
      type: 'string',
      required: true
    },

    data_nascita: {
      type:'ref',
      columnType:'timestamp',
      required:true
    }

  }
};

