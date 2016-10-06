'use strict';

/**
 * @ngdoc function
 * @name pilotoApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the pilotoApp
 * And banners metrics
 *
 */
angular.module('pilotoApp')
  .controller('HomeCtrl', ['$scope', 'toaster', '$window', 'productos', 'SessionService', '$state',
  function ($scope, toaster, $window, productos, SessionService, $state) {
  	$scope.cart = [];
  	$scope.productos = productos.products;
  	$scope.categorias = productos.categories;
  	$scope.filterCategory = null;
  	$scope.sortCriterial = 'id';
	$scope.reverse = false;

	$scope.addTocart = function(data){
		data.quantity = 1;
		data.amount = data.price;
		$scope.cart.push(data);
		toaster.pop('success', '', 'Product added');
	}

	$scope.checkout = function(){
		var curr_cart = SessionService.getDataComplete();
		var data_cart = (curr_cart) ? curr_cart : [];
		angular.forEach($scope.cart, function(value, key) {
			var product = _.find(data_cart, function(item){
		    	return value.id == item.id;
		    });
			if(typeof product==='undefined'){
				data_cart.push(value);
			}
		});
		SessionService.setDataComplete(data_cart);
		$state.go('main.checkout');
	}

  	$scope.categoryMatch = function( criteria ) {
	  	return function( item ) {
		  	if(criteria == null) {
		  		return true;
		  	}
		    return (-1 !== item.categories.indexOf(criteria.categori_id));
	  	};
	};

	$scope.criteriaMatch = function( criteria ) {
	  	return function( item ) {
		  	if(criteria == null || criteria == '') {
		  		return true;
		  	}else if(criteria == 'disponible'){
		  		return item.available == true;
		  	}else if(criteria == 'agotado'){
		  		return item.available == false;
		  	}else if(criteria == 'mas_vendidos'){
		  		return item.best_seller == true;
		  	}else if(criteria == 'lg_30'){
		  		return parseFloat(item.price) >= 30000.00;
		  	}else if(criteria == 'lt_10'){
		  		return parseFloat(item.pice) <= 10000.00;
		  	}
	  	};
	};

	$scope.sortBy = function(sortCriterial) {
	    $scope.reverse = ($scope.sortCriterial === sortCriterial) ? !$scope.reverse : false;
	    $scope.sortCriterial = sortCriterial;
	};

	$scope.showCategories = function(listCategories){
		var cats = '';
		angular.forEach(listCategories, function(value, key) {
			var category = _.find($scope.categorias, function(cat){
		      return value == cat.categori_id;
		    });
		    var cat_name = '<span class="box-category">'+category.name+'</span>';
		    cats += cat_name;
		});
		return cats;
	}
  }]);
