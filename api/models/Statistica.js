/**
 * Statistica.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    risposta:{
      model:'Risposta',
      required:true
    },

    tipo:{
      type:'string',
      required:true
    },

    count:{
      type:'number',
      required:true
    },

    vincolo_unique:{
      type:'string',
      unique:true
    },

    //TODO: implementale
    valida:{
      type:'boolean',
      required:true
    },

    ultimoAggiornamento:{
      type:'ref',
      columnType:'datetime', //come altri
      required:true
    },

  },

  beforeCreate:function(values,cb) {
    if (Number.isInteger(values.risposta))
      values.vincolo_unique=values.risposta+"_"+values.tipo;
    else
      values.vincolo_unique=values.risposta.id+"_"+values.tipo;
    cb();
  },

  createOrUpdate: async function(data) {
    //data deve avere ALMENO risposta e tipo
    var stat=await Statistica.findOne({risposta:data.risposta,tipo:data.tipo});
    if (stat) {
      data.valida=true;
      data.ultimoAggiornamento=new Date();

      return await Statistica.update({risposta:data.risposta,tipo:data.tipo}).set(data);

    } else {
      data.valida=true;
      data.ultimoAggiornamento=new Date();
      if (!data.count) data.count=0;
      return await Statistica.create(data);
    }
  }

};

