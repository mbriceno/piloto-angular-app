'use strict';

angular
	.module('pilotoApp')
	.factory('PilotoResource', ["$resource", "baseUrl", function ($resource, baseUrl) {
		return $resource(baseUrl, {}, {
      		getData: {
        		method: 'GET',
      		}
    	});
	}]);
