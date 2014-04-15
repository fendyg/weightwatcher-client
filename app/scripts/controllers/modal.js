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
  .controller('ModalFormCtrl', ['$scope', 'WeightPost', '$modalInstance', function($scope, WeightPost, $modalInstance){
    $scope.modal = {};

    $scope.today = function() {
      $scope.modal.date = new Date();
    };
    $scope.today();

    //Mirror date and weight ng-model to scope
    $scope.$watchCollection('[modal.date, modal.weight]', function(){
      $scope.currentInfo = {
        'date': $scope.modal.date,
        'weight': $scope.modal.weight
      };
    });

    $scope.submit = function(isValid) {
      var data = $scope.currentInfo;

      WeightPost.post(data,function(){
        console.log(data);
        $modalInstance.close();
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.showWeeks = false;
    $scope.toggleWeeks = function () {
      $scope.showWeeks = ! $scope.showWeeks;
    };

    $scope.clear = function () {
      $scope.modal.date = null;
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