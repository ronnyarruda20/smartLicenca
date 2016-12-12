
 angular.module('starter')

 .constant('ApiEndpoint', {
  	url: 'http://www.vectorinf.com.br/facil/license/verificar.php?idLicenca=92'
})

.config(['$routeProvider',
    function config($routeProvider) {

      $routeProvider.
        when('/licenca',{
          templateUrl:'view/smartlicenca.html',
          controller: 'controller'
		})
		.when('/error',{
          templateUrl:'view/error.html',
          controller: 'controller'
		})
		.otherwise('/licenca');
    
}]);