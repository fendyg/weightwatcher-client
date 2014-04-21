'use strict';

angular
  .module('weightwatcherClientApp', [
    'ngResource',
    'ngRoute',
    'ui.bootstrap'
  ])
  .run(function($rootScope, $route){
    $rootScope.libraries = [
      'AngularJS,',
      'Grunt,',
      'Bower,',
      'socket.io,',
      'Yeoman',
      'D3.js'
    ];

    $rootScope.apiUrl = 'http://localhost:3000/';
    $rootScope.$route = $route;
    $rootScope.weights = {};

  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        activeTab: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'MainCtrl',
        activeTab: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });