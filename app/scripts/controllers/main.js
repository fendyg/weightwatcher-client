'use strict';

angular.module('weightwatcherClientApp')
  .controller('MainCtrl', function ($rootScope, $scope, WeightGet, WeightDelete, Socket) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.refreshWeight = function(){
      $rootScope.weights = WeightGet.query();
      $scope.weights = $rootScope.weights;
    };
    $scope.refreshWeight();

    $scope.deleteEntry = function(id){
      WeightDelete.delete(id, function(){
        $scope.refreshWeight();
      });
    };

    Socket.on('reload', function() {
      $scope.refreshWeight();
    });
  })
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
