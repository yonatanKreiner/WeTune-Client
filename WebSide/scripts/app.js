'use strict';

/**
 * @ngdoc overview
 * @name weTuneApp
 * @description
 * # weTuneApp
 *
 * Main module of the application.
 */
angular
  .module('weTuneApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
			$locationProvider.html5Mode(false).hashPrefix('');
  });
