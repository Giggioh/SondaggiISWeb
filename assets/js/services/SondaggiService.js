SondaggiIS.service('SondaggiService', function($http, $q) {
  return {
    getSondaggiUtente: function(filter) {
      var defer = $q.defer();
      $http.post(server+'/sondaggio/listaUtente', filter)
        .then(function(resp){
          defer.resolve(resp);
        })
        .catch(function(err){defer.reject(err);});
      return defer.promise;
    },
    getSondaggiAC: function(filter) {
      var defer = $q.defer();
      $http.post(server+'/sondaggio/listaAC', filter)
        .then(function(resp){
          defer.resolve(resp);
        })
        .catch(function(err){defer.reject(err);});
      return defer.promise;
    },

    getSondaggio: function(id) {
      var defer = $q.defer();
      $http.post(server+'/sondaggio/get', {id:id})
        .then(function(resp){
          defer.resolve(resp);
        })
        .catch(function(err){defer.reject(err);});
      return defer.promise;
    },
    sendRisposte: function(id, risposte) {
      var defer = $q.defer();
      $http.post(server+'/sondaggio/compila', {id:id,risposte:risposte})
        .then(function(resp){
          defer.resolve(resp);
        })
        .catch(function(err){defer.reject(err);});
      return defer.promise;
    },

    pubblica: function(id) {
      var defer = $q.defer();
      $http.post(server+'/sondaggio/pubblica', {id:id})
        .then(function(resp){
          defer.resolve(resp);
        })
        .catch(function(err){defer.reject(err);});
      return defer.promise;
    },
    chiudi: function(id) {
      var defer = $q.defer();
      $http.post(server+'/sondaggio/chiudi', {id:id})
        .then(function(resp){
          defer.resolve(resp);
        })
        .catch(function(err){defer.reject(err);});
      return defer.promise;
    },

    store: function(data) {
      var defer = $q.defer();
      $http.post(server+'/sondaggio/store', data)
        .then(function(resp){
          defer.resolve(resp);
        })
        .catch(function(err){defer.reject(err);});
      return defer.promise;
    },

    getStats: function(id) {
      var defer = $q.defer();
      $http.post(server+'/sondaggio/getStats', {id:id})
        .then(function(resp){
          defer.resolve(resp);
        })
        .catch(function(err){defer.reject(err);});
      return defer.promise;
    },

    calcStats: function(id) {
      var defer = $q.defer();
      $http.post(server+'/sondaggio/calcStats', {id:id})
        .then(function(resp){
          defer.resolve(resp);
        })
        .catch(function(err){defer.reject(err);});
      return defer.promise;
    },
  }
});
