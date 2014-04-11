'use strict';
/*jshint unused: false */
angular.module('weightwatcherClientApp')
  .controller('ModalCtrl', ['$scope', '$modal', function ($scope, $modal) {
    $scope.open = function () {
      var modalInstance = $modal.open({
        templateUrl: 'views/mainModal.html',
        controller: 'ModalInstanceCtrl'
      });
    };
  }])
  .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }])
  .controller('DatepickerCtrl', ['$scope', function($scope){
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.showWeeks = false;
    $scope.toggleWeeks = function () {
      $scope.showWeeks = ! $scope.showWeeks;
    };

    $scope.clear = function () {
      $scope.dt = null;
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