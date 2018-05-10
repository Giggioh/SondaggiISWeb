/**
 * Security Settings
 * (sails.config.security)
 *
 * These settings affect aspects of your app's security, such
 * as how it deals with cross-origin requests (CORS) and which
 * routes require a CSRF token to be included with the request.
 *
 * For an overview of how Sails handles security, see:
 * https://sailsjs.com/documentation/concepts/security
 *
 * For additional options and more information, see:
 * https://sailsjs.com/config/security
 */

module.exports.security = {

   cors: {
     allRoutes: true,
     allowOrigins: '*',
     allowAnyOriginWithCredentialsUnsafe: true,
     allowCredentials: true,
     allowRequestHeaders:'content-type,Authorization'
   },

  // csrf: false

};
/*module.exports.security.cors = {
  allRoutes: true,
  allowOrigin: '*',
  credentials: true,
  methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
  headers: '*',
};*/
