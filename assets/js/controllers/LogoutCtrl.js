SondaggiIS.controller('LogoutCtrl', function($scope, $location, LoginService) {
    LoginService.logout();
    $location.path('/');
});
