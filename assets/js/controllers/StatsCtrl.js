SondaggiIS.controller('StatsCtrl', ['$scope','$location','$routeParams','LoginService','SondaggiService',function($scope, $location, $routeParams, LoginService, SondaggiService) {

  if (!LoginService.isLoggedIn()) $location.path('/');
  if (!LoginService.isAC()) $location.path('/');

  var sondaggioID=$routeParams.id;
  $scope.sondaggio={};

  SondaggiService.getStats(sondaggioID).then(function(response) {
    $scope.sondaggio=response.data;
  }).catch(function(err) {
    alert('Si è verificato un errore. ('+err.data+')');
  });

  $scope.calc=function() {
    SondaggiService.calcStats(sondaggioID).then(function(response) {
      $scope.sondaggio=response.data;
    }).catch(function(err) {
      alert('Si è verificato un errore. ('+err.data+')');
    });
  }
}]);
