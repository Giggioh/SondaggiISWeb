/**
 * THIS FILE WAS ADDED AUTOMATICALLY by the Sails 1.0 app migration tool.
 */

var urldb = require('uri').parse(process.env.DATABASE_URL);
console.log(urldb);
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
    adapter: 'sails-postgresql',
    url: urldb
	/*host: url.host, 
    user: url.auth.split(':')[0], 
    password: url.auth.split(':')[1], 
    database: url.pathname.substring(1),
    port: url.port, 
    ssl: true,
    adapter: 'sails-postgresql'*/
  }


};
