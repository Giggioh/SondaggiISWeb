/**
 * THIS FILE WAS ADDED AUTOMATICALLY by the Sails 1.0 app migration tool.
 */

module.exports.datastores = {

  // In previous versions, datastores (then called 'connections') would only be loaded
  // if a model was actually using them.  Starting with Sails 1.0, _all_ configured
  // datastores will be loaded, regardless of use.  So we'll only include datastores in
  // this file that were actually being used.  Your original `connections` config is
  // still available as `config/connections-old.js.txt`.

  /*'sondaggiISMysql': {
    adapter: 'sails-mysql',
    host: 'localhost',
    user: 'sondaggi_is',
    password: 'Sondaggi2017',
    database: 'sondaggi_is'
  }*/

  default: {
    adapter: 'sails-mysql',
    url: 'mysql://sondaggi_is:Sondaggi2017@localhost:3306/sondaggi_is'
  }

};
