angular.module('pilotoApp')
.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state('root',{
        abstract: true,
        template: '<div ui-view/>'

    })
    .state('main', {
        parent: 'root',        
        views: {
            '':{
                templateUrl: 'views/root.index.html',
            },
            'header@main': {
              templateUrl: 'views/main.header.html',
              controller: 'MainCtrl',
            },
            'footer@main': {
              templateUrl: 'views/main.footer.html',
              controller: 'FooterCtrl',
            }
        }
    })
    .state('main.home', {        
        url: '/',        
        views: {
            '': { 
                templateUrl: 'views/main.html',
                controller: 'HomeCtrl',
                resolve: {
                    productos: function(PilotoResource){
                        return PilotoResource.getData().$promise;
                    }
                }
            }
        }
    })
    .state('main.checkout', {        
        url: '/checkout',
        templateUrl: 'views/main.checkout.html',
        controller: 'CheckoutCtrl'
    });
}]);
