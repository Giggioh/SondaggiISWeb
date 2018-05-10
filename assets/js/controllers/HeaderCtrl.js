SondaggiIS.controller('HeaderCtrl', function($scope,$rootScope, $location,$routeParams, LoginService) {
  $scope.isLogged=false;
  $scope.isAC=false;
  $scope.isAS=false;
  $scope.nome='';

  if (LoginService.isLoggedIn()) {
    $scope.isLogged=true;
    $scope.nome=LoginService.getCurrentAccount().username;

    if (LoginService.isAC()) $scope.isAC=true;
    if (LoginService.isAS()) $scope.isAS=true;
  }
});
