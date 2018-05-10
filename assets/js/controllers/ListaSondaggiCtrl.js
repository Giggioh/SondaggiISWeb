SondaggiIS.controller('ListaSondaggiCtrl', function($scope,$route, $location, LoginService, SondaggiService) {

  if (!LoginService.isLoggedIn()) $location.path('/login');

  $scope.sondaggi=[];
  $scope.showAC=false;

  if (LoginService.isUtente()) {
    SondaggiService.getSondaggiUtente(null).then(function (resp) {
      $scope.sondaggi = resp.data;
    }).catch(function (err) {
      $location.path('/error');
    });
  } else if (LoginService.isAC()) {
    $scope.showAC=true;
    SondaggiService.getSondaggiAC(null).then(function (resp) {
      $scope.sondaggi = resp.data;
    }).catch(function (err) {
      $location.path('/error');
    });
  }

  $scope.compila=function(sondaggio) {
    $location.path("/sondaggio/"+sondaggio.id);
  }
  $scope.modifica=function(sondaggio) {
    $location.path("/edit/"+sondaggio.id);
  }
  $scope.stats=function(sondaggio) {
    $location.path("/stats/"+sondaggio.id);
  }
  $scope.pubblica=function(sondaggio) {
    SondaggiService.pubblica(sondaggio.id).then(function (resp) { //TODO: success stuff
      $route.reload();
    }).catch(function (err) {
      $location.path('/error');
    });
  }
  $scope.chiudi=function(sondaggio) {
    SondaggiService.chiudi(sondaggio.id).then(function (resp) {
      $route.reload();
    }).catch(function (err) {
      $location.path('/error');
    });
  }

});
