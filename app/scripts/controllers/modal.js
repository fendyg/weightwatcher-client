'use strict';
/*jshint unused: false */
angular.module('weightwatcherClientApp')
  .controller('ModalCtrl', ['$scope', '$modal', function ($scope, $modal) {
    $scope.open = function () {
      var modalInstance = $modal.open({
        templateUrl: 'views/mainModal.html',
        controller: 'ModalFormCtrl'
      });
    };
  }])
  .controller('ModalFormCtrl', ['$rootScope', '$scope', 'WeightPost', '$modalInstance', function($rootScope, $scope, WeightPost, $modalInstance){
    $scope.today = function() {
      $scope.date = new Date();
    };
    $scope.today();

    $scope.currentInfo = {
      'date': '2010-01-01',
      'weight': 123
    };

    //Mirror date and weight ng-model to rootScope
    $scope.$watchCollection('[date, weight]', function(){
      $rootScope.currentInfo = {
        'date': $scope.date,
        'weight': $scope.weight
      };
    });

    $scope.submit = function(isValid) {
      if(isValid) {
        var data = $scope.currentInfo;

        WeightPost.post(data,function(){
          console.log(data);
          $modalInstance.close();
        });
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.showWeeks = false;
    $scope.toggleWeeks = function () {
      $scope.showWeeks = ! $scope.showWeeks;
    };

    $scope.clear = function () {
      $scope.date = null;
    };

    $scope.maxDate = new Date();

    $scope.toggleMin = function() {
      $scope.minDate = ( $scope.minDate ) ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      'year-format': '"yy"',
      'starting-day': 1,
      'show-weeks': false
    };

    $scope.format = 'yyyy/MM/dd';
  }]);