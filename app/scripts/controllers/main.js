'use strict';

angular.module('weightwatcherClientApp')
  .controller('MainCtrl', ['$scope', 'WeightGet', 'WeightDelete', 'Socket', function ($scope, WeightGet, WeightDelete, Socket) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.refreshWeight = function(){
      $scope.weights = WeightGet.query();
    };
    $scope.refreshWeight();

    $scope.deleteEntry = function(id){
      WeightDelete.delete(id, function(){
        console.log(id + 'deleted!');
        $scope.refreshWeight();
      });
    };

    Socket.on('reload', function() {
      $scope.refreshWeight();
    });
  }])
  .directive('ngConfirmClick', [
    function(){
      return {
        priority: -1,
        restrict: 'A',
        link: function(scope, element, attrs){
          element.bind('click', function(e){
            var message = attrs.ngConfirmClick;
            if(message && !window.confirm(message)){
              e.stopImmediatePropagation();
              e.preventDefault();
            }
          });
        }
      };
    }
  ]);
