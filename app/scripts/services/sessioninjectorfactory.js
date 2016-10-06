'use strict';

angular
	.module('pilotoApp')
	.factory('sessionInjector', function (SessionService) {

		return {
	        request: function(config) {
	            if (!SessionService.hasToken()) {
	                config.headers['Authorization'] = 'Token '+SessionService.getToken();
	            }
	            return config;
	        }
	    }

	});