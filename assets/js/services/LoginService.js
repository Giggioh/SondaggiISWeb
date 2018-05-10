SondaggiIS.service('LoginService', function($http, $q) {
  return {
    login: function(user) {
      var defer = $q.defer();
      var t=this;
      $http.post(server+'/account/login', user)
        .then(function(resp){
          defer.resolve(resp);
          t.saveJWT(resp.data);
        })
        .catch(function(err){defer.reject(err);});
      return defer.promise;
    },
    changePass: function(data) {
      var defer = $q.defer();
      $http.post(server+'/account/changePass', data)
        .then(function(resp){
          defer.resolve(resp);
          t.saveJWT(resp.data);
        })
        .catch(function(err){defer.reject(err);});
      return defer.promise;
    },

    registerUtente: function(data) {
      var defer = $q.defer();
      $http.post(server+'/utente/register', data)
        .then(function(resp){
          defer.resolve(resp);
        })
        .catch(function(err){defer.reject(err);});
      return defer.promise;
    },
    registerAC: function(data) {
      var defer = $q.defer();
      $http.post(server+'/amministratoreContenuti/register', data)
        .then(function(resp){
          defer.resolve(resp);
        })
        .catch(function(err){defer.reject(err);});
      return defer.promise;
    },
    registerAS: function(data) {
      var defer = $q.defer();
      $http.post(server+'/amministratoreSistema/register', data)
        .then(function(resp){
          defer.resolve(resp);
        })
        .catch(function(err){defer.reject(err);});
      return defer.promise;
    },

    saveJWT: function(jwt) {
      localStorage.setItem('jwt_sondaggi',JSON.stringify(jwt));
    },
    getJWT: function() {
      if (!localStorage.getItem('jwt_sondaggi')) return null;
      return angular.fromJson(localStorage.getItem('jwt_sondaggi'));
    },

    isLoggedIn: function() {
      return (!this.getJWT())?false:true;
    },
    logout: function() {
      localStorage.removeItem('jwt_sondaggi');
    },

    getCurrentAccount: function() {
      if (!this.isLoggedIn()) return null;
      return this.getJWT().account;
    },
    isUtente: function(){
      return this.isLoggedIn() && this.getCurrentAccount().utente[0];
    },
    isAC: function(){
      return this.isLoggedIn() && this.getCurrentAccount().amministratoreContenuti[0];
    },
    isAS: function(){
      return this.isLoggedIn() && this.getCurrentAccount().amministratoreSistema[0];
    },
  }
}).factory('LoginInterceptor',function($q,$injector) {
  return {
    request: function (config) {
      var s = $injector.get('LoginService');
      if (s.isLoggedIn()) {
        config.headers.Authorization = 'Bearer ' + s.getJWT().token;
      }
      return config;
    }
  }
}).config(function($httpProvider) {
    $httpProvider.interceptors.push('LoginInterceptor');
  });
