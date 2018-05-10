SondaggiIS.controller('EditSondaggioCtrl', function($scope, $location,$routeParams, LoginService, SondaggiService) {

  if (!LoginService.isLoggedIn()) $location.path('/login');
  if (!LoginService.isAC()) $location.path('/error');

  var sondaggioID=$routeParams.id;

  $scope.formData={};
  $scope.formData.argomenti=[];

  if (sondaggioID) {
    SondaggiService.getSondaggio(sondaggioID).then(function(resp) {
      if (!resp.data.bozza) $location.path('/error');
      if (resp.data.amministratoreContenuti.id!=LoginService.getCurrentAccount().amministratoreContenuti[0].id) $location.path('/error');
      $scope.formData=resp.data;
    }).catch(function(err) {
      $location.path('/error');
    });
  }

  $scope.addArg=function() {
    $scope.formData.argomenti.push({domande:[],nome:''});
  }
  $scope.addDom=function(arg) {
    arg.domande.push({risposte:[],testo:''});
  }
  $scope.addRisp=function(dom) {
    dom.risposte.push({testo:''});
  }

  $scope.delArg=function(arg) {
    $scope.formData.argomenti.splice($scope.formData.argomenti.indexOf(arg),1);
  }
  $scope.delDom=function(dom,arg) {
    arg.domande.splice(arg.domande.indexOf(dom),1);
  }
  $scope.delRisp=function(risp,dom) {
    dom.risposte.splice(dom.risposte.indexOf(risp),1);
  }

  $scope.save=function(pubblica) {
    $scope.formData.bozza=!pubblica;
    console.log($scope.formData)
    SondaggiService.store($scope.formData).then(function(resp) {
      $location.path('/sondaggio/'+resp.data.id);
    }).catch(function(err) {
      $location.path('/error');
    })
  }
  $scope.exit=function() {
    $location.path('/sondaggi');
  }

});
