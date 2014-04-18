'use strict';

angular.module('weightwatcherClientApp')
  .controller('MainCtrl', function ($rootScope, $scope, WeightGet, WeightDelete, Socket, D3Draw) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.refreshWeight = function(){
      $rootScope.weights = WeightGet.query();
      $rootScope.weights.$promise.then(function(result){
        $rootScope.weights = result;
        $scope.weights = $rootScope.weights;
        D3Draw.render();
      });
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
  ])
  .factory('WeightGet', function($rootScope,$resource){
    var rs = $resource($rootScope.apiUrl + 'getweights', {});
    return rs;
  })
  .factory('WeightDelete', function($rootScope,$http){
    return {
      'delete': function(id, callback) {
        var url = $rootScope.apiUrl + 'deleteweight/' + id;
        $http.delete(url).success(callback);
      }
    };
  })
  .factory('WeightPost', function($rootScope,$http){
    return {
      'post': function(data, callback) {
        var url = $rootScope.apiUrl + 'postweight';
        $http.post(url, data).success(callback);
      }
    };
  })
  // Ignore socket.io implementation check by jshint (io not defined error on subsequent run)
  /* jshint ignore:start */
  .factory('Socket', function($rootScope){
    var socket = io.connect($rootScope.apiUrl);

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