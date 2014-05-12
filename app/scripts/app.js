'use strict';

angular
  .module('talkUndoApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'LocalStorageModule',
    'mgcrea.ngStrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/command', {
        templateUrl: 'views/command.html',
        controller: 'CommandCtrl'
      })
      .when('/event', {
        templateUrl: 'views/main.html',
        controller: 'EventCtrl'
      })
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
