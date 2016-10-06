'use strict';

/**
 * @ngdoc service
 * @name pilotoApp.SessionService
 * @description
 * # SessionService
 * Factory in the pilotoApp.
 */
angular.module('pilotoApp')
  .factory('SessionService', function ($window) {
    // Service logic
    // ...
    var sessionService = {};

    sessionService.create = function (credentials) {
    	$window.sessionStorage.setItem('token', credentials.token);
    };

    sessionService.destroy = function (data) {
        $window.sessionStorage.removeItem('token');
    };

    sessionService.hasToken = function () {
    	return !$window.sessionStorage.getItem('token');
    };

    sessionService.getToken = function () {
    	return $window.sessionStorage.getItem('token');
    }

    sessionService.setDataComplete = function (data_complete) {
        var dc = JSON.stringify(data_complete);
        $window.sessionStorage.setItem('data_complete', dc);
    };

    sessionService.getDataComplete = function () {
        var dc = $window.sessionStorage.getItem('data_complete');
        return JSON.parse(dc);
    }

    sessionService.deleteDataComplete = function () {
        return $window.sessionStorage.removeItem('data_complete');
    }

    return sessionService;
  });
