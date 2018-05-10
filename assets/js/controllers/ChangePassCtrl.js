SondaggiIS.controller('ChangePassCtrl', function($scope, $location, LoginService) {

  if (!LoginService.isLoggedIn()) $location.path('/login');

  $scope.formData={};

  $scope.update=function() {
    if ($scope.formData.pnuova!=$scope.formData.pconf) {
      alert("Password e conferma sono diverse!");
      return;
    }
    LoginService.changePass($scope.formData).then(function(response) {
      $location.path('/');
    }).catch(function(err) {
      $location.path('/error');
    });
  }
});
