SondaggiIS.controller('LogoutCtrl', ['$scope','$location','LoginService',function($scope, $location, LoginService) {
    LoginService.logout();
    $location.path('/');
}]);
