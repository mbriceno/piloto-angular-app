'use strict';

/**
 * @ngdoc overview
 * @name pilotoApp
 * @description
 * # pilotoApp
 *
 * Main module of the application.
 */
angular
  .module('pilotoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'toaster',
    'ui.router',
    'ui.bootstrap',
    'blockUI',
  ])
  	.config(function($httpProvider, $resourceProvider, blockUIConfig){
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      $resourceProvider.defaults.stripTrailingSlashes = false;
      $httpProvider.interceptors.push('sessionInjector');
      blockUIConfig.message = 'Espera un poco';
  })
  .run(function($rootScope, $templateCache){
      $rootScope.$on('$stateChangeSuccess', function() {
         document.body.scrollTop = document.documentElement.scrollTop = 0;
      });
      
      $templateCache.put('angular-block-ui/angular-block-ui.ng.html', 
        '<div class=\"block-ui-overlay\"></div><div class=\"block-ui-message-container\" aria-live=\"assertive\" aria-atomic=\"true\"><div class=\"block-ui-message\" ng-class=\"$_blockUiMessageClass\"><img src="images/loader-chick.gif"><br>{{ state.message }}</div></div>');

      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
          $rootScope.$broadcast('clean-search');
      });

  });
