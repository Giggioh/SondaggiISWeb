'use strict';

var SondaggiIS = angular.module('SondaggiIS', ['ngRoute', 'ui.bootstrap']);
var server='https://sondaggiis.herokuapp.com';
//Routes
SondaggiIS.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
      templateUrl: '/templates/index.html',
    }).when('/register/:accountType?', {
      templateUrl: '/templates/register.html',
      controller: 'RegisterCtrl'
    }).when('/login', {
      templateUrl: '/templates/login.html',
      controller: 'LoginCtrl'
    }).when('/logout', {
      templateUrl: '/templates/login.html',
      controller: 'LogoutCtrl'
    }).when('/changePass', {
      templateUrl: '/templates/changePass.html',
      controller: 'ChangePassCtrl'
    }).when('/sondaggi', {
      templateUrl: '/templates/sondaggi.html',
      controller: 'ListaSondaggiCtrl'
    }).when('/edit/:id?', {
      templateUrl: '/templates/editSondaggio.html',
      controller: 'EditSondaggioCtrl'
    }).when('/sondaggio/:id', {
      templateUrl: '/templates/viewSondaggio.html',
      controller: 'ViewSondaggioCtrl',
    }).when('/stats/:id', {
      templateUrl: '/templates/stats.html',
      controller: 'StatsCtrl',
    }).when('/error', {
      templateUrl: '/templates/error.html',
    }).otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    })
  }]);
