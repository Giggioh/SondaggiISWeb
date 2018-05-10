SondaggiIS.controller('ViewSondaggioCtrl', ['$scope','$location','$routeParams','LoginService','SondaggiService',function($scope, $location,$routeParams, LoginService, SondaggiService) {

  if (!LoginService.isLoggedIn()) $location.path('/login');

  var sondaggioID=$routeParams.id;
  $scope.sondaggio={};
  $scope.formData={};

  if (LoginService.isAC()) $scope.isAC=true;
  if (LoginService.isUtente()) {
    //TODO: da aggiungere che se ha già compilato il sondaggio, può vedere che risposte ha dato
    $scope.isAC=false;
  }

  SondaggiService.getSondaggio(sondaggioID).then(function(resp) {
    $scope.sondaggio=resp.data;
  }).catch(function(err) {
    $location.path('/error');
  });

  $scope.submit=function() {
    SondaggiService.sendRisposte(sondaggioID,$scope.formData).then(function(resp) {
      $location.path('/sondaggi');
    }).catch(function(err) {
      $location.path('/error');
    });
  }

  $scope.back=function() {
    $location.path('/sondaggi');
  }

  $scope.edit=function() {
    if ($scope.isAC && $scope.sondaggio.bozza)
      $location.path('/edit/'+sondaggioID);
  }

}]);
