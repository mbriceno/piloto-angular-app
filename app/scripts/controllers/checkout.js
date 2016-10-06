'use strict';

/**
 * @ngdoc function
 * @name pilotoApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the pilotoApp
 */
angular.module('pilotoApp')
  .controller('CheckoutCtrl', ['$scope','toaster', '$state', 'SessionService', '$stateParams', '$location', '$anchorScroll',
  function ($scope, toaster, $state, SessionService, $stateParams, $location, $anchorScroll) {
    
    $scope.productos = SessionService.getDataComplete() ? SessionService.getDataComplete():[];

    $scope.deleteItem = function(item){
      $scope.productos.splice(item, 1);
      SessionService.setDataComplete($scope.productos);
      $scope.subTotal = $scope.subtotal();
      $scope.total = $scope.subTotal;
    }

    $scope.calculateTotal = function(prd){
      var amount = prd.price * prd.quantity;
      prd.total = amount;
      $scope.subTotal = $scope.subtotal();
      $scope.total = $scope.subTotal;

      return amount;
    }

    $scope.subtotal = function(){
      var subtotal = 0;
      angular.forEach($scope.productos, function(value, key) {
        subtotal += value.total;
      });

      return subtotal;
    }

    $scope.subTotal = $scope.subtotal();
    $scope.total = $scope.subTotal;
  }]);
