'use strict';

angular.module('weightwatcherClientApp')
  .controller('MainCtrl', ['$scope', 'Weight', 'Socket' ,function ($scope, Weight, Socket) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.weights = Weight.query();

    Socket.on('reload', function() {
      $scope.weights = Weight.query();
    });
  }]);
