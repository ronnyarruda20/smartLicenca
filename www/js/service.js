

angular.module('starter').service('service', ['$resource', 'ApiEndpoint',function($resource, ApiEndpoint){
	return $resource(ApiEndpoint.url, null, {});
}])