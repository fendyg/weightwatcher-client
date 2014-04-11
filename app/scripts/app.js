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
    ];

    $rootScope.$route = $route;
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
  })
  .factory('Weight', ['$resource', function($resource){
    return $resource('http://localhost:3000/getweights', {});
  }])
  // Ignore socket.io implementation check by jshint (io not defined error on subsequent run)
  /* jshint ignore:start */
  .factory('Socket', function($rootScope){
    var socket = io.connect('http://localhost:3000');

    //Override socket.on to $apply changes to angular
    return {
      on: function(eventName, fn) {
        socket.on(eventName, function(data) {
          $rootScope.$apply(function(){
            fn(data);
          });
        });
      },
      emit: socket.emit
    };
  })
  /* jshint ignore:end */
  ;