'use strict';

angular.module('weightwatcherClientApp')
  .controller('MainCtrl', ['$scope', 'WeightGet', 'Socket' ,function ($scope, WeightGet, Socket) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.weights = WeightGet.query();

    Socket.on('reload', function() {
      $scope.weights = WeightGet.query();
    });
  }]);
