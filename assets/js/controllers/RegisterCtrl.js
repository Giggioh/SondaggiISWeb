SondaggiIS.controller('RegisterCtrl', ['$scope','$location','$routeParams','LoginService',function($scope, $location,$routeParams, LoginService) {

  $scope.accountType=0; //utente
  if ($routeParams.accountType=='ac') $scope.accountType=1; //AC
  else if ($routeParams.accountType=='as') $scope.accountType=2; //AS

  $scope.formData={};
  $scope.formData.account={};
  $scope.formData.utente={};
  //TODO acData se vogliamo chiedere dati all'ac

  if ($scope.accountType==0) {
    if (LoginService.isLoggedIn()) $location.path('/');

    $scope.register=function() {
      LoginService.registerUtente($scope.formData).then(function(response) {
        $location.path('/login');
      }).catch(function(err) {
        alert('Registrazione fallita. ('+err.data+')');
      });
    }

  } else if ($scope.accountType==1) {
    if (!LoginService.isLoggedIn() || !LoginService.isAS()) $location.path('/');

    $scope.register=function() {
      LoginService.registerAC($scope.formData).then(function(response) {
        $location.path('/');
      }).catch(function(err) {
        alert('Registrazione fallita. ('+err.data+')');
      });
    }

  } else if ($scope.accountType==2) {
    if (!LoginService.isLoggedIn() || !LoginService.isAS()) $location.path('/');

    $scope.register=function() {
      LoginService.registerAS($scope.formData).then(function(response) {
        $location.path('/');
      }).catch(function(err) {
        alert('Registrazione fallita. ('+err.data+')');
      });
    }

  }

}]);
